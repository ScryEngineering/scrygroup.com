---
title: "A couple of questions about mypy"
author: "Janis Lesinskis"
date: "2018-07-20"
tags:
    - python
    - mypy
    - testing
    - mocks
contentType: "blog"
---

Last night Robbie Clarken presented a great talk about Mocking and how it fits in with testing in general.

There were a few questions he had over email about mypy and instead of just answering via email we figured that there's some value in this to the wider audience.

<!-- end excerpt -->

## mypy background

There's a package called [mypy](http://mypy-lang.org/) that does static type checking analysis for Python.
We particularly like using this at CPS because some bugs get caught by our CI pipeline that would have otherwise slipped though the unit tests.
This has saved us a large amount of debugging time and has improved the correctness of our programs without costing us much at all.
It fits in with our overall approach of having multiple lines of defense as no one methodology will catch everything.


All the example code in this post can be found over on our GitHub repo: <https://github.com/customprogrammingsolutions/mypy_mocks>

Here are the questions that Robbie was interested in:

### Question 1 - type checking an instance variable

What does mypy report here?

```python
class Item:
   def __init__(self, price: float):
       self.price = price

item = Item(price=1.5)
item.price + "abc"
```

Mypy output:

```
examples/question1.py:3: error: The return type of "__init__" must be None
examples/question1.py:7: error: Unsupported operand types for + ("float" and "str")
```

So it does correctly catch that you can't add a string to a float. So in this case if you knew you needed the price to be a float and only a float this would catch a large number of bugs essentially for free from your CI pipeline.
It also complains that the return type of `__init__` must be `None`, we can fix that as follows:

```python
class Item:
   def __init__(self, price: float) -> None:
       self.price = price
```

The reason this is the case is that any function that does not have a return value actually returns `None`.

```python
>>> def no_return():
...     pass
... 
>>> type(no_return())
<class 'NoneType'>
```

Since returning from `__init__` is not allowed the return type must be `None`.

### Question 2 - type checking a forwarded function

Forwarding of arguments is an area that can make it harder to test, consider this situation:

```python
def outer(**kwargs):
   inner(**kwargs)

def inner(num: float):
   print(num * 2)

outer(num="abc")
```

On a first run of mypy this provides no feedback. This might not be what [you'd expect](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).

The reason is because there's type annotations on `outer` so mypy ignores this function for it's analysis.
For reasons of backwards compatibility the default behavior of mypy is to not type check un-annotated functions.
If you don't want this to silently pass you can use the `--disallow-untyped-calls` command line option for mypy:

```
examples/question2.py:8: error: Call to untyped function "outer" in typed context
```

Now we see we got the feedback we expected there.

But how to make this actually work?

One thing we can do is to mark the type of the `kwargs` if they are all homogenous as follows:

```python
def outer(**kwargs: float):
    inner(**kwargs)

def inner(num: float):
    print(num * 2)

outer(num="abc")
```

To which mypy will give the following:

```
examples/annotating_kwargs.py:11: error: Argument "num" to "outer" has incompatible type "str"; expected "float"
```

Now if the arguments are not homogenous because we are using function dispatch as a form of method overloading we need to annotate differently.

Consider if there's 2 different functions for inner that we want to call based on the type passed, say one for floats but a different one for lists:

```python
def outer(**kwargs: float):
    inner(**kwargs)

def inner_lists(num: List[float]):
    for item in num:
        print(num * 2)

def inner_floats(num: float):
    print(num * 2)

outer(num="abc")
```