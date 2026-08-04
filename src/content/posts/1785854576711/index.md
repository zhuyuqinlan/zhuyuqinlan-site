---
title: 3个月 Java 后端进阶计划
published: 2026-08-04
description: 一份详细的 3 个月技术成长计划，涵盖 Java 基础、JVM、并发编程、MySQL、Redis、消息队列、Spring Boot/Cloud、分布式系统、Linux、Docker、K8s、高并发实战及面试能力提升
image: ''
tags: [Java, 后端, 成长计划, 学习路线, 分布式, 高并发]
category: 开发
draft: false
---

## 📌 目标说明

制定这份计划的原因是：**系统性地提升技术能力，告别零散的知识点记忆，建立完整的 Java 后端知识体系，从"能写业务代码"进化为"能设计、能调优、能扛面试"的工程师。**

### 当前基础

- 具备 Java 基础语法和常用框架（Spring Boot）的使用能力
- 能够完成日常业务开发，但对底层原理理解不够深入
- 面对性能问题、系统设计问题感到吃力
- 面试时对八股文的回答停留在背诵层面，缺乏深度理解
- 对 Linux 运维、容器化部署、分布式系统设计缺少系统认知

### 3 个月后希望达到的水平

- 🎯 能够独立设计中大型后端服务架构
- 🎯 能从源码层面解释 Java 核心机制（HashMap、线程池、AQS 等）
- 🎯 能够定位并解决常见的性能问题（慢 SQL、内存溢出、GC 频繁等）
- 🎯 掌握 Spring Cloud 微服务体系，能落地分布式事务、分布式锁等方案
- 🎯 能用 Docker + K8s 完成服务的容器化部署与扩缩容
- 🎯 能够应对中高级 Java 工程师面试
- 🎯 拥有 2~3 个可展示的实战项目
- 🎯 形成自己的技术博客和知识库（10+ 篇深度文章）

---

## 🗺️ 总体路线

| 阶段 | 时间范围 | 核心目标 | 技术关键词 | 最终产出 |
|------|----------|----------|------------|----------|
| **第一阶段：Java 基础强化 + Linux 入门** | 08-05 ~ 08-31 | 补齐 Java 核心基础，深入理解集合、泛型、Java 8+ 特性；掌握 Linux 常用命令与 IO 模型 | OOP、集合、泛型、Stream、异常、IO/NIO、Linux、Shell | Java 基础 100 问自测、手写集合类、源码阅读笔记、Linux 运维清单 |
| **第二阶段：JVM + 并发编程** | 09-01 ~ 09-30 | 理解 JVM 运行机制与并发编程底层原理 | JMM、GC、类加载、synchronized、AQS、线程池、CAS | GC 调优笔记、手写线程池、并发工具类总结、AQS 源码分析 |
| **第三阶段：数据库 + 缓存 + Spring 生态 + 分布式** | 10-01 ~ 10-25 | 掌握 MySQL 原理与优化、Redis 应用、Spring Boot/Cloud 深度使用、分布式系统设计 | B+树、MVCC、索引优化、缓存、MQ、Spring Boot/Cloud、分布式事务、分布式锁 | 慢查询优化案例、缓存系统、Spring Boot 脚手架、微服务实战项目 |
| **第四阶段：高并发实战 + 容器化** | 10-26 ~ 11-04 | 综合运用所学技术，完成高并发秒杀系统，落地 Docker + K8s 部署 | 分布式锁、限流、幂等、MQ 削峰、Docker、K8s、HPA | 秒杀系统项目、压测报告、架构设计文档、K8s 部署文件 |

---

## 📅 每日学习计划

> **⏰ 时间规则**
> - 🏢 **工作日**：4 小时/天（理论 1h + 源码/实验 1h + 项目编码 1h + 算法 1h）
> - 🏠 **周末**：6 小时/天（理论+笔记 3h + 项目开发 2h + 总结输出 1h）
>
> **📊 算法要求**：工作日 LeetCode 2 题，周末 4 题，3 个月目标 150+ 题

---

### 第一阶段：Java 基础强化 + Linux 入门（08-05 ~ 08-31）

#### 2026-08-05（周三）🏢 — Java 运行机制

**学习内容：**
- [ ] Java 程序完整执行流程：`.java` → `javac` → `.class` → `ClassLoader` → JVM 执行
- [ ] JDK、JRE、JVM 三者的定位与区别
- [ ] class 文件结构概览（魔数、版本号、常量池）
- [ ] JIT 编译（C1/C2）与解释执行的区别

**实践任务：**
- [ ] 编写 `HelloWorld.java`，使用 `javac` 编译、`java` 运行
- [ ] 使用 `javap -c -verbose` 反编译 class 文件，逐行分析字节码
- [ ] 使用 `java -XX:+PrintCompilation` 观察 JIT 编译

**输出成果：**
- [ ] 笔记：《Java 程序从编译到运行的全过程》

---

#### 2026-08-06（周四）🏢 — 面向对象进阶

**学习内容：**
- [ ] 封装、继承、多态的本质与设计意图
- [ ] 接口 vs 抽象类：使用场景与 JDK 演进（default 方法）
- [ ] 组合优于继承原则、Liskov 替换原则
- [ ] 访问修饰符：`private`/`default`/`protected`/`public` 的包级可见性规则

**实践任务：**
- [ ] 设计用户系统：`User`（抽象基类）→ `AdminUser` / `NormalUser`
- [ ] 用接口定义 `Authenticatable`、`Authorizable` 行为
- [ ] 验证多态：父类引用指向不同子类对象的方法调用差异

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-08-07（周五）🏢 — Java 对象模型

**学习内容：**
- [ ] 对象创建全过程：`new` 指令 → 分配内存 → 初始化 → `<init>`
- [ ] 对象内存布局：Mark Word、Klass Pointer、实例数据、对齐填充
- [ ] 引用类型：强引用、软引用、弱引用、虚引用的区别
- [ ] `this` 关键字的内存语义
- [ ] `static` 变量的存储位置与生命周期

**实践任务：**
- [ ] 引入 JOL（`org.openjdk.jol:jol-core`）分析对象内存占用
- [ ] 对比基本类型 vs 包装类、空对象 vs 有字段对象的内存开销

**输出成果：**
- [ ] 笔记：《深入理解 Java 对象内存布局》

---

#### 2026-08-08（周六）🏠 — Java 集合（一）：List

**学习内容：**
- [ ] `ArrayList` 底层数组实现、扩容机制（1.5 倍）、`ensureCapacity`
- [ ] `LinkedList` 双向链表实现、与 `ArrayList` 的性能对比
- [ ] `fail-fast` 与 `fail-safe` 机制（`modCount` 字段）
- [ ] `Vector`、`Stack` 的历史与为什么不推荐使用

**实践任务：**
- [ ] 手写 `MyArrayList`（实现 `add`、`get`、`remove`、扩容逻辑）
- [ ] 手写 `MyLinkedList`（带头尾哨兵的双向链表）
- [ ] JMH 基准测试对比 `ArrayList` vs `LinkedList`（随机访问 / 头插 / 尾插）

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-08-09（周日）🏠 — Java 集合（二）：Map

**学习内容：**
- [ ] `HashMap` 数据结构：数组 + 链表 + 红黑树
- [ ] hash 算法：`(h = key.hashCode()) ^ (h >>> 16)` 扰动函数
- [ ] 扩容机制：两倍扩容 + 元素重 hash（高位决定元素位置）
- [ ] `TreeMap` 红黑树实现、`LinkedHashMap` 访问顺序与插入顺序

**实践任务：**
- [ ] 手写简易 `MyHashMap`（数组 + 链表，支持 put/get）
- [ ] 画图说明扩容时元素如何 rehash
- [ ] 验证 `HashMap` 为什么线程不安全（多线程 put 导致数据丢失）

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-08-10（周一）🏢 — HashMap 源码深度阅读

