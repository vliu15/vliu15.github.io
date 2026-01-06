---
title: the robotics data pareto frontier
date: January 2026
authors: Vincent Liu
description: On the emergence of human-centric trends in robotics (part 1)
unreleased: true
---

![Pareto curve in robotics](/pareto_curve_in_robotics.png)
*Figure 1. Pareto curve of popular data collection methods. Quality is coarsely defined as force/kinematic completeness/precision, and scalability as task diversity/complexity.*

2025 witnessed the rise of some interesting trends in robotics. Firstly, innumerable “ego data” companies were created to address the need for robotics data. Secondly, there was a blossoming interest for large-scale model behaviors beyond teleoperation. At the intersection of data companies and robotics research seems to lie a recurring theme over the past few years: human data. For example, Physical Intelligence recently announced gains in robot capabilities simply by adding human data to a strong foundation model[^1]. I argue that this resurgent interest in learning from humans is not just a dunk on data scale or teleoperation difficulty, but of how real-world constraints shape the properties of robotics data.

## Data collection is a product and user experience dictates the quality-scalability pareto.

Perfect data, as Sergey Levine puts it, is a robot observing itself completing a task[^2]. Teleoperation is great for this, providing kinematically complete data that is 1-1 with the downstream embodiment. However, teleoperation systems such as leader-followers for bimanual manipulators or motion capture for humanoids mean that teleoperation is bottlenecked by hardware (e.g. number of operable robots), human capital (e.g. expert human operators trained to collect task data), and incentive structures (e.g. cannot be used as a drop-in for real-world human jobs). To improve scalability, we can turn to handheld devices, which are 1-1 robot end-effectors/gloves that trade off complete kinematic information for better portability. Though more affordable and easier to use, they still run into issues with incentive structures. As a result, the datasets collected by teleoperation and handheld devices have only been from controlled lab settings.

It turns out that real-world incentive structures dictate the ergonomic requirements of data collection. If we define the user experience (UX) of data collection as the ease in which the users can still do their normal jobs, only a product with sufficiently good UX can collect ego data directly from humans while they work. Because data collection scales with better UX, we cannot just collect data on proxy embodiments (e.g. teleoperation, handheld devices) if we want to capture all physical labor. Even in the category of ego data, different forms of hardware scale differently (e.g. people may be reticent to wear VR headsets but obliging with glasses). Current ego devices capture the human embodiment without kinematic information, thereby representing the long tail of scalability at the cost of 1-1 robot embodiment information.

Ultimately, we should view data collection as a product whose UX determines the total surface area of tasks it can cover. The aggregate of real-world constraints (e.g. cost margins, ergonomics, task complexity, user experience, incentives) draw the pareto curve of an optimal data collection system. Crucially, the pareto suggests that we employ data collection under the whole curve to integrate fully over quality and quantity. Figure 1 provides a sketch of today’s pareto frontier. This frontier will expand as better data collection products will mean better UX and data quality, and better  robots will mean better usage of ego data.

## If the pareto frontier is robot learning’s problem formulation, then what may the solution look like?

There are many possible conjectures, but I find Ilya Sutskever’s explanation of unsupervised learning[^3] the most enlightening. Information theory tells us that neural networks are compressors. When the pretraining dataset is representative of downstream inference tasks, neural networks “generalize” by exploiting patterns from the pretraining dataset. We have all experienced this intuitively by talking to LLMs.

The more similar humans and robots are in completing tasks (visually, kinematically), the more we can hope our neural networks will exploit patterns in human data to improve robot transfer[^1]. While the gap between this theoretical motivation and today’s training pipelines remains large, emerging empirical results report increasingly positive human-to-robot transfer[^4], suggesting information theory may underly robotics in the same way it has for other applications of deep learning.

## Closing remarks.

In this essay, I attributed the human-centric resurgence in robotics to the data pareto frontier governed by user experience. Though data constrains the solution space of robot learning, information theory encourages us to find the solution that follows better compression. We may need to step through several orders of magnitude of scale to find good solutions, just as we saw with Transformer and Diffusion models (these model classes struggled on small datasets and led us down a multi-year detour of LSTMs and GANs). The future is vast and exciting.

*This essay was written by humans without any AI.*

[^1]: Physical Intelligence. [Emergence of Human to Robot Transfer in VLAs](https://www.pi.website/research/human_to_robot) on the effect of human data.
[^2]: Sergey Levine. [Sporks of AGI](https://sergeylevine.substack.com/p/sporks-of-agi) on why kinematic and embodied information is important to robot data.
[^3]: Ilya Sutskever. [An Observation on Generalization](https://www.youtube.com/watch?v=AKMuA_TVz3A) on unsupervised learning from the perspective of compression.
[^4]: Other notable human-to-robot research, such as [GR00T N1](https://arxiv.org/abs/2503.14734), [Unified World Models](https://arxiv.org/abs/2504.02792), [UniAct](https://arxiv.org/abs/2501.10105).
