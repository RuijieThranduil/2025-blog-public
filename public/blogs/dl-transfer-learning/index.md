# DeepLearning · Transfer Learning 迁移学习

迁移学习最打动人的地方是：  
我们不再要求每个任务都从零开始学世界。

## 1. 什么叫 transfer
简单说，就是把 source task 上学到的知识，迁到 target task。

这份“知识”可以体现在：
- 参数初始化
- 通用特征提取器
- 表示空间
- 训练策略

所以 transfer learning 不只是“加载预训练权重”，而是 reuse learned structure。

## 2. 为什么它这么有效
很多现实任务都有一个共同问题：  
目标数据不够多，但我们又不想从零训练一个大模型。

这时候预训练模型像一个已经见过很多世界的 student：
- 底层边缘/纹理/语义特征已经学过
- 新任务只需要再适配

这就是为什么在 CV、NLP、语音里，pretrain -> finetune 逐渐成了默认范式。

## 3. Feature Extractor vs Full Finetune
常见两种用法：

### 当成固定特征提取器
- 冻结 backbone
- 只训上层 task head

优点：
- 训练快
- 参数少
- 小数据集更稳

### 全量或部分 finetune
- 解冻一部分甚至全部层
- 让模型更贴合目标任务

优点：
- 适应性更强

代价：
- 更容易过拟合
- 调参更敏感

## 4. 什么时候迁移会失败
迁移学习并不是永远加分。

如果 source 和 target 差太远，可能出现 negative transfer。  
比如：
- 自然图像特征直接迁到非常特殊的医学场景
- 语言任务的预训练方式和目标任务差异过大

所以最关键的问题不是“能不能迁”，而是“迁来的东西是否仍然有用”。

## 5. 一个实用的分层理解
通常越靠前的层学到越通用的 pattern。  
越靠后的层越贴近具体任务。

所以在 finetune 时，经常会看到这些策略：
- 先冻底层，只训头部
- 再逐步解冻
- 给不同层设不同 learning rate

这背后都是在利用“浅层更通用、深层更任务化”的经验。

## 6. Transfer Learning 和今天的大模型范式
今天我们看 LLM、Vision Foundation Model，会觉得这套范式很熟悉：
- 先在大数据上学 general capability
- 再在小任务上做 adaptation

本质上，这就是迁移学习思想的大规模延展。

## One-line takeaway
迁移学习的核心不是偷懒，而是承认知识是可以复用的，训练不应该每次都从一张白纸开始。
