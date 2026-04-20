# DeepLearning · CNN 卷积网络

CNN 到今天依然值得学，不只是因为它是“经典模型”，而是它把图像任务里最重要的 inductive bias 写进了结构。

## 1. 为什么视觉任务需要卷积
图像有两个非常关键的属性：
- local correlation
- translation consistency

也就是说，一个边缘、纹理、角点，不应该只在图像左上角才有意义。

卷积层用局部连接 + 参数共享，把这个 prior 直接编码进模型。

## 2. Convolution 在做什么
可以把卷积核想成一个 learned detector。

不同 kernel 会学到不同 pattern：
- edge
- texture
- corner
- object part

浅层通常更像通用视觉特征。  
深层更像语义组合模块。

## 3. Pooling 不只是“降采样”
池化的常见作用：
- 降低空间分辨率
- 控制计算量
- 提高一定程度的平移鲁棒性

Max pooling 更像“取最显著响应”。  
Average pooling 更像“做区域统计”。

现代架构里 pooling 的使用方式更灵活，但“压缩空间、保留关键信息”的目标没变。

## 4. Receptive Field 是 CNN 的视野
单个卷积核看得很小，但多层堆起来后，单个神经元能“看到”的区域会越来越大。

这就是 receptive field。

它解释了一个关键问题：  
为什么浅层只能识别局部纹理，而深层可以开始理解 object-level pattern。

## 5. 从 LeNet 到 ResNet，变化的主线是什么
经典 CNN 演化并不是“层数越来越多”这么简单，而是在解决几个持续出现的问题：
- 更深以后怎么训练
- 参数量怎么控制
- 表达能力怎么增强

几个 landmark：
- `LeNet`：早期卷积范式
- `AlexNet`：大规模视觉任务的爆发点
- `VGG`：结构简单，堆深网络
- `GoogLeNet`：更高效的多分支设计
- `ResNet`：skip connection 让深网络真正可训

## 6. CNN 的强项和局限
强项：
- 对局部结构建模天然顺手
- 在视觉数据上先验很强
- 参数效率通常不错

局限：
- 长距离依赖处理没那么自然
- 对全局关系的表达有时不如 attention-based model 直接

所以今天你会看到很多 hybrid design：  
CNN 保留局部建模优势，Transformer 接管全局关系。

## Practical reading tip
读 CNN 论文时，可以先看四件事：
- feature map 尺寸怎么变
- channel 数怎么变
- downsampling 在哪里做
- shortcut / bottleneck 有没有引入

## One-line takeaway
CNN 的价值不在“它是老模型”，而在于它把视觉世界最关键的结构先验，写成了可训练的网络骨架。
