---
title: "Happy leap day!"
date: "2020-02-29"
tags:
    - software-engineering
    - dates
    - datetime
    - intercalations
    - time
authors:
    - "Janis Lesinskis"
contentType: "blog"
callToActionText: "Does your project have any subtle time and date bugs? Get in contact with us "
---

Happy Leap day!

Today we celebrate keeping the astronomical year in line with the calendar year by [inserting an extra day](https://en.wikipedia.org/wiki/Intercalation_(timekeeping)) into our calendars.
Now with modern clocks we go a bit further in our desire to try to line up the start of the calendar year with the astronomical year by adding in [leap seconds](https://en.wikipedia.org/wiki/Leap_second) as well.

Today is the 29th of February, the day where if you hard-coded that February always has 28 days or that the year is 365 days long your programs break (adding 365 days to get a 1 year time delta on the calendar comes to mind). Many programs make incorrect assumptions about the calendar that infrequent events such as this expose.

Here's the algorithm to determine if a year is a leap year:

```
if (year is not divisible by 4) then (it is a common year)
else if (year is not divisible by 100) then (it is a leap year)
else if (year is not divisible by 400) then (it is a common year)
else (it is a leap year)
```

A lot of people get this calculation with dates semi-correct, which means that lots of edge case bugs will occur. Perhaps my favorite example of this is how [Lotus 1-2-3](https://en.wikipedia.org/wiki/Lotus_1-2-3) miscalculated 1900 to be a leap year and then [Excel deliberately maintained bug-compatibility with the old Lotus bug](https://www.linkedin.com/posts/daniellesteinfairhurst_happy-leap-year-with-date-functions-in-excel-activity-6639352815548493824-CgZa) and is itself also incorrect.

This is a good example of the complexities of handling calendar dates, it helps to use libraries, but keep in mind some of the libraries themselves also get this wrong too.
