---
title: "Projects"
permalink: /projects/
---

We build spatial, immersive, and cross-device systems that support data analysis,
collaboration, learning, and creative practice. Select a project to explore its research
questions, methods, impact, and related publications.

## Active research projects

{% assign active_projects = site.projects | where: "status", "active" | sort: "order" %}
<div class="project-list">
{% for project in active_projects %}
  <article class="project-index-card">
    <div>
      <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
      <ul class="project-index-card__meta" aria-label="Project metadata">
        <li>{{ project.related_publications | size }} related publication{% if project.related_publications.size != 1 %}s{% endif %}</li>
      </ul>
    </div>
    <a class="project-index-card__link" href="{{ project.url | relative_url }}" aria-label="View {{ project.title }}">View details &rarr;</a>
  </article>

{% endfor %}
</div>
