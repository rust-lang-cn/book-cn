## 数据类型

Rust 的每个值都有确切的**类型**（*type*），该类型告诉 Rust 数据是被指定成哪类数据，从而让 Rust 知道如何使用该数据。在本节中，我们将介绍一些内置于语言中的类型。我们将类型分为两大类：数量类型和复合类型。

在学习本节内容时，请记住 Rust 是一种**静态类型**（*statically typed*）的语言，这意味着它必须在编译期知道所有变量的类型。编译器通常可以根据值和使用方式推导出我们想要使用的类型。在类型可能是多种情况时，例如第 2 章中的当我们使用 `parse` 将`String` 转换成数值类型时，我们必须加上一个类型标注，如下所示：

```rust
let guess: u32 = "42".parse().unwrap();
```

如果我们在这里不添加类型标注的话，Rust 将显示以下错误，意思是编译器需要我们提供更多信息来确定我们到底想用什么类型：

```text
error[E0282]: unable to infer enough type information about `_`
 --> src/main.rs:2:5
  |
2 | let guess = "42".parse().unwrap();
  |     ^^^^^ cannot infer type for `_`
  |
  = note: type annotations or generic parameter binding required
```

在讨论各种数据类型时，你将看到不同的类型标注。

### 标量类型

**标量**类型表示单个值。Rust 有 4 个标量类型：整型、浮点型、布尔型和字符。你可从其他语言了解过这些类型，不过我们还是深入了解下它们在 Rust 中的用法。

#### 整数类型

**整数**（*integer*）是没有是没有小数部分的数字。我们在本章前面使用过了一个整数类型，即 `i32` 类型。此类型声明表明了与其相关的值应为 32 位系统的有符号整型（`i` 是英文单词 *integer* 的首字母，与之相反的是 `u`，代表无符号 `unsigned` 类型）。表 3-1 显示了 Rust 中的内置的整数类型。在有符号和和无符号的列中（例如 *i32*）的每个定义形式都可用于声明整数类型。

<figure>
<figcaption>

表 3-1: Rust 中的整数类型

</figcaption>

| 长度       | 有符号类型 | 无符号类型 |
|------------|--------|----------|
| 8 位       | i8     | u8       |
| 16 位      | i16    | u16      |
| 32 位      | i32    | u32      |
| 64 位      | i64    | u64      |
| 视架构而定  | isize  | usize    |

</figure>

每个定义形式都可以是有符号类型或无符号类型，且带有一个显式的大小。有符号和无符号表示数字能否取负数或是只能取正数；也就是说，数字是否需要带一个符号（有符号类型）或数字只能表示正数，因此可以没有符号（无符号类型）。就像在纸上写数字一样：当要强调符号时，数字前面可以带上正号或负号；然而，当很明显确定数字为正数时，就不需要加上正号了。有符号数字以二进制补码形式存储（若是不了解，可以在网上搜索相关资料；这些知识已经超出本书的范围）。

每种有符号类型的定义形式规定的数字范围是  -(2<sup>n - 1</sup>) ~ 2<sup>n -
1</sup> - 1，其中 `n` 是该定义形式的位长度。所以 `i8` 可存储数字范围是 -(2<sup>7</sup>) ~ 2<sup>7</sup> - 1，即 -128 ~ 127。无符号类型可以存储的数字范围是 0 ~ 2<sup>n</sup> - 1，所以 `u8` 能够存储的数字为 0 ~ 2<sup>8</sup> - 1，即 0 ~ 255。

此外，`isize` 和 `usize` 类型取决于程序运行的计算机类型：64 位（如果使用 64 位架构系统）和 32 位（如果使用 32 位架构系统）。

整型的字面量可以可以写成下表 3-2 中任意一种。注意，除了字节字面量之外的所有的数字字面量都允许使用类型后缀，例如 `57u8`，还有可以使用 `_` 作为可视分隔符，如 `1_000`。

<figure>
<figcaption>

表 3-2: Rust 的整型字面量

