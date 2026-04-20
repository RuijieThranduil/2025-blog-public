# DeepLearning · Sequence Models 时序网络

在 Transformer 成为主流之前，sequence modeling 基本是 RNN family 的主场。  
今天再回头看它们，仍然很有帮助，因为很多“记忆、状态、长依赖”的问题，RNN 讲得非常直白。

## 1. RNN 想解决什么
普通前馈网络默认每个样本彼此独立。  
但序列数据不是这样：
- 句子的下一个词依赖前文
- 语音的当前帧依赖历史帧
- 时间序列的当前值受过去趋势影响

RNN 的核心 idea 是：  
把前一时刻的 hidden state 带到下一时刻。

## 2. Hidden State 可以理解成“压缩后的上下文”
每一步更新都像：

`h_t = f(x_t, h_{t-1})`

所以 hidden state 扮演的是 memory slot。

问题也马上来了：  
如果序列太长，这个 memory 很容易不够用，或者在训练时梯度传不回去。

## 3. Vanishing / Exploding Gradient 是 RNN 的宿命问题
当你在时间维上不断链式相乘时：
- 梯度可能越来越小 -> vanishing
- 梯度可能越来越大 -> exploding

这会导致模型：
- 学不到长距离依赖
- 训练极不稳定

所以很多序列模型的进化，本质都在处理“怎么记得更久、传得更稳”。

## 4. LSTM：给记忆加门
LSTM 最经典的设计就是 gating mechanism。

它把状态更新拆成：
- forget gate
- input gate
- output gate

可以把它理解成一个更聪明的记事本：
- 哪些旧信息该忘
- 哪些新信息该写
- 哪些当前要拿出来用

这让长依赖问题比原始 RNN 好很多。

## 5. GRU：更轻一点的版本
GRU 可以看成 LSTM 的简化款。

特点：
- 参数更少
- 结构更紧凑
- 在很多任务上效果并不差

如果你的任务不是特别复杂，GRU 往往是一个更干练的 baseline。

## 6. RNN family 今天还有什么价值
虽然很多 NLP 主任务已经转向 Transformer，但 RNN 并没有“过时到不可读”。

它仍然适合帮助理解：
- 序列依赖
- 状态传递
- 时间展开的反向传播
- memory bottleneck

而且在一些资源受限场景里，轻量序列模型仍然有现实价值。

## 对比着看更清楚
- RNN：最原始，最容易出梯度问题
- LSTM：更强记忆控制
- GRU：更轻量的折中
- Transformer：并行、更擅长全局依赖

## One-line takeaway
RNN 系列最值得学的，不只是模型本身，而是它把“序列信息如何被存、被忘、被传递”这件事讲得非常结构化。
