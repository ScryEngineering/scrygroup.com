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

We use YubiKeys for a variety of purposes, and as this involves using different functionality, we often have to switch between the PGP and PIV applets.

[PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy), or "Pretty Good Privacy", is a format for encrypted messages, cryptographic signatures and keys. Initially developed in 1991 by [Phil Zimmermann](https://en.wikipedia.org/wiki/Phil_Zimmermann), it was later standardised in [RFC4880](https://tools.ietf.org/html/rfc4880) as the [OpenPGP](https://www.openpgp.org/) format. We use PGP to sign [git](https://git-scm.com) commits, for encrypted email, for code and release signing, and so on. The PGP trust model is based on a web of trust.

[PIV](https://en.wikipedia.org/wiki/FIPS_201), which stands for "Personal Identity Verification" is another format, originally created to authenticate United States federal employees and contractors. It's based on [X.509](https://en.wikipedia.org/wiki/X.509) certificates and is commonly interfaced with through smart cards, with the latest standard being [FIPS 201-2](https://csrc.nist.gov/publications/detail/fips/201/2/final). We use the PIV applet for client-side TLS authentication to some security-critical sites, as well as for our internal [X.509](https://en.wikipedia.org/wiki/X.509) [public key infrastructure](https://en.wikipedia.org/wiki/Public-key_infrastructure).

However, after starting to use the YubiKey with [OpenSC](https://github.com/OpenSC/OpenSC), we quickly found out that it's relatively annoying to switch between the two applets. In particular, OpenSC likes to hijack the YubiKey, so that [GnuPG](https://gnupg.org/) can't use it.

After a bit of experimentation, we found a fairly straightforward way to switch between the two:

## Using the PIV applet

Simply unplug the YubiKey, then plug it back in. OpenSC should take over and you should be able to use it.

## Using the PGP applet

First, unplug the YubiKey and plug it back in. Then kill the [`OpenSC.tokend`](https://github.com/OpenSC/OpenSC.tokend) application (it essentially exposes the key to the operating system).

```sh
sudo kill $(ps aux | grep 'OpenSC.tokend' | grep 'Yubico' | awk '{print $2}')
```
