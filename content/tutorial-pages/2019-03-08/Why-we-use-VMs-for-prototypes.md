---
title: "Why we tend to use virtual machines when prototyping"
author: "Janis Lesinskis"
date: "2019-03-08"
tags:
    - Docker
    - Vagrant
    - Prototypes
    - TechnicalDebt
    - containers
draft: true
contentType: "tutorial"
---

There's quite a lot of things that have to be done when making prototypes for products, even if the code is a simple proof of concept or MVP.

At CPS we write software product prototypes mostly in VMs or containers, even if we don't deploy them in this way.
I say _software product_ here specifically, this is because for something like a data-science job we will often use a tool like jupyter-notebook for the prototyping stage _because the code is not the deliverable_.
The use of virtual machines gets developers up to speed a whole lot faster on new projects because everyone is effectively on the same type of machine now.
If you can then automate the virtual machine setup as you are creating it then you have the ability to get other people up and running much faster.
If you use this workflow you also are explicitly documenting _in a scriptable way_ what is required in order to make the product build and run, these scripts like `Dockerfile`s or `Vagrantfile`s then live in with your code and form some powerful documentation for your projects too.
We find this valuable even in situations where the end result is not run from within a VM.

For the most part we try to make a judgment call about whether or not code will be used for production. Many decisions end up being different for throwaway proof of concepts. For more complex things like proof of concept or prototyping for trade shows things can be a bit more complex. These are the sorts of code artifacts that can end up being turned into live products as a result of external (non-software) decisions.

The difficult thing is making sure that the things you do when you prototype don't damage your chances for creating a usable product unless you are explicitly trading that off for speed of delivery.


