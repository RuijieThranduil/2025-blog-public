# DeepLearning · Model Compression 模型压缩

模型训练出来只是第一步。  
如果它太大、太慢、太贵，很多场景里其实根本用不上。

所以模型压缩讨论的是一个更现实的问题：

`how to keep most of the performance while paying much less for deployment`

## 1. 为什么 compression 重要
现实部署有很多硬约束：
- 端侧设备算力有限
- 延迟预算很紧
- 显存/内存有限
- 推理成本直接影响业务可行性

所以“能跑”不够，往往还得“跑得起、跑得快、跑得稳”。

## 2. Pruning：把不那么重要的连接剪掉
剪枝的直觉很像修树枝：
- 某些权重很小
- 某些通道贡献不大
- 某些结构冗余

于是我们把它们去掉，期望得到：
- 更小模型
- 更低计算量
- 尽量少的精度损失

但注意，parameter 少了，不一定等于实际 latency 一定更低。  
这取决于硬件和实现是否真的吃得到这个稀疏性。

## 3. Quantization：让数字更便宜
量化不是改模型结构，而是改数值表示方式。

比如把：
- FP32 -> FP16
- FP32 -> INT8

带来的好处通常是：
- 存储更省
- 带宽更低
- 推理更快

它的核心 tradeoff 也很清晰：  
数值更便宜，但表示精度会下降。

## 4. Distillation：让小模型向大模型学
知识蒸馏的核心 idea 很优雅：
- teacher 模型更强
- student 模型更小
- student 不只学硬标签，也学 teacher 的 soft target

这样 student 有机会保留更多结构化知识，而不是只记最终答案。

所以蒸馏本质上是在做能力迁移，而不是简单压缩。

## 5. Compression 不只是算法问题，也是系统问题
同样的压缩方法，在不同硬件和 runtime 上效果可能差很多。

比如：
- 某些设备对 INT8 很友好
- 某些框架对 structured pruning 支持更好
- 某些场景更在意吞吐，有些更在意首 token latency

所以压缩方案一定要贴 deployment target 来看。

## 6. 一个更现实的评估标准
别只问“精度掉了多少”。  
更完整的问题应该是：
- 模型小了多少
- 显存省了多少
- 延迟降了多少
- 吞吐提了多少
- 精度是否还在业务可接受范围内

这才是压缩真正该回答的 business question。

## One-line takeaway
模型压缩的目的不是把模型做小本身，而是把“可训练的模型”变成“可落地的系统”。
