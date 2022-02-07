## 变量和可变性

如[“使用变量存储值”][storing-values-with-variables]<!-- ignore -->章节所述，默认情况下变量是**不可变的**（*immutable*）。这是 Rust 众多精妙之处的其中一个，这些特性让你充分利用 Rust 提供的安全性和简单并发性的方式来编写代码。不过你也可以选择让变量是**可变的**（*mutable*）。让我们探讨一下 Rust 如何及为什么鼓励你选用不可变性，以及为什么有时你可能不选用。

当变量不可变时，这意味着一旦一个值绑定到一个变量名后，就不能更改该值了。为了说明，我们在 *projects* 目录下使用 `cargo new variables` 来创建一个名为 *variables* 新项目。

然后在新建的 *variables* 目录下，打开 *src/main.rs* 并将代码替换成以下代码。这段代码还不能编译，我们先检查不可变错误（immutability error）：

<span class="filename">文件名：src/main.rs</span>

```rust,ignore,does_not_compile
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-01-variables-are-immutable/src/main.rs}}
```

保存文件，并使用 `cargo run` 运行程序。你将会收到一条错误信息，输出如下所示：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-01-variables-are-immutable/output.txt}}
```

这个例子展示了编译器如何帮助你查找程序中的错误。编译器错误可能令人沮丧，但它们也只是表明你的程序做你想做的事情并不安全；并**不**意味着你不是一个好开发者！有经验的 Rustacean（Rust 开发者） 依然会遇到编译错误。

上面的错误指出错误的原因是 `` cannot assign twice to immutable variable `x` ``（不能对不可变变量二次赋值），因为我们尝试给不可变的 `x` 变量赋值为第二个值。

当我们尝试改变一个前面指定为不可变的值时我们会得到编译期错误，这点很重要，因为这种情况很可能导致 bug。如果我们代码的一部分假设某个值永远不会更改，而代码的另一部分更改了该值，那很可能第一部分代码以不可意料的方式运行。这个 bug 的根源在实际开发中可能很难追踪，特别是第二部分代码只是**偶尔**变更了原来的值。Rust 编译器保证了当我们声明了一个值不会改变时，那它就真的不可改变，所以你不必亲自跟踪这个值。这可以使得代码更容易理解。

但可变性有时也相当重要，可使代码更方便编写。变量只是默认不可变的；像第 2 章所做的那样，我们可以通过在变量名前加上 `mut` 使得它们可变。增加 `mut` 的操作还向以后的读代码的人传达了代码的其他部分将会改变这个变量值。

例如将 *src/main.rs* 改为以下内容：

<span class="filename">文件名：src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-02-adding-mut/src/main.rs}}
```

