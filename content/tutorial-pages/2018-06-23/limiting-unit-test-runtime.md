---
title: "Limiting the runtime of Python unit tests"
author: "Janis Lesinskis"
date: "2018-06-23"
tags:
    - Python
    - testing
    - pytest
    - unit-tests
contentType: "tutorial"
---

Ever needed to limit how long your unit tests can run for? Here's an easy way to do that with pytest.

There's a package called [pytest-timeout](https://pypi.org/project/pytest-timeout/) that provides a utilities for limiting the tiem unit test cases will run for.

Usage is fairly simple:

You can specify a global timeout from the command line as follows:

```sh
py.test --timeout=300
```

Or you can individually decorate the unit tests as follows:

```python
@pytest.mark.timeout(60)
def test_foo():
    pass
```

If the test runs longer than this it will be terminated.

This is useful in situations where the run time of the code must be bounded, some algorithms can run indefinitely and you may still want to test them. This gives you the ability to make sure your test suite runs properly even in these situations.