---
name: flask
website: https://flask.palletsprojects.com
---
[Flask](https://flask.palletsprojects.com) is a Python micro web framework.
It is a "micro" framework in the sense that it aims to only provide the core capabilities related to handling web requests and is deliberately un-opinionated with regards to other choices.
The goal of the project is to be minimalist in terms of what it includes, so it does not depend on any other libraries such as a database management — that are often useful, but not always required in a web development setting.
This philosophy is in contrast to [Django](https://www.djangoproject.com/), another popular Python web framework, that has a "batteries included" approach and ships with a powerful Object Relational Mapper (ORM) and other various helpful libraries, while being more opinionated in its approach.

Flask in combination with some other libraries provides you with a powerful base for building web products:

- [SQLAlchemy](https://www.sqlalchemy.org/) for interacting with SQL databases
- [Connexion](https://github.com/zalando/connexion) for creating OpenAPI web APIs

Furthermore there are web frameworks such as [Quart](https://gitlab.com/pgjones/quart) that supply a similar interface to Flask but with a fully asyncio ([ASGI](https://asgi.readthedocs.io/en/latest/introduction.html)) implementation.

We have made extensive use of Flask in various projects to create APIs using OpenAPI.
