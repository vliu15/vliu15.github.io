---
title: the robotics data pareto frontier
date: January 2026
order: 2
authors: Vincent Liu
description: On the emergence of human-centric trends in robotics (part 1)
unreleased: true
---

![Pareto curve in robotics](/pareto_curve_in_robotics.png)
*Figure 1. The real-world Data Pareto Frontier. Quality is defined as embodiment alignment, or how closely the data matches the robot's proprioceptive reality (joint angles, forces, actuation). Scalability is defined as task diversity/complexity.*

The defining narrative of robotics in 2025 was not a new model architecture, but a fixation on data. Despite a general consensus around teleoperation as the gold standard, interest blossomed in the training recipes that transcend it. This appetite defined a new market category and spurred the creation of innumerable data collection startups aiming to address the heterogeneous robotics data problem. At the intersection of data companies and robotics research lies a recurring theme: human data. In just the last month, the industry’s largest players—whose initial hypotheses were staked on either hardware, teleoperation, or simulation—have all announced breakthroughs in learning from human data[^1][^2][^3]. Structurally, this resurgence is not merely a quest for scale, but an inevitability. Real-world data collection is a product, and the user experience of that product dictates a Pareto Frontier between embodiment specificity and long-tail task diversity.

**Data collection as a product**

To navigate this frontier, we apply a product lens to data collection. Like any product, its adoption is governed by its user experience (UX). Here, good UX is defined by its invisibility: the degree to which a user can maintain their natural workflow without interference. In an ideal world, good UX cannot come at the expense of downstream utility: the efficacy of recorded data for robot learning.

Perfect data, as Sergey Levine puts it, is a robot observing itself completing a task[^4]. Teleoperation is the gold standard, providing kinematically complete data that is exactly 1-1 with the downstream embodiment. However, as a product, teleoperation has terrible UX. Popular systems such as leader-followers for bimanual manipulators or motion capture for humanoids prevent humans from completing tasks naturally in speed and quality. Furthermore, teleoperation faces high costs of hardware (you need a functioning robot), human capital (you need a trained operator), and incentive structures (you cannot ask a factory worker to remote-control a robot without disrupting their actual job).

The barriers to scaling teleoperation have driven a large interest in handheld devices, usually in the form of portable grippers/gloves. While these devices are more portable, they decouple the hand from the robot, removing much of the kinematic information that teleoperation captures. In practice, the promise of scale falls short. For example, you cannot ask a restaurant chef to use grippers during peak operation. Consequently, handheld datasets capture breadth across tasks, but not the long-tail distribution of physical labor. Despite these limitations, handheld devices remain popular because they occupy a narrow but useful region of the Pareto curve: just enough embodiment information at just enough scale beyond teleoperation.

It turns out that the incentive structures of that drive data collection are governed by ergonomic (can I do my job?) and social (do I want to wear this?) parameters. Therefore, data collection methods involving proxy robot embodiments cannot capture the long-tail of physical labor because they fail the ergonomic requirement. Only a product that sufficiently achieves both can collect “ego data” directly from humans while they work. Even within the category of ego data, hardware scales differently based on social factors. For example, people are more willing to wear glasses than iPhones on their heads. Though the appetite for ego data is growing rapidly, stripping away the actuators and sensors to improve UX means we cannot capture proprioceptive ground truth.

In short, the landscape of robotics data collection can be summarized in three categories: teleoperation (high quality, low scale), handheld devices (moderate quality, moderate scale), and ego data (low quality, high scale). These represent the Data Pareto Frontier, which expands on academic taxonomies like Yuke Zhu’s Data Pyramid[^5] by observing real-world product constraints. Crucially, it suggests that we employ data collection to integrate along the curve to produce the optimal data collection system.

**Closing remarks**

In this essay, I describe the resurgence of human data in robotics as an inevitable phenomenon of product. The Data Pareto Frontier dictates that we cannot simply collect all of anything, but rather that we are bound by a tradeoff between data quality and scalability.

The solution, therefore, is not about a perfect data source, but about how to build a heterogeneous deep learning system. Robotics industry labs didn't pivot to human data because they just wanted to; they did so because the Pareto Frontier forced them to. They hit the ceiling of teleoperation scaling, so the only remaining move was to slide down the curve towards ego data and hope that model scale (compression) will enable transfer. Fortunately, as Ilya Sutskever’s framework of compression[^6] suggests, the long-tail messiness is not noise, but actually contains structurally useful information about the world that robots will profit from.


[^1]: Physical Intelligence. [Emergence of Human to Robot Transfer in VLAs](https://www.pi.website/research/human_to_robot).
[^2]: 1X [1X World Model | From Video to Action: A New Way Robots Learn](https://www.1x.tech/discover/world-model-self-learning).
[^3]: Skild AI. [Learning by watching human videos](https://www.skild.ai/blogs/learning-by-watching).
[^4]: Sergey Levine. [Sporks of AGI](https://sergeylevine.substack.com/p/sporks-of-agi).
[^5]: Yuke Zhu. [Building Generalist Robot Autonomy with the Data Pyramid](https://www.youtube.com/watch?v=X4-Ae3Ci_-w).
[^6]: Ilya Sutskever. [An Observation on Generalization](https://www.youtube.com/watch?v=AKMuA_TVz3A).
