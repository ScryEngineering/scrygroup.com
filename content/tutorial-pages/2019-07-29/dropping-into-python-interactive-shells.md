---
title: "Different ways to drop into an interactive Python shell"
authors:
    - "Janis Lesinskis"
date: "2019-07-29"
tags:
    - Python
    - Debugging
contentType: "tutorial"
callToActionText: "Have you got a project that requires in depth knowledge of Python? We'd love to hear about it so fill in the form below with some details."
hideCallToAction: false
---

When you are developing in Python it can be handy to drop into an interactive [Read Evaluate Print Loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) (REPL) shell.
Being able to drop into an interactive shell is an important debugging tool that will be extremely useful for finding
the cause, and hence fixing, some of the harder to debug issues.

There's a variety of ways in which you can work with an interactive shell with your Python code:

## Interactive mode

Perhaps the simplest way to do this is to you the `-i` command line switch to do this.

For example:

```bash
python -i my_script.py
```

This will execute `my_script.py` then drop into an interactive python REPL shell at the end of that scripts execution.

This is a nice way to do this from the command line but there's other options for invoking this from code:

## Code module

The [code module](https://docs.python.org/3/library/code.html) from the standard library gives us the tools to build
applications which provide an interactive interpreter prompt.
Specifically [`code.interact`](https://docs.python.org/3/library/code.html#code.interact) gives us a convenient way
to drop into an interactive shell:

```python
import code
code.interact(locals=locals())
```

## PDB

The Python Debugger, [PDB](https://docs.python.org/3/library/pdb.html) can give you a REPL like shell to interact with the code.
To invoke this create a breakpoint like so:

```python
import pdb
pdb.set_trace()
```

This will then pop up the debugger shell at this line where `set_trace()` is called.

## IPython

If you are using [IPython](https://ipython.org/) you have a few other options:

```python
import IPython
IPython.embed()
```

This uses [`IPython.terminal.embed`](https://ipython.readthedocs.io/en/stable/api/generated/IPython.terminal.embed.html) to
embed an IPython shell into your script.

## Other debugging tools

There's a variety of situations in which a debugging via dropping into a local interactive shell might not be possible, for example
on a headless system you won't be able to SSH in and drop into such a shell.
If you are working with tools like [Celery](http://www.celeryproject.org/) where the worker processes aren't local you might find
[python-remote-pdb](https://github.com/ionelmc/python-remote-pdb), a remote debugger equivalent of PDB useful.

If you have some other situation you may find the list of suggestions over on the Python.org wiki useful: <https://wiki.python.org/moin/PythonDebuggingTools>
