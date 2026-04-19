# LLM Knowledge Base（导入版）

> 来源仓库：<https://github.com/RuijieThranduil/LLM-KnowledgeBase>

> 导入时间：2026-04-19


本文已从你的知识库仓库导入，并按照模块整理为单篇学习笔记，便于在博客中统一浏览与后续持续更新。


## 目录

- **MOC 导图**
  - [MOC-LLM全景](#moc-导图-moc-llm全景)
  - [MOC-Transformer架构](#moc-导图-moc-transformer架构)
  - [MOC-训练与对齐](#moc-导图-moc-训练与对齐)
- **01 基础理论**
  - [Attention机制](#01-基础理论-attention机制)
  - [Transformer架构](#01-基础理论-transformer架构)
  - [词向量与Embedding](#01-基础理论-词向量与embedding)
  - [语言模型基础](#01-基础理论-语言模型基础)
- **02 预训练**
  - [Scaling Law](#02-预训练-scaling-law)
  - [数据处理与清洗](#02-预训练-数据处理与清洗)
  - [预训练范式](#02-预训练-预训练范式)
- **03 微调**
  - [LoRA与PEFT](#03-微调-lora与peft)
  - [SFT监督微调](#03-微调-sft监督微调)
  - [指令微调](#03-微调-指令微调)
- **04 对齐**
  - [Constitutional AI](#04-对齐-constitutional-ai)
  - [DPO](#04-对齐-dpo)
  - [RLHF](#04-对齐-rlhf)
- **05 推理部署**
  - [KV Cache](#05-推理部署-kv-cache)
  - [推理优化](#05-推理部署-推理优化)
  - [量化技术](#05-推理部署-量化技术)
- **06 RAG 与 Agents**
  - [Agent框架](#06-rag-与-agents-agent框架)
  - [RAG基础](#06-rag-与-agents-rag基础)
  - [Tool Use](#06-rag-与-agents-tool-use)
- **07 评估**
  - [Benchmark汇总](#07-评估-benchmark汇总)
  - [评估方法](#07-评估-评估方法)
- **08 论文笔记模板**
  - [论文笔记模版](#08-论文笔记模板-论文笔记模版)
- **09 对比模板**
  - [对比笔记模版](#09-对比模板-对比笔记模版)
- **10 复习卡片模板**
  - [复习卡片模版](#10-复习卡片模板-复习卡片模版)

## MOC 导图

### MOC-LLM全景

源文件：`00_MOC/MOC-LLM全景.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/00_MOC/MOC-LLM全景.md>

> 大语言模型（Large Language Model）的完整知识版图，从基础理论到工程落地。

---

## 核心主线：LLM 生命周期

```
原始文本语料
     ↓
[数据处理与清洗]  →  02_Pretraining
     ↓
[预训练]          →  语言模型基础 + Transformer架构 + Scaling Law
     ↓
[监督微调 SFT]    →  03_Finetuning
     ↓
[对齐 RLHF/DPO]  →  04_Alignment
     ↓
[推理部署]        →  05_Inference
     ↓
[应用系统]        →  RAG + Agent
     ↓
[效果评估]        →  07_Evaluation
```

---

## 📦 各模块核心概念

### 基础理论 `01_Foundations`
- `语言模型基础` · `Attention机制` · `Transformer架构` · `词向量与Embedding`
- **核心问题**：语言是如何被数学表达的？注意力机制如何捕捉长距离依赖？

### 预训练 `02_Pretraining`
- `预训练范式` · `数据处理与清洗` · `Scaling Law`
- **核心问题**：怎样从海量无标注文本中学到通用能力？规模如何影响性能？

### 微调 `03_Finetuning`
- `SFT监督微调` · `LoRA与PEFT` · `指令微调`
- **核心问题**：如何用有限资源将通用模型适配到特定任务？

### 对齐 `04_Alignment`
- `RLHF` · `DPO` · `Constitutional AI`
- **核心问题**：如何让模型输出符合人类意图、价值观和安全要求？

### 推理与部署 `05_Inference`
- `推理优化` · `量化技术` · `KV Cache`
- **核心问题**：如何以更低成本、更快速度服务用户请求？

### RAG 与智能体 `06_RAG_and_Agents`
- `RAG基础` · `Agent框架` · `Tool Use`
- **核心问题**：如何突破上下文限制并让模型自主完成复杂任务？

### 评估 `07_Evaluation`
- `评估方法` · `Benchmark汇总`
- **核心问题**：如何客观、全面地衡量模型能力？

---

## 🔗 横切关注点

| 主题 | 涉及模块 |
|------|---------|
| 位置编码（RoPE、ALiBi） | 基础 → 推理 |
| 上下文窗口扩展 | 基础 → 推理 → RAG |
| 幻觉问题 | 对齐 → RAG → 评估 |
| 多模态 | 基础 → 预训练 → 评估 |
| 安全与偏见 | 对齐 → 评估 |

---

## 📖 推荐学习路径

**入门路径**：`语言模型基础` → `Transformer架构` → `Attention机制` → `预训练范式` → `SFT监督微调`

**工程路径**：`量化技术` → `KV Cache` → `推理优化` → `RAG基础` → `Agent框架`

**研究路径**：`Scaling Law` → `RLHF` → `DPO` → `Constitutional AI` → `评估方法`

---

*返回 `🏠 MindMap`*

---

### MOC-Transformer架构

源文件：`00_MOC/MOC-Transformer架构.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/00_MOC/MOC-Transformer架构.md>

> Transformer 是现代 LLM 的核心骨架，理解它的每个组件是掌握 LLM 的前提。

---

## Transformer 组件全景

```
输入序列 (tokens)
     ↓
[Token Embedding + Positional Encoding]
     ↓
┌─────────────────────────────┐
│   Transformer Block × N     │
│  ┌────────────────────────┐ │
│  │  Multi-Head Attention  │ │  ← `Attention机制`
│  └────────────────────────┘ │
│         Add & Norm           │
│  ┌────────────────────────┐ │
│  │    Feed-Forward (MLP)  │ │
│  └────────────────────────┘ │
│         Add & Norm           │
└─────────────────────────────┘
     ↓
[输出头 / LM Head]
     ↓
logits → softmax → token 概率
```

---

## 核心组件索引

### 注意力机制
- `Attention机制` — 缩放点积注意力、多头注意力、因果掩码
- **变种**：MQA（多查询注意力）、GQA（分组查询注意力）、Flash Attention

### 位置编码
| 方法 | 代表模型 | 特点 |
|------|---------|------|
| 绝对位置编码（正弦） | 原始 Transformer | 固定，不可外推 |
| 可学习位置编码 | BERT、GPT-2 | 灵活但有长度上限 |
| RoPE | LLaMA、Qwen | 相对位置，可外推 |
| ALiBi | MPT | 线性偏置，外推性强 |

### 归一化
| 方法 | 位置 | 说明 |
|------|------|------|
| LayerNorm（Post-LN） | 残差后 | 原始 Transformer |
| LayerNorm（Pre-LN） | 残差前 | 训练更稳定，主流 |
| RMSNorm | 残差前 | 更高效，LLaMA 采用 |

### 前馈网络（FFN）
- 标准 FFN：两层线性 + ReLU/GELU
- SwiGLU / GeGLU：门控激活，LLaMA 系列采用
- MoE（Mixture of Experts）：稀疏激活，Mixtral 采用

---

## Transformer 家族演化

```
Transformer (2017, Vaswani)
├── Encoder-only
│   └── BERT (2018) → RoBERTa → ALBERT → DeBERTa
├── Decoder-only
│   └── GPT-1 → GPT-2 → GPT-3 → GPT-4
│   └── LLaMA → LLaMA2 → LLaMA3 → Qwen / Mistral
└── Encoder-Decoder
    └── T5 → FLAN-T5 → mT5
```

---

## 关键参数与规模

| 参数 | 影响 | 典型值 |
|------|------|--------|
| `d_model`（隐藏维度） | 表达能力 | 4096（7B）/ 8192（70B） |
| `n_heads`（注意力头数） | 多角度捕捉 | 32 / 64 |
| `n_layers`（层数） | 深度 | 32 / 80 |
| `d_ff`（FFN 维度） | 非线性变换 | 4×d_model |
| `vocab_size`（词表大小） | 覆盖语言 | 32K–152K |

---

## 相关笔记

- `Transformer架构` — 详细原理笔记
- `Attention机制` — 注意力机制深入
- `词向量与Embedding` — 输入表示
- `KV Cache` — 推理时注意力优化

---

*返回 `🏠 MindMap` · `MOC-LLM全景`*

---

### MOC-训练与对齐

源文件：`00_MOC/MOC-训练与对齐.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/00_MOC/MOC-训练与对齐.md>

> 从原始预训练到与人类价值观对齐的完整训练流程。

---

## 训练流程全景

```
Stage 1: 预训练（Pretraining）
─────────────────────────────────────────────
 数据       →  万亿级 Token 语料
 目标       →  Next Token Prediction（CLM）
 规模       →  百亿～万亿参数
 产物       →  Base Model（基座模型）

         ↓

Stage 2: 监督微调（SFT）
─────────────────────────────────────────────
 数据       →  高质量指令-回答对
 目标       →  学会遵循指令格式
 规模       →  数千～数十万条样本
 产物       →  SFT Model（指令模型）

         ↓

Stage 3: 对齐（Alignment）
─────────────────────────────────────────────
 方法 A     →  RLHF（奖励模型 + PPO）
 方法 B     →  DPO（直接偏好优化）
 方法 C     →  Constitutional AI
 产物       →  Aligned Model（对话模型）

         ↓

Stage 4: 部署后对齐（Post-deployment）
─────────────────────────────────────────────
 红队测试 / 持续人工反馈 / 安全过滤
```

---

## 预训练核心概念

- `预训练范式` — CLM vs MLM vs PrefixLM
- `数据处理与清洗` — 去重、质量过滤、来源配比
- `Scaling Law` — Chinchilla 定律，最优 Token/参数比

**关键决策**：
- 训练多少 token？（Chinchilla: ~20× params tokens）
- 数据配比如何？（代码、数学、多语言占比）
- 学习率调度？（WarmUp + CosineDecay）

---

## 微调核心概念

- `SFT监督微调` — 数据格式、损失函数、训练细节
- `指令微调` — 模板设计、多任务混合
- `LoRA与PEFT` — 参数效率方法全家族

**关键决策**：
- 全参数 vs 参数高效微调（PEFT）？
- 学习率多大？（比预训练小 10×）
- 如何防止灾难性遗忘？

---

## 对齐核心概念

- `RLHF` — 奖励建模 + PPO 强化学习
- `DPO` — 将对齐转化为分类问题
- `Constitutional AI` — 用原则自我审查

**方法对比**：

| 方法 | 复杂度 | 稳定性 | 效果 |
|------|--------|--------|------|
| RLHF (PPO) | 高 | 低 | 强 |
| DPO | 低 | 高 | 相当 |
| ORPO | 极低 | 高 | 中等 |
| Constitutional AI | 中 | 中 | 强（安全） |

---

## 评估闭环

训练的每个阶段都需要与 `评估方法` 和 `Benchmark汇总` 对接，形成改进闭环。

---

## 参数高效方法家族

```
PEFT 方法
├── Adapter — 在层间插入小模块
├── LoRA — 低秩矩阵分解
│   ├── QLoRA — 量化 + LoRA
│   └── DoRA — 权重分解 LoRA
├── Prefix Tuning — 软提示前缀
└── Prompt Tuning — 仅优化提示 token
```

---

*返回 `🏠 MindMap` · `MOC-LLM全景`*

---

## 01 基础理论

### Attention机制

源文件：`01_Foundations/Attention机制.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/01_Foundations/Attention机制.md>

**领域**: LLM · 基础理论
**难度**: ⭐⭐⭐
**关联概念**: `Transformer架构` · `KV Cache` · `MOC-Transformer架构`
**来源**: 

---

## 一句话定义

注意力机制通过计算 Query 与所有 Key 的相似度，对 Value 进行加权聚合，让模型能够动态关注序列中的相关位置。

## 核心原理

（待填充）

## 数学形式

**缩放点积注意力（Scaled Dot-Product Attention）**：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$

- $Q \in \mathbb{R}^{n \times d_k}$：Query 矩阵
- $K \in \mathbb{R}^{m \times d_k}$：Key 矩阵
- $V \in \mathbb{R}^{m \times d_v}$：Value 矩阵
- $\sqrt{d_k}$：缩放因子，防止点积过大导致梯度消失

**多头注意力（Multi-Head Attention）**：

$$\text{MHA}(Q,K,V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O$$

$$\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$$

（待填充）

## 关键要点

- **为什么要除以 $\sqrt{d_k}$**：防止维度高时点积过大，使 softmax 进入饱和区
- **因果掩码（Causal Mask）**：解码器中，token 只能看到自身及之前的位置
- **注意力变种**：MHA → MQA → GQA（减少 KV head 数以节省显存）

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| Self-Attention vs Cross-Attention | Self: Q/K/V 来自同一序列；Cross: Q 来自解码器，K/V 来自编码器 |
| MHA vs MQA vs GQA | MQA 所有 head 共享 KV；GQA 分组共享 |
| Soft Attention vs Hard Attention | Soft 可微分，用梯度优化；Hard 离散不可微 |

（待填充）

## 代码/实现要点

```python
import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))
    attn_weights = F.softmax(scores, dim=-1)
    return torch.matmul(attn_weights, V)
```

## 复习自测

1. 为什么要对注意力分数除以 $\sqrt{d_k}$？
2. MQA 和 GQA 如何减少 KV Cache 的显存占用？
3. 因果掩码（Causal Mask）的实现原理是什么？
4. Flash Attention 的核心思想是什么？解决了什么问题？

---

### Transformer架构

源文件：`01_Foundations/Transformer架构.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/01_Foundations/Transformer架构.md>

**领域**: LLM · 基础理论
**难度**: ⭐⭐⭐
**关联概念**: `Attention机制` · `词向量与Embedding` · `MOC-Transformer架构`
**来源**: Vaswani et al., "Attention Is All You Need" (2017)

---

## 一句话定义

Transformer 是完全基于注意力机制、摒弃 RNN 的序列到序列模型，通过堆叠多头自注意力层和前馈层实现强大的语言建模能力。

## 核心原理

（待填充）

## 数学形式

**Transformer Block（Pre-LN 版本）**：

$$x' = x + \text{MHA}(\text{LN}(x))$$

$$x'' = x' + \text{FFN}(\text{LN}(x'))$$

**前馈网络（FFN）**：

$$\text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2$$

**SwiGLU（LLaMA 系列）**：

$$\text{SwiGLU}(x) = \text{SiLU}(xW_1) \odot (xW_3)$$

（待填充）

## 关键要点

- **残差连接**：解决深层网络梯度消失，使梯度直通
- **Pre-LN vs Post-LN**：Pre-LN 训练更稳定，现代 LLM 主流选择
- **仅解码器架构（Decoder-only）**：GPT 系列、LLaMA 系列，适合生成任务
- **参数量估算**：$\approx 12 \times d_{model}^2 \times n_{layers}$（不含 Embedding）

（待填充）

## 与相关概念的区别

| 架构 | 代表模型 | 适用场景 |
|------|---------|---------|
| Encoder-only | BERT, RoBERTa | 理解、分类、NER |
| Decoder-only | GPT, LLaMA | 生成、对话、补全 |
| Encoder-Decoder | T5, BART | 翻译、摘要、问答 |

（待填充）

## 代码/实现要点

```python
import torch.nn as nn

class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        self.attn = nn.MultiheadAttention(d_model, n_heads, dropout=dropout)
        self.ff = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),
            nn.Linear(d_ff, d_model)
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
    
    def forward(self, x, mask=None):
        # Pre-LN
        x = x + self.attn(self.norm1(x), self.norm1(x), self.norm1(x), attn_mask=mask)[0]
        x = x + self.ff(self.norm2(x))
        return x
```

## 复习自测

1. Pre-LN 和 Post-LN 的区别是什么？为什么现代 LLM 偏好 Pre-LN？
2. 为什么 Transformer 使用残差连接？
3. Encoder-only、Decoder-only、Encoder-Decoder 各适合什么任务？
4. 一个 7B 参数的模型大概有多少层、多宽的隐藏层？

---

### 词向量与Embedding

源文件：`01_Foundations/词向量与Embedding.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/01_Foundations/词向量与Embedding.md>

**领域**: LLM · 基础理论
**难度**: ⭐⭐
**关联概念**: `语言模型基础` · `Transformer架构` · `预训练范式`
**来源**: 

---

## 一句话定义

Embedding 是将离散的 token（词、子词）映射为连续向量空间中的稠密向量，使模型能够计算语义相似性并进行梯度优化。

## 核心原理

（待填充）

## 数学形式

给定词表大小 $V$，嵌入维度 $d$，Embedding 矩阵 $E \in \mathbb{R}^{V \times d}$：

$$\text{embed}(x_i) = E[x_i] \in \mathbb{R}^d$$

**位置编码（正弦版）**：

$$PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d}}\right)$$

$$PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d}}\right)$$

**RoPE（旋转位置编码）**：

$$\text{RoPE}(q, m) = q \cdot e^{im\theta}$$（复数旋转形式）

（待填充）

## 关键要点

- **BPE（Byte Pair Encoding）**：将高频字节对合并为子词，平衡词表大小与覆盖率
- **Tied Embedding**：输入 Embedding 矩阵与输出 LM Head 权重共享，减少参数
- **词表大小权衡**：太小→OOV 多；太大→参数量大、训练慢
- **现代 LLM 词表**：LLaMA3 使用 128K，Qwen 使用 152K

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| Word2Vec vs Transformer Embedding | Word2Vec 静态；Transformer Embedding 上下文相关（动态） |
| BPE vs WordPiece vs SentencePiece | 合并规则不同；GPT 用 BPE，BERT 用 WordPiece |
| 绝对位置编码 vs RoPE | 绝对编码外推性差；RoPE 支持长度外推 |

（待填充）

## 代码/实现要点

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8b")
tokens = tokenizer("Hello, world!", return_tensors="pt")
print(tokens["input_ids"])  # token id 序列

# 查看 embedding 矩阵
import torch.nn as nn
embedding = nn.Embedding(num_embeddings=128256, embedding_dim=4096)
```

## 复习自测

1. BPE 分词的基本算法步骤是什么？
2. 为什么要进行 Embedding Weight Tying（权重绑定）？
3. RoPE 相比绝对位置编码的优势是什么？
4. 词表越大越好吗？有哪些 trade-off？

---

### 语言模型基础

源文件：`01_Foundations/语言模型基础.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/01_Foundations/语言模型基础.md>

**领域**: LLM · 基础理论
**难度**: ⭐⭐
**关联概念**: `Transformer架构` · `Attention机制` · `预训练范式`
**来源**: 

---

## 一句话定义

语言模型是对自然语言序列的概率分布建模，核心任务是给定上文预测下一个 token 的概率 $P(x_t \mid x_{<t})$。

## 核心原理

（待填充）

## 数学形式

语言模型对序列 $x = (x_1, x_2, \ldots, x_T)$ 的联合概率：

$$P(x) = \prod_{t=1}^{T} P(x_t \mid x_1, \ldots, x_{t-1})$$

**困惑度（Perplexity）**：衡量模型对测试集的不确定程度：

$$\text{PPL} = \exp\left(-\frac{1}{T}\sum_{t=1}^{T} \log P(x_t \mid x_{<t})\right)$$

（待填充更多公式）

## 关键要点

- 自回归（Autoregressive）生成：逐 token 预测，每次将已生成 token 作为上文
- 困惑度越低表示模型对语言分布拟合越好
- 语言模型可以 zero-shot 完成下游任务（Prompt）

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| CLM vs MLM | CLM 从左到右预测；MLM 随机 mask 后预测 |
| 语言模型 vs 语言理解模型 | 前者生成式，后者（如 BERT）判别式 |

（待填充）

## 代码/实现要点

```python
# 用 HuggingFace 计算困惑度（伪代码）
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# 待填充完整实现
```

## 复习自测

1. 语言模型的联合概率如何用链式法则分解？
2. 困惑度（PPL）的计算公式是什么？PPL=1 意味着什么？
3. 自回归生成和 Teacher Forcing 有什么区别？
4. （待填充）

---

## 02 预训练

### Scaling Law

源文件：`02_Pretraining/Scaling Law.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/02_Pretraining/Scaling Law.md>

**领域**: LLM · 预训练
**难度**: ⭐⭐⭐
**关联概念**: `预训练范式` · `数据处理与清洗` · `SFT监督微调`
**来源**: Kaplan et al. (2020) "Scaling Laws for Neural Language Models"; Hoffmann et al. (2022) "Training Compute-Optimal LLMs"（Chinchilla）

---

## 一句话定义

Scaling Law 描述了 LLM 的测试损失与模型参数量 $N$、训练数据量 $D$、计算量 $C$ 之间的幂律关系，指导如何在固定算力预算下做最优分配。

## 核心原理

（待填充）

## 数学形式

**Kaplan et al. 幂律（2020）**：

$$L(N) \approx \left(\frac{N_c}{N}\right)^{\alpha_N}, \quad L(D) \approx \left(\frac{D_c}{D}\right)^{\alpha_D}$$

**Chinchilla 最优（Hoffmann et al. 2022）**：

在固定计算预算 $C = 6ND$（FLOPs 近似）下，最优分配满足：

$$N^* \propto C^{0.5}, \quad D^* \propto C^{0.5}$$

即：**参数量与训练 Token 数应大致相等（$D \approx 20N$）**。

（待填充）

## 关键要点

- **Kaplan 结论**：算力预算下，优先增大模型参数（训练不足）
- **Chinchilla 修正**：应同时增大数据量，70B 模型需 1.4T tokens
- **数据墙（Data Wall）**：高质量数据有限，促使合成数据研究兴起
- **推理算力视角**：部署时小模型多训 token 更优（LLaMA 理念）

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| Kaplan vs Chinchilla | Kaplan 重参数；Chinchilla 同等重视数据，修正了 Kaplan |
| Scaling Law vs Emergent Ability | Scaling Law 是平滑幂律；涌现能力是某规模突然出现的能力 |

（待填充）

## 代码/实现要点

```python
# 根据 Chinchilla 估算最优训练配置
def chinchilla_optimal(compute_budget_flops):
    """
    C = 6 * N * D
    最优: N ≈ D / 20
    """
    # C = 6 * N * 20 * N = 120 * N^2
    N_optimal = (compute_budget_flops / 120) ** 0.5
    D_optimal = 20 * N_optimal
    return N_optimal, D_optimal

# 例: 1e23 FLOPs 的计算预算
N, D = chinchilla_optimal(1e23)
print(f"最优参数量: {N/1e9:.1f}B, 最优Token数: {D/1e9:.0f}B")
```

## 复习自测

1. Chinchilla 定律的核心结论是什么？与 Kaplan 的主要区别？
2. 为什么说 LLaMA 的训练策略（小模型多训）在实际部署中是合理的？
3. Scaling Law 能预测"涌现能力"吗？为什么？
4. 什么是"数据墙"？当前有哪些应对策略？

---

### 数据处理与清洗

源文件：`02_Pretraining/数据处理与清洗.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/02_Pretraining/数据处理与清洗.md>

**领域**: LLM · 预训练
**难度**: ⭐⭐
**关联概念**: `预训练范式` · `Scaling Law` · `评估方法`
**来源**: 

---

## 一句话定义

数据处理与清洗是预训练的关键前置步骤，通过去重、过滤低质量内容、合理配比来源，确保模型从高质量、多样化的语料中学习。

## 核心原理

（待填充）

## 数学形式

**MinHash 去重**（局部敏感哈希，LSH）：

$$\text{Jaccard}(A, B) = \frac{|A \cap B|}{|A \cup B|}$$

当 Jaccard 相似度超过阈值（如 0.8）时判定为重复文档。

（待填充）

## 关键要点

**数据处理流水线（Pipeline）**：

```
原始爬取数据（Common Crawl 等）
     ↓
1. 语言识别（过滤非目标语言）
     ↓
2. 启发式过滤
   - 文档长度 / 行长度过滤
   - 标点符号比例
   - 重复 n-gram 比例
     ↓
3. 质量过滤
   - 困惑度过滤（小型 LM 打分）
   - 分类器过滤（有害内容、成人内容）
     ↓
4. 去重
   - 文档级：MinHash + LSH
   - 段落级：精确哈希
     ↓
5. 数据配比（Upsampling / Downsampling）
```

**常见数据来源及配比（参考）**：

| 来源 | 比例 | 特点 |
|------|------|------|
| Common Crawl | ~50% | 覆盖广但噪声大 |
| 代码（GitHub） | ~10% | 提升推理能力 |
| 学术论文（arXiv） | ~5% | 专业知识 |
| 书籍 | ~10% | 长文本，逻辑强 |
| 维基百科 | ~5% | 高质量百科 |

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| 精确去重 vs 模糊去重 | 精确：哈希完全匹配；模糊：MinHash 近似相似 |
| 规则过滤 vs 模型过滤 | 规则快速便宜；模型（分类器/PPL）更准确但慢 |

（待填充）

## 代码/实现要点

```python
# 用 datasketch 进行 MinHash 去重（伪代码）
from datasketch import MinHash, MinHashLSH

def get_minhash(text, num_perm=128):
    m = MinHash(num_perm=num_perm)
    for shingle in get_shingles(text, k=5):
        m.update(shingle.encode('utf-8'))
    return m

# 待填充完整去重流程
```

## 复习自测

1. MinHash 去重的基本原理是什么？
2. 为什么要用小型 LM 的困惑度来过滤数据？
3. 数据配比（mixing ratio）会影响哪些模型能力？
4. Common Crawl 有哪些主要噪声来源？

---

### 预训练范式

源文件：`02_Pretraining/预训练范式.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/02_Pretraining/预训练范式.md>

**领域**: LLM · 预训练
**难度**: ⭐⭐
**关联概念**: `语言模型基础` · `数据处理与清洗` · `Scaling Law`
**来源**: 

---

## 一句话定义

预训练范式是指在大规模无标注文本上，用自监督目标函数训练模型，使其学习通用语言表示，再迁移到下游任务的范式。

## 核心原理

（待填充）

## 数学形式

**因果语言建模（CLM）损失**：

$$\mathcal{L}_{CLM} = -\sum_{t=1}^{T} \log P(x_t \mid x_1, \ldots, x_{t-1}; \theta)$$

**掩码语言建模（MLM）损失**：

$$\mathcal{L}_{MLM} = -\sum_{i \in \mathcal{M}} \log P(x_i \mid x_{\setminus \mathcal{M}}; \theta)$$

（待填充）

## 关键要点

**三大预训练目标对比**：

| 目标 | 方向 | 代表模型 | 适用 |
|------|------|---------|------|
| CLM（因果LM） | 单向（左→右） | GPT系列、LLaMA | 生成 |
| MLM（掩码LM） | 双向 | BERT、RoBERTa | 理解 |
| PrefixLM | 前缀双向+后缀单向 | T5、GLM | 生成+理解 |

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| 预训练 vs 微调 | 预训练：大规模无监督；微调：小规模有监督任务特化 |
| CLM vs MLM | CLM：生成式，推理时逐步生成；MLM：判别式，无法直接生成 |

（待填充）

## 代码/实现要点

```python
# CLM 训练伪代码
from transformers import Trainer, TrainingArguments, DataCollatorForLanguageModeling

data_collator = DataCollatorForLanguageModeling(tokenizer, mlm=False)  # CLM
# mlm=True 则为 MLM 训练

# 待填充完整训练流程
```

## 复习自测

1. CLM、MLM、PrefixLM 各有什么优缺点？
2. 为什么现代 LLM 几乎都采用 CLM（Decoder-only）？
3. 预训练的损失函数是什么？如何理解"预测下一个 token"？
4. 什么是 Warmup 学习率调度？为什么需要它？

---

## 03 微调

### LoRA与PEFT

源文件：`03_Finetuning/LoRA与PEFT.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/03_Finetuning/LoRA与PEFT.md>

**领域**: LLM · 微调
**难度**: ⭐⭐⭐
**关联概念**: `SFT监督微调` · `量化技术` · `MOC-训练与对齐`
**来源**: Hu et al., "LoRA: Low-Rank Adaptation of Large Language Models" (2021)

---

## 一句话定义

LoRA（低秩适配）通过在预训练权重旁并联一个低秩矩阵分解，仅训练少量新增参数（约0.1%~1%），实现参数高效的模型微调。

## 核心原理

（待填充）

## 数学形式

**LoRA 核心公式**：

$$W' = W_0 + \Delta W = W_0 + BA$$

- $W_0 \in \mathbb{R}^{d \times k}$：冻结的预训练权重
- $B \in \mathbb{R}^{d \times r}$，$A \in \mathbb{R}^{r \times k}$：可训练的低秩矩阵
- $r \ll \min(d, k)$：秩（通常 4~64）
- 初始化：$B = 0$，$A \sim \mathcal{N}(0, \sigma^2)$，确保训练开始时 $\Delta W = 0$

**缩放因子**：

$$\Delta W = \frac{\alpha}{r} BA$$

其中 $\alpha$ 是超参数（通常设为与 $r$ 相同或 2×$r$）。

（待填充）

## 关键要点

- **参数量节省**：7B 模型全量微调 ~28GB，LoRA（r=16）仅 ~20MB 额外参数
- **应用位置**：通常加在注意力层的 Q/V 矩阵，也可加在 FFN 上
- **推理无额外成本**：可将 $BA$ 合并回 $W_0$，推理时无额外计算

**PEFT 方法家族对比**：

| 方法 | 参数位置 | 特点 |
|------|---------|------|
| LoRA | 并联低秩矩阵 | 最流行，效果好 |
| QLoRA | LoRA + 4bit量化 | 消费级GPU可运行 |
| DoRA | 权重分解LoRA | 分离幅度与方向 |
| Adapter | 层间串联小模块 | 推理有额外延迟 |
| Prefix Tuning | 前缀软提示 | 对生成友好 |
| Prompt Tuning | 仅优化输入token | 最轻量 |

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| LoRA vs 全量微调 | LoRA 冻结主干，只训练低秩矩阵；全量微调所有参数可训 |
| LoRA vs Adapter | LoRA 并联（推理无额外成本）；Adapter 串联（有额外延迟） |
| QLoRA vs LoRA | QLoRA 将基础模型量化为 4bit，再用 LoRA 微调，大幅降低显存 |

（待填充）

## 代码/实现要点

```python
from peft import LoraConfig, get_peft_model, TaskType

lora_config = LoraConfig(
    r=16,                          # 低秩秩数
    lora_alpha=32,                 # 缩放因子
    target_modules=["q_proj", "v_proj"],  # 应用到哪些层
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable params: 4,194,304 || all params: 6,742,609,920 || trainable%: 0.0622%
```

## 复习自测

1. LoRA 的核心数学思想是什么？为什么低秩假设是合理的？
2. LoRA 中 $\alpha$ 参数的作用是什么？
3. QLoRA 如何在 4bit 量化模型上进行梯度反向传播？
4. 合并 LoRA 权重（merge）后对推理性能有什么影响？

---

### SFT监督微调

源文件：`03_Finetuning/SFT监督微调.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/03_Finetuning/SFT监督微调.md>

**领域**: LLM · 微调
**难度**: ⭐⭐
**关联概念**: `指令微调` · `LoRA与PEFT` · `RLHF` · `MOC-训练与对齐`
**来源**: 

---

## 一句话定义

SFT（Supervised Fine-Tuning）是用人工标注的指令-回答对，通过有监督的交叉熵损失，将预训练基座模型适配成能遵循指令的对话模型。

## 核心原理

（待填充）

## 数学形式

**SFT 损失函数**（只对回答部分计算损失）：

$$\mathcal{L}_{SFT} = -\sum_{t \in \text{response}} \log P(x_t \mid x_{<t}; \theta)$$

注意：**指令（Prompt）部分的 token 不参与损失计算**，只有回答部分参与。

（待填充）

## 关键要点

- **数据质量 > 数据数量**：LIMA 论文表明 1000 条高质量样本效果优于百万低质量样本
- **对话模板（Chat Template）**：需与模型预训练时的格式一致，否则性能下降
- **学习率**：通常比预训练小 10×（如 1e-5 ~ 2e-5）
- **训练轮数**：1~3 epoch，过多会过拟合

**常见对话格式（以 LLaMA3 为例）**：

```
<|begin_of_text|>
<|start_header_id|>system<|end_header_id|>
You are a helpful assistant.<|eot_id|>
<|start_header_id|>user<|end_header_id|>
{instruction}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
{response}<|eot_id|>
```

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| SFT vs 预训练 | SFT 有监督，数据量小但高质量；预训练无监督，数据量巨大 |
| SFT vs RLHF | SFT 直接模仿；RLHF 通过强化学习优化人类偏好 |
| SFT vs 指令微调 | 基本同义，指令微调特指用指令-回答对的 SFT |

（待填充）

## 代码/实现要点

```python
from transformers import Trainer, TrainingArguments
from trl import SFTTrainer, DataCollatorForCompletionOnlyLM

# 只对回答部分计算损失
response_template = "<|start_header_id|>assistant<|end_header_id|>"
collator = DataCollatorForCompletionOnlyLM(
    response_template=response_template,
    tokenizer=tokenizer
)

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    data_collator=collator,
    args=TrainingArguments(
        learning_rate=2e-5,
        num_train_epochs=2,
        per_device_train_batch_size=4,
    )
)
trainer.train()
```

## 复习自测

1. 为什么 SFT 训练时只对回答部分计算损失，而不是整个序列？
2. LIMA 论文的主要发现是什么？对数据集构建有何启示？
3. SFT 的学习率为什么要比预训练小？
4. Chat Template 不对齐会导致什么问题？

---

### 指令微调

源文件：`03_Finetuning/指令微调.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/03_Finetuning/指令微调.md>

**领域**: LLM · 微调
**难度**: ⭐⭐
**关联概念**: `SFT监督微调` · `RLHF` · `DPO`
**来源**: Wei et al., "Finetuned Language Models Are Zero-Shot Learners" (FLAN, 2021)

---

## 一句话定义

指令微调（Instruction Tuning）是 SFT 的特定形式，通过多任务指令-回答对训练，使模型学会理解并遵循自然语言指令，从而获得强大的零样本泛化能力。

## 核心原理

（待填充）

## 数学形式

与 `SFT监督微调` 相同，损失只在回答部分计算：

$$\mathcal{L} = -\sum_{t \in \text{response}} \log P_\theta(x_t \mid \text{instruction}, x_{<t})$$

**关键在于数据格式多样性**，覆盖大量任务类型。

（待填充）

## 关键要点

**指令数据的来源**：
- 人工标注（InstructGPT、OpenAssistant）
- 模板从 NLP 数据集构建（FLAN、Super-NaturalInstructions）
- 模型自生成（Alpaca Self-Instruct、Evol-Instruct）

**指令数据质量要素**：
- 多样性：覆盖不同任务类型、领域、复杂度
- 一致性：回答格式与指令匹配
- 准确性：事实正确，无幻觉
- 安全性：无有害内容

**主流数据集参考**：

| 数据集 | 规模 | 特点 |
|--------|------|------|
| Alpaca | 52K | Self-Instruct，GPT-3.5生成 |
| ShareGPT | ~90K | 真实用户对话 |
| FLAN | 1.8K任务 | 多任务模板 |
| OpenHermes | 1M+ | 高质量合成数据 |
| WizardLM Evol | 196K | 逐步增强复杂度 |

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| 指令微调 vs SFT | 基本同义；指令微调强调多任务+指令格式，SFT 更广泛 |
| 指令微调 vs RLHF | 指令微调无需奖励模型；RLHF 有明确偏好信号 |
| Self-Instruct vs 人工标注 | Self-Instruct 成本低但质量参差不齐 |

（待填充）

## 代码/实现要点

```python
# 使用 trl 库的 SFTTrainer 进行指令微调
from trl import SFTTrainer

def format_instruction(sample):
    return f"""<|start_header_id|>user<|end_header_id|>
{sample['instruction']}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
{sample['output']}<|eot_id|>"""

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    formatting_func=format_instruction,
    max_seq_length=2048,
)
```

## 复习自测

1. Self-Instruct 方法如何用模型自己生成训练数据？
2. 为什么指令微调能带来零样本泛化能力？
3. FLAN 和 InstructGPT 在数据收集方式上有什么不同？
4. 如何判断指令微调数据的质量？有哪些自动化指标？

---

## 04 对齐

### Constitutional AI

源文件：`04_Alignment/Constitutional AI.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/04_Alignment/Constitutional AI.md>

**领域**: LLM · 对齐
**难度**: ⭐⭐⭐
**关联概念**: `RLHF` · `DPO` · `评估方法`
**来源**: Bai et al., "Constitutional AI: Harmlessness from AI Feedback" (Anthropic, 2022)

---

## 一句话定义

Constitutional AI（CAI）是 Anthropic 提出的对齐方法，通过预设一套"宪法"原则，让模型自我批评和修订输出，并用 AI 生成的偏好数据替代人工标注进行 RLHF，大幅降低人工成本。

## 核心原理

（待填充）

## 数学形式

CAI 流程本质上是 RLHF 的变体，区别在于偏好数据来源：

- 标准 RLHF：偏好数据由**人工标注者**评估生成
- CAI：偏好数据由**另一个 AI 模型**根据宪法原则评估生成

奖励模型和 RL 部分与 `RLHF` 相同。

（待填充）

## 关键要点

**Constitutional AI 两阶段**：

**阶段一：监督学习（SL-CAI）**
1. 模型生成有害回答
2. 根据宪法原则，模型自我批评（Critique）
3. 模型根据批评自我修订（Revision）
4. 用修订后的回答进行 SFT

**阶段二：RLHF with AI Feedback（RLAIF）**
1. 模型生成多个候选回答
2. 另一个 AI 模型（Constitution-guided）选出更符合宪法的回答
3. 用 AI 偏好数据训练奖励模型
4. 用 PPO 优化最终模型

**宪法原则示例**：
- "选择对儿童更安全的回答"
- "选择不支持种族歧视的回答"
- "选择更无害、更诚实的回答"

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| CAI vs RLHF | CAI 用 AI 反馈替代人工反馈（RLAIF），降低成本 |
| CAI vs DPO | CAI 有明确原则框架；DPO 通用偏好优化 |
| Critique vs Self-Refine | 都是自我改进；CAI 有宪法约束，Self-Refine 更通用 |

（待填充）

## 代码/实现要点

```python
# CAI 自我批评-修订伪代码
def constitutional_revision(model, harmful_response, constitution):
    """
    Step 1: Critique
    """
    critique_prompt = f"""
    Human: {harmful_response}
    
    请根据以下原则批评上面的回答：{constitution}
    
    Critique:"""
    critique = model.generate(critique_prompt)
    
    """
    Step 2: Revision
    """
    revision_prompt = f"""
    原始回答：{harmful_response}
    批评：{critique}
    
    请根据批评，修订原始回答：
    Revision:"""
    revised = model.generate(revision_prompt)
    return revised
```

## 复习自测

1. Constitutional AI 的两个阶段分别是什么？
2. RLAIF 和 RLHF 的核心区别是什么？各有什么优劣？
3. "宪法"在 CAI 中起什么作用？如何设计有效的宪法原则？
4. 为什么说 CAI 比标准 RLHF 更具可扩展性？

---

### DPO

源文件：`04_Alignment/DPO.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/04_Alignment/DPO.md>

**领域**: LLM · 对齐
**难度**: ⭐⭐⭐
**关联概念**: `RLHF` · `SFT监督微调` · `Constitutional AI`
**来源**: Rafailov et al., "Direct Preference Optimization: Your Language Model is Secretly a Reward Model" (2023)

---

## 一句话定义

DPO（直接偏好优化）通过数学推导将 RLHF 目标转化为一个简单的分类损失，无需显式训练奖励模型和 PPO，直接从偏好数据对中优化语言模型。

## 核心原理

（待填充）

## 数学形式

**DPO 损失函数**：

$$\mathcal{L}_{DPO}(\pi_\theta) = -\mathbb{E}_{(x, y_w, y_l)}\left[\log \sigma\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right)\right]$$

**直觉解读**：

$$= -\mathbb{E}\left[\log \sigma\left(\beta \cdot \underbrace{(\text{log-ratio for } y_w)}_{\text{增大}} - \beta \cdot \underbrace{(\text{log-ratio for } y_l)}_{\text{减小}}\right)\right]$$

即：让模型相对于参考模型，更倾向于生成 $y_w$（优选回答），同时抑制 $y_l$（劣选回答）。

（待填充）

## 关键要点

- **无需 RM**：隐式奖励 $r(x, y) = \beta \log \frac{\pi_\theta(y|x)}{\pi_{ref}(y|x)}$
- **参考模型**（$\pi_{ref}$）：通常是 SFT 模型，全程冻结
- **$\beta$ 参数**：控制与参考模型的偏离程度（通常 0.1~0.5）
- **数据需求**：需要偏好对 $(x, y_w, y_l)$，常用 HH-RLHF、UltraFeedback 等数据集

**DPO 变种**：

| 变种 | 改进点 |
|------|------|
| IPO | 防止过拟合偏好数据 |
| KTO | 不需要偏好对，只需好/坏标签 |
| ORPO | 在 SFT 同时做对齐，单阶段训练 |
| SimPO | 去掉参考模型，用生成长度归一化 |

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| DPO vs RLHF | DPO 更简单稳定，不需要 RM 和 PPO；RLHF 理论更完备 |
| DPO vs SFT | SFT 只学好回答；DPO 同时学"好"和"抑制坏" |
| DPO vs IPO | IPO 通过不同的正则项防止过拟合 |

（待填充）

## 代码/实现要点

```python
from trl import DPOTrainer, DPOConfig

dpo_config = DPOConfig(
    beta=0.1,                    # KL 惩罚系数
    learning_rate=5e-7,
    per_device_train_batch_size=2,
    num_train_epochs=1,
)

dpo_trainer = DPOTrainer(
    model=model,                 # 待训练模型（从 SFT 模型初始化）
    ref_model=ref_model,         # 参考模型（冻结的 SFT 模型）
    args=dpo_config,
    train_dataset=dataset,       # 需包含 prompt/chosen/rejected 三列
    tokenizer=tokenizer,
)
dpo_trainer.train()
```

## 复习自测

1. DPO 是如何从 RLHF 的目标推导出来的？（高层次解释）
2. 为什么 DPO 中需要参考模型 $\pi_{ref}$？
3. $\beta$ 参数对训练有什么影响？设得太大或太小会怎样？
4. ORPO 和 SimPO 分别在 DPO 基础上做了什么改进？

---

### RLHF

源文件：`04_Alignment/RLHF.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/04_Alignment/RLHF.md>

**领域**: LLM · 对齐
**难度**: ⭐⭐⭐⭐
**关联概念**: `DPO` · `SFT监督微调` · `Constitutional AI` · `MOC-训练与对齐`
**来源**: Christiano et al. (2017); Ouyang et al., "Training language models to follow instructions with human feedback" (InstructGPT, 2022)

---

## 一句话定义

RLHF（Reinforcement Learning from Human Feedback）通过训练奖励模型拟合人类偏好，再用 PPO 强化学习算法优化语言模型，使其输出更符合人类期望。

## 核心原理

（待填充）

## 数学形式

**RLHF 三步流程**：

**Step 1 - SFT**：用监督数据微调基座模型得到 $\pi^{SFT}$

**Step 2 - 奖励模型训练**：给定偏好对 $(y_w, y_l)$（$y_w$ 优于 $y_l$），训练 $r_\phi$：

$$\mathcal{L}_{RM} = -\mathbb{E}_{(x, y_w, y_l)}\left[\log \sigma(r_\phi(x, y_w) - r_\phi(x, y_l))\right]$$

**Step 3 - PPO 优化**：最大化奖励，同时通过 KL 散度防止偏离 SFT 模型过远：

$$\max_{\pi_\theta} \mathbb{E}_{x \sim D, y \sim \pi_\theta}\left[r_\phi(x, y) - \beta \cdot \text{KL}(\pi_\theta(y|x) \| \pi^{SFT}(y|x))\right]$$

（待填充）

## 关键要点

- **奖励模型**：通常是在 SFT 模型基础上替换最后一层为标量输出头
- **PPO 训练**：计算复杂，需同时维护 actor、critic、reference、reward 四个模型
- **KL 惩罚**（$\beta$）：防止 reward hacking，避免模型找到奖励模型的漏洞
- **奖励 Hacking**：模型可能生成奖励高但实际质量差的输出

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| RLHF vs DPO | RLHF 需要显式 RM + PPO；DPO 直接从偏好对优化，更简单 |
| RLHF vs SFT | RLHF 有反馈信号，能优化难以直接模仿的复杂偏好 |
| PPO vs GRPO | GRPO 是 PPO 的简化版，无需 critic 网络，DeepSeek-R1 采用 |

（待填充）

## 代码/实现要点

```python
from trl import PPOTrainer, PPOConfig, AutoModelForCausalLMWithValueHead

config = PPOConfig(
    learning_rate=1e-5,
    batch_size=16,
    mini_batch_size=4,
    gradient_accumulation_steps=1,
    optimize_cuda_cache=True,
    kl_penalty="kl",          # KL 惩罚类型
    init_kl_coef=0.2,         # β 初始值
)

ppo_trainer = PPOTrainer(
    config=config,
    model=model,              # Actor model (with value head)
    ref_model=ref_model,      # Reference model (frozen SFT)
    tokenizer=tokenizer,
    reward_model=reward_model,
)
```

## 复习自测

1. RLHF 的三个步骤分别是什么？
2. 为什么 RLHF 中需要 KL 散度惩罚项？
3. 什么是 Reward Hacking？如何缓解？
4. PPO 训练时为什么需要同时维护 4 个模型？

---

## 05 推理部署

### KV Cache

源文件：`05_Inference/KV Cache.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/05_Inference/KV Cache.md>

**领域**: LLM · 推理与部署
**难度**: ⭐⭐⭐
**关联概念**: `Attention机制` · `推理优化` · `量化技术`
**来源**: 

---

## 一句话定义

KV Cache（键值缓存）是自回归解码中的核心优化技术，将已计算的历史 token 的 Key 和 Value 矩阵缓存到显存，避免每次生成新 token 时重复计算，大幅降低推理延迟。

## 核心原理

（待填充）

## 数学形式

**无 KV Cache 时**（第 $t$ 步）：

$$\text{Attention}_t = \text{softmax}\left(\frac{q_t K_{1:t}^\top}{\sqrt{d_k}}\right) V_{1:t}$$

每次都要重新计算 $K_{1:t}$ 和 $V_{1:t}$，计算量随序列长度线性增长。

**有 KV Cache 时**：

缓存 $K_{1:t-1}$，$V_{1:t-1}$，新一步只计算 $k_t$，$v_t$ 并追加：

$$K_{1:t} = [K_{1:t-1}; k_t], \quad V_{1:t} = [V_{1:t-1}; v_t]$$

新 token 计算量为 $O(1)$（固定），而非 $O(t)$。

（待填充）

## 关键要点

**KV Cache 显存占用**（每层，每个 token）：

$$\text{Size} = 2 \times n_{heads} \times d_{head} \times \text{bytes\_per\_element}$$

对于 LLaMA-3 8B（32层，32头，d_head=128，FP16）：

$$\text{每 token} = 2 \times 32 \times 128 \times 2 \text{ bytes} = 2 \text{ MB/层/token}$$

**长序列 KV Cache 问题**：
- 4K 上下文：约 2 GB
- 128K 上下文：约 64 GB（超过 GPU 显存！）

**应对策略**：

| 技术 | 思路 |
|------|------|
| MQA（Multi-Query Attention） | 所有 head 共享 1 组 KV |
| GQA（Grouped-Query Attention） | 分组共享 KV（LLaMA3 采用） |
| PagedAttention | 虚拟内存式管理 KV，支持动态分配 |
| 量化 KV Cache | 用 INT8/INT4 存储 KV，压缩 2-4× |
| 滑动窗口注意力 | 只保留近期窗口的 KV（Mistral） |

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| Prefill vs Decode | Prefill：处理 prompt，并行计算所有 KV；Decode：逐步生成，使用 KV Cache |
| MQA vs GQA vs MHA | MHA 每 head 独立 KV（显存最大）；GQA 分组共享；MQA 完全共享（显存最小）|
| KV Cache vs Prefix Caching | KV Cache 是基础机制；Prefix Caching 是更高层的系统优化（跨请求复用） |

（待填充）

## 代码/实现要点

```python
# HuggingFace Transformers 中 KV Cache 的使用
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8b")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8b")

inputs = tokenizer("Hello", return_tensors="pt")

# 第一次生成，保存 KV Cache
outputs = model(**inputs, use_cache=True)
past_key_values = outputs.past_key_values   # 这就是 KV Cache

# 第二次生成，传入 KV Cache，只需计算新 token
next_token_inputs = tokenizer(" world", return_tensors="pt")
outputs = model(**next_token_inputs, past_key_values=past_key_values)
```

## 复习自测

1. KV Cache 解决了什么问题？节省了哪部分计算？
2. MQA 和 GQA 如何减少 KV Cache 显存占用？
3. PagedAttention 的核心思想是什么？解决了什么工程问题？
4. 为什么 KV Cache 量化比权重量化更困难？

---

### 推理优化

源文件：`05_Inference/推理优化.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/05_Inference/推理优化.md>

**领域**: LLM · 推理与部署
**难度**: ⭐⭐⭐
**关联概念**: `KV Cache` · `量化技术` · `Attention机制`
**来源**: 

---

## 一句话定义

推理优化是指通过算法和系统层面的技术，在保持输出质量的前提下，最大化 LLM 推理的吞吐量（Throughput）并最小化延迟（Latency）。

## 核心原理

（待填充）

## 数学形式

**推理性能关键指标**：

- **TTFT**（Time To First Token）：首 token 延迟
- **TPOT**（Time Per Output Token）：每个输出 token 的时间
- **吞吐量**：单位时间内处理的 token 数（tokens/s）

**推理计算瓶颈**：

$$\text{Arithmetic Intensity} = \frac{\text{FLOPs}}{\text{Memory Bytes}}$$

LLM 推理是**内存带宽瓶颈**（Memory-bound），而非计算瓶颈。

（待填充）

## 关键要点

**主要优化技术**：

| 技术 | 解决问题 | 效果 |
|------|---------|------|
| `KV Cache` | 避免重复计算注意力 | 大幅降低延迟 |
| Flash Attention | 减少 HBM 读写 | 降低显存，提速 2-4× |
| 连续批处理（Continuous Batching） | 提高 GPU 利用率 | 吞吐量提升 20×+ |
| 投机解码（Speculative Decoding） | 并行验证草稿 token | 降低延迟 2-3× |
| 张量并行（Tensor Parallelism） | 多 GPU 分布推理 | 线性扩展 |
| 前缀缓存（Prefix Caching） | 缓存系统提示 KV | 降低重复请求延迟 |

**投机解码原理**：
1. 小草稿模型（Draft）快速生成 $k$ 个 token
2. 大目标模型并行验证所有 $k$ 个 token
3. 接受满足目标分布的 token，拒绝后重采样

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| 延迟 vs 吞吐量 | 延迟：单请求响应速度；吞吐量：并发处理能力，常有 trade-off |
| 训练优化 vs 推理优化 | 训练关注梯度计算；推理关注自回归解码的内存效率 |
| 静态批处理 vs 连续批处理 | 连续批处理允许不同长度请求动态加入，大幅提升 GPU 利用率 |

（待填充）

## 代码/实现要点

```python
# 使用 vLLM 进行高性能推理（PagedAttention + 连续批处理）
from vllm import LLM, SamplingParams

llm = LLM(
    model="meta-llama/Llama-3-8b-instruct",
    tensor_parallel_size=1,       # GPU 数量
    gpu_memory_utilization=0.9,   # GPU 显存利用率
    enable_prefix_caching=True,   # 开启前缀缓存
)

sampling_params = SamplingParams(temperature=0.7, max_tokens=512)
outputs = llm.generate(prompts, sampling_params)
```

## 复习自测

1. 为什么 LLM 推理是内存带宽瓶颈而非计算瓶颈？
2. 连续批处理（Continuous Batching）相比静态批处理的优势是什么？
3. 投机解码的基本原理是什么？为什么能加速？
4. Flash Attention 减少了哪部分的内存访问？

---

### 量化技术

源文件：`05_Inference/量化技术.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/05_Inference/量化技术.md>

**领域**: LLM · 推理与部署
**难度**: ⭐⭐⭐
**关联概念**: `推理优化` · `KV Cache` · `LoRA与PEFT`
**来源**: 

---

## 一句话定义

量化技术通过将模型权重和/或激活值从高精度浮点数（FP32/FP16）压缩为低精度整数（INT8/INT4），大幅减少模型显存占用和推理计算量，同时尽量保持模型精度。

## 核心原理

（待填充）

## 数学形式

**均匀量化（线性量化）**：

$$Q(x) = \text{clamp}\left(\text{round}\left(\frac{x}{s}\right) + z, \, q_{min}, \, q_{max}\right)$$

- $s$（scale）：缩放因子
- $z$（zero-point）：零点偏移
- $q_{min}, q_{max}$：量化范围（如 INT8: [-128, 127]）

**反量化**：

$$\hat{x} = s \cdot (Q(x) - z)$$

**量化误差**：$\epsilon = x - \hat{x}$，目标是最小化误差。

（待填充）

## 关键要点

**显存占用对比**（7B 参数模型）：

| 精度 | 显存 | 质量 |
|------|------|------|
| FP32 | ~28 GB | 基准 |
| BF16/FP16 | ~14 GB | 无损 |
| INT8 | ~7 GB | 接近无损 |
| INT4 | ~3.5 GB | 轻微下降 |
| INT2 | ~1.75 GB | 明显下降 |

**主流量化方法**：

| 方法 | 类型 | 特点 |
|------|------|------|
| GPTQ | PTQ, 权重量化 | 逐层量化，精度高 |
| AWQ | PTQ, 权重量化 | 保护显著权重，快速 |
| SmoothQuant | PTQ, W8A8 | 权重+激活同时量化 |
| GGUF/llama.cpp | PTQ | CPU/边缘设备推理 |
| QLoRA | QAT-like | 量化后 LoRA 微调 |

**量化粒度**：
- 逐张量（Per-tensor）：最粗，误差大
- 逐通道（Per-channel）：中等
- 逐组（Per-group）：如 group_size=128，精度高但开销大

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| PTQ vs QAT | PTQ 训练后量化，无需重训；QAT 训练时模拟量化，精度更高 |
| 权重量化 vs 激活量化 | 权重量化容易（静态）；激活量化困难（动态范围大） |
| GPTQ vs AWQ | GPTQ 更精确但慢；AWQ 更快适合快速部署 |

（待填充）

## 代码/实现要点

```python
# 使用 bitsandbytes 进行 INT4 量化加载（QLoRA）
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",         # NormalFloat4 量化类型
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,    # 双重量化进一步压缩
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3-8b",
    quantization_config=bnb_config,
    device_map="auto"
)

# 使用 AutoGPTQ 进行 GPTQ 量化
from auto_gptq import AutoGPTQForCausalLM, BaseQuantizeConfig

quantize_config = BaseQuantizeConfig(
    bits=4,
    group_size=128,
    desc_act=False
)
```

## 复习自测

1. INT4 量化相比 FP16 节省了多少显存？
2. PTQ 和 QAT 各适合什么场景？
3. GPTQ 量化的基本思路是什么？
4. 为什么激活值比权重更难量化？

---

## 06 RAG 与 Agents

### Agent框架

源文件：`06_RAG_and_Agents/Agent框架.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/06_RAG_and_Agents/Agent框架.md>

**领域**: LLM · RAG 与智能体
**难度**: ⭐⭐⭐
**关联概念**: `RAG基础` · `Tool Use` · `评估方法`
**来源**: Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models" (2022)

---

## 一句话定义

LLM Agent 是以语言模型为核心控制器，配合记忆、工具调用和规划能力，能够自主感知环境、制定计划并执行多步骤任务的智能系统。

## 核心原理

（待填充）

## 数学形式

**Agent 形式化定义**：

$$a_t = \pi_\theta(o_t, h_{<t})$$

- $o_t$：当前观察（环境状态、工具返回结果）
- $h_{<t}$：历史记录（思考链、之前动作）
- $a_t$：当前动作（调用工具、生成回答）
- $\pi_\theta$：LLM 策略

（待填充）

## 关键要点

**Agent 四大组件**：

```
┌──────────────────────────────────────┐
│           LLM Agent                  │
│  ┌──────────┐  ┌──────────────────┐  │
│  │  规划     │  │     记忆          │  │
│  │ Planning │  │    Memory        │  │
│  └──────────┘  └──────────────────┘  │
│  ┌──────────┐  ┌──────────────────┐  │
│  │  工具调用  │  │    感知          │  │
│  │  Tools   │  │  Perception     │  │
│  └──────────┘  └──────────────────┘  │
└──────────────────────────────────────┘
```

**主流 Agent 范式**：

| 范式 | 核心思想 | 代表 |
|------|---------|------|
| ReAct | 交替 Reasoning + Acting | LangChain ReAct Agent |
| Plan-and-Execute | 先规划后执行 | LangGraph |
| Reflexion | 自我反思修正 | Reflexion |
| AutoGPT 风格 | 自主目标分解 | AutoGPT, BabyAGI |
| Multi-Agent | 多 Agent 协作 | CrewAI, AutoGen |

**ReAct 格式示例**：
```
Thought: 我需要查询北京今天的天气
Action: search_weather(city="Beijing")
Observation: 北京今天晴，25°C
Thought: 我已获得所需信息，可以回答了
Answer: 北京今天天气晴朗，气温25摄氏度。
```

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| Agent vs RAG | RAG 单次检索-生成；Agent 多步骤自主决策 |
| ReAct vs Chain-of-Thought | CoT 只有推理；ReAct 推理+外部工具交互 |
| 单 Agent vs 多 Agent | 多 Agent 并行分工，适合复杂任务 |

（待填充）

## 代码/实现要点

```python
from langchain import hub
from langchain.agents import create_react_agent, AgentExecutor
from langchain_community.tools import DuckDuckGoSearchRun

# 定义工具
tools = [DuckDuckGoSearchRun()]

# 获取 ReAct 提示模板
prompt = hub.pull("hwchase17/react")

# 创建 Agent
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    max_iterations=5,      # 最大步骤数
    handle_parsing_errors=True
)

result = agent_executor.invoke({"input": "北京今天天气怎么样？"})
```

## 复习自测

1. Agent 与普通 LLM 调用的核心区别是什么？
2. ReAct 框架中 Reasoning 和 Acting 各起什么作用？
3. 什么是 Agent 的"工具调用幻觉"？如何缓解？
4. 多 Agent 框架相比单 Agent 有什么优势？适合什么场景？

---

### RAG基础

源文件：`06_RAG_and_Agents/RAG基础.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/06_RAG_and_Agents/RAG基础.md>

**领域**: LLM · RAG 与智能体
**难度**: ⭐⭐
**关联概念**: `Agent框架` · `Tool Use` · `评估方法`
**来源**: Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (2020)

---

## 一句话定义

RAG（检索增强生成）通过在生成前从外部知识库检索相关文档，将其拼接到上下文中，解决 LLM 知识截止、幻觉和上下文窗口有限等问题。

## 核心原理

（待填充）

## 数学形式

**标准 RAG 流程**：

1. **编码查询**：$q_{emb} = \text{Encoder}(q) \in \mathbb{R}^d$

2. **检索**：找最相似的 $k$ 个文档：
   $$D_{top-k} = \text{argmax}_{d_i \in \mathcal{D}} \text{sim}(q_{emb}, d_{emb}^{(i)})$$

3. **生成**：
   $$P(y \mid q, D_{top-k}) = \text{LLM}([q; D_{top-k}])$$

**相似度度量**：
- 余弦相似度：$\text{sim}(a, b) = \frac{a \cdot b}{\|a\| \|b\|}$
- 内积：$\text{sim}(a, b) = a \cdot b$

（待填充）

## 关键要点

**RAG 完整流程**：

```
用户查询
   ↓
[查询编码]  →  Embedding 模型（如 BGE、E5）
   ↓
[向量检索]  →  向量数据库（Milvus、Qdrant、Faiss）
   ↓
[重排序]    →  Cross-Encoder Reranker（可选）
   ↓
[上下文构建]→  将检索结果拼接到 Prompt
   ↓
[生成回答]  →  LLM
   ↓
[引用溯源]  →  答案+来源链接
```

**RAG 模式分类**：

| 模式 | 说明 | 适用 |
|------|------|------|
| Naive RAG | 简单检索+生成 | 基础场景 |
| Advanced RAG | 查询改写、重排序 | 精度要求高 |
| Modular RAG | 可插拔模块化 | 复杂系统 |
| Agentic RAG | Agent 迭代检索 | 多跳推理 |

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| RAG vs 长上下文 LLM | RAG 动态检索少量相关内容；长上下文把所有内容塞入窗口 |
| RAG vs 微调 | RAG 更新知识无需重训；微调学习新能力和风格 |
| 稀疏检索 vs 稠密检索 | BM25 基于词频（稀疏）；向量检索基于语义（稠密） |

（待填充）

## 代码/实现要点

```python
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA

# 构建向量数据库
embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-m3")
vectorstore = FAISS.from_documents(documents, embeddings)

# 创建 RAG 链
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)
result = qa_chain({"query": "your question here"})
```

## 复习自测

1. RAG 解决了 LLM 的哪些核心问题？
2. 向量检索和 BM25 各有什么优缺点？什么时候用混合检索？
3. 什么是 Reranker？为什么需要两阶段检索？
4. RAG 的主要评估维度有哪些（检索质量、生成质量）？

---

### Tool Use

源文件：`06_RAG_and_Agents/Tool Use.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/06_RAG_and_Agents/Tool Use.md>

**领域**: LLM · RAG 与智能体
**难度**: ⭐⭐
**关联概念**: `Agent框架` · `RAG基础` · `SFT监督微调`
**来源**: 

---

## 一句话定义

Tool Use（工具调用 / Function Calling）使 LLM 能够识别何时需要调用外部工具（如搜索、计算器、API），并生成结构化的调用请求，由系统执行后将结果返回给模型。

## 核心原理

（待填充）

## 数学形式

Tool Use 是一个条件生成问题：

$$y = \text{LLM}(x, \mathcal{T})$$

其中 $\mathcal{T}$ 是可用工具的描述（Schema），$y$ 可以是：
- 普通文本回答
- 工具调用请求 $\{tool\_name, arguments\}$

（待填充）

## 关键要点

**Function Calling 流程**：

```
用户: "帮我计算 357 × 42"
     ↓
LLM 识别需要计算器工具
     ↓
生成: {"name": "calculator", "arguments": {"expr": "357 * 42"}}
     ↓
系统执行计算，返回: 14994
     ↓
LLM 生成最终回答: "357 × 42 = 14994"
```

**工具描述格式（OpenAI 风格）**：

```json
{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": "获取指定城市的当前天气",
    "parameters": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string",
          "description": "城市名称，如 '北京'"
        }
      },
      "required": ["city"]
    }
  }
}
```

**并行工具调用**：现代 LLM 支持一次生成多个工具调用（如同时查天气+查日历）。

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| Function Calling vs 提示工程 | Function Calling 有模型原生支持，格式标准化；提示工程解析更脆弱 |
| Tool Use vs RAG | Tool Use 是主动调用任意函数；RAG 特指检索知识库 |
| 单次调用 vs 多步调用 | 多步调用即 Agent，需要多轮工具交互 |

（待填充）

## 代码/实现要点

```python
from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取城市天气",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string"}
            },
            "required": ["city"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "北京天气怎么样？"}],
    tools=tools,
    tool_choice="auto"   # 让模型决定是否调用工具
)

# 检查是否触发工具调用
if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    print(tool_call.function.name)      # "get_weather"
    print(tool_call.function.arguments) # '{"city": "北京"}'
```

## 复习自测

1. Function Calling 和 RAG 有什么联系和区别？
2. 模型如何学会"识别何时需要调用工具"？
3. 并行工具调用在什么场景下有用？
4. 如何设计好的工具描述（Description）让模型准确调用？

---

## 07 评估

### Benchmark汇总

源文件：`07_Evaluation/Benchmark汇总.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/07_Evaluation/Benchmark汇总.md>

**领域**: LLM · 评估
**难度**: ⭐⭐
**关联概念**: `评估方法` · `预训练范式` · `SFT监督微调`
**来源**: 

---

## 一句话定义

Benchmark 是标准化的评估数据集和指标体系，用于在相同条件下横向对比不同模型在特定能力维度上的表现。

## 核心原理

（待填充）

## 数学形式

大多数 Benchmark 使用准确率（Accuracy）：

$$\text{Accuracy} = \frac{\text{正确题目数}}{\text{总题目数}} \times 100\%$$

部分使用 Pass@k（代码评估）：

$$\text{Pass@k} = 1 - \frac{\binom{n-c}{k}}{\binom{n}{k}}$$

（待填充）

## 关键要点

**主流 Benchmark 全览**：

### 综合能力

| Benchmark | 题量 | 评估维度 | 说明 |
|-----------|------|---------|------|
| MMLU | 57科目 14K题 | 知识广度 | 多选题，涵盖人文/科学/法律等 |
| MMLU-Pro | 12K题 | 知识+推理 | MMLU 难化版，10选1 |
| AGIEval | 多个 | 人类考试 | 高考、GRE、律师考试等 |

### 推理能力

| Benchmark | 评估维度 | 说明 |
|-----------|---------|------|
| GSM8K | 数学推理 | 小学数学应用题（8.5K题） |
| MATH | 高难数学 | 竞赛级数学（12.5K题） |
| ARC | 科学推理 | 小学科学多选题 |
| HellaSwag | 常识推理 | 句子续写 |
| WinoGrande | 指代消歧 | Winograd Schema |

### 代码能力

| Benchmark | 评估维度 | 说明 |
|-----------|---------|------|
| HumanEval | Python 编程 | 164 个函数生成题（OpenAI） |
| MBPP | Python 编程 | 374 个入门级编程题 |
| LiveCodeBench | 最新竞赛题 | 防止数据污染，持续更新 |
| SWE-Bench | 软件工程 | 真实 GitHub Issue 修复 |

### 对话与指令遵循

| Benchmark | 评估维度 | 说明 |
|-----------|---------|------|
| MT-Bench | 多轮对话 | GPT-4 评分，80题 |
| AlpacaEval | 指令遵循 | vs text-davinci 胜率 |
| IFEval | 指令准确跟随 | 可验证指令约束 |

### 长上下文

| Benchmark | 评估维度 | 说明 |
|-----------|---------|------|
| RULER | 长上下文综合 | 多任务长文理解 |
| HELMET | 长上下文 | 实际任务（QA、摘要等） |
| Needle-in-Haystack | 长文检索 | 在长文中找隐藏信息 |

### 安全与对齐

| Benchmark | 评估维度 |
|-----------|---------|
| TruthfulQA | 幻觉/真实性 |
| ToxiGen | 有害内容生成 |
| BBQ | 社会偏见 |

---

## 数据污染问题

> **⚠️ 重要警告**：许多 Benchmark 已出现在训练数据中，导致评估失真。

**应对策略**：
- 使用动态更新的 Benchmark（LiveCodeBench、LMSYS Chatbot Arena）
- 关注 Chatbot Arena ELO 排名（真实用户盲测）
- 检查训练数据与测试集的 n-gram 重叠率

---

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| 封闭集 Benchmark vs 开放集评估 | 封闭集可比较但易过拟合；开放集更真实 |
| 自动 Benchmark vs 人工竞技场 | 竞技场（Chatbot Arena）更难刷榜 |

（待填充）

## 复习自测

1. MMLU 评估的是什么能力？它的局限性是什么？
2. HumanEval 使用 Pass@k 而非准确率的原因是什么？
3. 什么是"数据污染"？如何检测？
4. Chatbot Arena 的 ELO 评分如何计算？为什么它比传统 Benchmark 更可信？

---

### 评估方法

源文件：`07_Evaluation/评估方法.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/07_Evaluation/评估方法.md>

**领域**: LLM · 评估
**难度**: ⭐⭐
**关联概念**: `Benchmark汇总` · `RLHF` · `RAG基础`
**来源**: 

---

## 一句话定义

LLM 评估是系统性衡量模型在不同能力维度（知识、推理、安全、对齐等）上表现的方法论体系，包括自动评估、基准测试和人工评估三大类。

## 核心原理

（待填充）

## 数学形式

**困惑度（自动评估）**：

$$\text{PPL} = \exp\left(-\frac{1}{N}\sum_{i=1}^{N} \log P(x_i \mid x_{<i})\right)$$

**BLEU Score**（生成评估，较旧）：

$$\text{BLEU} = \text{BP} \cdot \exp\left(\sum_{n=1}^{N} w_n \log p_n\right)$$

**Win Rate**（LLM-as-Judge）：

$$\text{Win Rate}(A) = \frac{\text{count}(A \text{ wins})}{\text{total comparisons}}$$

（待填充）

## 关键要点

**评估方法分类**：

| 类型 | 方法 | 优点 | 缺点 |
|------|------|------|------|
| 自动评估 | PPL、BLEU、ROUGE | 快速、可重复 | 与人类判断不一致 |
| Benchmark | MMLU、HumanEval | 标准化、可比较 | 可能被过拟合 |
| 人工评估 | A/B 测试、Elo | 最贴近真实 | 成本高、主观 |
| LLM-as-Judge | GPT-4 评分、MT-Bench | 快速且相关 | 位置偏见、自我偏好 |

**LLM-as-Judge 注意事项**：
- **位置偏见**：模型偏好第一个或最后一个选项
- **长度偏见**：倾向于更长的回答
- **自我偏好**：模型偏好与自身相似的回答
- **对抗性 prompt**：恶意 prompt 可操控评分

**RAG 专项评估（RAGAS 框架）**：

| 指标 | 衡量什么 |
|------|---------|
| Faithfulness | 回答是否基于检索内容 |
| Answer Relevancy | 回答与问题的相关性 |
| Context Precision | 检索内容的准确性 |
| Context Recall | 检索内容的完整性 |

（待填充）

## 与相关概念的区别

| 概念 | 区别 |
|------|------|
| 自动指标 vs 人工评估 | 自动快但不可靠；人工准确但慢且贵 |
| 能力评估 vs 安全评估 | 能力评估看性能；安全评估看有害性、幻觉率 |
| 单轮评估 vs 多轮对话评估 | 多轮评估更难但更贴近实际使用 |

（待填充）

## 代码/实现要点

```python
# 使用 RAGAS 评估 RAG 系统
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision

dataset = {
    "question": [...],
    "answer": [...],
    "contexts": [...],
    "ground_truth": [...]
}

result = evaluate(
    dataset=dataset,
    metrics=[faithfulness, answer_relevancy, context_precision]
)
print(result)

# LLM-as-Judge 评分示例（使用 OpenAI）
judge_prompt = """
请以 1-10 分评估以下回答的质量：
问题：{question}
回答：{answer}
评分标准：准确性、完整性、清晰度
输出格式：{"score": X, "reason": "..."}
"""
```

## 复习自测

1. 为什么困惑度（PPL）不是评估 LLM 生成质量的好指标？
2. LLM-as-Judge 存在哪些已知偏见？如何缓解？
3. MT-Bench 和 MMLU 各评估什么维度的能力？
4. 如何评估 LLM 的幻觉（Hallucination）程度？

---

## 08 论文笔记模板

### 论文笔记模版

源文件：`08_Papers/论文笔记模版.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/08_Papers/论文笔记模版.md>

> 复制此模版，重命名为 `[年份]-[缩写标题].md`，如 `2022-InstructGPT.md`

---

# [论文标题]

**作者**: 
**机构**: 
**发表于**: （会议/期刊，如 NeurIPS 2022）
**发表日期**: 
**论文链接**: 
**代码链接**: 
**关联概念**: `概念A` · `概念B`
**重要性**: ⭐⭐⭐⭐⭐（1-5星）

---

## 🎯 一句话总结

（用一句话描述这篇论文做了什么，解决了什么问题）

---

## ❓ 问题背景

**解决什么问题？**

（待填充）

**之前方法的局限是什么？**

（待填充）

---

## 💡 核心贡献

1. （主要贡献1）
2. （主要贡献2）
3. （主要贡献3，如有）

---

## 🔧 方法详解

### 整体框架

（待填充，可附图说明）

### 关键技术点

**（技术点1名称）**：

（待填充）

**（技术点2名称）**：

（待填充）

### 训练目标 / 损失函数

$$\mathcal{L} = \text{（待填充公式）}$$

---

## 📊 实验结果

**主要数据集**：

**主要指标与结果**：

| 模型 | 指标1 | 指标2 | 说明 |
|------|-------|-------|------|
| 本文方法 | - | - | - |
| Baseline | - | - | - |

**消融实验关键结论**：

（待填充）

---

## ✅ 优点

- 
- 

## ❌ 局限性 / 不足

- 
- 

---

## 💬 个人思考

**最重要的 insight**：

（待填充）

**对我的研究/工作有什么启发？**

（待填充）

**遗留问题 / 后续工作方向**：

（待填充）

---

## 🔗 相关论文

- `相关论文1` — 关系说明
- `相关论文2` — 关系说明

---

*阅读日期：*
*返回 `🏠 MindMap` · `08_Papers`*

---

## 09 对比模板

### 对比笔记模版

源文件：`09_Comparisons/对比笔记模版.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/09_Comparisons/对比笔记模版.md>

> 复制此模版，重命名为 `[概念A] vs [概念B].md`，如 `RLHF vs DPO.md`

---

# [概念A] vs [概念B]

**领域**: LLM
**关联概念**: `概念A` · `概念B`
**难度**: ⭐⭐

---

## 📌 一句话区别

> **[概念A]**：（一句话定义）
>
> **[概念B]**：（一句话定义）
>
> **核心区别**：（最本质的一句话区分）

---

## 🔍 详细对比

| 维度 | [概念A] | [概念B] |
|------|---------|---------|
| 核心思想 | | |
| 数学形式 | | |
| 训练数据 | | |
| 计算开销 | | |
| 实现复杂度 | | |
| 适用场景 | | |
| 代表工作/模型 | | |
| 优点 | | |
| 缺点 | | |

---

## 📐 数学形式对比

**[概念A]**：

$$\text{（待填充公式A）}$$

**[概念B]**：

$$\text{（待填充公式B）}$$

---

## 🧩 使用场景决策树

```
什么时候用哪个？

需要 [场景描述]？
├── 是 → 用 [概念A]，因为 [原因]
└── 否 → 
    需要 [另一场景]？
    ├── 是 → 用 [概念B]，因为 [原因]
    └── 否 → 具体分析
```

---

## 💡 易混淆点澄清

**误解1**：（常见错误理解）

**正确理解**：（正确解释）

---

**误解2**：（常见错误理解）

**正确理解**：（正确解释）

---

## 🔗 延伸阅读

- `相关概念C` — 与A/B的关系
- `相关论文` — 原始来源

---

*创建日期：*
*返回 `🏠 MindMap` · `09_Comparisons`*

---

## 10 复习卡片模板

### 复习卡片模版

源文件：`10_Flashcards/复习卡片模版.md`  
原始链接：<https://github.com/RuijieThranduil/LLM-KnowledgeBase/blob/main/10_Flashcards/复习卡片模版.md>

> 此文件包含可直接使用的 Anki 风格复习卡片。
> 使用方式：遮住"答案"部分，尝试回答后再对照。
> 可配合 Obsidian 的 **Spaced Repetition** 插件使用。

---

## 使用说明

- 每张卡片格式：**Q（问题）→ A（答案）**
- 难度标记：🟢 基础 / 🟡 中等 / 🔴 困难
- 用 `#flashcard` 标签可被 SR 插件识别

---

## 📦 卡片模版（基础理论）

---

**Q：语言模型的联合概率如何用链式法则表示？** 🟢 #flashcard

**A：**
$$P(x_1, \ldots, x_T) = \prod_{t=1}^{T} P(x_t \mid x_1, \ldots, x_{t-1})$$
即将联合概率分解为每个位置的条件概率之积。

---

**Q：Scaled Dot-Product Attention 公式是什么？为什么要除以 $\sqrt{d_k}$？** 🟡 #flashcard

**A：**
$$\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$
除以 $\sqrt{d_k}$ 是为了防止高维时点积值过大，导致 softmax 进入梯度消失的饱和区。

---

**Q：LoRA 的核心公式是什么？** 🟡 #flashcard

**A：**
$$W' = W_0 + \frac{\alpha}{r}BA$$
其中 $W_0$ 冻结，$B \in \mathbb{R}^{d \times r}$，$A \in \mathbb{R}^{r \times k}$，$r \ll \min(d,k)$。

---

**Q：DPO 的损失函数是什么？** 🔴 #flashcard

**A：**
$$\mathcal{L}_{DPO} = -\mathbb{E}\left[\log\sigma\left(\beta\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)} - \beta\log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right)\right]$$
直觉：让模型（相对于参考模型）更倾向 $y_w$，同时抑制 $y_l$。

---

**Q：Chinchilla Scaling Law 的核心结论是什么？** 🟡 #flashcard

**A：**
在固定计算预算下，最优策略是让训练 Token 数 $D \approx 20 \times$ 参数量 $N$。
即参数量和数据量应"同步扩展"，而非 Kaplan 结论的"优先扩参数"。

---

**Q：KV Cache 节省的是什么计算？** 🟢 #flashcard

**A：**
KV Cache 缓存历史 token 的 Key 和 Value 矩阵，避免每次生成新 token 时重新计算所有历史 KV。解码阶段每步只需计算当前 token 的 $k_t, v_t$，时间复杂度从 $O(t)$ 降为 $O(1)$。

---

**Q：RLHF 三步是什么？** 🟢 #flashcard

**A：**
1. **SFT**：用人工标注的指令-回答对微调基座模型
2. **训练奖励模型（RM）**：用人类偏好对训练奖励模型
3. **PPO 强化学习**：以 RM 分数为奖励，KL 惩罚为约束，优化语言模型

---

**Q：RAG 的基本流程是什么？** 🟢 #flashcard

**A：**
1. 将用户查询编码为向量（Embedding）
2. 在向量数据库中检索 Top-K 相关文档
3. 将检索结果拼接到 Prompt 上下文
4. LLM 基于上下文生成回答

---

## 📦 空白卡片（填写区）

---

**Q：（待填充问题）** 🟢 #flashcard

**A：**
（待填充答案）

---

**Q：（待填充问题）** 🟡 #flashcard

**A：**
（待填充答案）

---

**Q：（待填充问题）** 🔴 #flashcard

**A：**
（待填充答案）

---

*返回 `🏠 MindMap`*

---
