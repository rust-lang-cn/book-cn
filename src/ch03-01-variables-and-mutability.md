## 变量和可变性

如第 2 章所提到的，默认情况下变量是**不可变的**（*immutable*）。这是 Rust 中众多精妙之处的其中一个，Rust 的这些设计点鼓励你以一种充分利用 Rust 提供的安全和简单并发的方式来编写代码。不过你也可以选择让变量是**可变的**（*mutable*）。让我们来探讨为什么 Rust 鼓励你选用不可变性，以及为什么你可能不喜欢这样。

当变量不可变时，这意味着一旦一个值绑定到一个变量名后，就不能再更改该值了。为了说明，我们在 *projects* 目录下使用 `cargo new --bin variables` 来创建一个名为 *variables* 新项目。

然后在你新建的 *variables* 目录下，打开 *src/main.rs* 并将代码替换为下面内容：

<span class="filename">文件名：src/main.rs</span>

```rust,ignore
fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);
}
```

Save and run the program using `cargo run`. You should receive an error
message, as shown in this output:

保存文件，并使用 `cargo run` 运行程序。你将会收到一条错误消息，输出如下所示：

```text
$ cargo run
   Compiling variables v0.0.1 (file:///projects/variables)
error[E0384]: re-assignment of immutable variable `x`
 --> src/main.rs:4:5
  |
2 |     let x = 5;
  |         - first assignment to `x`
3 |     println!("The value of x is: {}", x);
4 |     x = 6;
  |     ^^^^^ re-assignment of immutable variable
```

这个例子展示了编译器如何帮助您查找程序中的错误。即使编译器错误可能令人沮丧，它们也只是表明你的程序不能安全地做你想做的事情；并不意味着你不是一个好开发者！有经验的 Rustaceans 依然会遇到编译错误。上面的错误指出错误的原因是“re-assignment of immutable variable”（对不可变变量重新赋值），因为我们尝试给不可变的 `x` 变量赋值为第二个值。

当我们尝试改变一个前面指定为不可变的值时我们会得到编译期错误，这点很重要，因为这种情况很可能导致 Bug。如果我们代码的一部分假设某个值永远不会更改，而代码的另一部分更改了该值，那很可能第一部分代码不会按照所设计的逻辑运行。这个 Bug 的根源在实际开发中可能很难追踪，特别是第二部分代码只是**偶尔**变更了原来的值。

在 Rust 中，编译器保证了当我们声明了一个值不会改变，那它就真的不可改变。这意味着当你正在阅读和编写代码时，就不必跟踪一个值怎样变化以及在哪发生改变，这可以使得代码更容易理解。

但可变性有时也相当重要。变量只是默认不可变的；我们可以通过在变量名前加上 `mut` 使得它们可变。除了允许这个值改变外，它还向以后的读代码的人传达了这样的意思：代码的其他部分将会改变这个变量值。

