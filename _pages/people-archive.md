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

<div style="display: flex; flex-wrap: wrap; gap: 1em">
{% for position in position_order %}
  {% for member in sorted_members %}
    {% if member.position == position and member.alumni != true %}
      <div style="display: flex; flex-direction: column; width: 8.5em; font-size: 0.8rem">
          <a href="{{ member.personal_url }}">
          <img src="/assets/images/people/{{ member.avatar }}" alt="{{ member.name }}" style="width: 8.5em; height: 8.5em; object-fit: cover;">
              <div>
              {{ member.name }}
              </div>
          </a>
          <small>
            {{ member.position }}
          </small>
      </div>
    {% endif %}
  {% endfor %}
{% endfor %}
</div>

{% assign alumni_count = site.data.people | where: "alumni", true | size %}
{% if alumni_count > 0 %}
## Alumni
<div style="display: flex; flex-wrap: wrap; gap: 1em">
{% for member in site.data.people %}
{% if member.alumni %}
<div style="display: flex; flex-direction: column; width: 8.5em; font-size: 0.8rem">
    <a href="{{ member.personal_url }}">
    <img src="/assets/images/people/{{ member.avatar }}" alt="{{ member.name }}" style="width: 8.5em; height: 8.5em; object-fit: cover;">
        <div>
        {{ member.name }}
        </div>
    </a>
    <small>
      {{ member.position }}
    </small>
</div>
{% endif %}
{% endfor %}
</div>
{% endif %}
