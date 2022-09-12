## 函数

函数在 Rust 代码中很普遍。你已经见过语言中最重要的函数之一：`main` 函数，它是很多程序的入口点。你也见过 `fn` 关键字，它用来声明新函数。

Rust 代码中的函数和变量名使用下划线命名法（*snake case*，直译为蛇形命名法）规范风格。在下划线命名法中，所有字母都是小写并使用下划线分隔单词。这是一个包含函数定义示例的程序：

<span class="filename">文件名: src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-16-functions/src/main.rs}}
```

Rust 中的函数定义以 `fn` 开始，后跟着函数名和一对圆括号。大括号告诉编译器函数体在哪里开始和结束。

可以使用函数名后跟圆括号来调用我们定义过的任意函数。因为程序中已定义 `another_function` 函数，所以可以在 `main` 函数中调用它。注意，源码中 `another_function` 定义在 `main` 函数**之后**；也可以定义在之前。Rust 不关心函数定义于何处，只要定义了就行。

让我们新建一个叫做 *functions* 的二进制项目来进一步探讨函数。将上面的 `another_function` 例子写入 *src/main.rs* 中并运行。你应该会看到如下输出：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-16-functions/output.txt}}
```

`main` 函数中的代码会按顺序执行。首先，打印 “Hello, world!” 信息，然后调用 `another_function` 函数并打印它的信息。

### 参数

函数也可以被定义为拥有**参数**（*parameter*），参数是特殊变量，是函数签名的一部分。当函数拥有参数（形参）时，可以为这些参数提供具体的值（实参）。技术上讲，这些具体值被称为**实参**（*argument*），但是在日常交流中，人们倾向于不区分使用 *parameter* 和 *argument* 来表示函数定义中的变量或调用函数时传入的具体值。

在这个版本的 `another_function` 中，我们添加了一个参数：

<span class="filename">文件名: src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-17-functions-with-parameters/src/main.rs}}
```

尝试运行程序，将会输出如下内容：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-17-functions-with-parameters/output.txt}}
```

`another_function` 的声明中有一个命名为 `x` 的参数。`x` 的类型被指定为 `i32`。当将 `5` 传给 `another_function` 时，`println!` 宏将 `5` 放入格式化字符串中大括号的位置。

在函数签名中，**必须**声明每个参数的类型。这是一个 Rust 设计中经过慎重考虑的决定：要求在函数定义中提供类型标注，意味着编译器几乎从不需要你在代码的其他地方注明类型来指出你的意图。

当一个函数有多个参数时，使用逗号分隔，像这样：

<span class="filename">文件名: src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-18-functions-with-multiple-parameters/src/main.rs}}
```

这个例子创建了一个有两个参数的名为 `print_labeled_measurement` 的函数。第一个参数名为 `value`， 类型是 `i32`。第二个参数是 `unit_label` ，类型是 `char`。接着该函数打印包含 `value` 和 `unit_label` 的文本。

让我们尝试运行这段代码。使用上面的例子替换当前 *functions* 项目的 *src/main.rs* 文件，并用 `cargo run` 运行它：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-18-functions-with-multiple-parameters/output.txt}}
```

因为我们使用 `5` 作为 `value` 的值，`h` 作为 `unit_label` 的值来调用函数，所以程序的输出包含这些值。

### 语句和表达式

函数体由一系列语句组成，也可选择以表达式结尾。目前为止，我们介绍的函数还没有包含结尾表达式，不过你已经看到了表达式作为语句的一部分。因为 Rust 是一门基于表达式（expression-based）的语言，所以这是一个需要理解的重要区别。其他语言没有这样的区别，所以让我们看看语句和表达式分别是什么，以及它们的区别如何影响函数体。

**语句**（*statement*）是执行一些操作但不返回值的指令。表达式（*expression*）计算并产生一个值。让我们看一些例子：

实际上，我们已经使用过语句和表达式。使用 `let` 关键字创建变量并绑定一个值是一个语句。在列表 3-1 中，`let y = 6;` 是一个语句。