运行程序将得到下面结果：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-02-adding-mut/output.txt}}
```

加上 `mut` 后，我们就可以将 `x` 绑定的值从 `5` 改成 `6`。除了预防 bug 外，还有很多权衡要取舍。例如，在使用大型数据结构的情形下，在同一位置更改实例可能比复制并返回新分配的实例要更快。使用较小的数据结构时，通常创建新的实例并以更具函数式编程的风格来编写程序，可能会更容易理解，所以值得以较低的性能开销来确保代码清晰。

### 常量

与不可变变量类似，**常量**（*constant*）是绑定到一个常量名且不允许更改的值，但是常量和变量之间存在一些差异。

首先，常量不允许使用 `mut`。常量不仅仅默认不可变，而且自始至终不可变。常量使用 `const` 关键字而不是 `let` 关键字来声明，并且值的类型**必须**注明。我们将在下一节[“数据类型”][data-types]<!-- ignore -->中介绍类型和类型标注，现在暂时不需关心细节。只需知道你必须始终对类型进行注明。

常量可以在任意作用域内声明，包括全局作用域，这对于代码中很多部分都需要知道一个值的情况特别有用。

最后一个不同点是常量只能设置为常量表达式，而不能是函数调用的结果或是只能在运行时计算得到的值。

下面是一个常量声明的例子：

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

这个常量名为 `THREE_HOURS_IN_SECONDS`，值设置为 60（一分钟内的秒数）乘以 60（一小时内分钟数）再乘以 3（我们在这程序）。Rust 常量的命名约定是全部字母都使用大写，并使用下划线分隔单词。编译器能够在编译时计算一些有限的操作，这让我们可以选择以更容易理解和验证的方式写出这个值，而不是将此常量设置为值 10,800。有关在声明常量时可以使用哪些操作的更多信息，请参阅[《Rust 参考手册》中关于常量计算的章节][const-eval]。

在声明的作用域内，常量在程序运行的整个过程中都有效。对于应用程序域中程序的多个部分可能都需要知道的值的时候，常量是一个很有用的选择，例如游戏中允许玩家赚取的最高分或光速。

将整个程序中用到的硬编码（hardcode）值命名为常量，对于将该值的含义传达给代码的未来维护者很有用。如果将来需要更改硬编码的值，则只需要在代码中改动一处就可以了。

### 遮蔽

正如你在第 2 章[“猜数字游戏”][comparing-the-guess-to-the-secret-number]<!-- ignore -->章节中所看到的，你可以声明和前面变量具有相同名称的新变量。Rustacean 说这个是第一个变量被第二个变量**遮蔽**（*shadow*），这意味着当我们使用变量时我们看到的会是第二个变量的值。我们可以通过使用相同的变量名并重复使用 `let` 关键字来遮蔽变量，如下所示：

<span class="filename">文件名：src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-03-shadowing/src/main.rs}}
```

这个程序首先将数值 `5` 绑定到 `x`。然后通过重复使用 `let x =` 来遮蔽之前的 `x`，并取原来的值加上 `1`，所以 `x` 的值变成了 `6`。在内部作用域内，第三个 `let` 语句同样遮蔽前面的 `x`，取之前的值并乘上 `2`，得到的 `x` 值为 `12`。当该作用域结束时，内部遮蔽结束并且 `x` 恢复成 `6`。当运行此程序，将输出以下内容：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-03-shadowing/output.txt}}
```

遮蔽和将变量标记为 `mut` 的方式不同，因为除非我们再次使用 `let` 关键字，否则若是我们不小心尝试重新赋值给这个变量，我们将得到一个编译错误。通过使用 `let`，我们可以对一个值进行一些转换，但在这些转换完成后，变量将是不可变的。

`mut` 和遮蔽之间的另一个区别是，因为我们在再次使用 `let` 关键字时有效地创建了一个新的变量，所以我们可以改变值的类型，但重复使用相同的名称。例如，假设我们程序要求用户输入空格字符来显示他们想要的空格数目，但我们实际上想要将该输入存储为一个数字：

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-04-shadowing-can-change-types/src/main.rs:here}}
```

第一个 `spaces` 变量是一个字符串类型，第二个 `spaces` 变量是一个数字类型。所以变量遮蔽可以让我们不必给出不同的名称，如 `spaces_str` 和 `spaces_num`，相反我们可以重复使用更简单的 `spaces` 变量名。然而，如果我们对此尝试使用 `mut`，如下所示，我们将得到一个编译期错误：

```rust,ignore,does_not_compile
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-05-mut-cant-change-types/src/main.rs:here}}
```

该错误表明我们不允许更改变量的类型：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-05-mut-cant-change-types/output.txt}}
```

现在我们已经探讨了变量是如何工作的，接下来我们学习更多的数据类型。

[comparing-the-guess-to-the-secret-number]: ch02-00-guessing-game-tutorial.html#比较猜测的数字和秘密数字
[data-types]: ch03-02-data-types.html#数据类型
[storing-values-with-variables]: ch02-00-guessing-game-tutorial.html#使用变量存储值
[const-eval]: https://rustwiki.org/zh-CN/reference/const_eval.html
