---
title: "People"
permalink: /people/
---

We're looking for 1-2 PhD students passionate about data visualization, AR/VR, and human-computer interaction to join VVAI Lab in Fall 2025. If you're ready to push the boundaries in these fields, please email your CV!

Please also complete the expression of interest form [https://forms.gle/z3ynVaXrZtsHTVqx8](https://forms.gle/z3ynVaXrZtsHTVqx8) if you are interested!

## Current Members
<div style="display: flex; flex-wrap: wrap; gap: 1em">
{% for member in site.data.people %}
{% if member.alumni != true %}
<div style="display: flex; flex-direction: column; width: 8.5em;">
    <a href="{{ member.personal_url }}">
    <img src="{{ member.avatar }}" alt="{{ member.name }}" style="width: 8.5em; height: 8.5em; object-fit: cover;">
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

{% assign alumni_count = site.data.people | where: "alumni", true | size %}
{% if alumni_count > 0 %}
## Alumni
<div style="display: flex; flex-wrap: wrap; justify-content: center;">
{% for member in site.data.people %}
{% if member.alumni %}
<div style="display: flex; flex-direction: column; align-items: center;">
    <a href="{{ member.personal_url }}">
    <img src="{{ member.avatar }}" alt="{{ member.name }}" style="width: 8.5em; height: 8.5em; object-fit: cover; border-radius: 50%;">
    </a>
    <a href="{{ member.personal_url }}">
        <div>
        {{ member.name }}
        </div>
    </a>
    <div>
      {{ member.position }}
    </div>
</div>
{% endif %}
{% endfor %}
</div>
{% endif %}
