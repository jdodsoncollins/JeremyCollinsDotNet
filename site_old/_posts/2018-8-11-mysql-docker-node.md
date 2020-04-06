---
layout: post
title: Node OAuth Starter Project uploaded
description: "This is a starter back-end project that incorporates the following frameworks and libraries to build a OAuth 2 server"
modified: 2018-08-11
tags: [node, docker, web]
categories: [development]
#image:
#    feature: abstract-5.jpg
---

I want to highlight my terribly-named recent GitHub project "TypeScript-Docker-Node-DI-Starter", which is meant to combine a stack I've become familiar with, but where each component requires some labor to start fresh with.

These are:
- Docker
- MySQL in a docker container
- Node/express, with a persisted connection to be above
- TypeScript as the languge for the node project, compiling via npm scripts
- An ORM for MySQL entities
- OAuth tables, a user table, and fully functional Oauth login flow
- Dependency Injection
- A suite of npm scripts and other minor depedenices in the package.json, for convenience

The OAuth implementation is clean, and relies on no existing "All in one" dependencies (just bcrypt and token generators)

I hope this can help someone, just from a standpoint of delivering a boilerplate that no single tutorial online assembles.

[View on GitHub](https://github.com/jdodsoncollins/TypeScript-Docker-Node-DI-Starter)
