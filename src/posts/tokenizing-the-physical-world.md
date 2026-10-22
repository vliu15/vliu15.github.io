---
title: Tokenizing the Physical World
date: Unreleased
order: 3
author: Vincent Liu
description: A history of tokenizers, and the robotics analog
unreleased: true
thumbnail: null
---

Two years into the robotics buildout of supply chains, hardware, foundation models, and deployments, the one ingredient that made deep learning work everywhere else is still missing. Language models train on tens of trillions of tokens, yet the largest robotics datasets are under 1 million hours. If we take YouTube to approximate Internet-scale real-world video, the largest robotics datasets are still tens of thousands of times smaller and are not compounding.

The instinct is to digitize the physical world the way the Internet digitized text, images, and audio. But the Internet digitized nothing. By the time it arrived, decades of devices had already done the converting: the keyboard converted ideas into text, the digital camera converted sight into images, and the microphone converted speech into audio. Each is a tokenizer: a mechanism that converts (tokenizes) the raw physical substrate into a unit modality (a token). That these units turned out to be learnable is the happy accident the last decade of AI was built on.

Tokenizers for physical skill already exist in the form of teleoperation rigs, tactile gloves, UMIs, and egocentric devices, so why is there no Internet for robotics yet? In my last essay, The Robotics Data Pareto Frontier, I mapped these tokenizers along a tradeoff between mechanical build and token fidelity. But history sorts tokenizers along a different axis. Every tokenizer produces data up to a ceiling set by how many people have one, and a modality reaches Internet scale only after its tokenizer becomes a commodity.

### The history of tokenizers

**Images.** Photography spent its first century governed by the price of the token: the 1900 Kodak Brownie cost a dollar, but each photo cost fifty cents in film and developing, so people rationed shots for birthdays and weddings. By 2000, humanity took about 80 billion photos a year, and the number was flattening [n]. Digital cameras inverted the economics—Kodak's DCS 100 (1991) produced photos for free but cost $25,000, and belonged to a few thousand photojournalists. Consumer digital cameras at $500–1,000 overtook film around 2003. Then the camera was folded into the phone, and photography stopped being a purchase at all. Humanity now takes over 2 trillion photos per year, 94% on phones [n].

**Video.** The camcorder arrived in 1983 at $1,500, reached roughly 100 million households in a decade, and stalled: from 1990 to 2007, humanity recorded a nearly constant ~10⁸ hours per year—the population willing to buy a thousand-dollar device and carry it to the soccer game had been found [n]. YouTube launched into the middle of this plateau in 2005, receiving six hours of video per minute. Then the smartphone made HD video free to shoot and trivial to share; uploads grew to five hundred hours per minute in a decade, and even that torrent is only the shared fraction of what is now captured [n].

**Text.** For a century, typing was a profession: the typewriter sat in every office, but the activity belonged to roughly ten million typists who typed because it was their job. The PC replaced the typewriter on the same desks—cheaper machine, same typists—and the volume of typed words barely moved. What changed everything was not a better keyboard but a new reason to type: email, then messaging, turned typing into how ordinary people talk. The typing population grew from ten million to five billion, and the corpus grew a hundredfold in fifteen years [n].

**Audio.** Voice recording spent four decades as a niche. From the cassette recorder through the digital voice recorder, the devices kept getting cheaper and the recorded hours stayed at ~10⁷ per year, because the only people with a standing reason to record speech were dictating executives, journalists, and students [n]. Then the microphone rode the smartphone into the messaging thread. Voice notes—recorded mid-conversation, by people who would never have bought a recorder—now produce ~10¹⁰ hours per year: a thousandfold jump in a decade.

In short, every corpus grew only as fast as its cheapest tokenizer allowed, and no expensive tokenizer, however premium its tokens, ever moved one. The explosions came when the tokenizer became a commodity and attached itself to something people already did—and the tokens accrued not to the device makers but to the platforms that pooled them.

### Inverting the observation

Robotics has tokenizers. What it does not have is a commodity one. A teleoperation rig costs tens of thousands of dollars and requires a robot; the worldwide population of people who have ever driven one is in the low thousands. Handheld grippers are cheaper but still demand a dedicated session performing tasks that produce nothing. Egocentric rigs are cheapest of all, and the research fleets number in the thousands. Measured by reach, physical skill in 2026 sits where home video sat in 1923: a hundred thousand people at most, producing a corpus that is real and three orders of magnitude too small.

This is an argument about the direction of data classes, not about engineering effort. A tokenizer's cost is downstream of what its data class demands. Requiring a robot in the loop sets a floor no supplier can undercut; requiring a dedicated session sets another. Only capture that rides work already happening has no floor at all. That is the case for pushing toward ego, and it is the case for selling the hardware rather than hoarding it: a tokenizer nobody else can buy is by definition not a commodity, and no private instrument has ever produced a corpus.

### What commoditization actually requires

There is a term I have been hiding. Nobody paid for the Internet to exist. The four corpora above were byproducts: people typed because they wanted to talk, photographed because they wanted to remember, recorded because they wanted to be heard. Each commodity tokenizer landed in an appetite that was already there, and the corpus fell out as exhaust.

Physical skill has no such appetite. Nobody has an intrinsic reason to record their hands working. This is the first corpus in history that cannot arise as a byproduct of what people already want, which means a commodity tokenizer is necessary and still not sufficient. For now, the missing reason has to be bought—collection paid for at a few dollars an hour, which is a substitute for demand, not demand itself.

So the honest position is directional. Commoditize the tokenizer, because nothing else has ever produced a corpus at this scale, and pool the tokens somewhere, because corpora that never pool stay in shoeboxes. Then find the reason people would tokenize their own work anyway. It may be that the robot in your kitchen only learns your kitchen if you show it. Whatever it turns out to be, the corpus arrives the moment capturing physical skill costs nothing and happens while people simply work.
