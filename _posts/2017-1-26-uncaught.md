---
layout: post
title: Handling 'Possibly Unhandled Rejection' in Angualr 1.6
description: "How to configure your app config to ignore this error"
modified: 2017-01-26
tags: [angular, javascript]
categories: [development]
#image:
#    feature: abstract-1.jpg
---

With the recent release of Angular 1.6, I've updated a codebase and ran into a new issue:

```
Possibly unhandled rejection: {"status":400,"statusText":"SearchCtrl._labot5d8x did not register the event: searching"}
```

![Browser console error](/images/unhandled-rejection.png)

The statusText above really isn't super important. The `Possibly unhandled rejection` is the tricky one, due to its generic-ness.

In the codebase I'm working on, this is due to various promise-helper convenience functions bootstrapping but not having a promise immediately passed through them.

This was not an issue with Angular 1.5, so it appears that 1.6 is somewhat more strict (not necessarily a bad thing at all).

Here is how to shut this off:

```javascript
app.config(['$qProvider', function($qProvider) {
     $qProvider.errorOnUnhandledRejections(false);
 }]);
 ```
 
 This was actually causing some strange behavior until added to the app config -- these console errors were not harmless. Hopefully this helps someone else.

