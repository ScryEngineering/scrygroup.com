---
name: merkle tree
---

A [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) is a data structure that stores cryptographic hashes in a tree.
Storing hashes in a tree in such a manner allows you to see if a leaf node is part of a hash tree in an efficient manner.
Such a structure allows for efficient and secure verification of the contents of large data structures, something that would be far less efficient than if you had to always hash the complete data every time.
