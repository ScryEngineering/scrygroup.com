---
title: "Running pip as a Python module"
authors:
    - "Janis Lesinskis"
date: "2019-11-03"
tags: 
    - python
    - pip
    - paths
    - package management
contentType: "blog"
callToActionText: "Are you working on a project that requires in depth knowledge of Python? Get in touch today."
---

Since Python 3.4 you have been able to run pip as though it were a Python module, this actually prevents a variety of annoying issues from occurring.

<!-- end excerpt -->

Last weekend I was helping run a Python workshop and one of the technical people helping me out ran into a fairly bizarre installation issue with her environment.
`conda install` was working but `pip install` was failing.

Basically the very quick summary is that her pip command was pointing to a different Python installation than the Python that was on the command line path. These sorts of mismatches with the path can lead to some very strange installation issues. I think this is another good example of why always using environments that are not the system Python is a good idea. By not installing into the base Python we prevent a variety of issues like this.

Because I was short on time, due to running a technical workshop, I just went for the safe option of using `python -m pip` to invoke pip. This will ensure that the path is the same for both `python` and `pip` (unless something very pathological is going on, in which case I'd say your install is truly broken).
This was probably a better approach than trying to fix up all the system paths given the limited time.
There's [other people who agree](https://github.com/pypa/warehouse/issues/1563) and a [great blog post that explains why you should prefer this](https://snarky.ca/why-you-should-use-python-m-pip/).

The reason I figured I should make a blog post about this is because not a lot of people are aware that they can run modules from the command line with `python -m`.
This can be useful in many situations, specifically I find I use `python -m pytest` relatively often in a few projects.
The docs for this command line options can be found [here](https://docs.python.org/3/using/cmdline.html#cmdoption-m).
Once upon a time you couldn't run pip like this since pip is a separate project and hence wasn't available as a Python module in a standard install.
While pip is still separate from the main Python project, in the sense that it has different release schedules and a different source tree of code behind it, these days you can still run pip via `python -m pip`.
Specifically [PEP 453](https://www.python.org/dev/peps/pep-0453/) came about to make sure that `pip` could be run via python as though it were a module.
If you are interested in learning more about why this was done I'd recommend reading that PEP and about [ensurepip](https://docs.python.org/3/library/ensurepip.html).
