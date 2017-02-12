---
layout: post
title: Unable to scroll in modal in Safari
description: "How to resolve the Safari behavior of being unable to scroll in modal with animation"
modified: 2017-02-11
tags: [heroku]
categories: [development]
#image:
#    feature: abstract-5.jpg
---

If you are struggling to find the cause for Safari not allowing scrolling on a modal, check if you're using this CSS animation:

```
animation: drop .5s;

```

I was struggling for a little while over why a modal that popped in using CSS animations would not scroll in Safari (but would briefly be scrollable before the first .5 seconds I noticed).

Apparently its a Safari behavior (bug?) that causes content to be un-scrollable if the `animation` property applied to it has run. Removing this property fixed the issue with scrolling in the modal. This does not impact Chrome or Firefox.