<span class="filename">文件名: src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/listing-03-01/src/main.rs}}
```

<span class="caption">列表 3-1：包含一个语句的 `main` 函数定义</span>

函数定义也是语句，上面整个例子本身就是一个语句。

语句不返回值。因此，不能把 `let` 语句赋值给另一个变量，就像下面的代码尝试做的那样，会产生一个错误：

<span class="filename">文件名: src/main.rs</span>

```rust,ignore,does_not_compile
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-19-statements-vs-expressions/src/main.rs}}
```

当运行这个程序时，会得到如下错误：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-19-statements-vs-expressions/output.txt}}
```

`let y = 6` 语句并不返回值，所以没有可以绑定到 `x` 上的值。这与其他语言不同，例如 C 和 Ruby，它们的赋值语句会返回所赋的值。在这些语言中，可以这么写 `x = y = 6`，这样 `x` 和 `y` 的值都是 `6`；Rust 中不能这样写。

表达式会计算出一个值，并且你接下来要用 Rust 编写的大部分代码都由表达式组成。考虑一个数学运算，比如 `5 + 6`，这是一个表达式并计算出值 `11`。表达式可以是语句的一部分：在示例 3-1 中，语句 `let y = 6;` 中的 `6` 是一个表达式，它计算出的值是 `6`。函数调用是一个表达式。宏调用是一个表达式。我们用来创建新作用域的大括号（代码块） `{}` 也是一个表达式，例如：

<span class="filename">文件名: src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-20-blocks-are-expressions/src/main.rs}}
```

这个表达式：

```rust,ignore
{
    let x = 3;
    x + 1
}
```

是一个代码块，在这个例子中计算结果是 `4`。这个值作为 `let` 语句的一部分被绑定到 `y` 上。注意，`x + 1` 行的末尾没有分号，这与你目前见过的大部分代码行不同。表达式的结尾没有分号。如果在表达式的末尾加上分号，那么它就转换为语句，而语句不会返回值。在接下来探讨函数返回值和表达式时，请记住这一点。

### 带有返回值的函数

函数可以向调用它的代码返回值。我们并不对返回值命名，但要在箭头（`->`）后声明它的类型。在 Rust 中，函数的返回值等同于函数体最后一个表达式的值。使用 `return` 关键字和指定值，可以从函数中提前返回；但大部分函数隐式返回最后一个表达式。这是一个有返回值函数的例子：

<span class="filename">文件名: src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-21-function-return-values/src/main.rs}}
```

在 `five` 函数中没有函数调用、宏，甚至没有 `let` 语句——只有数字 `5` 本身。这在 Rust 中是一个完全有效的函数。注意，函数返回值的类型也被指定好，即 `-> i32`。尝试运行代码；输出应如下所示：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-21-function-return-values/output.txt}}
```

`five` 函数的返回值是 `5`，所以返回值类型是 `i32`。让我们仔细检查一下这段代码。有两个重要的部分：首先，`let x = five();` 这一行表明我们使用函数的返回值初始化一个变量。因为 `five` 函数返回 `5`，这一行与如下代码相同：

```rust
let x = 5;
```

其次，`five` 函数没有参数并定义了返回值类型，不过函数体只有单单一个 `5` 也没有分号，因为这是一个表达式，正是我们想要返回的值。

让我们看看另一个例子：

<span class="filename">文件名: src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-22-function-parameter-and-return/src/main.rs}}
```

运行代码会打印出 `The value of x is: 6`。但如果在包含 `x + 1` 的行尾加上一个分号，把它从表达式变成语句，我们将得到一个错误。

<span class="filename">文件名: src/main.rs</span>

```rust,ignore,does_not_compile
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-23-statements-dont-return-values/src/main.rs}}
```

运行代码会产生一个错误，如下：

```console
{{#include ../listings/ch03-common-programming-concepts/no-listing-23-statements-dont-return-values/output.txt}}
```

主要的错误信息 “mismatched types”（类型不匹配）揭示了这段代码的核心问题。函数 `plus_one` 的定义说明它要返回一个 `i32` 类型的值，不过语句并不会返回值，此值由单位类型 `()` 表示，表示不返回值。因为不返回值与函数定义相矛盾，从而出现一个错误。在输出中，Rust 提供了一条信息，可能有助于纠正这个错误：它建议删除分号，这将修复错误。
