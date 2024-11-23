---
title: "Projects"
permalink: /projects/
---

Here are some of the projects that we are currently working on.

## Active Projects

<div>
{% for project in site.projects %}
  {% if project.status == "active" %}
{% assign pi_size = project.pi | size %}
<div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center">
    <strong>{{ project.title }}</strong>
      <small style="color: #646769">{{ project.start | date: "%B %Y" }} - {% if project.end %}{{ project.end }}{% else %}Present{% endif %}</small>
    </div>

    {% if pi_size > 1 %}
    <div><strong>PIs:</strong>
    {% for pi in project.pi %}
    {% assign pi_index = forloop.index %}
      {{ pi }}{% if pi_size > pi_index %}, {% endif %}
    {% endfor %}
    </div>
    {% else %}
    <div><strong>PI:</strong> {{ project.pi }}</div>
    {% endif %}
    <div>{{ project.description }}</div>

{% endif %}

</div>
{% endfor %}
</div>
