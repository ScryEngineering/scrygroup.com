---
title: "How to get the most from consultants when data is involved"
authors:
       - "Janis Lesinskis"
date: "2020-02-18"
tags:
    - consulting
    - data
    - machine-learning
    - statistics
    - efficiency
    - project-management
contentType: "blog"
callToActionText: "Good data and project management foundations are critical for effective data science and machine learning projects to succeed. Get in contact to discuss how we can help you get the most value out of your data driven projects."
---

We do a lot of work on Machine learning and optimization for various organizations.

A very common situation is that a client comes to us with some sort of engineering problem with which they want to find some insights and potential operational optimizations.

For example a 3rd party logistics company may wish to investigate if there's more efficient ways of moving items around in their warehouses or distribution routes. Or a mining company might wish to see if they can use some advanced ML and anomaly detection to get advanced warning of pumps failing so that they can avoid very expensive production shutdowns. Or a call center might want to use data to see if they can reduce the total handling time for calls and reduce hold times.

The thing these all these have in common is not us as a consulting firm but rather a fundamental aspect of such work, *data*.

Because all of these jobs require a representative data to get results and quality data to get the best results the procurement of this data is a crucial blocker.

If you are considering engaging with a machine learning consulting firm make sure that you have the ability to extract the data that the consultants will need to be able to find those insights. Every day that gets bogged down because you are waiting for someone to extract data from a bad data source or for someone to track down some obscure combinations of SQL+Spreadsheets+Jira Tickets + etc etc etc is a day of lost productivity. If the consultants are left waiting that is a very severe opportunity cost that you are incurring.

Some suggestions:

- Before you start the engagement have a conversation with the ML team about the data they will need and when they will need it in the project
- Figure out what your internal data pipeline capacities are, can you supply the needed data? Who will do this job? How will their time be scheduled to allow them to get this data?
- Do you have any regulatory requirements with the data? Find these out before you engage.
- Agree on serialization formats as early on in the project as possible, although allow changes later if need be. If any obscure file or data formats are involved let the data engineers and the consultants know of these as soon as you can, this time allows people to search up documentation and standards.

Moving fast means having not only good data but good *access* to this data.

## The ML capabilities pyramid

ML sits on top of a pyramid of data engineering supports.

Just because you may hire some very skilled ML experts doesn't mean they will be able to put the base of the pyramid in place quickly. And even if they could you might find it far more economical to get some of this work done in house *before* you engage outside help.

At Scry we like to discuss the data engineering needs with our clients well before we engage so that our ML experts time is best utilized and can provide the best value.

## A cautionary tale

A while ago I remember talking to some network engineers who had an issue with some machine learning project they were working on. Unfortunately their organization had decided to outsource the data centers and offshored the database administration as well.

Effectively they no longer had easy access to their own data.

As someone who was attempting to help them with their problem the schedule was never possible in such a way that could mean good utilization of my time. I had a bit of an issue with sitting around all day doing nothing most days of the week while waiting for data so I declined to take the work up until they had a better data pipeline in place.

6 months later their relatively simple ML problem that could save multiple hundreds of thousands of dollars a year is still not implemented. And it's not a question of budgets, they could afford very high rates. But what they couldn't get was the data in a timely and correct format.

This was highly unfortunate because they were a very friendly and professional team that seemed to know what they were doing. But with this ML task the data was so much of a bottleneck that they couldn't avoid very big schedule slippage.

The easier you can make the data available the easier your ML tasks will be to deliver on time, both in house or with consultants. Good clean accessible data is key.
