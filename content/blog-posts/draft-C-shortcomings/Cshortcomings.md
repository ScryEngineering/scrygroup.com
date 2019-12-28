
Honestly towards the end of 2019 I think using C for a new project is mostly going to be a poor choice for most projects.

Here's why I think this.

Every so often I run into someone who says they are making some sort of new project in C, and they will often give some reasons  why they think this is a good idea.

Most of the reasons I encounter come down the the enjoyment of the developers.

After using some other language, particularly some of the more bloated ones coming back to using C seems like such a change.
The C language is fairly minimal in terms of the language specification and it's fairly easy to get the whole language syntax and rules in your mind at once. Compare this with a nightmare of complexity like C++ or some other languages and this simplicity seems like a minimialist breath of fresh air.

It feels like you are able to understand exactly what's going on at a low level. In some microcotrollers work this is the case, but in something like desktop apps running on x86 this is an illusion.

Furthermore there's all those things that aren't actually supported all that well in C that you end up having to re-write.
But this can be deceiving, when you are working on some production project that has any significant amount of complexity you start to see the pain points only later on in the process.


[The Unix C library API can only be reliably used from C](https://utcc.utoronto.ca/~cks/space/blog/unix/CLibraryAPIRequiresC)

The main issue with using C is that it's a system that, for economic reasons, is often very expensive to develop things in.

You can sometimes cut these costs back by cutting corners.
For example, you might have poor security, poorly managed memory, random crashes, etc. All of these things will let you get something done in C without it takeing too much time.


One of the biggest concerns I have about writing programs in C is that many people don't realize what they are giving up on.
Sure you might see something that 