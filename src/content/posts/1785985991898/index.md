---
title: "面向对象设计本质：封装、继承、多态与访问控制"
published: 2026-08-06
description: '【3个月 Java 后端进阶计划】深入理解 OOP 三大特性的设计本质、接口与抽象类的选择、组合优于继承与 LSP 原则，以及 Java 访问修饰符的可见性规则'
tags: ["Java", "OOP", "设计原则", "笔记"]
category: '笔记'
draft: false
---

> **阅读建议：** 本文不教你背八股，而是从"为什么需要"出发理解每个概念的设计意图。每个原则背后，都对应着一个具体的软件工程问题。

---

## 写在前面

很多人对面向对象的理解停留在三句话：

> 封装 = 隐藏细节
> 继承 = 代码复用
> 多态 = 一个接口多个实现

这三句话没错，但只是**表面现象**。真正理解它们，要从软件设计的根本目的来看：

> **面向对象的核心不是模拟现实世界，而是为了让代码面对变化时更容易维护。**

今天我们就把封装、继承、多态、接口与抽象类、组合与 LSP、访问修饰符这六个主题串起来，形成一套完整的面向对象设计思维。

---

## 一、封装（Encapsulation）：控制变化范围

### 表面理解

把数据和操作数据的方法放在一起，隐藏内部实现：

```java
public class BankAccount {
    private double balance;

    public void deposit(double money) {
        if (money > 0) {
            balance += money;
        }
    }

    public double getBalance() {
        return balance;
    }
}
```

外部不能直接 `account.balance = -10000`，只能通过 `deposit()` 修改。

### 封装的本质

`private` 只是实现封装的一种手段。封装的真正目的是：

> **控制变化范围，保护对象内部的不变量。**

什么是"不变量"？比如银行账户的规则：`余额 >= 0`。如果没有封装，整个系统任何地方都可能破坏这条规则。有了封装，所有修改入口集中在一个地方，规则校验只写一次。

:::tip[一句话理解]
封装解决的问题是：**"别人乱改我的东西怎么办？"**
:::

### 现实类比

你踩油门时，不需要知道发动机喷油、变速箱换挡、轮胎转动的具体过程。汽车把这些细节封装在内部，只暴露 `accelerate()` 一个接口。如果设计成 `car.engine.injectFuel()` + `car.gear.change()`，用户直接操控内部零件，这就是坏设计。

---

## 二、继承（Inheritance）：建立 is-a 关系

### 表面理解

子类拥有父类的属性和方法：

```java
class Animal {
    public void eat() {
        System.out.println("吃东西");
    }
}

class Dog extends Animal {
}
```

`dog.eat()` 直接可用。

### 继承的真正目的

不是为了少写几行代码，而是：

> **提取共同抽象，让对象可以被统一管理。**

例如支付系统：

```java
class Payment {
    void pay() {}
}

class Alipay extends Payment {}
class WechatPay extends Payment {}
```

业务代码只需要面对 `Payment` 这个抽象：

```java
Payment payment;
payment.pay(); // 不关心是支付宝还是微信
```

这就是**类型抽象**——用父类引用统一管理不同类型的子类对象。

### 继承的陷阱

继承关系必须符合 **Liskov 替换原则**。比如：

```
Bird（会飞）
  └── Penguin（不会飞）❌
```

企鹅继承鸟并重写 `fly()` 抛出异常，破坏了父类的承诺。这不是子类的问题，是继承关系本身就错了。

:::warning
过度继承是代码腐化的开始。当你的继承层级变成 `Sword → FireSword → IceFireSword → SuperIceFireSword` 时，每增加一个特性就要新建一个类，系统变得极难维护。
:::

---

## 三、多态（Polymorphism）：隔离变化

多态是最核心的特性。看一个没有多态的例子：

```java
class OrderService {
    void pay(String type) {
        if (type.equals("alipay")) { }
        else if (type.equals("wechat")) { }
    }
}
```

每新增一种支付方式，就要修改已有代码。这叫**修改已有代码**，风险越来越高。

有多态后：

```java
interface Payment {
    void pay();
}

class OrderService {
    void checkout(Payment payment) {
        payment.pay();
    }
}

// 调用
checkout(new AliPay());
checkout(new WechatPay());
```

以后新增 `ApplePay`，业务代码**完全不用改**。这就是开闭原则：

> **对扩展开放，对修改关闭。**

### 多态的底层机制

```java
Animal a = new Dog();
a.eat();
```

编译时，JVM 检查 `Animal` 有没有 `eat()`；运行时，JVM 发现实际对象是 `Dog`，调用 `Dog.eat()`。这叫**动态绑定（Dynamic Dispatch）**。

底层依靠对象中的**方法表（Method Table）**：根据真实对象类型找到对应的方法入口。

---

## 四、接口 vs 抽象类：各司其职

这是 Java 里最容易混淆的一对概念。

### 核心区别

> **接口解决"我能做什么"，抽象类解决"我是什么以及有什么共同实现"。**

| | 接口 | 抽象类 |
| -- | -- | -- |
| 关系 | 能力（can do） | 父类（is a） |
| 关键字 | implements | extends |
| 多继承 | 支持多个 | 只能一个 |
| 成员变量 | 默认 public static final | 普通变量 |
| 构造方法 | 没有 | 有 |
| 状态保存 | 不适合 | 适合 |
| 代码复用 | default 有限支持 | 强支持 |

### 实际选择

问自己两个问题：

1. **这个东西是某种东西吗？** → 抽象类（`Dog 是 Animal`）
2. **这个东西具有某种能力吗？** → 接口（`Bird 可以飞`，`Airplane 也可以飞`，但飞机不是鸟）

