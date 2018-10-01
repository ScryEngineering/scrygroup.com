---
title: "Method resolution in Python"
authors:
    - "Janis Lesinskis"
date: "2018-09-30"
tags:
    - Python
    - OOP
    - implementation-details
    - inheritance
    - MRO
contentType: "tutorial"
callToActionText: "Have you got a project that requires in depth knowledge of implementation details? Or do you have a topic about Python internals you would like to see a post about? We'd love to hear about it so fill in the form below with some details."
hideCallToAction: false
---

Wondered how Python chooses what method to call in complex class hierarchies?

## A simple example

```python
"""Example of a simple class hierarchy"""

class A:
    def foo(self):
        print("A")

class B(A):
    def foo(self):
        print("B")

class C(A):
    pass

a = A()
a.foo()
b = B()
b.foo()
c = C()
c.foo()
```

When run this gives the following:

```
A
B
A
```

This is mostly what you'd expect, the derived classes are looked up first and any method not implemented is then searched for in the base class.

## A more complex example

In a simple linear structure the lookup goes from the derived class all the way to the base class. If the method is not found at the time the base class is searched you will get an `AttributeError` when the method can't be found.

What about the classic non-linear structure that causes problems, [the diamond class hierarchy](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem).

There's more than one path to get to the base class, we have to resolve this somehow.

```python
"""Example of a diamond multiple-inheritance class hierarchy"""

class A:
    def foo(self):
        print("A")

class B1(A):
    def foo(self):
        print("B1")

class B2(A):
    def foo(self):
        print("B2")

class C(B1, B2):
    pass

a = A()
a.foo()
b1 = B1()
b1.foo()
b2 = B2()
b2.foo()
c = C()
c.foo()
```

When we run this we get:

```
A
B1
B2
B1
```

We can see that this has resolved the call to `c.foo()` to `B1.foo` over `B2.foo`.

This thankfully is a deterministic situation that is goverened by Python's method resolution order.

[Since version 2.3](https://www.python.org/download/releases/2.3/mro/) Python has used the [C3 linearization algorithm](https://en.wikipedia.org/wiki/C3_linearization) to determine the order in which classes are searched.

## How to investiage the MRO

Let's use the langauge features to see how the MRO works in these cases:

In the simple case:

```python
C.__class__.mro(C)
B.__class__.mro(B)
```