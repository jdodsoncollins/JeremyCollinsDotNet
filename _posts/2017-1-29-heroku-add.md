---
layout: post
title: Heroku error after adding keys
description: "How to resolve the 'Post https://api.heroku.com/login: x509: certificate signed by unknown authority
' Heroku error when adding keys"
modified: 2017-01-29
tags: [heroku]
categories: [development]
#image:
#    feature: abstract-4.jpg
---

When setting up Heroku on a new machine, I ran into this error after running `heroku keys:add`:

```
Post https://api.heroku.com/login: x509: certificate signed by unknown authority

```


<img src="/images/unknown-authority.png" alt="Post https://api.heroku.com/login: x509: certificate signed by unknown authority" class="image-md">

The solution is to run the following:

```
HEROKU_SSL_VERIFY=disable heroku login
```
