---
title: "A hello-world with Python packaging"
authors:
    - "Janis Lesinskis"
date: "2018-06-18"
tags:
    - Python
    - packaging
contentType: "tutorial"
callToActionText: "Have you got a project that requires in depth knowledge of python packaging or deployment? Or do you have a topic about Python packaging you would like to see a post about? We'd love to hear about it so fill in the form below with some details."
hideCallToAction: false
---

When you have used Python a lot you'll notice that you will use tools such as `pip install package_name` you are installing some python code in a way that can be imported in your project. This guide will show you how you can make your own package installable.

## Source code

The code that is used in this article is hosted up on GitHub in the [CustomProgrammingSolutions/setup.py-intro repository](https://github.com/CustomProgrammingSolutions/setup.py-intro).

In this example we are turning a relatively simple file called `greeting.py` into an installable package. This file is just the following:

```python
def hello_world():
    print("HELLO WORLD")
```

Which we want to then be able to use via an installed pacakge via `from hello_world.greeting import hello_world`.

## Python packaging

When you issue a command such as `pip install path/to/package` you are installing a package specified at that path. [The way this works internally](https://pip.pypa.io/en/stable/reference/pip_install/#usage) is that pip will go to that path and will look for a `setup.py` file which it will then execute.

Within that `setup.py` file you will need to specify a function called `setup` that will define how your package is installed.


## Filesystem conventions

For tools such as pip to work you need to follow some filesystem conversions, specifically this is what the sample repository includes:

```sh
$ tree .
.
├── hello_world
│   ├── greeting.py
│   └── __init__.py
├── README.MD
└── setup.py

```

In this structure `setup.py` must be found at the top level as pip will look here for how to install your package. It will then execute this file to install your package.

## The anatomy of setup.py

When we execute `setup.py` we are installing 