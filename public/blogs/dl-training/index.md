# DeepLearning · Training Playbook 训练手册

这篇不是讲某个 model architecture，而是讲 training loop 里最容易把人劝退的几个变量。

## 1. Batch Size：不是越大越强
大 batch 的优点：
- GPU 利用率更高
- 梯度更平滑
- 训练吞吐更好

但副作用也明显：
- 占显存
- update 次数变少
- 有时候 generalization 反而变差

所以 batch size 更像一个 system-level tradeoff，而不是单纯的 accuracy knob。

## 2. Learning Rate：最敏感的超参数之一
学习率太小：
- 收敛慢
- 很像“模型没学到”

学习率太大：
- loss 抖动
- 直接发散
- 看起来像模型结构有问题

很多训练事故其实不是 model wrong，而是 lr wrong。

一个很实用的直觉：
- 先让模型“能稳稳降”
- 再追求“降得更快”

## 3. Normalization：让优化地形没那么难走
Normalization 的价值不是“让数字好看”，而是让训练更稳定。

常见几类：
- BatchNorm：CV 场景常见
- LayerNorm：Transformer 标配
- GroupNorm：小 batch 下更稳

它们背后的共同目标都是：
- 控制激活分布
- 缓解训练不稳定
- 提高优化效率

## 4. Initialization：训练从哪里起跑很重要
如果参数初始化得太糟：
- 梯度可能一开始就太大或太小
- 网络不同层的信号尺度不一致
- 训练从第一步就别扭

常见选择：
- Xavier / Glorot
- He initialization

它们不是 magic，核心是在输入输出方差之间找平衡。

## 5. Regularization：不是让模型变弱，而是让它别学歪
常见 regularization 工具箱：
- L2 weight decay
- dropout
- early stopping
- data augmentation

如果把模型训练理解成“背题”，regularization 就是在阻止它死记硬背训练集。

## 6. 训练调参的推荐顺序
我的经验是先别同时动十个 knob。  
更稳的顺序通常是：

1. 先确认 data pipeline 没问题
2. 再看 loss 能不能正常下降
3. 再调 learning rate
4. 再调 batch size / regularization
5. 最后才做结构层面的 fancy changes

## Quick checklist
- loss 不降：先查 lr 和数据标签
- train 好 / val 差：先查过拟合
- 训练很慢：查 batch、IO、混合精度
- 结果不稳定：查 seed、normalization、初始化

## One-line takeaway
训练一个深度学习模型，很多时候不是“发明新结构”，而是把一堆普通但关键的小决策调到彼此兼容。
