---
layout: post
title: Ionic view + Swift view demo iOS project published
description: "I published a quick project to demo a hybrid Ionic-based app sharing a view with a Swift codebase"
modified: 2019-3-09
tags: [ios]
categories: [ios]
#image:
#    feature: abstract-2.jpg
---

 As a quickie demo, I've added this project to by GitHub -- [Ionic and Swift Hybrid Demo iOS Xcode Project](https://github.com/jdodsoncollins/ionic-swift-navigation) 

I've published this becuase it is a concise demo of the following scenario:
- You have an iOS app written in Swift
- You want to specify *one view* in the otherwise vanilla Swift + Xcode storyboard app to be controlled by an Ionic TypeScript + Angular app
- You want to be able to freely navigate between the swift view(s) and the [Ionic v4](https://ionicframework.com/docs)-based view (becuse of couse you'd want navigation to work within the app and appear seamless)

I couldn't find any existing guides covering this particular scenario but its a pretty compelling use-case for teams wanting to create mobile apps that leverage a hybrid webview in an existing native codebase.

It uses [Ionic Capacitor](https://capacitor.ionicframework.com) to leverage some `UINavigation` native API hooks to be called within the Ionic Angular App

<img src="/images/hybrid-demo.gif" alt="Hybrid Demo Gif" style="max-width: 300px; height: auto; display: block; margin: 10px auto;" alt="Codable screenshot" class="image-md drop-shadow padding-none margin-sm">