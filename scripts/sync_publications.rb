#!/usr/bin/env ruby

require "date"
require "fileutils"
require "pathname"
require "time"
require "yaml"

REQUIRED_FIELDS = %w[id title date year authors venue image type].freeze

site_root = Pathname.new(File.expand_path("..", __dir__))
watch = ARGV.delete("--watch")
source_argument = ARGV.shift || ENV["PUBLICATIONS_SOURCE"] || "../wtong2017.github.io"
source_root = Pathname.new(source_argument).expand_path(site_root)
catalog_source = source_root.join("data/publications.yml")
image_source = source_root.join("static/img")
catalog_target = site_root.join("_data/publications.yml")
image_target = site_root.join("assets/generated/publications")
site_config = YAML.safe_load(site_root.join("_config.yml").read, aliases: true)
lab_start_year = site_config.fetch("lab_start_year")

def load_catalog(path)
  YAML.safe_load(
    path.read,
    permitted_classes: [Date, Time],
    aliases: false
  )
end

def validate_catalog(publications, image_source, lab_start_year)
  errors = []

  unless publications.is_a?(Array)
    raise "Publication catalog must contain a YAML list."
  end

  ids = publications.map { |publication| publication["id"] if publication.is_a?(Hash) }.compact
  id_counts = Hash.new(0)
  ids.each { |id| id_counts[id] += 1 }
  duplicate_ids = id_counts.select { |_, count| count > 1 }.keys
  errors << "Duplicate publication IDs: #{duplicate_ids.join(", ")}" unless duplicate_ids.empty?

  publications.each_with_index do |publication, index|
    unless publication.is_a?(Hash)
      errors << "Entry #{index + 1} must be a mapping."
      next
    end

    label = publication["id"] || "entry #{index + 1}"
    missing = REQUIRED_FIELDS.select do |field|
      value = publication[field]
      value.nil? || value == "" || value == []
    end
    errors << "#{label}: missing #{missing.join(", ")}" unless missing.empty?

    year = publication["year"]
    errors << "#{label}: year must be an integer" unless year.is_a?(Integer)

    next unless year.is_a?(Integer) && year >= lab_start_year

    image = publication["image"].to_s
    if image.empty? || File.basename(image) != image
      errors << "#{label}: image must be a filename without a directory"
    elsif !image_source.join(image).file?
      errors << "#{label}: missing image #{image}"
    end
  end

  raise errors.join("\n") unless errors.empty?
end

def sync_publications(catalog_source, image_source, catalog_target, image_target, lab_start_year)
  raise "Canonical catalog not found: #{catalog_source}" unless catalog_source.file?
  raise "Canonical image directory not found: #{image_source}" unless image_source.directory?

  publications = load_catalog(catalog_source)
  validate_catalog(publications, image_source, lab_start_year)
  lab_publications = publications.select { |publication| publication["year"] >= lab_start_year }

  FileUtils.mkdir_p(catalog_target.dirname)
  FileUtils.cp(catalog_source, catalog_target)
  FileUtils.mkdir_p(image_target)

  expected_images = lab_publications.map { |publication| publication["image"] }.uniq
  image_target.children.each do |path|
    FileUtils.rm_f(path) if path.file? && !expected_images.include?(path.basename.to_s)
  end
  expected_images.each { |image| FileUtils.cp(image_source.join(image), image_target.join(image)) }

  puts "Synced #{lab_publications.length} publications from #{catalog_source}"
end

def source_fingerprint(catalog_source, image_source)
  paths = [catalog_source, *image_source.glob("*").select(&:file?)]
  paths.map { |path| [path.to_s, path.mtime.to_f, path.size] }
end

sync_publications(catalog_source, image_source, catalog_target, image_target, lab_start_year)

if watch
  puts "Watching the canonical catalog for changes. Press Ctrl+C to stop."
  fingerprint = source_fingerprint(catalog_source, image_source)

  loop do
    sleep 1
    current_fingerprint = source_fingerprint(catalog_source, image_source)
    next if current_fingerprint == fingerprint

    begin
      sync_publications(catalog_source, image_source, catalog_target, image_target, lab_start_year)
      fingerprint = current_fingerprint
    rescue StandardError => error
      warn "Publication sync failed: #{error.message}"
    end
  end
end
