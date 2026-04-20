# DeepLearning · Foundations 基础地图

> Inspired by the topic map of `DeepLearning-500-questions`, but rewritten into a lighter blog-style note instead of a Q&A dump.

## 这篇在讲什么
如果把深度学习看成一个 system，它最底层不是某个 fancy model，而是三件事：
- data 用什么形式表示
- model 怎么前向计算
- loss 怎么把误差反传回来

所以这篇更像一个 onboarding map，先把 vocabulary 对齐。

## 1. Tensor 不是“更大的矩阵”，而是统一的数据接口
- scalar 是 0D
- vector 是 1D
- matrix 是 2D
- tensor 是更一般化的 nD container

在工程里，tensor 最重要的不是定义，而是 shape。

一个很常见的思维方式是：
`batch × channel × height × width`

或者在 NLP 里：
`batch × seq_len × hidden_dim`

你一旦能顺着 shape 去读模型，很多“黑箱感”会立刻下降。

## 2. Forward pass 本质是 function composition
神经网络可以理解成：

`x -> layer1 -> layer2 -> layer3 -> y_hat`

每一层都在做某种可学习变换。  
前向传播做的事很简单：把输入一步步变成预测值。

真正有意思的是，深层网络不是在手工写 feature，而是在 learned representation space 里逐层抽象。

## 3. Backprop 不是玄学，是链式法则工程化
反向传播最核心的公式其实很朴素：

`dL/dx = dL/dy * dy/dx`

也就是 chain rule。

为什么它重要？
- 我们不需要分别手推整个网络
- 只需要知道每一层的 local gradient
- 整个图就能自动把梯度传回去

这也是为什么今天深度学习框架大多围绕 computation graph 来组织。

## 4. Activation function 决定网络有没有表达力
如果每一层都是纯线性变换，那么多层堆起来仍然等价于一个线性变换。

所以 activation 的存在，是为了让网络获得 non-linearity。

常见角色：
- `Sigmoid`：早期常见，但容易 saturation
- `Tanh`：zero-centered，比 sigmoid 稍顺手
- `ReLU`：现代默认选手，简单、快、梯度更稳定
- `Leaky ReLU / GELU`：在很多现代模型里更常见

经验上，activation 不是“哪个理论上最优”，而是“哪个在当前任务和 initialization 下最稳”。

## 5. Loss function 是训练的方向盘
模型并不知道“自己错在哪”，它只知道 loss 高还是低。

所以 loss function 不只是一个评分器，更是在定义：
- 什么叫做好结果
- 什么错误代价更高
- 模型该朝哪个方向更新

常见搭配：
- classification -> cross entropy
- regression -> MSE / MAE

一句很工程的话：  
bad loss design 会直接把一个看起来没问题的模型带偏。

## 6. Generalization 才是 final exam
训练集上很会答题，不代表真实世界里也会。

所以我们真正关心的是：
- train error
- validation error
- generalization gap

欠拟合通常说明模型 capacity 或训练不够。  
过拟合通常说明模型把 noise 也学进去了。

这也是后面 regularization、dropout、data augmentation 会登场的原因。

## 读完这一篇后，建议继续看什么
- `dl-training`：训练到底怎么调
- `dl-cnn`：视觉任务为什么离不开卷积
- `dl-rnn`：序列建模是怎么回事

## One-line takeaway
深度学习的起点不是“会调库”，而是能把 `shape -> forward -> loss -> gradient -> update` 这条链在脑子里跑通。
