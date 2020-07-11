---
title: "Python's data model and operators"
date: "2020-07-11"
tags:
    - python
    - software-engineering
    - classes
authors:
       - "Janis Lesinskis"
contentType: "blog"
callToActionText: "Are you working on a project that requires in depth knowledge of Python? Get in touch today."
---

I saw this post over on Linkedin:

> What do you reckon?
>
> x += -1
> or
> x -= 1
> 
> They both do the same thing in python: decrement x by 1.
>
> The first looks a lot more intuitive to me though
> 
> #python

I think what is seen to be *intuitive* will depend heavily on how much the people reading the code are familiar with [Python's data model](https://docs.python.org/3/reference/datamodel.html).

If `x` is an integer these operations will end up with the same *result*, **but** if `x` is not an integer this result doesn't have to end up the same.

The reason for this is that in the Python data model `+=` is carried out by `__iadd__` and `-=` is carried out by `__isub__`. If the class of `x` (specifically `x.__class__`) doesn't provide either `__iadd__` or `__isub__` then the Python data model will check the operators provided by the right hand side first before failing.

So consider the following example:

```python
class Example:
    def __init__(self, value):
        self.value = value
    def __iadd__(self, rhs):
        print("addition assignment")
        self.value = self.value + rhs
        return self
    def __isub__(self, rhs):
        print("subtraction assignment")
        self.value = self.value - rhs
        return self
    def __repr__(self):
        print(f"Example({self.value!r})")
```

Running this:

```python
>>> x = Example(1)
>>> x += -1
addition assignment
>>> x -= 1
subtraction assignment
```

## Designing intuitive interfaces

This is a somewhat contrived example, but it shows that these statements don't have to execute the same code.
People who's intuition is built on how the built in data types work might find behavior that's not in line with this to be confusing.
It's a good idea to consider the [principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) when designing the interface for your classes, if most of the users of your class would expect these operators to do the same thing then if you have to do otherwise it should be prominently documented as it will likely cause confusion.
