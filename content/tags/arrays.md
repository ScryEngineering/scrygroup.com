---
name: arrays
---
An array is a data structure that allows a collections of elements to be stored with each element identified by at least one array index or key.

In a language like C or C++ these arrays are allocations of raw contiguous memory that will use the size of the items to advance a pointer to the memory offset where the items start. The simplicity of these arrays leads to many issues such as the [object slicing problem](https://en.wikipedia.org/wiki/Object_slicing).

In a language like ECMAscript an Array is actually stored internally as an object and lookups are often performed by a dictionary lookup based by some form of hash table.
