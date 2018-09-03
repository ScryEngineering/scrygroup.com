---
title: "A tour of dir: __code__"
date: "2018-08-30"
tags:
- python
- metaprogramming
- CPython
- python-internals
contentType: "tutorial"
callToActionText: "Need help with a Python project? Or do you have something you'd like to see us write about? Fill in the form below with some details so we can discuss where to go next."
hideCallToAction: false
---

Ever wondered what the `__code__` method is when you have `dir`ed someting in Python?

```python
>>> def example(a:str, b:int=1, *, name:str):
...    """An example function to illustrate some features of __code__"""
...    res = name
...    for _ in range(b):
...        res += a
...    return res
... 
>>> dir(example)
['__annotations__', '__call__', '__class__', '__closure__', '__code__', '__defaults__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__get__', '__getattribute__', '__globals__', '__gt__', '__hash__', '__init__', '__kwdefaults__', '__le__', '__lt__', '__module__', '__name__', '__ne__', '__new__', '__qualname__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__']
```

You are probably familiar with some of these already, especially the ones that are part of the standard python data model.
Let's have a look through the `__code__`.

## What's in the code dunder method? 

```python
>>> dir(example.__code__)
['__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__le__', '__lt__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 'co_argcount', 'co_cellvars', 'co_code', 'co_consts', 'co_filename', 'co_firstlineno', 'co_flags', 'co_freevars', 'co_kwonlyargcount', 'co_lnotab', 'co_name', 'co_names', 'co_nlocals', 'co_stacksize', 'co_varnames']
```

This provides some information about the code object that this function defines. We will go through some of these in groups of what they do.

## Function argument related

There's `co_argcount` and `cokwonlyargcount` that will give you information about the function arguments:

```python
>>> example.__code__.co_argcount
2
>>> example.__code__.co_kwonlyargcount
1
```

If we wanted some information about the annotations here we would look over in `__annotations__`

```python
>>> example.__annotations__
{'b': <class 'int'>, 'a': <class 'str'>, 'name': <class 'str'>}
```

This is pretty much what we would expect to see here.

## Function name

Say you wanted to find the name of the function that your code was executing with.

There's ways you could try to do this in source, take for example:

```python
>>> def test():
...   print("This function is test")
...
>>> test()
this function is test
```

So far this looks like it might work. But functions are first class in Python and can be assigned to new variables:

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

This is useful for a variety of things, generally speaking you don't need this except in some circumstances. Say we wanted to find the name of the function that we were in without having to 

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

## Compilation information, co_flags

If you look at

```python
>>> example.__code__.co_flags
67
```

You'll see a number that's created from the following bitmask:

```python
>>> import dis
>>> dis.COMPILER_FLAG_NAMES
{16: 'NESTED', 1: 'OPTIMIZED', 2: 'NEWLOCALS', 4: 'VARARGS', 32: 'GENERATOR', 8: 'VARKEYWORDS', 64: 'NOFREE', 128: 'COROUTINE', 256: 'ITERABLE_COROUTINE'}
```

In this case `67 = 1+2+64` so we know that that is `'NESTED'`, `'OPTIMIZED'`, and `'VARKEYWORDS'`

You can also see this from:

```python
>>> dis.show_code(f)
Name:              f
Filename:          <stdin>
Argument count:    0
Kw-only arguments: 0
Number of locals:  0
Stack size:        1
Flags:             OPTIMIZED, NEWLOCALS, NOFREE
Constants:
   0: None
```

You might be wondering where the constant `O: None` is coming from, it's because Python functions that don't have a return statement return `None`.

If for example we had a generator we would have the following:

```python
>>> def gen_example():
...     for a in range(5):
...         yield a
... 
>>> gen_example.__code__.co_flags
99
>>> dis.show_code(gen_example)
Name:              gen_example
Filename:          <stdin>
Argument count:    0
Kw-only arguments: 0
Number of locals:  1
Stack size:        2
Flags:             OPTIMIZED, NEWLOCALS, GENERATOR, NOFREE
Constants:
   0: None
   1: 5
Names:
   0: range
Variable names:
   0: a
```

## what variables exist in the function

The code object gives you the ability to get some information about variable names contained within the function that is defined.

co_varnames # local variable names

co_names # global names used in the function

```python
a = 1
b = "b"

def f():
    c = a * b

print("f.__code__.co_varnames")
print(f.__code__.co_varnames)
print("f.__code__.co_names")
print(f.__code__.co_names)
print("f.__code__.co_nlocals")
print(f.__code__.co_nlocals)
```

This prints out:

```sh
f.__code__.co_varnames
('c',)
f.__code__.co_names
('a', 'b')
f.__code__.co_nlocals
1
```

So this lets you know how many local variables exist via `co_nlocals` and the names of those local variables in `co_varnames`. We can also see which global variables the function references `co_names`.

TODO: discuss the zombie frames and free mechanism.


## Function definiton file and location

