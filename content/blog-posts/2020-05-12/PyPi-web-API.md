---
title: "PyPi web API"
authors:
       - "Janis Lesinskis"
date: "2020-05-12"
tags:
    - Python
    - pip
    - PyPi
    - metadata
    - packaging
contentType: "blog"
---

One of those things that comes up from time to time is that you want to be able to find out some information about a package on [PyPi](https://pypi.org/). It turns out that PyPi offers a web <abbr title="Application programming Interface">API</abbr> with super easy to parse <abbr title="JavaScript Object Notation">JSON</abbr> output.

Take for example the Persephone project that I was contributing to:
https://pypi.org/pypi/persephone/json

If we go to that URL we can see all the metadata about what was uploaded to PyPi, very useful. We could for example check to see what the most recent version on PyPi is:

```python
>>> import requests
>>> r = requests.get('https://pypi.python.org/pypi/persephone/json', timeout=1)
>>> most_recent_pypi_version = r.json()['info']['version']
>>> print(most_recent_pypi_version)
0.4.2
```

As you can see this is a fairly useful way to do things that require information about recent versions. For example you can use this to make <abbr title="Command Line Interface">CLI</abbr> scripts that will inform the user if there's an update available.
