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

    <!-- <a href="{{ project.url }}"> -->
       <strong>{{ project.title }}</strong>
    <!-- </a> -->
      <small style="color: #646769">{{ project.start | date: "%B %Y" }} - {% if project.end %}{{ project.end }}{% else %}Present{% endif %}</small>
    </div>

    <small>{{ project.pi | join: ", " }}</small>
    <div>{{ project.description }}</div>
</div>
{% endif %}

{% endfor %}
</div>
