---
---
listpost{
    "life":[
{% for post in site.categories.linux %}  
      "u":"{{post.url}}","t":"{{ post.title }}",
{% endfor %}
    ]



}