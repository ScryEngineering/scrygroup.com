---
name: numpy
website: https://numpy.org/
---
[Numpy](https://numpy.org/) is a Python library designed for scientific computing.

It contains implementations for various things that are useful for scientific computing:

- A high performance implementation for N dimensional arrays
- The ability to perform operations on these arrays with SIMD which they refer to as broadcasting
- Useful utilities for linear algebra/fourier transforms/etc

While you could use Python's built in data structures like lists for representing vectors of data when doing scientific computing work the performance would be far worse due to inefficiencies of using the built in data type for those workloads. Numpy is highly optimized for these workloads and performs well on real, non-toy, sized data.
