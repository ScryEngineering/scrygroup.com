---
title: "Finding the name of a Python function"
date: "2018-08-30"
tags:
- python
- metaprogramming
contentType: "tutorial"
callToActionText: "Need help with a Python project? Or do you have something you'd like to see us write about? Fill in the form below with some details so we can discuss where to go next."
hideCallToAction: false
---


Say you wanted to find the name of the function that your code was executing with.

This can come up in a variety of circumstances, 

For example say you want some information about what function was called.

There's ways you could try to do this in source, take for example:

```python
>>> def test():
...   print("This function is test")
... 

>>> test()
this function is test
```

So far this looks like it might work. But functions are first call in Python and can be assigned to new variables:

```python
>>> foo = test
>>> foo()
this function is test
```

This still tells us which function defined the code works but we had to put a print statement into the function, this isn't very easy to actually access from other code though.

Try this:

```python
>>> import inspect
>>> print(inspect.currentframe().f_code.co_name)
<module>
```

`inspect.currentframe()` will give you information about the current frame of evaluation in Python.

This is useful for a variety of things, generally speaking you don't need this except in some circumstances

```python
>>> def test():
...   print(inspect.currentframe().f_code.co_name)
... 
>>> test()
test
>>> foo = test
>>> foo()
test
```

So we can see that we get access to the name of the function "test" from within the function even if it is re-assigned to a different name.

We can see here that `co_name` is invariant. This is useful if you need to analyse the source code for a function.


What about wrappers though?

