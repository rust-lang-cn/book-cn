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

Rust supports the usual basic mathematic operations you’d expect for all of the
number types: addition, subtraction, multiplication, division, and remainder.
The following code shows how you’d use each one in a `let` statement:

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

As in most other programming languages, a boolean type in Rust has two possible
values: `true` and `false`. The boolean type in Rust is specified using `bool`.
For example:

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

So far we’ve only worked with numbers, but Rust supports letters too. Rust’s
`char` type is the language’s most primitive alphabetic type, and the following
code shows one way to use it:

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

### Compound Types

*Compound types* can group multiple values of other types into one type. Rust
has two primitive compound types: tuples and arrays.

#### Grouping Values into Tuples

A tuple is a general way of grouping together some number of other values with
a variety of types into one compound type.

We create a tuple by writing a comma-separated list of values inside
parentheses. Each position in the tuple has a type, and the types of the
different values in the tuple don’t have to be the same. We’ve added optional
type annotations in this example:

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

The variable `tup` binds to the entire tuple, since a tuple is considered a
single compound element. To get the individual values out of a tuple, we can
use pattern matching to destructure a tuple value, like this:

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {}", y);
}
```

This program first creates a tuple and binds it to the variable `tup`. It then
uses a pattern with `let` to take `tup` and turn it into three separate
variables, `x`, `y`, and `z`. This is called *destructuring*, because it breaks
the single tuple into three parts. Finally, the program prints the value of
`y`, which is `6.4`.

In addition to destructuring through pattern matching, we can also access a
tuple element directly by using a period (`.`) followed by the index of the
value we want to access. For example:

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;

    let six_point_four = x.1;

    let one = x.2;
}
```

This program creates a tuple, `x`, and then makes new variables for each
element by using their index. As with most programming languages, the first
index in a tuple is 0.

#### Arrays

Another way to have a collection of multiple values is with an *array*. Unlike
a tuple, every element of an array must have the same type. Arrays in Rust are
different than arrays in some other languages because arrays in Rust have a
fixed length: once declared, they cannot grow or shrink in size.

In Rust, the values going into an array are written as a comma-separated list
inside square brackets:

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
}
```

Arrays are useful when you want your data allocated on the stack rather than
the heap (we will discuss the stack and the heap more in Chapter 4), or when
you want to ensure you always have a fixed number of elements. They aren’t as
flexible as the vector type, though. The vector type is a similar collection
type provided by the standard library that *is* allowed to grow or shrink in
size. If you’re unsure whether to use an array or a vector, you should probably
use a vector: Chapter 8 discusses vectors in more detail.

An example of when you might want to use an array rather than a vector is in a
program that needs to know the names of the months of the year. It’s very
unlikely that such a program will need to add or remove months, so you can use
an array because you know it will always contain 12 items:

```rust
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
```

##### Accessing Array Elements

An array is a single chunk of memory allocated on the stack. We can access
elements of an array using indexing, like this:

<span class="filename">Filename: src/main.rs</span>

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```

In this example, the variable named `first` will get the value `1`, because
that is the value at index `[0]` in the array. The variable named `second` will
get the value `2` from index `[1]` in the array.

##### Invalid Array Element Access

What happens if we try to access an element of an array that is past the end of
the array? Say we change the example to the following:

<span class="filename">Filename: src/main.rs</span>

```rust,ignore
fn main() {
    let a = [1, 2, 3, 4, 5];

    let element = a[10];

    println!("The value of element is: {}", element);
}
```

Running this code using `cargo run` produces the following result:

```text
$ cargo run
   Compiling arrays v0.1.0 (file:///projects/arrays)
     Running `target/debug/arrays`
thread '<main>' panicked at 'index out of bounds: the len is 5 but the index is
 10', src/main.rs:4
note: Run with `RUST_BACKTRACE=1` for a backtrace.
error: Process didn't exit successfully: `target/debug/arrays` (exit code: 101)
```

The compilation didn’t produce any errors, but the program results in a
*runtime* error and didn’t exit successfully. When you attempt to access an
element using indexing, Rust will check that the index you’ve specified is less
than the array length. If the index is greater than the length, Rust will
*panic*, which is the term Rust uses when a program exits with an error.

This is the first example of Rust’s safety principles in action. In many
low-level languages, this kind of check is not done, and when you provide an
incorrect index, invalid memory can be accessed. Rust protects you against this
kind of error by immediately exiting instead of allowing the memory access and
continuing. Chapter 9 discusses more of Rust’s error handling.