</figcaption>

| 数字字面量        | 示例          |
|-----------------|---------------|
| 十进制           | `98_222`      |
| 十六进制         | `0xff`        |
| 八进制           | `0o77`        |
| 二进制           | `0b1111_0000` |
| 字节 (只有 `u8`) | `b'A'`        |

</figure>

那么你怎么知道使用哪种类型的整型呢？如果不确定，Rust 的默认值通常是个不错的选择，整型默认是 `i32`：这通常是最快的，即使在 64 位系统上。`isize` 和 `usize` 的主要应用场景是用作某些集合类型的索引。

#### 浮点类型

**浮点类型数字** 是带有小数点的数字，在 Rust 中浮点类型也有两种基本类型： `f32` 和 `f64`，分别为 32 位和 64 位大小。默认浮点类型是 `f64`，因为它的速度与 `f32` 几乎相同，但精度更高。在 32 位系统上使用 `f64` 也是可行的，但在这些系统上会比使用 `f32` 类型的速度要慢。多数情况下，稍差点的性能但获取更高精度是一个合理的初步选择，若是怀疑浮点型大小在你的应用场景下是一个问题，你可以对代码进行基准测试。

下面是一个演示浮点数的示例：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    let x = 2.0; // f64

    let y: f32 = 3.0; // f32
}
```

浮点数根据 IEEE-754 标准表示。`f32` 类型是单精度浮点型，`f64` 为双精度。

#### 数字运算

Rust 支持常见的数字类型的基本数学运算：加法、减法、乘法、除法和取模运算。下面代码演示了各使用一条 `let` 语句来说明相应运算的用法：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    // 加法
    let sum = 5 + 10;

    // 减法
    let difference = 95.5 - 4.3;

    // 乘法
    let product = 4 * 30;

    // 除法
    let quotient = 56.7 / 32.2;

    // 取模运算
    let remainder = 43 % 5;
}
```

这些语句中的每个表达式都使用了数学运算符，并且计算结果为一个值，然后绑定到一个变量上。附录 B 给出了 Rust 提供的所有运算符的列表。

#### 布尔类型

和大多数编程语言一样，Rust 中的布尔类型也有两个可能的值：`true` 和 `false`。Rust 中的布尔类型使用 `bool` 指定。例如：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    let t = true;

    let f: bool = false; // 使用显式类型标注
}
```

用到布尔值的地方主要是条件语句，如 `if` 语句。我们将会在“控制流”章节中介绍 `if` 在 Rust 中的用法。

#### 字符类型

到目前为止，我们只在用数字，不过 Rust 同样也支持字母。Rust 的 `char` （字符）类型语言最原始的字母类型，下面代码展示了使用它的一种方式：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
   let c = 'z';
   let z = 'ℤ';
   let heart_eyed_cat = '😻';
}
```

Rust 的字符类型表示的是一个 Unicode 值，这意味着它可以表示的不仅仅是 ASCII。标音字母，中文/日文/韩文的表意文字，emoji，还有零宽空格(zero width space)在 Rust 中都是合法字符类型。Unicode 值的范围从 `U+0000`~`U+D7FF` 和 `U+E000`~`U+10FFFF`（含）。不过“字符”并不是 Unicode 中的一个概念，所以人在直觉上对“字符”的理解和 Rust 的字符概念并不一致。我们将在第 8 章“字符串”中详细讨论这个主题。

### 复合类型

**复合类型**（*compound type*）可以将其他类型的多个值合在一块组成一个类型。Rust 有两种基本的复合类型：元组（tuple）和数组（array）。

#### 将多个值组成元组

元组是将具有多种类型的其他值分组到一个复合类型中的一种基本方式。

我们通过在括号内写入以逗号分隔的值列表来创建一个元组。元组中的每个位置都有一个类型，并且元组中不同值的类型不一定是相同的。我们在下面示例中添加了可选的类型标注：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

