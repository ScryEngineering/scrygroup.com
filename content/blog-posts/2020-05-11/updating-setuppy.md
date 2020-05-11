---
Title: "Updating your setup.py files to the newer format"
Date: "2020-05-11"
Tags:
    - python
    - software-engineering
    - packaging
    - modules
    - setuptools
    - pip
    - metadata
    - parsing
authors:
       - "Janis Lesinskis"
contentType: "blog"
---
One of the not so nice things about legacy installable python packages is the executable nature of setup.py files. This means amongst other things that you can't reliably determine the contents of some setup.py files without arbitrary code execution. This is what led to [PEP 518](https://www.python.org/dev/peps/pep-0518/) which specified a declarative metadata format that can be stored in easy to parse file. Updating is a pain though, but thankfully there's some tooling that makes this easier as I found out recently.

<!-- end excerpt -->

One of the really annoying things about the older way of making installable Python packages is the executable nature of the setup.py format. One of the big downsides to this is that you have to execute the file to find out what the installed package will end up being. The other big downside is that you end up with a significantly more annoying file format to parse if you have tooling that wants to see what installed packages are looking like *without* having to install them first.

Over time setup.py files have come to contain more and more metadata options, these are versioned such as those from [v1.0 in PEP 241](https://www.python.org/dev/peps/pep-0241/) followed by [v1.1 in PEP 314](https://www.python.org/dev/peps/pep-0314/) and [v1.2 PEP 345](https://www.python.org/dev/peps/pep-0345/ ). These contain data that is of interest for users of the libraries.
Parsing this information has become more of a noticeable point of friction as time has gone on because while a project might have arbitrary code execution in the setup.py this may not necessarily influence metadata entries that are just statically defined strings but it will make parsing those strings far more annoying. These annoyances led to [PEP 518](https://www.python.org/dev/peps/pep-0518/) which officially specified a declarative metadata format for Python package installations in pyproject.toml (thanks [Rust](https://www.rust-lang.org/) for the inspiration with [cargo](https://doc.rust-lang.org/cargo/)!). This is a significant improvement of ergonomics with regards to parsing the data and honestly is the way you should be starting new projects these days.

Say you have a lot of old packages that you wish to update then you may find some value in the [setup.py upgrade tool](https://github.com/asottile/setup-py-upgrade). This tooling will attempt to automatically convert the contents of your setup.py file to the newer metadata format.

You can install this with:

```
pip install setup-py-upgrade
```

Where this works automatically it is a massive time saver. This will not necessarily work on all projects however, again due to the difficulties introduced by the ability to have arbitrary executable code in setup.py files. For example the persephone project has a *tiny* bit of executable code in it's setup.py as of version 0.4.2:

```python
setup(name='persephone',
      version='0.4.2',
      description='A tool for developing automatic phoneme transcription models',
      long_description=open('README.rst', encoding="utf8").read(),
```

Which results in the following issue when you try to run the tool:

```bash
~/persephone (master)$ setup-py-upgrade .
Traceback (most recent call last):
  File "/home/janis/persephone/venv/lib/python3.6/site-packages/setup_py_upgrade.py", line 126, in visit_Call
    value = ast.literal_eval(kwd.value)
  File "/usr/lib/python3.6/ast.py", line 85, in literal_eval
    return _convert(node_or_string)
  File "/usr/lib/python3.6/ast.py", line 84, in _convert
    raise ValueError('malformed node or string: ' + repr(node))
ValueError: malformed node or string: <_ast.Call object at 0x7f2d3ae15080>

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/janis/persephone/venv/bin/setup-py-upgrade", line 11, in <module>
    sys.exit(main())
  File "/home/janis/persephone/venv/lib/python3.6/site-packages/setup_py_upgrade.py", line 168, in main
    visitor.visit(tree)
  File "/usr/lib/python3.6/ast.py", line 253, in visit
    return visitor(node)
  File "/usr/lib/python3.6/ast.py", line 261, in generic_visit
    self.visit(item)
  File "/usr/lib/python3.6/ast.py", line 253, in visit
    return visitor(node)
  File "/usr/lib/python3.6/ast.py", line 263, in generic_visit
    self.visit(value)
  File "/usr/lib/python3.6/ast.py", line 253, in visit
    return visitor(node)
  File "/home/janis/persephone/venv/lib/python3.6/site-packages/setup_py_upgrade.py", line 128, in visit_Call
    raise NotImplementedError(f'unparsable: {kwd.arg}=')
NotImplementedError: unparsable: long_description=
```

This wouldn't be a big deal to fix by hand, but it hints strongly at the limitations that are introduced by having executable code in your setup.py files. Overall I think the behavior of the tool is reasonable here since it is not executing any code and is just determining what to do by parsing the abstract syntax tree that it finds in the setup.py file using the [`ast` module](https://docs.python.org/3/library/ast.html).
