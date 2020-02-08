---
name: Headless CMS
---

When a CMS is running in "headless" mode it is only serving up the content via an API, it won't generate the pages and serve those pages.

There's a lot of advantages in running a CMS that interacts with the web or other services in this way. Specifically many CMS packages focus mostly on the content editing and taxonomy parts of a workflow. The serving of, say, HTML pages is often more of an afterthought and is usually done as a server-side-rendered (SSR) manner. What this has meant in practice is that that the quality gap between dedicated web server software and CMS software that serves pages has grown, and continues to grow. CMS packages that serve their own pages tend to be slower, less secure and more resource intensive than using dedicated web serving technologies. Additionally the server side rendering approach of these CMS softwares doesn't nicely interact with API based web frontends/apps. By running a CMS in headless mode you can get many of the benefits of the CMS with regards to its power to handle content with fewer of the security, scalability, and web frontend limitations that you would otherwise have.

We frequently use CMS in a headless manner because we have found it has allowed us far more secure deployments and has reduced our costs internally.
