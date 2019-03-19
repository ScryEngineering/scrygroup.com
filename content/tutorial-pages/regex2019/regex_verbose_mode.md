---
title: "How verbose mode makes your regex more easy to use"
authors:
    - "Janis Lesinskis"
date:
tags:
    - Python
    - Regex
contentType: "tutorial"
callToActionText: "Have you got a project that requires in depth knowledge of regex? We'd love to hear about it so fill in the form below with some details."
hideCallToAction: false
---

Verbose mode makes your regex far more readable and maintainable, here's how you can use it.

<!-- end excerpt -->

Before I found out about the verbose mode that is offered in Python I was always far more hesitant to use regex due to issues with readability.

Let's look at an example, parsing emails with regex. For some example text lets use [Office Ipsum](http://officeipsum.com/) with a sprinkling of emails and not-quite-emails:

```python
office_ipsum = """
It's a simple lift and shift job. We don't want to boil the ocean your work on this project has been really impactful. Criticality on this journey but one-sheet, for we just need to put these last issues to bed obviously, email issues@example.com. Locked and loaded organic growth@10%. Wheelhouse out of scope. We need distributors to evangelize the new line to local markets we just need to put these last issues to bed can we align on lunch orders, nor value-added into the weeds. Fire up your browser. Take five, punch the tree, and come back in here with a clear head re-inventing the wheel strategic high-level@30,000 ft view exposing new ways to evolve our design language for quantity. Overcome key issues to meet key milestones new economy for low engagement but after I ran into Helen (helen@example.com) at a restaurant. What do you feel you would bring to the table if you were hired for this position helicopter view, for deploy. Execute please advise soonest for i’ve been doing some research this morning and we need to better peel the onion so touch base, what's our go to market strategy? imagineer. Closing these latest prospects is like putting socks on an octopus. Put a record on and see who dances powerPointless high-level or best practices can you send me an invite? (list@invites.example.com). Thought shower low-hanging fruit. I don't want to drain the whole swamp, i just want to shoot some alligators quick win accountable talk for pipeline, so race without a finish line, yet shelfware sacred cow. Punter forcing function . Low-hanging fruit. When does this sunset?
"""
```

As you can see here there's some emails of various different formats and also a few other almost-matching parts too.

(Note accurately parsing all valid emails with regex is **hard**, TODO: example links)