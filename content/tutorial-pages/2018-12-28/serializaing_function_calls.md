---
title: Serializing the state of a function call"
authors:
    - "Janis Lesinskis"
date: "2018-12-28"
tags:
    - Python
    - introspection
    - serialization
contentType: "blog"
callToActionText: "Are you looking to improve the architecture of your Python programs? Fill in the form below with some details and one of our Python experts will get back to you."
hideCallToAction: false

---

It comes up occasionally that you want to serialize the state of a function call. For example in the Persephone project we have a few situations where recording the state of a function call is important for reproducible research as results can only be verified by being rerun.

## Serializing the state of the code

The first challenge is getting a snapshot of the code that was executed at the time. A good choice here is to refer to a Git commit with a SHA hash of the code that's being used. This is possible if you use Git and you are running the code from a Git repository.

If you have an installed package perhaps you can access the version of the package and store that.

## Serializing a function call

The simplest case is where you have a single function call that you wish to serialize the local state of.

```python
def some_func(msg:str="message", repeat=1, *, padding=0):
    s = msg*repeat
    return s.ljust(padding)
```
