---
layout: post
title: Reading content strings inside Angular 2 components through a component element attribute
description: "How to transfer an external content string into an Angular 2 component"
modified: 2017-01-24
tags: [angular, angular2]
categories: [development]
#image:
#    feature: abstract-2.jpg
---

This is a fairly specific need, but one which comes up when working with web application that are not entirely API-driven.

Say you're in this scenario:

- Your angular 2 app sits on top of some back-end system (maybe some PHP framework with a templating engine)
- You have a specific string or JSON blob of data you need to bootstrap into your Angular 2 application, but it isn't available via AJAX
- The most practical thing to do is to print it on the DOM and have Angular 2 pull it in through a component's HTML attribute

This seems to not be documented well elsewhere, so here is how the above can be approached.

1) Print non-angular string/JSON into a component's HTML attribute

```
<my-ng2-component my-attribute='<?php json_encode($dataBlob, JSON_HEX_QUOT | JSON_HEX_APOS)?>' ></my-ng2-component>
```

2) Import the DOM parsing tools for Angular 2 -- *ElementRef and BrowserModule* and properly use it in the component's constructor

```javascript
import { Component, NgModule, Input, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

@Component({
    selector: 'my-ng2-component',
    template: require('.myTempalte.html'),
    styles: [ require('.myStyle.scss') ]

})

export class MyNg2Component {
    constructor (
        private elementRef: ElementRef
    ) {   
        this.myData = JSON.parse(this.elementRef.nativeElement.getAttribute("myAttribute"));
    }

    // pther methods go here 
}
```

The JSON from a non-angular source should now be passed into the ng2 component and properlty parsed.
