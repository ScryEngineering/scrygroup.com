---
name: SIMD
---
Single Instruction, Multiple Data (SIMD) is a technique that allows you to run multiple parallel computations on data via a single instruction.

This is an important optimization technique in many areas that have highly parallelizable workflows.
For example in image processing you have situations where you want to apply the same function to every pixel in an image, this would be a case where SIMD could provide a very substantial performance improvement.
