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

Sample code can be found here: https://github.com/CustomProgrammingSolutions/PythonMRO.git


## Figuring out how what method to call

In an arbitrary class hierarchy we have a graph of dependencies that overall specifies the behaviour of the classes.

When we call a method on a class we have to find some way in which we will look up which method to call.
To make this work we have to make an ordering in which we will check classes for the methods.

What we have to do is to perform a  _linearization_ of this graph to make an ordering with which the interpreter will look up the classes.

## A simple example

![Simple class hierarchy](simple.png)

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

![Diamond class hierarchy](diamond.png)

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
    def bar(self)
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

What about `c.bar()`?

```python
>>> c.bar()
"B2"
```

We can see from this that `B2` is checked first before `A` in this case. This thankfully is a deterministic situation that is goverened by Python's method resolution order.
[Since version 2.3](https://www.python.org/download/releases/2.3/mro/) Python has used the [C3 linearization algorithm](https://en.wikipedia.org/wiki/C3_linearization) to determine the order in which classes are searched.

## How to investiage the MRO

Python provides a method on the class called `__mro__` that will tell you the order in which lookups will be performed. Let's use that langauge features to see how the MRO works in these cases:

In the simple case:

```python
>>> C.__class__.mro(C)
[<class '__main__.C'>, <class '__main__.A'>, <class 'object'>]
>>> B.__class__.mro(B)
[<class '__main__.B'>, <class '__main__.A'>, <class 'object'>]
```

This is what we would expect.

The diamond case:

```python
>>> C.__mro__
(<class '__main__.C'>, <class '__main__.B1'>, <class '__main__.B2'>, <class '__main__.A'>, <class 'object'>)
```

## Monotonicity

In the case of multiple inheritance there's a subtle edge case that any sensible methor resolution strategy will have to handle.

A definition:

    A MRO is monotonic when the following is true: if C1 precedes C2 in the linearization of C, then C1 precedes C2 in the linearization of any subclass of C

The reason this matters is because we need a situation where adding any new derived class doesn't change the lookup behavior of any of the base classes it just derived from.
This property of monotonicity is very useful because otherwise we would get very annoying bugs where classes could change the behavior of other classes in a non-direct manner.
The C3 linearization that Python uses has this property.
