---
title: "Switching between YubiKey's PIV and PGP applets on macOS"
author: "Aapeli Vuorinen"
date: "2018-09-13"
tags:
    - security
    - yubikey
    - gpg
    - pgp
    - piv
    - privacy
    - encryption
    - x509
    - cryptography
    - digital-signatures
    - elliptic-curve-cryptography
contentType: "tutorial"
callToActionText: "Are you interested in ultimate security for your company? Could hardware security devices improve your internal processes and security policies? Fill in the form below to have one of our knowledgeable security experts contact you."
hideCallToAction: false
---

Quick tip on using the PIV and PGP applets simultaneously on a YubiKey on macOS

<!-- end excerpt -->

We use YubiKey for a variety of purposes, and this often involves switching between PGP and the PIV applets. We use PGP to sign [git](https://git-scm.com) commits, for encrypted email, for code signing, and so on. We also often use the PIV applet for client-side TLS authentication to some security-critical sites, as well as for some other private [X.509](https://en.wikipedia.org/wiki/X.509) [PKI](https://en.wikipedia.org/wiki/Public-key_infrastructure) requirements.

However, after starting to use the YubiKey with [OpenSC](https://github.com/OpenSC/OpenSC), we quickly found out that it's relatively annoying to switch between the two applets. In particular, OpenSC likes to hijack the YubiKey, so that [GnuPG](https://gnupg.org/) can't use it.

After a bit of experimentation, we found a fairly straightforward way to switch between the two:

## Using the PIV applet

Simply unplug the YubiKey, then plug it back in. OpenSC should take over and you should be able to use it.

## Using the PGP applet

First, unplug the YubiKey and plug it back in. Then kill the [`OpenSC.tokend`](https://github.com/OpenSC/OpenSC.tokend) application (it essentially exposes the key to the operating system).

```sh
sudo kill $(ps aux | grep 'OpenSC.tokend' | grep 'Yubico' | awk '{print $2}')
```
