---
title: "People"
permalink: /people/
---

<!-- We're looking for 1-2 PhD students passionate about data visualization, AR/VR, and human-computer interaction to join VVAI Lab in Fall 2025. If you're ready to push the boundaries in these fields, please email your CV!

Please also complete the expression of interest form [https://forms.gle/z3ynVaXrZtsHTVqx8](https://forms.gle/z3ynVaXrZtsHTVqx8) if you are interested! -->

Our lab is a vibrant community of researchers, students, and collaborators dedicated to advancing the fields of visualization, augmented reality (AR), virtual reality (VR), and human-computer interaction (HCI).

## Current Members

{% assign sorted_members = site.data.people | sort: "position" %}
{% assign position_order = "Assistant Professor,PhD Student,Master Student,Research Assistant,Intern (Remote)" | split: "," %}

{% assign sorted_members = sorted_members | sort: "position" %}
{% assign sorted_members = sorted_members | sort: "name" %}

<div class="people-grid">
{% for position in position_order %}
  {% for member in sorted_members %}
    {% if member.position == position and member.alumni != true %}
      <a class="person-card" href="{{ member.personal_url }}" aria-label="View {{ member.name }}'s profile">
        <img class="person-card__image" src="{{ '/assets/images/people/' | append: member.avatar | relative_url }}" alt="{{ member.name }}">
        <div class="person-card__body">
          <h3 class="person-card__name">{{ member.name }}</h3>
          <p class="person-card__role">{{ member.position }}</p>
          {% if member.name != "Wai Tong" and member.start_date %}
            <p class="person-card__term">{{ member.start_date }} &ndash; {{ member.end_date | default: "present" }}</p>
          {% endif %}
        </div>
      </a>
    {% endif %}
  {% endfor %}
{% endfor %}
</div>

{% assign alumni_count = site.data.people | where: "alumni", true | size %}
{% if alumni_count > 0 %}
## Alumni
<div class="people-grid">
{% for member in site.data.people %}
{% if member.alumni %}
<a class="person-card person-card--alumni" href="{{ member.personal_url }}" aria-label="View {{ member.name }}'s profile">
  <img class="person-card__image" src="{{ '/assets/images/people/' | append: member.avatar | relative_url }}" alt="{{ member.name }}">
  <div class="person-card__body">
    <h3 class="person-card__name">{{ member.name }}</h3>
    <p class="person-card__role">{{ member.position }}</p>
    {% if member.start_date %}
      <p class="person-card__term">{{ member.start_date }} &ndash; {{ member.end_date | default: "present" }}</p>
    {% endif %}
  </div>
</a>
{% endif %}
{% endfor %}
</div>
{% endif %}
