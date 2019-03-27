---
title: "How to work with Jupyter notebook cell input and output"
authors:
    - "Janis Lesinskis"
date: "2019-03-27"
tags:
    - Python
    - Jupyter
    - CSS
    - usability
    - UX
contentType: "tutorial"
callToActionText: "Have you got a project that requires in depth knowledge of Python or Jupyter notebooks? We'd love to hear about it so fill in the form below with some details."
hideCallToAction: false
---

When using Jupyter notebooks have you found the styling of code cells to be too visually close to Raw NBConvert cells? We found the similarities in formatting made it visually harder to see when a cell was set to the wrong cell type when we were running workshops and editing our own data science notebooks. Here's how we changed it.

<!-- end excerpt -->

Raw NBConvert cells are great, they let you pass whatever you want through to the NBConvert function without any processing.

You may have a situation, like the educational workshops we sometimes run, where you are using a notebook without any need for the Raw NBCovert cells. In such a case it's really good to visually distinguish these cell types from code cells because it makes it far easier to see at a glance when someone has chosen the wrong cell type.

Even if you do need to use the Raw NBCovert cells making them visually distinct helps eliminate mistakes. Making code that's correct look correct and making code that is not correct look incorrect is very valuable.

We make use of the fact that the CSS classes for a Raw NBCovert cell include `text_cell` AND `unrendered`.

## From code - using jupyter magic

We make use of the `%%html` magic cell to influence the HTML that displays the notebook itself like this:

```
%%html
<style>
.text_cell.unrendered {
  background-color: yellow;
} 
</style>
```

## From code - using IPython.core.display

This is functionally the same as the `%%html` magic cell approach above.

```python
from IPython.core.display import HTML
HTML("""
<style>
.text_cell.unrendered {
  background-color: yellow;
} 
</style>
""")
```

