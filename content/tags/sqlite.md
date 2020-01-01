---
name: SQLite
website: https://sqlite.org/index.html
---
[SQLite](https://sqlite.org/index.html) is an implementation of SQL that is designed to run in a single flat file. Due to its mostly self-contained nature it has been ported to very many systems. This has led to SQLite being by far the most [common deployed SQL database](https://sqlite.org/mostdeployed.html) in terms of the number of databases deployed using the system. SQLite is used by many applications to persist data. For example the Firefox/Chrome and Safari web browsers all use SQLite to store internal data about browsing history and various other data persistence tasks. Many other desktop applications also use SQLite and there is significant adoption in mobile apps, embedded systems and even as a core component in many operating systems.

This is quite different to some other SQL implementations that require a dedicated server to be running which accepts a connection through a network socket in order to serve SQL queries.

Due to it's extremely widespread use (caused in part by its permissive license), SQLite is a very mature SQL implementation that has an [extremely extensive test suite](https://sqlite.org/testing.html). Many classes of very obscure errors and edge cases have been handled which makes it a solid option for choosing as an engine for persisting application state.