### JDK 8 的 default 方法

早期接口只能定义规范，无法演进。要给 `List` 接口加 `sort()` 方法，所有实现类全炸。Java 8 引入 `default` 方法：

```java
interface List {
    void add();
    default void sort() {
        System.out.println("默认排序");
    }
}
```

实现类自动获得默认实现，无需修改。主要目的是**保持接口向后兼容**，Java 标准库因此获益最大。

:::note[现代 Java 建议]
**优先面向接口编程**，需要共享状态和大量公共逻辑时，再考虑抽象类。这也是 Spring 生态大量使用接口的核心原因。
:::

---

## 五、组合优于继承 + Liskov 替换原则

### 组合优于继承

继承是白送的复用，也是免费的耦合——子类强依赖父类内部实现，父类一改，子类可能直接废掉。

组合用 **has-a 关系**代替 is-a 关系：

```java
// ❌ 错误：汽车不是发动机
class Car extends Engine {}

// ✅ 正确：汽车拥有发动机
class Car {
    private Engine engine;
    public void start() {
        engine.start();
    }
}
```

支付系统用组合而非继承：

```java
class Order {
    private Payment payment;
    private Discount discount;

    public void checkout() {
        payment.pay();
        discount.calculate();
    }
}
```

`Payment` 可以是支付宝/微信/银行卡，`Discount` 可以是会员折扣/优惠券，自由组合，互不影响。

:::tip
组合的优势：**松耦合、灵活、易扩展**。把变化拆成多个独立的小模块，而不是塞进继承树的一层层嵌套中。
:::

### Liskov 替换原则（LSP）

SOLID 五大原则中的 L，定义是：

> 如果 S 是 T 的子类型，那么任何使用 T 的地方，都可以替换成 S，而程序行为不会改变。

简单说：

> **子类不能破坏父类的承诺。**

经典反例：

```java
class File {
    public void read() {}
    public void write() {}
}

class ReadOnlyFile extends File {
    public void write() {
        throw new UnsupportedOperationException(); // 破坏父类承诺
    }
}
```

父类承诺"文件可以写"，子类却做不到。正确做法是拆分接口：

```java
interface Readable { void read(); }
interface Writable { void write(); }

class File implements Readable, Writable {}
class ReadOnlyFile implements Readable {} // 不承诺能写
```

### 组合和 LSP 的关系

二者解决同一个问题：**不要建立错误的继承关系**。继承要求非常严格（必须是真正的 is-a，子类必须遵守父类行为），组合则更加灵活。

现代 Java 设计的黄金模式：

```
接口定义能力
    ↓
组合实现功能
    ↓
少量继承共享代码
    ↓
保证 LSP
```

这也是 Spring、MyBatis、JDK 源码大量采用**接口 + 组合 + 少量抽象类**，而非层层继承体系的原因。

---

## 六、访问修饰符：谁有权限？

Java 四种访问级别：

| 修饰符 | 类内部 | 同包类 | 子类 | 不同包普通类 |
| -- | -- | -- | -- | -- |
| `private` | ✅ | ❌ | ❌ | ❌ |
| 默认（default） | ✅ | ✅ | ⚠️ 间接 | ❌ |
| `protected` | ✅ | ✅ | ✅ | ⚠️ 有限制 |
| `public` | ✅ | ✅ | ✅ | ✅ |

### 四种修饰符的本质

- **`private`**：我的东西，我自己用 → 封装内部细节
- **`default`**：我家的东西，邻居包可以用 → 包内部协作
- **`protected`**：我家的东西 + 我的孩子可以用 → 给继承体系扩展
- **`public`**：全世界都可以用 → 暴露稳定接口

### protected 的特殊之处

`protected` 最容易误解。关键点：

> **不同包子类只能通过继承关系访问，不能通过父类引用访问。**

```java
// 同包子类 ✅
class Child extends Parent {
    void test() { age = 10; } // this.age，继承关系
}

// ❌ 不能通过父类引用访问
class Child extends Parent {
    void test(Parent p) { p.age = 10; } // 编译错误
}
```

### Spring 开发中的实际使用

- `private`（最多）：业务类的内部字段，不暴露
- `protected`（少）：模板方法模式中给子类扩展的方法
- `public`：接口定义，给外部调用
- `default`：框架内部辅助类，包级可见

### 口诀

```
private:    我的东西，我自己用
default:    我家的东西，邻居包可以用
protected:  我家的东西 + 我的孩子可以用
public:     全世界都可以用
```

实际开发推荐暴露顺序：

```
private → default → protected → public
```

能不暴露，就不要暴露。暴露越多，未来改代码时背的锅越大。

---

## 总结

把今天的内容串起来，你会发现它们服务于同一个目标：**降低耦合，让系统更容易应对变化**。

| 特性/原则 | 解决的问题 | 本质 |
| -- | -- | -- |
| 封装 | 防止别人乱改 | 控制变化范围 |
| 继承 | 类型复用和抽象 | 建立 is-a 关系 |
| 多态 | 新增功能不改旧代码 | 延迟绑定实现 |
| 接口 vs 抽象类 | 规范 vs 复用 | 能力约定 vs 实体抽象 |
| 组合优于继承 | 避免过度继承 | has-a 代替 is-a |
| LSP | 保证替换安全 | 子类遵守父类承诺 |
| 访问修饰符 | 权限管控 | 最小暴露原则 |

一句话概括全部：

> **封装是保护变化，继承是组织变化，多态是隔离变化，组合是灵活拼装变化，LSP 是保证变化不出错，访问修饰符是控制变化的可见范围。**

这也是为什么 Java 生态（Spring、MyBatis、各种设计模式）几乎都建立在这三个东西之上。
