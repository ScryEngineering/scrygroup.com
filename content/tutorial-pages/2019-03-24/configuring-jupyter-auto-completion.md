---
title: "How to configure jupyter to not autocomplete"
authors:
    - "Janis Lesinskis"
date: "2019-03-09"
tags:
    - Python
    - Jupyter
contentType: "tutorial"
callToActionText: "Have you got a project that requires in depth knowledge of Python or Jupyter notebooks? We'd love to hear about it so fill in the form below with some details."
hideCallToAction: false
---

Have you ever found the autocompletion of certain characters like brackets or quotes to be an annoyance in JuPyter? If so here's how to change the configuration to disable this.

<!-- end excerpt -->

There's 2 main ways to do this, you can edit the configuration file directly or you can do it from code in the notebook

## From configuration file


## From code

```python
from notebook.services.config import ConfigManager
c = ConfigManager()
c.update('notebook', {"CodeCell": {"cm_config": {"autoCloseBrackets": False}}})
```

Note you may need to refresh the browser to get this to apply.