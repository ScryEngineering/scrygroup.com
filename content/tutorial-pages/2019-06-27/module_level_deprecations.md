---
title: "Deprecating module level variables"
authors:
    - "Janis Lesinskis"
date: "2019-06-27"
tags:
    - Python
    - package-maintenance
    - deprecation
contentType: "tutorial"
callToActionText: "Have you got a project that requires in depth knowledge of Python? We'd love to hear about it so fill in the form below with some details."
hideCallToAction: false
---

A good strategy when managing your packages is to have a strategy for deprecations.

Python makes this fairly easy with classes and functions.

Take for example the following function:


Version 1.0
```python
def some_function():
   return "Works fine now" 
```

Version 1.1
```python
import warnings
def some_function()
    """This will be removed in version 1.2"""
    return "Still works but going away soon"
```

Then in version 1.2 this is gone.


However imagine you have a module like this

```python
"""This module does some things"""

TOP_LEVEL = ...
```

Deprecating the `TOP_LEVEL` variable is a bit harder.

See PEP for details

