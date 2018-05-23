---
title: "Renaming Git branches"
author: "Janis Lesinskis"
date: "2018-05-24"
tags:
    - git
contentType: "tutorial"
---

I've spent a few days in a cold office And one thing I notice is that I'm making a lot more typo's when it's cold .

Some one particularly cold day (it was 13 degrees inside) I was working away on fixing some bugs in a branch on Git. I ended up solving the issue and wrote a test case that covered it in case there was a future regression. As I was about to push the changes I noticed a spelling mistake.

```sh
git push origin bugifx-serialization
```

While I could have just pushed this up and merged it I really don't like pushing branch names with typo's.
There's a level of attention to detail that's really crucial with software development work and things like this matter.

Because I haven't pushed changes there's a really quick fix for this:

```sh
git branch -m bugifx-serialization bugfix-serialization
```

Done!

In this case the `-m` is short for `--move`, like the `mv` command in the shell enables you to rename files by "moving" them this allows you to rename branches.
