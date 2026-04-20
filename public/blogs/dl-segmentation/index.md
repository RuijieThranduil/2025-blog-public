# DeepLearning · Segmentation 图像分割

如果说 detection 已经让模型开始理解“物体在哪里”，  
segmentation 则要求它进一步理解“边界到底在哪里”。

## 1. 分割为什么更细
分割不是给一个框，而是给每个像素一个归属。

这意味着模型输出的是更 dense 的空间结构信息。  
所以它对边界、细节、小区域都会更敏感。

## 2. Semantic vs Instance
最基本的两类：

### Semantic Segmentation
只区分类别，不区分同类个体。  
比如图里三个人，输出都记作 `person`。

### Instance Segmentation
不仅知道是 `person`，还要区分“这是第一个人、第二个人、第三个人”。

所以 instance segmentation 本质上更接近 detection + mask prediction。

## 3. 为什么 encoder-decoder 很常见
分割任务经常需要同时兼顾：
- 高层语义
- 低层空间细节

encoder 擅长提语义。  
decoder 擅长把空间信息逐步恢复回来。

这也是为什么像 U-Net 这样的结构会很经典：
- 下采样提特征
- 上采样还原分辨率
- skip connection 把细节接回来

## 4. 分割任务特别看边界质量
分类错一个 label，影响可能不大。  
分割任务里，边界一旦糊掉，结果质量就会明显下降。

所以这类任务常常更关心：
- 小目标是否被吃掉
- 边界是否平滑但不过度
- mask 是否断裂

这也解释了为什么很多方法会强调 multi-scale 和 context aggregation。

## 5. 医学和工业场景为什么特别爱分割
因为这些场景里，光知道“有问题”是不够的。  
还要知道：
- 问题区域有多大
- 边界在哪里
- 后续该怎么测量或处理

所以 segmentation 不只是研究任务，它在很多高价值场景里是直接可操作的输出。

## 6. 评价一个 segmentation 模型时
常见会看：
- IoU
- mIoU
- Dice
- pixel accuracy

在不同场景里，指标偏好不一样。  
医学影像里，Dice 往往特别常见。

## One-line takeaway
图像分割的意义，在于让模型不只会“看见对象”，而是开始以像素级精度去理解场景结构。