变量 `tup` 绑定到整个元组，因为元组被认作是单个复合元素。 想从元组中获取个别值，我们可以使用模式匹配来解构（destructure）元组的一个值，如下所示：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {}", y);
}
```

该程序首先创建一个元组并将其绑定到变量 `tup`。 然后它借助 `let` 来使用一个模式匹配 `tup`，并将它分解成三个单独的变量 `x`、`y` 和 `z`。 这过程称为**解构**（*destructuring*），因为它将单个元组分为三部分。 最后，程序打印出 `y` 值，为 `6.4`。

除了通过模式匹配进行解构外，我们还可以使用一个句点（`.`）连上要访问的值的索引来直接访问元组元素。例如：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;

    let six_point_four = x.1;

    let one = x.2;
}
```

该程序创建一个元组 `x`，然后通过使用它们的索引为每个元素创建新的变量。和大多数编程语言一样，元组中的第一个索引为 0。

#### 数组

将多个值的组合在一起另一种方式就是使用**数组**（*array*）。与元组不同，数组的每个元素必须具有相同的类型。Rust 中的数组与其他语言中的数组不同，因为 Rust 中的数组具有固定长度：一旦声明，它们就不能在大小上增长或缩小。

在Rust中，数组内的值将以逗号分隔的列表形式写入方括号内的：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
}
```

当您希望将数据分配到栈（stack）而不是堆（heap）时（我们将在第 4 章中进一步讨论栈和堆），或者当您希望确保始终具有固定数量的元素时，数组特别有用。但它们不像 vector （中文字面翻译为“向量”，在 Rust 中意义为“动态数组，可变数组”）类型那么灵活。vector 类型是标准库提供的类似的集合类型，其的大小允许增长或缩小。如果您不确定是使用数组还是 vector，那就应该使用一个 vector：第 8 章更详细地讨论 vector。

举个例子，在需要知道一年中各个月份名称的程序中，您很可能希望使用的是数组而不是 vector。这样的程序不太可能需要添加或删除月份，所以您可以使用数组，因为您知道它总是包含 12 个条目：

```rust
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
```

##### 访问数组元素

数组是在栈上分配的内存上的单个数据块（原文：An array is a single chunk of memory allocated on the stack.）。我们可以使用索引来访问数组的元素，如下所示：

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```

在这个例中，名为 `first` 的变量将获取值 `1`，因为它是数组中索引 `[0]` 处的值。名为 `second` 的变量将从数组中的索引 `[1]` 中获取值 `2`。

##### 无效的数组元素访问

如果我们尝试访问超出数组末尾的数组元素，会发生什么？ 假如我们将示例更改为以下内容：

<span class="filename">文件了名：src/main.rs</span>

```rust,ignore
fn main() {
    let a = [1, 2, 3, 4, 5];

    let element = a[10];

    println!("The value of element is: {}", element);
}
```

使用 `cargo run` 运行此代码得到下面结果：

```text
$ cargo run
   Compiling arrays v0.1.0 (file:///projects/arrays)
     Running `target/debug/arrays`
thread '<main>' panicked at 'index out of bounds: the len is 5 but the index is
 10', src/main.rs:4
note: Run with `RUST_BACKTRACE=1` for a backtrace.
error: Process didn't exit successfully: `target/debug/arrays` (exit code: 101)
```

编译没有产生任何错误，但程序会产生**运行时**（*runtime*）错误，并且没有成功退出。当您尝试使用索引访问元素时，Rust 将检查您指定的索引是否小于数组长度。如果索引大于数组长度（译注：此处原文有误，应该是“大于或等于数组长度”），Rust将会出现 `panic`，其中 `panic` 是 Rust 的一个术语，在程序退出并出现错误时使用。

这是 Rust 在实践中安全原则的第一个例子。在很多低级语言中，并不进行这种检查，当您使用不正确的索引时，可以访问无效的内存。Rust 通过立即退出来的方式防止这种错误，而不是允许内存访问并继续运行程序。 第 9 章将进一步讨论 Rust 的错误处理。