**学习内容：**
- [ ] `HashMap` 源码精读：`put`、`get`、`resize` 方法的完整流程
- [ ] `ConcurrentHashMap` 1.7（分段锁）vs 1.8（CAS + synchronized）
- [ ] `Hashtable` vs `HashMap` vs `ConcurrentHashMap` 对比
- [ ] `TreeMap` 排序原理与红黑树基本操作

**实践任务：**
- [ ] 在 HashMap 中 debug `put` 和 `resize` 流程
- [ ] 阅读 `ConcurrentHashMap` 源码中 `put` 方法的加锁逻辑
- [ ] 回答三个经典问题：
  - HashMap 为什么线程不安全？（JDK 1.7 环形链表、JDK 1.8 数据覆盖）
  - 为什么容量必须是 2 的幂？（`(n - 1) & hash` 均匀分布）
  - 为什么链表转红黑树的阈值是 8？（泊松分布概率分析）

**输出成果：**
- [ ] 笔记：《HashMap 和 ConcurrentHashMap 源码分析》

---

#### 2026-08-11（周二）🏢 — String 与常量池

**学习内容：**
- [ ] `String` 不可变性的设计原因（安全、缓存、性能）
- [ ] 字符串常量池（StringTable）的演进：永久代 → 堆上
- [ ] `String.intern()` 方法原理
- [ ] `StringBuilder` vs `StringBuffer`：可变性与线程安全
- [ ] `equals()` vs `==` 在 String 上的行为差异

**实践任务：**
- [ ] 写实验验证对象地址（`System.identityHashCode`）
- [ ] 验证 `String.intern()` 在不同 JDK 版本的行为差异
- [ ] 拼接字符串性能对比：`+` vs `StringBuilder` vs `String.concat`

**输出成果：**
- [ ] 笔记：《String 不可变性与常量池深度解析》

---

#### 2026-08-12（周三）🏢 — 异常体系

**学习内容：**
- [ ] `Error` vs `Exception`：虚拟机层面的区别
- [ ] 受检异常 vs 非受检异常的设计哲学
- [ ] `try-catch-finally` 执行顺序与 `finally` 不执行的情况
- [ ] `try-with-resources` 原理（`AutoCloseable`）
- [ ] 自定义异常与异常链（cause）

**实践任务：**
- [ ] 设计业务异常体系（`BusinessException`、`BizCode` 枚举）
- [ ] 全局异常处理器（`@RestControllerAdvice`）实践
- [ ] 模拟 finally 不执行的场景（System.exit、守护线程）

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-08-13（周四）🏢 — 泛型与反射

**学习内容：**
- [ ] 泛型的意义：类型安全 + 消除强制类型转换
- [ ] 类型擦除机制：泛型在编译后变为原始类型
- [ ] 通配符：`?`、`? extends T`、`? super T`（PECS 原则）
- [ ] 泛型方法、泛型接口、泛型类的定义与使用
- [ ] 反射基础：`Class`、`Method`、`Field`、`Constructor`

**实践任务：**
- [ ] 用反射实现简易 ORM 框架（通过注解 + 反射自动映射 ResultSet）
- [ ] 分析泛型在编译前后的字节码变化（javap）

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-08-14（周五）🏢 — Java 8 核心特性

**学习内容：**
- [ ] Lambda 表达式：语法、函数式接口、变量捕获
- [ ] Stream API：中间操作、终结操作、短路操作
- [ ] `Optional`：空指针的优雅处理
- [ ] 方法引用与构造器引用
- [ ] 默认方法（default）与静态方法

**实践任务：**
- [ ] 用 Stream 重构项目中"订单列表过滤排序"的业务代码
- [ ] 对比传统 for 循环 vs Stream 的性能（JMH）

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-08-15（周六）🏠 — 算法：数组与哈希表

