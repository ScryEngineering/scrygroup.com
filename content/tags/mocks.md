---
name: mocks
---
Mocking is a testing technique that replaces function calls with calls to mock functions known as "mocks".

The technique comes up in unit testing where you wish to test only a certain portion of the code.
Take for example a situation where a function calls a very expensive web API, you may wish to mock out that call to the external API and substitute in some data that the call should return instead. This can allow you to test the rest of the code paths in a function that would otherwise be untestable.

Using too many mocks or not having bigger integration tests is a liability however since it will not reveal the bugs that arise from the interactions between components. Essentially when you have too many mocks you are testing code that's not the real code anymore and the more mocks you add the more the code you are testing diverges from the real code.

Because a mock function call won't fail in the same way as a real function call you have to be very careful that the function call specification of the mock matches what the real function will accept otherwise your tests risk not testing the correct API.
