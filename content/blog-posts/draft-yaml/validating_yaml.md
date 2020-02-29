---
title: "Developer experience and YAML"
authors:
       - "Janis Lesinskis"
date: 2020-mm-dd
tags:
    - DX
    - UX
    - YAML
    - validation
    - static-typing
    - type-safety
contentType: "blog"
---

At Scry we frequently work with YAML. From the frontmatter that's used in many markdown workflows like the JAM stack through to OpenAPI specifications of APIs through to the dumps of data we get from clients YAML comes up frequently.

We also work with many international clients so there's a wide range of times where various data cleansing comes up.

The the following as an example of something that can go wrong with YAML

```yaml
country: Australia
regionName: State
regions: [QLD, NSW, VIC, TAS, SA, NT, WA, ACT]
```

Similarly in Canada using ISO 3166‑2:CA abbreviations for province names:

```yaml
country: Canada
regionName: Province
regions: [AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT]
```

```python
data = yaml.safe_load("country_data.yaml")

country = data["country"]
region_name = data["regionName"]
print("The {regionName}s of {country} are)
for region_abbv in data:
    print(region_name + region_abbv)
```

What do you expect to see here?

This is a really good example of a common pitfall with YAML.
