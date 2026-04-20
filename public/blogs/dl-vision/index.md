# DeepLearning · Detection & Segmentation 视觉任务

图像分类回答的是：**图里有什么**。  
目标检测和图像分割回答的是：**它在哪里、边界到什么程度**。

所以这是从 image-level understanding，走向 spatial understanding。

## 1. Detection：框出目标
目标检测最典型的输出是：
- class label
- bounding box
- confidence

比起 classification，检测更难的地方在于：
- 一张图里可能有多个目标
- 目标大小差异很大
- 位置本身也要预测

所以 detection 任务天然是 classification + localization 的混合题。

## 2. One-stage vs Two-stage
检测器大致有两条路线：

### Two-stage
先提 proposal，再分类和回归。  
代表思路更像 Faster R-CNN。

优点：
- 精度通常强

代价：
- pipeline 更复杂
- 推理速度未必漂亮

### One-stage
直接在 dense prediction 上做分类和框回归。  
代表路线更像 YOLO / SSD。

优点：
- 更快
- 工程部署友好

代价：
- 早期精度压力较大，但后来已经越来越强

## 3. Segmentation：不只是框，而是像素级理解
如果说 detection 只告诉你“这个物体大概在这里”，  
segmentation 更进一步，它要告诉你：

`每个 pixel 属于谁`

常见两类：
- semantic segmentation：同类目标不区分实例
- instance segmentation：同类不同目标也要分开

所以 segmentation 本质上是更细粒度的 scene parsing。

## 4. 为什么视觉任务会越来越细
因为真实应用不满足于“识别到了”：
- 自动驾驶要知道车、人、路标在哪里
- 医学影像要知道病灶边界
- 工业质检要知道缺陷区域

也就是说，业务真正需要的是可定位、可操作、可度量的视觉输出。

## 5. 评价指标也随任务升级
分类常看 accuracy。  
检测和分割则更看：
- IoU
- mAP
- pixel accuracy
- Dice / F1（在一些医学场景里）

评价标准越空间化，模型设计也越要兼顾尺度、边界和召回。

## 6. 一个实用理解框架
可以把三类任务想成递进关系：
- classification：what
- detection：what + where
- segmentation：what + where + exact boundary

这个视角特别适合读 CV 论文时快速定位任务本质。

## One-line takeaway
检测和分割不是“更复杂的分类”，而是让模型开始真正理解图像里的空间结构与对象关系。