例如将 *src/main.rs* 改为以下内容：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);
}
```

运行程序将得到下面结果：

```text
$ cargo run
   Compiling variables v0.1.0 (file:///projects/variables)
     Running `target/debug/variables`
The value of x is: 5
The value of x is: 6
```

加上 `mut` 后，我们就可以将 `x` 绑定的值从 `5` 改成 `6`。在一些情况下，你需要变量是可变的，因为相比只使用不可变变量的实现，这可使得代码更容易编写。

除了预防 Bug 外，还有很多权衡要考虑。例如，在使用大型数据结构的情形下，在同一位置更改实例可能比复制并返回新分配的实例要更快。使用较小的数据结构时，通常创建新的实例并以更具函数式的风格编写程序，可能会更容易理解，所以是值得以较低的性能开销就来确保代码清晰的。

### 变量和常量之间的差异

变量的值不能更改可能让你想起其他另一个很多语言都有的编程编程概念：**常量**（*constant*）。常量也是绑定到一个名称的不可改变的值，但常量和变量之间存在一些差异。第一，常量加上 `mut` 是不允许的：常量并不仅仅默认不可变，而且他们自始至终不可变。常量使用 `const` 关键字而不是 `let` 关键字来声明，并且值的类型必须标注。我们将在下一节“数据类型”中介绍类型和类型标注，因此现在暂时不关心细节。第二，常量可以在任意作用域内声明，包括全局作用域，这对于代码中很多部分都需要知道一个值的情况特别有用。最后一个不同点是常量只能设置为常量表达式，而不能是函数调用的结果或只能在运行时使用的值。

下面是一个常量声明的例子，其中常量名为 `MAX_POINTS`，其值设置为 100000。Rust 常量的命名约定是使用所有字母都使用大写，并使用下划线分隔单词。

```
const MAX_POINTS: u32 = 100_000;
```

常量在程序的整个生命周期内都有效，且在它们被声明的作用域内生效。这使得常量对于在应用中多个部分都需要知道的这些值时很有用，例如游戏中允许玩家赚取的最大点数，或一年中的秒数。

记录整个程序中用到的硬编码（hardcode）值，将其命名为常量有助于将该值的含义传达给代码的未来维护者。这也对你有好处，将来硬编码值需要修改的话，只需要改动一处就可以了。

### 变量隐藏

正如我们在第 2 章猜数字游戏教程中所看到的，我们可以声明和前面变量具有相同名称的新变量，且新变量会**隐藏**（*shadow*）前面的变量。Rustaceans 说这个是第一个变量被第二个变量隐藏，这意味着当我们使用变量时我们看到的会是第二个变量的值。我们可以通过使用相同的变量名并重复使用 `let` 关键字来隐藏变量，如下所示：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    let x = 5;

    let x = x + 1;

    let x = x * 2;

    println!("The value of x is: {}", x);
}
```

这个程序首先将数值 `5` 绑定到 `x`。然后通过重复使用 `let x =` 来隐藏之前的 `x`，并取原来的值加上 `1`，所以 `x` 的值变成了 `6`。第三个 `let` 语句同样隐藏前面的 `x`，取之前的值并乘上 `2`，得到的 `x` 最终值为 `12`。当运行此程序，将输出以下内容：

```text
$ cargo run
   Compiling variables v0.1.0 (file:///projects/variables)
     Running `target/debug/variables`
The value of x is: 12
```

这和将变量标记为 `mut` 的方式不同，因为除非我们再次使用 `let` 关键字，否则若是我们不小心尝试重新赋值给这个变量，我们将得到一个编译错误。我们可以对一个值进行一些转换，但在这些转换完成后，变量将是不可变的。

`mut` 和变量隐藏之间的另一个区别是，因为我们在再次使用 `let` 关键字时有效地创建了一个新的变量，所以我们可以改变值的类型，但重复使用相同的名称。例如，假设我们程序要求用户输入空格字符来显示他们想要的空格数目，但我们实际上想要将该输入存储为一个数字：


```rust
let spaces = "   ";
let spaces = spaces.len();
```

这种结构是允许的，因为第一个 `spaces` 变量是一个字符串类型，第二个 `spaces` 变量是一个全新的变量且和第第一个具有相同的变量名，且是一个数字类型。所以变量隐藏可以我们就不必提出不同的名称，如 `spaces_str` 和 `spaces_num`；相反我们可以重复使用更简单的 `spaces` 变量名。然而，如果我们对此尝试使用 `mut`，如下所示：

```rust,ignore
let mut spaces = "   ";
spaces = spaces.len();
```

我们将得到一个编译期错误，因为我们我允许改变变量的类型：

```text
error[E0308]: mismatched types
 --> src/main.rs:3:14
  |
3 |     spaces = spaces.len();
  |              ^^^^^^^^^^^^ expected &str, found usize
  |
  = note: expected type `&str`
  = note:    found type `usize`
```

现在我们已经探索了变量是如何工作的，接下来我们学习更多的数据类型。
