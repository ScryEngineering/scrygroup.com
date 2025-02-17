---
title: "Limiting the runtime of Python unit tests"
authors:
    - "Janis Lesinskis"
date: "2018-06-23"
modified: "2020-01-28"
tags:
    - python
    - testing
    - pytest
    - unit tests
contentType: "tutorial"
callToActionText: "Are you looking to improve your Python testing? Fill in the form below with some details and one of our Python experts will get back to you."
hideCallToAction: false

---

Ever needed to limit how long your unit tests can run for? Here's an easy way to do that with pytest.

There's a package called [pytest-timeout](https://pypi.org/project/pytest-timeout/) that provides utilities for limiting the time unit test cases will run for.

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

In this example if the test runs longer than 60 seconds it will be terminated.

This is useful in situations where the run time of the code must be bounded, some algorithms can run indefinitely and you may still want to test them. This gives you the ability to make sure your test suite runs properly even in these situations.

## Important note about test dependencies

One particularly annoying bug can occur when you have a test that uses the `@pytest.mark.timeout` decorator but you don't have `pytest-timeout` installed. In this case there will be nothing registered with the decorator and the tests will not time out. This failure mode can be silent too.

You must ensure that there is a handler for all tests marked with the timeout otherwise you have a bug in your testing code.