**LeetCode 题目：**
- [ ] [1. 两数之和](https://leetcode.cn/problems/two-sum/)（哈希表，🔁）
- [ ] [242. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)（数组计数）
- [ ] [349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)
- [ ] [383. 赎金信](https://leetcode.cn/problems/ransom-note/)

**学习要点：** 哈希表时间复杂度 O(1)、数组作为哈希表、Set 去重

---

#### 2026-08-16（周日）🏠 — 算法：链表与双指针

**LeetCode 题目：**
- [ ] [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)（迭代 + 递归）🔁
- [ ] [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)（双指针）
- [ ] [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)（快慢指针）
- [ ] [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

**学习要点：** 虚拟头节点、快慢指针、递归思想

---

#### 2026-08-17 ~ 08-21（周一至周五）🏢 — 集合源码周

本周集中完成集合框架的源码阅读与笔记整理，每天工作日 4 小时分配：源码阅读 2h + 算法 1h + 笔记整理 1h。

- [ ] `ArrayList` 源码精读笔记（`add` / `grow` / `remove` / `Iterator`）
- [ ] `HashMap` 源码精读笔记（`putVal` / `treeifyBin` / `resize`）
- [ ] `ConcurrentHashMap` 源码初步阅读（`putVal` / `transfer`）
- [ ] `LinkedList` 源码精读笔记（双向链表操作）
- [ ] LeetCode 每日 2 题（链表 / 哈希表专题）

**输出成果：**
- [ ] 博客文章：《Java 集合框架全景梳理》（周末整理发布）

---

#### 2026-08-22 ~ 08-23（周末）🏠 — 综合复习与面试输出

- [ ] 整理 **Java 基础面试 100 问**（题目 + 自己的回答）
- [ ] 输出博客文章一篇：《Java 集合框架全景梳理》
- [ ] 完成阶段小测（自测，不看答案）
- [ ] LeetCode 4 题（复习错题 + 新题）

---

#### 2026-08-24（周一）🏢 — IO / NIO + Linux IO 模型

**学习内容：**
- [ ] BIO 模型：`InputStream`/`OutputStream`、`Reader`/`Writer` 体系
- [ ] NIO 核心概念：Buffer、Channel、Selector
- [ ] Linux IO 模型演进：**阻塞 IO → 非阻塞 IO → IO 多路复用（select / poll / epoll）→ 信号驱动 → 异步 IO**
- [ ] epoll vs select/poll 的核心优势（事件驱动、O(1) 就绪回调、无 fd 数量限制）
- [ ] Java NIO 与 Linux epoll 的关系（Netty 为什么高性能）
- [ ] `Files` 工具类（`Files.readAllLines`、`Files.write`）
- [ ] 序列化：`Serializable`、`transient`、`Externalizable`

**实践任务：**
- [ ] 使用 NIO 实现简易文件拷贝（对比 BIO 版本性能）
- [ ] 用 `strace` 观察 Java NIO 程序的 `epoll_wait` 系统调用

**输出成果：**
- [ ] 笔记：《BIO / NIO / AIO 与 Linux IO 多路复用详解》

---

#### 2026-08-25（周二）🏢 — Linux 基础：命令 + Shell + 性能监控

**学习内容：**
- [ ] Linux 常用命令速查（文件操作、文本处理、网络、进程）
- [ ] 文本三剑客：`grep` / `sed` / `awk` 实战
- [ ] Shell 脚本基础：变量、条件、循环、函数
- [ ] 性能监控工具：
  - `top` / `htop`：CPU 与内存
  - `iostat`：磁盘 IO
  - `vmstat`：虚拟内存与上下文切换
  - `netstat` / `ss`：网络连接
  - `sar`：系统活动历史报告
- [ ] 日志分析：`tail -f` + `grep` + 管道组合

**实践任务：**
- [ ] 编写 Shell 脚本：自动部署 Spring Boot 应用（`nohup java -jar` + 日志重定向）
- [ ] 编写 Shell 脚本：监控 Java 进程 CPU 占用，超过阈值自动记录线程栈
- [ ] 用 `top -Hp <pid>` 定位 Java 进程中 CPU 最高的线程，结合 `jstack` 分析

```bash
# 查看进程内 CPU 占用最高的线程
top -Hp $(pgrep -f my-application)

# 将线程 PID 转为十六进制
printf "%x\n" <tid>

# 在 jstack 输出中搜索对应 nid
jstack <pid> | grep -A 20 "nid=0x<hex>"
```

**输出成果：**
- [ ] 笔记：《Linux 运维速查手册（Java 开发视角）》

---

#### 2026-08-26（周三）🏢 — 注解与反射深入

**学习内容：**
- [ ] 注解分类：`@Retention`（SOURCE / CLASS / RUNTIME）
- [ ] 元注解：`@Target`、`@Repeatable`、`@Inherited`
- [ ] 注解解析：通过反射读取注解信息
- [ ] 自定义注解实战

**实践任务：**
- [ ] 实现一个简易路由注解 `@RequestMapping`
- [ ] 实现一个简易日志注解 `@Log`（AOP + 注解）

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-08-27（周四）🏢 — 枚举与常用工具类

**学习内容：**
- [ ] 枚举底层：编译后生成继承 `java.lang.Enum` 的类
- [ ] 枚举方法：`values()`、`valueOf()`、自定义属性
- [ ] 枚举实现单例的原理与优势
- [ ] `Objects`、`Optional`、`StringUtils` 等工具类
- [ ] `CompletableFuture` 基础（简单用法）

**实践任务：**
- [ ] 设计 `OrderStatus`、`PayStatus` 等业务枚举（含 code + desc）
- [ ] 使用 `CompletableFuture.supplyAsync` 并行调用两个接口

---

#### 2026-08-28（周五）🏢 — Java 8 Stream 深入

**学习内容：**
- [ ] 收集器 `collect`：`toList`、`groupingBy`、`partitioningBy`、`joining`
- [ ] 并行 Stream：`parallelStream()` 原理（ForkJoinPool）
- [ ] 日期时间 API：`LocalDate`、`LocalDateTime`、`DateTimeFormatter`
- [ ] `reduce` 归约操作与 `flatMap` 扁平化

**实践任务：**
- [ ] 用 Stream 实现数据的分组统计（按日期统计订单金额，按品类分组求和）

---

#### 2026-08-29（周六）🏠 — 算法：栈与队列

**LeetCode 题目：**
- [ ] [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)
- [ ] [225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)
- [ ] [232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)
- [ ] [150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)

---

#### 2026-08-30（周日）🏠 — 算法：二叉树

**LeetCode 题目：**
- [ ] [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)（递归 + 迭代）🔁
- [ ] [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
- [ ] [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)
- [ ] [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

**学习要点：** DFS（递归 / 迭代）、BFS（队列实现）

---

#### 2026-08-31（周一）🏢 — 第一阶段总复习

- [ ] 复习所有 Java 基础知识点（集合、泛型、异常、IO、反射、Linux IO）
- [ ] 完成 Java 基础 100 问的最终整理
- [ ] 输出博客文章一篇（HashMap / JVM 内存布局 / Linux IO 模型 三选一）
- [ ] LeetCode 2 题（本周复习错题 + 新题）
- [ ] 更新简历"专业技能"部分

---

### 第二阶段：JVM + 并发编程（09-01 ~ 09-30）

#### 2026-09-01（周二）🏢 — JVM 内存模型（JMM）

**学习内容：**
- [ ] JVM 内存区域划分：栈、堆、方法区、程序计数器、本地方法栈
- [ ] 堆内存分代：Eden / Survivor（S0、S1）/ Old
- [ ] 堆外内存与直接内存（`DirectByteBuffer`）
- [ ] JMM 内存可见性：主内存 vs 工作内存
- [ ] 内存交互协议：read → load → use → assign → store → write

**实践任务：**
- [ ] 写一段代码分析 JVM 运行时内存分布（`jmap -heap`）
- [ ] 验证可见性问题：一个线程修改变量，另一个线程不可见

**输出成果：**
- [ ] 笔记：《JVM 内存模型与 JMM 内存可见性详解》

---

#### 2026-09-02（周三）🏢 — 类加载机制

**学习内容：**
- [ ] 类的生命周期：加载 → 验证 → 准备 → 解析 → 初始化 → 使用 → 卸载
- [ ] 双亲委派模型：工作原理与优势（避免类重复加载）
- [ ] 破坏双亲委派：SPI（`ServiceLoader`）、OSGi、热部署
- [ ] 类加载器分类：Bootstrap / Extension / Application / 自定义
- [ ] 初始化时机：`<clinit>()` 方法的触发条件

**实践任务：**
- [ ] 自定义 ClassLoader，加载指定目录下的 class 文件
- [ ] 实现 Tomcat 类加载器简化版（打破双亲委派）

**输出成果：**
- [ ] 笔记：《JVM 类加载机制详解 + 自定义 ClassLoader》

---

#### 2026-09-03（周四）🏢 — GC 算法

**学习内容：**
- [ ] 可达性分析算法：GC Roots（虚拟机栈引用、静态变量等）
- [ ] 标记-清除、标记-复制、标记-整理算法的原理与优缺点
- [ ] 分代收集理论：弱分代假说、强分代假说
- [ ] STW（Stop The World）现象的成因与影响
- [ ] JVM 常用启动参数：`-Xms`、`-Xmx`、`-Xmn`、`-XX:+PrintGCDetails`

**实践任务：**
- [ ] 写 OOM 实验：`-Xmx64m` 下不断创建对象触发 GC
- [ ] 使用 GC 日志分析工具（GCeasy）分析 GC 日志
- [ ] 对比不同 GC 参数下的 GC 次数和耗时

**输出成果：**
- [ ] 笔记：《JVM 垃圾回收算法详解 + GC 日志分析实战》

---

#### 2026-09-04（周五）🏢 — GC 收集器

**学习内容：**
- [ ] Serial / Serial Old：适合客户端模式的单线程收集器
- [ ] Parallel Scavenge / Parallel Old：吞吐量优先
- [ ] CMS：低延迟收集器（标记-清除），已废弃
- [ ] G1：region 化、预测性停顿、Mixed GC
- [ ] ZGC / Shenandoah：现代低延迟收集器
- [ ] GC 选型总结：吞吐量优先 vs 延迟优先

**实践任务：**
- [ ] 对比 Serial GC vs Parallel GC vs G1 GC 在不同场景下的表现
- [ ] 使用 `jstat -gcutil` 实时监控 GC 状态

---

#### 2026-09-05（周六）🏠 — GC 调优实战

**学习内容：**
- [ ] GC 调优基本思路：监控 → 分析 → 优化 → 验证
- [ ] 常见 OOM 场景：堆溢出、栈溢出、Metaspace 溢出、直接内存溢出
- [ ] Arthas 工具使用：`dashboard`、`thread`、`jvm`、`heap dump`
- [ ] GC 日志分析与问题定位

**实践任务：**
- [ ] 用 Arthas attached 到本地 Java 进程进行监控
- [ ] 模拟 Metaspace OOM 并修复
- [ ] 模拟堆内存泄漏（静态集合持有大量对象）并使用 `jmap -dump` + MAT 分析
- [ ] 整理 GC 调优 checklist

**输出成果：**
- [ ] 博客文章：《JVM GC 调优实战：从 OOM 到优化》

---

#### 2026-09-06（周日）🏠 — 算法：二叉树进阶

**LeetCode 题目：**
- [ ] [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)
- [ ] [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)
- [ ] [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- [ ] [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)

---

#### 2026-09-07 ~ 09-11（周一至周五）🏢 — 并发编程第一周

**学习内容：**
- [ ] `Thread`、`Runnable`、`Callable`、`Future`、`FutureTask`
- [ ] 线程状态：`NEW` → `RUNNABLE` → `BLOCKED` → `WAITING` → `TIMED_WAITING` → `TERMINATED`
- [ ] 可见性、原子性、有序性：并发编程三问题
- [ ] `synchronized` 底层：monitor、对象头、锁升级（偏向 → 轻量 → 重量）
- [ ] `volatile`：内存屏障、禁止指令重排、DCL 单例模式
- [ ] `CAS`：`Unsafe`、`AtomicInteger`、ABA 问题、`AtomicStampedReference`

**实践任务：**
- [ ] 用 `synchronized` 实现一个线程安全的计数器
- [ ] 用 `volatile` + `AtomicInteger` 分别实现计数器，对比差异
- [ ] 通过 JOL 分析对象头大小（无锁 → 偏向锁 → 轻量级锁 → 重量级锁）
- [ ] 用 `javap -c` 查看 synchronized 字节码（`monitorenter` / `monitorexit`）

**输出成果：**
- [ ] 笔记：《Java 并发底层：synchronized、volatile、CAS 详解》

---

#### 2026-09-12（周六）🏠 — 算法：堆与优先队列

**LeetCode 题目：**
- [ ] [215. 数组中的第 K 个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)（快排 / 堆）
- [ ] [23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)（小顶堆）
- [ ] [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)
- [ ] [295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/)

---

#### 2026-09-13（周日）🏠 — 算法：回溯算法

**LeetCode 题目：**
- [ ] [77. 组合](https://leetcode.cn/problems/combinations/)
- [ ] [78. 子集](https://leetcode.cn/problems/subsets/)
- [ ] [46. 全排列](https://leetcode.cn/problems/permutations/)
- [ ] [51. N 皇后](https://leetcode.cn/problems/n-queens/)

---

#### 2026-09-14 ~ 09-18（周一至周五）🏢 — 并发编程第二周

**学习内容：**
- [ ] `ReentrantLock` 底层实现：AQS + `Sync`（公平 / 非公平）
- [ ] `Lock` 与 `synchronized` 的全面对比
- [ ] `Condition`：`await` / `signal`（等待队列）
- [ ] `ThreadPoolExecutor` 7 个参数 + 4 种拒绝策略
- [ ] 线程池状态：`RUNNING` → `SHUTDOWN` → `STOP` → `TIDYING` → `TERMINATED`
- [ ] `ConcurrentHashMap` 1.8：CAS + synchronized + 红黑树

**实践任务：**
- [ ] 用 `ReentrantLock` + `Condition` 实现生产者-消费者模型
- [ ] 手写简易线程池（实现核心线程、任务队列、拒绝策略）
- [ ] 分析生产环境线程池配置是否合理（CPU 密集型 vs IO 密集型）
- [ ] 阅读 `ConcurrentHashMap` 源码中的 `putVal` 方法

**输出成果：**
- [ ] 代码提交 GitHub（手写线程池）
- [ ] 笔记：《ThreadPoolExecutor 源码逐行分析》

---

#### 2026-09-19（周六）🏠 — 算法：动态规划（入门）

**LeetCode 题目：**
- [ ] [70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)
- [ ] [518. 零钱兑换 II](https://leetcode.cn/problems/coin-change-ii/)（完全背包）
- [ ] [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)
- [ ] [1143. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/)

---

#### 2026-09-20（周日）🏠 — 算法：动态规划（进阶）

**LeetCode 题目：**
- [ ] [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)
- [ ] [55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)
- [ ] [45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)
- [ ] [72. 编辑距离](https://leetcode.cn/problems/edit-distance/)

---

#### 2026-09-21 ~ 09-25（周一至周五）🏢 — 并发编程第三周

**学习内容：**
- [ ] AQS 原理：`AbstractQueuedSynchronizer`、CLH 队列、state 状态
- [ ] `CountDownLatch` / `CyclicBarrier` / `Semaphore` 源码分析
- [ ] `CompletableFuture` 异步编程：`thenApply`、`thenCompose`、`allOf`
- [ ] `ForkJoinPool` 与工作窃取（work-stealing）
- [ ] `ThreadLocal` 原理、内存泄漏问题、`InheritableThreadLocal`
- [ ] `LockSupport.park/unpark` 底层原理

**实践任务：**
- [ ] 用 `CompletableFuture` 改造现有同步接口为异步（多接口并行编排）
- [ ] 实现一个简易的 `MyCountDownLatch`
- [ ] 分析 `ThreadLocal` 内存泄漏场景并修复（使用 `remove`）
- [ ] Debug 跟踪 AQS 的 `acquire` → `tryAcquire` → `addWaiter` → `acquireQueued` 流程

**输出成果：**
- [ ] 笔记：《AQS 原理与 CompletableFuture 异步编程》
- [ ] 博客文章：《AQS 源码分析：一个锁的底层实现》

---

#### 2026-09-26（周六）🏠 — 算法：图论基础

**LeetCode 题目：**
- [ ] [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)（DFS / BFS）
- [ ] [1020. 飞地的数量](https://leetcode.cn/problems/number-of-enclaves/)
- [ ] [997. 找到小镇的法官](https://leetcode.cn/problems/find-the-town-judge/)
- [ ] [733. 图像渲染](https://leetcode.cn/problems/flood-fill/)

---

#### 2026-09-27（周日）🏠 — 算法：贪心算法

**LeetCode 题目：**
- [ ] [455. 分发饼干](https://leetcode.cn/problems/assign-cookies/)
- [ ] [376. 摆动序列](https://leetcode.cn/problems/wiggle-subsequence/)
- [ ] [122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)
- [ ] [55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)

---

#### 2026-09-28 ~ 09-30（周一至周三）🏢 — 阶段总复习

- [ ] JVM 全部知识点复盘（JMM、类加载、GC、调优）
- [ ] 并发编程全部知识点复盘（锁、线程池、AQS、并发工具类）
- [ ] 输出博客文章一篇（JVM GC 选型 / AQS 原理 / 线程池参数配置）
- [ ] LeetCode 3 题（本月错题重做 + 新题）
- [ ] 模拟面试：并发编程 + JVM 面试题自测（录音回听）

---

### 第三阶段：数据库 + 缓存 + Spring 生态 + 分布式（10-01 ~ 10-25）

#### 2026-10-01 ~ 10-03（国庆假期 🎆）🏠 — MySQL 第一弹

**学习内容：**
- [ ] MySQL 架构概览：连接层 → 解析层 → 优化器 → 执行引擎 → 存储引擎
- [ ] InnoDB vs MyISAM 对比（事务、锁、MVCC、聚簇索引）
- [ ] B+ 树 vs B 树 vs Hash 索引：为什么 InnoDB 选择 B+ 树
- [ ] 索引数据结构：聚簇索引 vs 非聚簇索引、覆盖索引、回表
- [ ] 索引设计原则：最左匹配、索引失效场景

**实践任务：**
- [ ] 创建测试表（100 万行数据），分别测试有索引 vs 无索引的查询耗时
- [ ] 使用 `EXPLAIN` 分析 SQL 执行计划（type、key、rows、Extra）
- [ ] 实践索引失效场景：`LIKE '%xxx'`、函数操作、隐式类型转换、`OR` 连接

**输出成果：**
- [ ] 笔记：《MySQL 索引原理与优化实战》

---

#### 2026-10-04（周日）🏠 — 算法：SQL 练习

**LeetCode 数据库题目：**
- [ ] [176. 第二高的薪水](https://leetcode.cn/problems/second-highest-salary/)
- [ ] [178. 分数排名](https://leetcode.cn/problems/rank-scores/)
- [ ] [182. 查找重复的电子邮箱](https://leetcode.cn/problems/duplicate-emails/)
- [ ] [184. 部门工资最高的员工](https://leetcode.cn/problems/department-highest-salary/)

---

#### 2026-10-05（周一）🏢 — MySQL 事务与锁

**学习内容：**
- [ ] 事务特性：ACID 与实现原理（undo log + redo log）
- [ ] 隔离级别：Read Uncommitted → Read Committed → Repeatable Read → Serializable
- [ ] MVCC：undo log、Read View、当前读 vs 快照读
- [ ] InnoDB 锁：共享锁、排他锁、意向锁、间隙锁、临键锁
- [ ] 死锁产生条件与排查

**实践任务：**
- [ ] 验证不同隔离级别下的脏读、不可重复读、幻读
- [ ] 使用 `SHOW ENGINE INNODB STATUS` 分析死锁
- [ ] 模拟间隙锁场景，验证 RR 级别下幻读被消除

---

#### 2026-10-06（周二）🏢 — MySQL 调优 + 分库分表

**学习内容：**
- [ ] `EXPLAIN` 详解：type（const / ref / range / index / ALL）
- [ ] 慢查询日志：开启、分析、优化闭环
- [ ] 索引优化：覆盖索引、索引下推（ICP）、前缀索引、`ORDER BY` 优化
- [ ] 大表优化：分库分表策略（水平 / 垂直）、读写分离、ShardingSphere

**实践任务：**
- [ ] 开启慢查询日志（`long_query_time = 1s`），分析并优化 3 条慢 SQL
- [ ] 对订单表创建复合索引并验证最左匹配
- [ ] 设计分库分表方案：订单表按 user_id 取模分 16 库

---

#### 2026-10-07（周三）🏢 — Redis 基础

**学习内容：**
- [ ] Redis 5 种基本数据结构：String、Hash、List、Set、ZSet
- [ ] 各数据结构的底层实现（ziplist、skip list、hash table、sds、intset）
- [ ] Redis 线程模型：单线程（6.0 前）/ IO 多路复用 / 为什么快
- [ ] 持久化：RDB（快照）vs AOF（追加日志）vs 混合持久化
- [ ] Redis 6.0 多线程网络模型

**实践任务：**
- [ ] Redis 每种数据类型各写 5 个使用场景的代码
- [ ] 手动触发 `BGSAVE`、`BGREWRITEAOF`，观察生成的文件

**输出成果：**
- [ ] 笔记：《Redis 数据结构底层实现与持久化机制》

---

#### 2026-10-08（周四）🏢 — Redis 高级特性

**学习内容：**
- [ ] 缓存经典问题：穿透、击穿、雪崩 → 解决方案
- [ ] 分布式锁：`SETNX`、Redisson 实现、锁续期、看门狗
- [ ] 过期策略：惰性删除 + 定期删除
- [ ] 淘汰策略：LRU、LFU（8.0+）、random、ttl
- [ ] Redis Cluster 集群：槽位分配、Gossip 协议、集群扩缩容

**实践任务：**
- [ ] 使用 Redisson 实现分布式锁（含看门狗续期）
- [ ] 模拟缓存穿透场景并实现解决方案（布隆过滤器）
- [ ] 模拟缓存雪崩场景并解决（过期时间加随机值）
- [ ] 搭建 Redis Cluster（3 主 3 从），验证故障转移

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-10-09（周五）🏢 — Redis 实战：缓存系统

**实践任务：**
- [ ] 设计并实现商品缓存系统（Cache Aside 模式）
- [ ] 实现缓存一致性保障：延时双删、binlog 异步更新（Canal）
- [ ] 统计缓存命中率（`INFO stats`）
- [ ] 用 Lua 脚本实现库存预扣减的原子操作

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-10-10（周六）🏠 — 算法：二分查找

**LeetCode 题目：**
- [ ] [704. 二分查找](https://leetcode.cn/problems/binary-search/)
- [ ] [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)
- [ ] [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/)
- [ ] [162. 寻找峰值](https://leetcode.cn/problems/find-peak-element/)

---

#### 2026-10-11（周日）🏠 — Spring Boot 原理

**学习内容：**
- [ ] Spring Boot 自动配置原理：`@SpringBootApplication` = `@Configuration` + `@ComponentScan` + `@EnableAutoConfiguration`
- [ ] `spring.factories` / `META-INF/spring/...imports` 与 `@Conditional` 系列注解
- [ ] Bean 的生命周期：实例化 → 属性填充 → 初始化 → 销毁
- [ ] Bean 的作用域：singleton、prototype、request、session
- [ ] Spring 循环依赖与三级缓存解决机制

**实践任务：**
- [ ] 阅读 `DataSourceAutoConfiguration` 源码，理解自动配置流程
- [ ] 手写一个简易 starter（`my-starter-spring-boot-starter` 简化版）

**输出成果：**
- [ ] 笔记：《Spring Boot 自动配置原理与 Bean 生命周期》

---

#### 2026-10-12（周一）🏢 — Spring Boot 实战：RESTful API + 数据访问

**实践任务：**
- [ ] 搭建一个规范的 Spring Boot 项目骨架
- [ ] 统一异常处理：`@RestControllerAdvice` + `@ExceptionHandler`
- [ ] 统一响应封装：`Result<T>`、分页参数 `PageParam`
- [ ] 参数校验：`@Valid`、`@NotBlank`、自定义校验注解
- [ ] 全局日志 + 链路 ID（MDC）
- [ ] MyBatis-Plus 集成：通用 CRUD、条件构造器、分页插件
- [ ] 验证事务传播行为（REQUIRED、REQUIRES_NEW、NESTED）

**输出成果：**
- [ ] 代码提交 GitHub（Spring Boot 脚手架）

---

#### 2026-10-13（周二）🏢 — MyBatis 源码 + Spring Boot Redis 整合

**学习内容：**
- [ ] `SqlSessionFactory` 构建过程
- [ ] `MapperProxy`：动态代理实现 SQL 执行
- [ ] 一级缓存（SqlSession 级别）与二级缓存（Mapper 级别）
- [ ] `RedisTemplate` vs `StringRedisTemplate` 区别
- [ ] `@Cacheable` / `@CachePut` / `@CacheEvict` 注解
- [ ] Spring Cache 抽象 vs Caffeine 本地缓存

**实践任务：**
- [ ] 阅读 `MapperProxyFactory` 源码
- [ ] 验证一级缓存 vs 二级缓存的行为差异
- [ ] 在 Spring Boot 项目中集成 Redis 缓存

---

#### 2026-10-14（周三）🏢 — Spring Cloud（一）：服务治理与通信

**学习内容：**
- [ ] 微服务架构演进：单体 → 垂直拆分 → SOA → 微服务
- [ ] Nacos：服务注册与发现、配置中心（动态配置推送）
- [ ] OpenFeign：声明式 HTTP 调用、超时重试、日志级别
- [ ] Spring Cloud Gateway：路由、断言、过滤器、限流
- [ ] 负载均衡：LoadBalancer 替代 Ribbon

**实践任务：**
- [ ] 将 Spring Boot 脚手架拆分为 3 个微服务（user-service / product-service / order-service）
- [ ] 注册到 Nacos，通过 OpenFeign 完成服务间调用
- [ ] 配置 Gateway 路由规则 + 全局过滤器

```yaml
# application.yml 示例
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
    gateway:
      routes:
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/product/**
          filters:
            - StripPrefix=2
```

**输出成果：**
- [ ] 代码提交 GitHub（微服务骨架）

---

#### 2026-10-15（周四）🏢 — Spring Cloud（二）：容错与可观测性

**学习内容：**
- [ ] Sentinel：流控规则、熔断降级、热点参数限流、系统自适应限流
- [ ] Seata：分布式事务方案（AT / TCC / SAGA / XA）
- [ ] Spring Cloud Sleuth + Zipkin：分布式链路追踪
- [ ] SkyWalking：自动探针式链路追踪
- [ ] Spring Cloud Config vs Nacos Config

**实践任务：**
- [ ] 接入 Sentinel Dashboard，配置 QPS 限流 + 熔断规则
- [ ] 用 Seata AT 模式实现 order-service 调用 product-service 的分布式事务
- [ ] 集成 Sleuth + Zipkin，追踪一次完整的跨服务调用链

**输出成果：**
- [ ] 笔记：《Spring Cloud 微服务治理全景》

---

#### 2026-10-16（周五）🏢 — 分布式系统理论

**学习内容：**
- [ ] CAP 定理：一致性、可用性、分区容错性（三选二）
- [ ] BASE 理论：基本可用、软状态、最终一致性
- [ ] 一致性模型：强一致、单调一致、最终一致、因果一致
- [ ] 共识算法：Paxos、Raft（Leader 选举、日志复制）
- [ ] 分布式 ID 生成：Snowflake、UUID、Redis INCR、Leaf、TinyID
- [ ] 分布式锁对比：Redis（Redisson）vs Zookeeper vs etcd

**实践任务：**
- [ ] 手写 Snowflake ID 生成器（含时钟回拨处理）
- [ ] 对比 Redis 分布式锁 vs ZK 分布式锁的实现差异

**输出成果：**
- [ ] 笔记：《分布式系统核心理论：从 CAP 到 Raft》

---

#### 2026-10-17（周六）🏠 — 算法：滑动窗口与双指针

**LeetCode 题目：**
- [ ] [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)（滑动窗口）
- [ ] [438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)
- [ ] [560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)（前缀和 + 哈希）
- [ ] [76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)（hard，滑动窗口 hard 版）

---

#### 2026-10-18（周日）🏠 — 分布式实战 + Spring Cloud 综合练习

**实践任务：**
- [ ] 实现分布式限流器（Redis + Lua 滑动窗口）
- [ ] 实现接口幂等性方案（Token + 去重表 / Redis SETNX）
- [ ] 用 Redisson 分布式锁保护商品扣减操作
- [ ] 模拟 Seata TCC 模式：Try-Confirm-Cancel 三阶段编码
- [ ] LeetCode 2 题（分布式相关：并发题 / 设计题）

**输出成果：**
- [ ] 代码提交 GitHub（分布式工具集）

---

#### 2026-10-19（周一）🏢 — 消息队列（一）：RabbitMQ

**学习内容：**
- [ ] MQ 核心概念：生产者、消费者、交换机、队列、路由键
- [ ] RabbitMQ 架构与 Exchange 类型（direct / fanout / topic / headers）
- [ ] 消息可靠性：Confirm 机制、Return 机制、持久化、手动 ACK
- [ ] 死信队列（DLX）：TTL、队列满、消费者拒绝

**实践任务：**
- [ ] 搭建 RabbitMQ（Docker），完成 4 种 Exchange 的发送/接收
- [ ] 实现订单超时取消（30 分钟未支付自动取消）：DLX + TTL
- [ ] 验证消息不丢失：Confirm + 持久化 + ACK

```bash
# Docker 搭建 RabbitMQ
docker run -d --name rabbitmq \
  -p 5672:5672 -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=admin \
  rabbitmq:3.13-management
```

**输出成果：**
- [ ] 代码提交 GitHub

---

#### 2026-10-20（周二）🏢 — 消息队列（二）：RocketMQ + Kafka 速览

**学习内容：**
- [ ] RocketMQ 架构：NameServer、Broker、Producer、Consumer
- [ ] RocketMQ vs RabbitMQ vs Kafka 选型对比
- [ ] 消息投递语义：At most once / At least once / Exactly once
- [ ] 消息幂等性：唯一 ID + 去重表
- [ ] 顺序消息与事务消息
- [ ] Kafka 核心概念速览（Topic / Partition / Consumer Group / ISR）

**实践任务：**
- [ ] 搭建 RocketMQ（Docker），实现基本发送/接收
- [ ] 实现事务消息：订单创建 → 扣减库存 → 消息确认
- [ ] 验证顺序消息：同一订单的创建→支付→发货消息有序消费

---

#### 2026-10-21（周三）🏢 — 设计模式精讲

**学习内容：**
- [ ] 创建型：单例（6 种写法）、工厂方法、抽象工厂、建造者
- [ ] 结构型：代理（JDK 动态代理 / CGLIB）、装饰器、适配器
- [ ] 行为型：策略、模板方法、观察者、责任链
- [ ] Spring 框架中设计模式的使用场景（`BeanFactory` 工厂、`AOP` 代理、`JdbcTemplate` 模板方法、`ApplicationEvent` 观察者）

**实践任务：**
- [ ] 用工厂模式重构项目中的对象创建逻辑
- [ ] 用策略模式实现多种支付方式（微信、支付宝、银行卡）
- [ ] 用责任链模式实现订单风控校验链

---

#### 2026-10-22（周四）🏢 — Spring Boot 自动配置源码 + 复习

**学习内容：**
- [ ] `@EnableAutoConfiguration` → `AutoConfigurationImportSelector` 源码链路
- [ ] `@Conditional` 判断流程：`ConditionMatcher` → `BeanDefinitionRegistry`
- [ ] Spring 事件机制：`ApplicationEvent` / `ApplicationListener` / `@EventListener`

**实践任务：**
- [ ] Debug 跟踪 Spring Boot 启动全流程（`SpringApplication.run`）
- [ ] 输出 Spring Boot 启动流程图

---

#### 2026-10-23（周五）🏢 — 第三阶段复习 + 博客输出

- [ ] MySQL + Redis + Spring Boot + Spring Cloud + MQ + 分布式 全知识点串联复习
- [ ] 输出博客文章一篇（RocketMQ 原理 / MyBatis 源码 / Spring Boot 启动流程 / 分布式事务方案）
- [ ] 整理 MySQL、Redis、Spring Cloud 高频面试题各 20 道
- [ ] LeetCode 2 题（本月错题重做）

---

#### 2026-10-24（周六）🏠 — 算法：链表进阶

**LeetCode 题目：**
- [ ] [148. 排序链表](https://leetcode.cn/problems/sort-list/)（归并排序）
- [ ] [160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)
- [ ] [234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)
- [ ] [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

---

#### 2026-10-25（周日）🏠 — 第三阶段总复习

- [ ] 全阶段知识点思维导图梳理（MySQL → Redis → Spring → 分布式 → MQ）
- [ ] 整理 **数据库 + 中间件面试 100 问**
- [ ] LeetCode 2 题（复习错题 + 新题）
- [ ] 准备秒杀系统开发环境（Docker 搭建 MySQL + Redis + RabbitMQ + Nacos）

---

### 第四阶段：高并发实战 + 容器化（10-26 ~ 11-04）

#### 2026-10-26（周一）🏢 — 秒杀系统架构设计

**学习内容：**
- [ ] 秒杀系统核心挑战：瞬时高并发、超卖、恶意请求
- [ ] 限流算法：令牌桶、漏桶、滑动窗口
- [ ] 系统架构分层：接入层 → 网关层 → 服务层 → 数据层
- [ ] 分布式 ID 生成：Snowflake 落地
- [ ] 接口幂等性设计：Token + 去重表

**设计任务：**
- [ ] 绘制秒杀系统架构图（draw.io / Excalidraw）
- [ ] 设计数据库表结构：用户、商品、订单、库存
- [ ] 设计 RESTful API 接口文档
- [ ] 设计微服务拆分方案（复用第三阶段微服务骨架）

---

#### 2026-10-27（周二）🏢 — 秒杀 V1：基础版

**技术栈：** Spring Boot + Spring Cloud + MySQL

**实现内容：**
- [ ] 用户服务：登录（JWT）、用户信息查询
- [ ] 商品服务：商品列表、商品详情、库存查询
- [ ] 订单服务：创建订单、订单查询
- [ ] 基础秒杀接口：`POST /api/seckill/{skuId}`
- [ ] Gateway 路由 + Nacos 注册

**代码结构：**

```
seckill/
├── seckill-common/       # 通用模块（枚举、异常、DTO、工具类）
├── seckill-user/         # 用户服务
├── seckill-product/      # 商品服务
├── seckill-order/        # 订单服务
├── seckill-stock/        # 库存服务
├── seckill-gateway/      # 网关（Spring Cloud Gateway）
└── seckill-mq/           # MQ 消费者
```

---

#### 2026-10-28（周三）🏢 — 秒杀 V2：加入 Redis

**优化内容：**
- [ ] 商品信息缓存：热点商品预加载到 Redis
- [ ] 库存预扣减：Redis `DECRBY` 预扣库存（Lua 脚本保证原子性）
- [ ] 用户是否已购买校验（Redis Set 记录已购买用户）
- [ ] 库存流水记录（用于后续对账）

**压测：** JMeter 50 并发，观察数据库 QPS 对比

---

#### 2026-10-29（周四）🏢 — 秒杀 V3：加入 MQ + 限流

**优化内容：**
- [ ] RabbitMQ 削峰填谷：秒杀请求先入队，异步消费创建订单
- [ ] 流量控制：令牌桶限流保护下游服务
- [ ] 接口限流：Redis + Lua 实现 IP 级别限流
- [ ] 超时未支付订单自动取消（DLX + TTL）
- [ ] Sentinel 配置网关层流控规则

**压测：** JMeter 200 并发，观察 MQ 堆积情况

---

#### 2026-10-30（周五）🏢 — 秒杀 V4：生产级完善

**优化内容：**
- [ ] 分布式锁（Redisson）：防止多实例超卖
- [ ] 接口幂等性：请求令牌 + 去重表
- [ ] 限流降级：Guava RateLimiter / Redis 滑动窗口
- [ ] 压力测试：JMeter 1000 并发压测
- [ ] 性能瓶颈分析与优化
- [ ] Seata 分布式事务保障（创建订单 + 扣减库存）

**压测：** JMeter 阶梯式加压（50 → 200 → 500 → 1000）

---

#### 2026-10-31（周六）🏠 — Docker 容器化

**学习内容：**
- [ ] Docker 核心概念：镜像、容器、仓库、Dockerfile
- [ ] 多阶段构建（Multi-stage Build）减小镜像体积
- [ ] Docker Compose 编排多服务
- [ ] 镜像优化：基础镜像选择、层缓存、`.dockerignore`

**实践任务：**
- [ ] 编写每个微服务的 Dockerfile（多阶段构建）
- [ ] 编写 `docker-compose.yml`：Nacos + MySQL + Redis + RabbitMQ + 微服务
- [ ] 使用 `docker-compose up` 一键启动整套系统

```dockerfile
# 多阶段构建示例
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

---

#### 2026-11-01（周日）🏠 — Kubernetes 部署

**学习内容：**
- [ ] K8s 核心概念：Pod、Deployment、Service、Ingress、ConfigMap、Secret
- [ ] HPA：根据 CPU/内存使用率自动扩缩容
- [ ] Ingress Nginx 配置路径转发
- [ ] StatefulSet 部署有状态服务（MySQL / Redis）

**实践任务：**
- [ ] 编写 K8s 部署 YAML（Deployment + Service + Ingress + ConfigMap）
- [ ] 本地搭建 Minikube 并部署秒杀系统
- [ ] 配置 HPA：CPU 使用率 > 70% 时自动扩容（min: 2, max: 10）

```yaml
# HPA 示例
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: seckill-order-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: seckill-order
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

---

#### 2026-11-02（周一）🏢 — 压测与性能优化

**实践任务：**
- [ ] JMeter 压测脚本编写与执行（阶梯加压）
- [ ] 分析压测报告：QPS、响应时间（P99）、错误率
- [ ] 数据库优化：索引优化、连接池调优（HikariCP 参数）
- [ ] Redis 优化：Pipeline 批量操作、连接池调优
- [ ] JVM 调优：GC 日志分析、堆内存调整（`-Xms` / `-Xmx` / `-XX:+UseG1GC`）
- [ ] 使用 Arthas 定位慢方法（`trace` / `watch` / `profiler`）

**输出成果：**
- [ ] 压测报告文档（含优化前后对比数据）

---

#### 2026-11-03（周二）🏢 — 项目收尾与文档

- [ ] 完善项目 README（架构图、接口文档、部署步骤、技术栈说明）
- [ ] 录制项目演示视频（可选）
- [ ] 代码 Review 与重构（消除坏味道、补充注释）
- [ ] 上传代码到 GitHub，配置 CI（GitHub Actions 自动构建）

---

#### 2026-11-04（周三）🏢 — 最终复盘

- [ ] 3 个月学习回顾与总结（对照能力评估矩阵逐项打分）
- [ ] 输出最终博客文章：《3 个月 Java 后端进阶之路》
- [ ] 制定下一步成长方向（云原生 / Service Mesh / 大数据 / 架构师）
- [ ] 更新简历项目经验（秒杀系统 + 微服务项目）
- [ ] 整理全部博客文章目录与 GitHub 仓库索引

---

## 🛠️ 实践项目

### 项目一：Java 集合框架简易实现

| 项目 | 时间 | 内容 | 技术要点 |
|------|------|------|----------|
| MyArrayList | 08-08 | 手写动态数组 | 数组扩容、泛型、fail-fast |
| MyHashMap | 08-09 | 手写哈希表 | hash 扰动、拉链法、扩容 |
| MyThreadPool | 09-14 | 手写线程池 | 任务队列、拒绝策略、线程管理 |

### 项目二：Spring Boot 脚手架 + 微服务拆分

| 阶段 | 时间 | 内容 | 技术要点 |
|------|------|------|----------|
| 脚手架 | 10-12 | 统一异常/响应/校验/日志 | RESTful 规范、MyBatis-Plus |
| 单体拆分 | 10-14 | 拆为 user/product/order 三服务 | Nacos、OpenFeign、Gateway |
| 服务治理 | 10-15 | 接入 Sentinel + Seata + Sleuth | 限流降级、分布式事务、链路追踪 |

### 项目三：秒杀系统（高并发实战）

| 版本 | 时间 | 内容 | 技术要点 |
|------|------|------|----------|
| V1 基础版 | 10-27 | Spring Cloud + MySQL | 微服务架构、JWT 鉴权 |
| V2 加缓存 | 10-28 | + Redis 缓存 + 库存预扣 | Cache Aside、Lua 原子操作 |
| V3 加 MQ | 10-29 | + RabbitMQ 削峰 + 限流 | 异步解耦、DLX、Sentinel |
| V4 生产版 | 10-30 | + 分布式锁 + 幂等 + 压测 | Redisson、Seata、HPA |

**最终项目结构：**

```
seckill/
├── seckill-common/          # 通用模块（枚举、异常、DTO、工具类）
├── seckill-user/            # 用户服务（登录、用户信息）
├── seckill-product/         # 商品服务（商品列表、详情、库存缓存）
├── seckill-order/           # 订单服务（创建订单、订单查询）
├── seckill-stock/           # 库存服务（库存扣减、库存查询）
├── seckill-gateway/         # 网关层（限流、鉴权、路由）
├── seckill-mq/              # MQ 消费者（异步下单、超时取消）
├── docker-compose.yml       # 容器编排
├── k8s/                     # K8s 部署文件
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   └── hpa.yaml
└── README.md
```

**技术栈总览：**

```
Spring Boot           ← Web 框架
Spring Cloud           ← 微服务生态（Nacos / Gateway / OpenFeign / Sentinel / Seata）
MyBatis-Plus           ← ORM
MySQL + InnoDB         ← 持久层
Redis + Redisson       ← 缓存 + 分布式锁
RabbitMQ               ← 消息队列
Docker + Compose       ← 容器化
Kubernetes + HPA       ← 编排与自动扩缩容
JMeter + Arthas        ← 压测与诊断
```

### 项目四：源码阅读

| 源码项目 | 时间 | 重点章节 |
|----------|------|----------|
| `HashMap` | 08-10 | put / get / resize 方法 |
| `ConcurrentHashMap` | 09-14 | putVal / helpTransfer |
| `ThreadPoolExecutor` | 09-14 | addWorker / getTask / shutdown |
| `AQS` | 09-21 | acquire / release / CLH 队列 |
| `ThreadLocal` | 09-21 | set / get / remove 内存泄漏 |
| MyBatis `MapperProxy` | 10-13 | 动态代理执行 SQL |
| Spring `BeanFactory` | 10-11 | getBean / doCreateBean |
| Spring Boot `AutoConfigurationImportSelector` | 10-22 | 自动配置加载流程 |
| Spring Cloud `Gateway` | 10-14 | 路由匹配 + 过滤器链 |

---

## 📝 每日输出要求

### 每日必做

- [ ] **学习笔记**：当日学习内容整理为 Markdown（技术要点 + 代码示例 + 个人理解）
- [ ] **代码提交**：实践代码推送到 GitHub，commit message 规范化

```bash
# commit message 规范
feat: 新增功能
fix: 修复 bug
docs: 文档变更
refactor: 重构
test: 测试相关
chore: 构建/工具变更
```

- [ ] **算法打卡**：LeetCode 至少 2 题（工作日）/ 4 题（周末），提交题解
- [ ] **时间记录**：记录每个模块的实际耗时，用于后续调整计划

### 每周必做

- [ ] **技术博客 × 1**：深度文章（1500 字以上），发布到博客平台
  - 示例选题：
    - 《HashMap 源码逐行分析》
    - 《Redis 为什么这么快？》
    - 《MySQL 索引为什么用 B+ 树？》
    - 《MQ 如何保证消息不丢失？》
    - 《AQS 源码分析：一个锁的底层实现》
    - 《JVM GC 调优实战：从 OOM 到优化》
    - 《Spring Boot 自动配置原理拆解》
    - 《从 0 到 1 搭建 Spring Cloud 微服务》
    - 《秒杀系统架构演进：从单体到微服务》
    - 《Linux IO 模型与 Java NIO》
    - 《分布式事务方案选型：Seata AT vs TCC vs SAGA》

### 每月必做

- [ ] **阶段总结博客**：当月学习全景回顾
- [ ] **面试题整理**：整理当月对应模块的高频面试题（50~100 问）
- [ ] **项目 Demo 上线**：部署到云服务器，可公网访问
- [ ] **模拟面试**：对着镜头自述面试题答案，录音回听改进表达

### 输出规范模板

```markdown
## 📅 YYYY-MM-DD 学习日志

**今日投入**：X 小时

### 学习内容
1. ...
2. ...

### 关键收获
- ...

### 遇到的问题
- ... → 解决方案：...

### 明日计划
- [ ] ...

### LeetCode
- [ ] 题目标题（难度）
```

---

## 🎯 3 个月后的能力评估

### 技术能力矩阵

| 能力维度 | 当前水平 | 目标水平 | 验证方式 |
|----------|----------|----------|----------|
| Java 基础 | ⭐⭐⭐ 会用 | ⭐⭐⭐⭐⭐ 精通 | 能回答 100 问自测、手写集合类 |
| JVM | ⭐⭐ 了解概念 | ⭐⭐⭐⭐ 熟练调优 | GC 日志分析、OOM 排查 |
| 并发编程 | ⭐⭐ 会用 synchronized | ⭐⭐⭐⭐ 深入原理 | 手写线程池、AQS 源码分析 |
| MySQL | ⭐⭐⭐ 会写 SQL | ⭐⭐⭐⭐ 优化专家 | 慢查询优化、索引设计、分库分表 |
| Redis | ⭐⭐⭐ 会基本操作 | ⭐⭐⭐⭐ 架构设计 | 缓存方案设计、分布式锁、集群 |
| MQ | ⭐⭐ 了解概念 | ⭐⭐⭐⭐ 实战运用 | 秒杀系统 MQ 整合、事务消息 |
| Spring Boot | ⭐⭐⭐⭐ 熟练使用 | ⭐⭐⭐⭐⭐ 理解原理 | 手写 starter、源码分析 |
| Spring Cloud | ⭐ 了解概念 | ⭐⭐⭐⭐ 微服务实战 | 微服务拆分、服务治理落地 |
| 分布式系统 | ⭐ 概念模糊 | ⭐⭐⭐⭐ 方案落地 | 分布式事务、分布式锁、分布式 ID |
| Linux | ⭐⭐ 会基础命令 | ⭐⭐⭐⭐ 运维排障 | 性能监控、日志分析、Shell 脚本 |
| Docker/K8s | ⭐ 会用 docker run | ⭐⭐⭐⭐ 容器化部署 | 秒杀系统 K8s 部署 + HPA |
| 系统设计 | ⭐⭐ 经验少 | ⭐⭐⭐⭐ 独立设计 | 秒杀系统架构设计 |
| 算法 | ⭐⭐⭐ 简单题 | ⭐⭐⭐⭐ medium 稳定 | LeetCode 150+ 题 |
| 面试能力 | ⭐⭐ 背诵式 | ⭐⭐⭐⭐ 理解式 | 模拟面试通过 |

### 可展示的成果

- ✅ **秒杀系统**（GitHub 开源项目，含 Spring Cloud + Docker + K8s 部署）
- ✅ **Spring Boot 脚手架**（含统一异常/响应/校验/日志规范）
- ✅ **技术博客**（10+ 篇深度文章）
- ✅ **Java 基础 100 问**（面试自检清单）
- ✅ **数据库 + 中间件面试 100 问**
- ✅ **LeetCode 150+ 题**（算法能力证明）
- ✅ **源码阅读笔记**（HashMap、AQS、MyBatis、Spring Boot、Spring Cloud Gateway）

### 面试准备 checklist

- [ ] 能清晰描述 Java 集合框架的完整体系
- [ ] 能从头到尾解释 JVM 内存管理全过程
- [ ] 能画出线程池的工作流程图并解释每个参数
- [ ] 能对比 synchronized 和 ReentrantLock 的底层实现
- [ ] 能解释 MySQL 索引为什么用 B+ 树
- [ ] 能分析一条慢 SQL 并给出优化方案
- [ ] 能设计 Redis 缓存方案并处理穿透/击穿/雪崩
- [ ] 能画出秒杀系统的完整架构图并解释每个环节
- [ ] 能回答 MQ 消息丢失、重复消费、顺序消费的问题
- [ ] 能描述 Spring Boot 的启动和自动配置流程
- [ ] 能说清 Spring Cloud 各组件的职责与协作关系
- [ ] 能对比 Seata AT / TCC / SAGA 分布式事务方案
- [ ] 能手写 Snowflake 分布式 ID 生成器
- [ ] 能解释 CAP 定理与 BASE 理论
- [ ] 能使用 Linux 命令定位线上 CPU / 内存 / IO 瓶颈

---

## 💡 执行建议

1. **保持节奏，不要贪快** — 每天 4 小时专注学习 > 周末突击 12 小时
2. **输出倒逼输入** — 写完博客再翻书验证，比看书再写博客效果好
3. **不要跳过实践** — 源码阅读一定要配代码调试，只看不练等于没学
4. **接受遗忘** — 学完第一遍记不住很正常，靠输出和复习对抗遗忘
5. **记录时间实际消耗** — 如果某个主题耗时远超预期，及时调整计划
6. **保持 Coding 手感** — 每天至少写代码，哪怕是 LeetCode
7. **遇到瓶颈及时求助** — 利用技术社区、AI 辅助、同事讨论，不要死磕
8. **定期模拟面试** — 每 2 周做一次自测，录音回听，改进表达逻辑

---

## 📚 推荐学习资源

| 方向 | 书籍 / 资源 |
|------|-------------|
| Java 基础 | 《Java 编程的逻辑》、《Effective Java》 |
| JVM | 《深入理解 Java 虚拟机》（周志明） |
| 并发编程 | 《Java 并发编程的艺术》、《Java 并发编程实战》 |
| MySQL | 《高性能 MySQL》、《MySQL 技术内幕：InnoDB 存储引擎》 |
| Redis | 《Redis 设计与实现》、《Redis 开发与运维》 |
| Spring | 《Spring 源码深度解析》、官方文档 |
| 分布式 | 《数据密集型应用系统设计》（DDIA） |
| MQ | 《RabbitMQ 实战指南》、《RocketMQ 技术内幕》 |
| Linux | 《Linux 命令行与 Shell 脚本编程大全》 |
| Docker/K8s | 《Docker 技术入门与实战》、《Kubernetes 权威指南》 |
| 算法 | 《代码随想录》、LeetCode 热题 100 |

---

> 📅 计划起始：2026-08-05
> 📅 计划结束：2026-11-04
> 🎯 总周期：92 天
> ⏰ 总投入：约 480 小时（工作日 60 × 4h + 周末 32 × 6h）
> 祝自己 3 个月后成为更好的工程师 💪
