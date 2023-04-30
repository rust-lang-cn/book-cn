# 编写猜数字游戏

让我们一起动手完成一个项目，来快速上手 Rust！本章将介绍 Rust 中一些常用概念，并向你展示如何在实际项目中运用它们。你将会学到 `let`、`match`、方法、关联函数、引用外部 crate 等知识！后续章节会深入探讨这些概念的细节。在本章，我们将做基础练习。

我们会实现一个经典的新手编程问题：猜数字游戏。这是它的工作原理：程序会随机生成一个 1 到 100 之间的整数。接着它会提示玩家猜一个数并输入，然后指出猜测是大了还是小了。如果猜对了，它会打印祝贺信息并退出。

## 创建一个新项目

要创建一个新项目，请进入你在第 1 章中所创建的 *projects* 目录，使用 Cargo 新建一个项目，如下：

```console
$ cargo new guessing_game
$ cd guessing_game
```

第一个命令 `cargo new`，把项目的名称（`guessing_game`）作为第一个参数。第二个命令进入到新创建的项目目录。

看看生成的 *Cargo.toml* 文件：

<span class="filename">文件名：Cargo.toml</span>

```toml
{{#include ../listings/ch02-guessing-game-tutorial/no-listing-01-cargo-new/Cargo.toml}}
```

正如第 1 章那样，`cargo new` 为你生成了一个 “Hello, world!” 程序。查看 *src/main.rs* 文件：

<span class="filename">文件名：src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/no-listing-01-cargo-new/src/main.rs}}
```

现在使用 `cargo run` 命令，一步完成 “Hello, world!” 程序的编译和运行：

```console
{{#include ../listings/ch02-guessing-game-tutorial/no-listing-01-cargo-new/output.txt}}
```

当你需要在项目中快速迭代时，`run` 命令就能派上用场，正如我们在这个游戏项目中做的，在下一次迭代之前快速测试每一次迭代。

重新打开 *src/main.rs* 文件。我们将会在这个文件中编写全部的代码。

## 处理一次猜测

猜数字程序的第一部分请求用户输入，处理该输入，并检查输入是否符合预期格式。首先，我们将允许玩家输入猜测。在 *src/main.rs* 中输入示例 2-1 中的代码。

<span class="filename">文件名：src/main.rs</span>

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-01/src/main.rs:all}}
```

<span class="caption">示例 2-1：获取用户猜测并打印的代码</span>

这些代码包含很多信息，让我们一行一行地过一遍。为了获取用户输入并打印结果作为输出，我们需要引入 `io` 输入/输出库到当前作用域。`io` 库来自于标准库，标准库也被称为 `std`：

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-01/src/main.rs:io}}
```

默认情况下，Rust会将少量标准库中定义的程序项（item）引入到每个程序的作用域中。这些项称作 *prelude*，可以在[标准库文档][prelude]<!-- ignore -->中了解到关于它的所有知识。

如果需要的类型不在 prelude 中，你必须使用 `use` 语句显式地将其引入作用域。`std::io` 库提供很多有用的功能，包括接收用户输入的功能。

如第 1 章所提及，`main` 函数是程序的入口点：

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-01/src/main.rs:main}}
```

`fn` 语法声明了一个新函数，小括号 `()` 表明没有参数，大括号 `{` 作为函数体的开始。

正如你在第 1 章中学到的，`println!` 是一个在屏幕上打印字符串的宏：

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-01/src/main.rs:print}}
```

这段代码打印一个提示，介绍游戏的内容并请求用户输入。

### 使用变量存储值

接下来，创建一个储存用户输入的**变量**（*variable*），像这样：

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-01/src/main.rs:string}}
```

现在程序开始变得有意思了！这一小行代码发生了很多事。我们使用 `let` 语句来创建变量。这里是另外一个例子：

```rust,ignore
let apples = 5;
```

这行代码新建了一个叫做 `apples` 的变量并把它绑定到值 `5` 上。在 Rust 中，变量默认是不可变的。我们将会在第 3 章的 [“变量与可变性”][variables-and-mutability]<!-- ignore -->章节详细讨论这个概念。想要让变量可变，可以在变量名前添加 `mut`（mutability，可变性）：

```rust,ignore
let apples = 5; // 不可变
let mut bananas = 5; // 可变
```

> 注意：`//` 语法开始一个注释，持续到行尾。Rust 忽略注释中的所有内容，[第 3 章][comments]<!-- ignore -->将会详细介绍注释。

回到猜数字程序中，现在我们知道了 `let mut guess` 会引入一个叫做 `guess` 的可变变量。等号（`=`）告诉 Rust 现在想将某个值绑定在变量上。等号的右边是 `guess` 所绑定的值，它是 `String::new` 的结果，这个函数会返回一个 `String` 的新实例。[`String`][string]<!-- ignore --> 是标准库提供的字符串类型，是一个 UTF-8 编码的可增长文本。

`::new` 那一行的 `::` 语法表明 `new` 是 `String` 类型的一个关联函数。**关联函数**（*associated function*）是实现一种特定类型的函数，在这个例子中类型是 `String`。这个 `new` 函数创建了一个新的空字符串。你会在很多类型上找到一个 `new` 函数，因为它是创建类型实例的惯用函数名。

总的来说，`let mut guess = String::new();` 这一行创建了一个可变变量，目前它绑定到一个新的 `String` 空实例上。呼！

### 接收用户输入

回忆一下，我们在程序的第一行使用 `use std::io;` 从标准库中引入了输入/输出功能。现在我们可以从 `io` 模块调用 `stdin` 函数，这将允许我们处理用户输入：

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-01/src/main.rs:read}}
```

如果程序的开头没有使用 `use std::io` 引入 `io` 库，我们仍可以通过 `std::io::stdin` 来调用函数。`stdin` 函数返回一个 [`std::io::Stdin`][iostdin]<!-- ignore --> 的实例，这是一个类型，代表终端标准输入的句柄。

接下来，`.read_line(&mut guess)` 这一行调用了 [`read_line`][read_line]<!-- ignore --> 方法，来从标准输入句柄中获取用户输入。我们还将 `&mut guess` 作为参数传递给 `read_line()`，以告诉它在哪个字符串存储用户输入。`read_line` 的全部工作是，将用户在标准输入中输入的任何内容都追加到一个字符串中（而不会覆盖其内容），所以它需要字符串作为参数。这个字符串应是可变的，以便该方法可以更改其内容。

`&` 表示这个参数是一个**引用**（*reference*），这为你提供了一种方法，让代码的多个部分可以访问同一处数据，而无需在内存中多次拷贝。引用是一个复杂的特性，Rust 的一个主要优势就是安全而简单的使用引用。完成当前程序并不需要了解太多细节。现在，我们只需知道就像变量一样，引用默认是不可变的。因此，需要写成 `&mut guess` 来使其可变，而不是 `&guess`。（第 4 章会更全面地解释引用。）

### 使用 `Result` 类型来处理潜在的错误

我们还要继续分析这行代码。虽然我们已经讲到了文本中的第三行，但它仍然是单个逻辑代码行的一部分（即一行代码中插入了空行）。下一部分是这个方法：

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-01/src/main.rs:expect}}
```

我们完全可以这样写：

```rust,ignore
io::stdin().read_line(&mut guess).expect("Failed to read line");
```

但是，一行过长的代码很难阅读，所以最好拆开来写。当你使用 `.method_name()` 语法调用方法时，用换行和空格来拆分长代码行通常是明智的。现在让我们来看看这行代码干了什么。

之前提到了 `read_line` 将用户输入存储到我们传递给它的字符串中，但它也返回一个值——在这个例子中是 [`io::Result`][ioresult]<!-- ignore -->。Rust 标准库中有很多名为 `Result` 的类型：一个通用的 [`Result`][result]<!-- ignore --> 以及在子模块中的特化版本，比如 `io::Result`。`Result` 类型是 [*枚举*（*enumerations*）][enums]<!-- ignore -->，通常也写作 *enum*。枚举类型持有固定集合的值，这些值被称为枚举的**成员**（*variant*）。枚举往往与条件表达式 `match` 一起使用，`match` 是一种条件语句，在其被执行时，可以方便地匹配不同枚举值来执行不同的代码。

第 6 章将更详细地介绍枚举类型。这些 `Result` 类型的目的是编码错误处理信息。

`Result` 的成员是 `Ok` 和 `Err`，`Ok` 成员表示操作成功，且 `Ok` 内部包含成功生成的值。`Err` 成员则意味着操作失败，并且包含失败的前因后果。

`Result` 类型的值，就像任何类型的值一样，都有为其定义的方法。`io::Result` 的实例拥有 [`expect` 方法][expect]<!-- ignore -->。如果 `io::Result` 实例的值是 `Err`，`expect` 会导致程序崩溃，并显示传递给 `expect` 的参数。如果 `read_line` 方法返回 `Err`，则可能是底层操作系统引起的错误结果。如果 `io::Result` 实例的值是 `Ok`，`expect` 会获取 `Ok` 中的值并原样返回，以便你可以使用它。在本例中，这个值是用户输入的字节数。

如果不调用 `expect`，程序也能编译，但会出现警告提示：

```console
{{#include ../listings/ch02-guessing-game-tutorial/no-listing-02-without-expect/output.txt}}
```

Rust 警告我们没有使用 `read_line` 的返回值 `Result`，这表明程序没有处理一个可能发生的错误。

消除警告的正确做法是实际编写错误处理代码，但在这个例子中，我们只希望程序在出现问题时立即崩溃，因此我们可以直接使用 `expect`。你将在[第 9 章][recover]<!-- ignore -->了解到如何从错误中恢复。

### 使用 `println!` 占位符打印值

除了闭合花括号外，目前为止代码中只有一行需要讨论：

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-01/src/main.rs:print_guess}}
```

这行代码现在打印了存储用户输入的字符串。里面的 `{}` 是预留在特定位置的占位符：把 `{}` 想象成小蟹钳，可以夹住合适的值。使用 `{}` 也可以打印多个值：第一对 `{}` 使用格式化字符串之后的第一个值，第二对则使用第二个值，依此类推。调用一次 `println!` 打印多个值看起来像这样：

```rust
let x = 5;
let y = 10;

println!("x = {} and y = {}", x, y);
```

这行代码会打印出 `x = 5 and y = 10`。

### 测试第一部分代码

让我们来测试下猜数字游戏的第一部分。使用 `cargo run` 运行：

<!-- manual-regeneration
cd listings/ch02-guessing-game-tutorial/listing-02-01/
cargo clean
cargo run
input 6 -->

```console
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 6.44s
     Running `target/debug/guessing_game`
Guess the number!
Please input your guess.
6
You guessed: 6
```

至此为止，游戏的第一部分已经完成：我们从键盘获取输入并打印了出来。

## 生成一个秘密数字

接下来，需要生成一个秘密数字，好让用户来猜。秘密数字应该每次都不同，这样重复玩才不会乏味；范围应该在 1 到 100 之间，这样才不会太困难。Rust 标准库中尚未包含随机数功能。然而，Rust 团队还是提供了一个包含上述功能的 [`rand` crate][randcrate]。

### 使用 crate 来增加更多功能

记住，*crate* 是一个 Rust 代码包。我们正在构建的项目是一个 **二进制 crate**，它生成一个可执行文件。 `rand` crate 是一个 **库 crate**，库 crate 可以包含任意能被其他程序使用的代码，但是不能独自执行。

Cargo 对外部 crate 的运用是其真正的亮点所在。在我们使用 `rand` 编写代码之前，需要修改 *Cargo.toml* 文件，引入一个 `rand` 依赖。现在打开这个文件并将下面这一行添加到 `[dependencies]` 表块标题之下。请确保按照我们这里的方式指定 `rand` 及其这里给出的版本号，否则本教程中的示例代码可能无法工作。

<!-- When updating the version of `rand` used, also update the version of
`rand` used in these files so they all match:
* ch07-04-bringing-paths-into-scope-with-the-use-keyword.md
* ch14-03-cargo-workspaces.md
-->

<span class="filename">文件名：Cargo.toml</span>

```toml
{{#include ../listings/ch02-guessing-game-tutorial/listing-02-02/Cargo.toml:9:}}
```

在 *Cargo.toml* 文件中，表头以及之后的内容属同一个表块，直到遇到下一个表头才开始新的表块。在 `[dependencies]` 表块中，你要告诉 Cargo 本项目依赖了哪些外部 crate 及其版本。本例中，我们使用语义化版本 `0.8.3` 来指定 `rand` crate。Cargo 理解[语义化版本][semver]<!-- ignore -->（Semantic Versioning，有时也称为 *SemVer*），这是一种定义版本号的标准。`0.8.3` 实际上是 `^0.8.3` 的简写，它表示任何至少包含 `0.8.3` 但低于 `0.9.0` 的版本。 Cargo 认为这些版本具有与 `0.8.3` 版本兼容的公有 API， 并且此规范可确保你将获得最新的补丁版本，它仍然可以与本章中的代码正常编译。`0.9.0` 或更高版本则不再确保 API 和以下示例所使用的 API 相同。

现在，不修改任何代码就可以构建项目，如示例 2-2 所示：

<!-- manual-regeneration
cd listings/ch02-guessing-game-tutorial/listing-02-02/
cargo clean
cargo build -->

```console
$ cargo build
    Updating crates.io index
  Downloaded rand v0.8.3
  Downloaded libc v0.2.86
  Downloaded getrandom v0.2.2
  Downloaded cfg-if v1.0.0
  Downloaded ppv-lite86 v0.2.10
  Downloaded rand_chacha v0.3.0
  Downloaded rand_core v0.6.2
   Compiling rand_core v0.6.2
   Compiling libc v0.2.86
   Compiling getrandom v0.2.2
   Compiling cfg-if v1.0.0
   Compiling ppv-lite86 v0.2.10
   Compiling rand_chacha v0.3.0
   Compiling rand v0.8.3
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 2.53s
```

<span class="caption">示例 2-2: 将 rand crate 添加为依赖之后运行 `cargo build` 的输出</span>

可能会出现不同的版本号（多亏了语义化版本，它们与代码是兼容的！），同时显示顺序也可能会有所不同。

当我们引入了一个外部依赖后，Cargo 将从 *registry* 上获取所有依赖所需的最新版本，这是一份来自 [Crates.io][cratesio] 的数据拷贝。Crates.io 是 Rust 生态环境中开发者们向他人贡献 Rust 开源项目的地方。

在更新完 registry 后，Cargo 检查 `[dependencies]` 表块并下载缺失的 crate 。本例中，虽然只声明了 `rand` 一个依赖，然而 Cargo 还是额外获取了 `rand` 所需的其他 crate，`rand` 依赖它们来正常工作。下载完成后，Rust 编译依赖，然后使用这些依赖编译项目。

如果不做任何修改，立刻再次运行 `cargo build`，则不会看到任何除了 `Finished` 行之外的输出。Cargo 知道它已经下载并编译了依赖，同时 *Cargo.toml* 文件也没有变动。Cargo 还知道代码也没有任何修改，所以它不会重新编译代码。因为无事可做，它简单的退出了。

如果打开 *src/main.rs* 文件，做一些无关紧要的修改，保存并再次构建，则会出现两行输出：

<!-- manual-regeneration
cd listings/ch02-guessing-game-tutorial/listing-02-02/
touch src/main.rs
cargo build -->

```console
$ cargo build
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 2.53 secs
```

这一行表示 Cargo 只针对 *src/main.rs* 文件的微小修改而更新构建。依赖没有变化，所以 Cargo 知道它可以复用已经为此下载并编译的代码。

#### *Cargo.lock* 文件确保构建是可重现的

Cargo 有一个机制来确保任何人在任何时候重新构建代码，都会产生相同的结果：Cargo 只会使用你指定的依赖版本，除非你又手动指定了别的。例如，如果下周 `rand` crate 的 `0.8.4` 版本出来了，它修复了一个重要的 bug，同时也含有一个会破坏代码运行的缺陷。为了处理这个问题，Rust 在你第一次运行 `cargo build` 时建立了 *Cargo.lock* 文件，我们现在可以在 *guessing_game* 目录找到它。

当第一次构建项目时，Cargo 计算出所有符合要求的依赖版本并写入 *Cargo.lock* 文件。当将来构建项目时，Cargo 会发现 *Cargo.lock* 已存在并使用其中指定的版本，而不是再次计算所有的版本。这使得你拥有了一个自动化的可重现的构建。换句话说，项目会持续使用 `0.8.3` 直到你显式地升级，多亏有了 *Cargo.lock* 文件。

#### 更新 crate 到一个新版本

当你**确实**需要升级 crate 时，Cargo 提供了这样一个命令 `update`，它会忽略 *Cargo.lock* 文件，并计算出所有符合 *Cargo.toml* 声明的最新版本。Cargo 接下来会把这些版本写入 *Cargo.lock* 文件。不过，Cargo 默认只会寻找大于或等于 `0.8.3` 而小于 `0.9.0` 的版本。如果 `rand` crate 发布了两个新版本，`0.8.4` 和 `0.9.0`，在运行 `cargo update` 时会出现如下内容：

<!-- manual-regeneration
cd listings/ch02-guessing-game-tutorial/listing-02-02/
cargo update
assuming there is a new 0.8.x version of rand; otherwise use another update
as a guide to creating the hypothetical output shown here -->

```console
$ cargo update
    Updating crates.io index
    Updating rand v0.8.3 -> v0.8.4
```

Cargo 忽略了 `0.9.0` 版本。此时你还会注意到 *Cargo.lock* 文件中发生了更改， 无非就是正在使用的 `rand` crate 版本改为 `0.8.4`。如果想要 `rand` 使用 `0.9.0` 版本或任何 `0.9.x` 系列的版本，则必须像这样更新 *Cargo.toml* 文件：

```toml
[dependencies]
rand = "0.9.0"
```

下一次运行 `cargo build` 时，Cargo 会从 registry（注册源） 更新可用的 crate，并根据你指定的新版本重新计算。

第 14 章会讲到 [Cargo][doccargo]<!-- ignore --> 及其[生态系统][doccratesio]<!-- ignore --> 的更多内容，不过目前你只需要了解这么多。通过 Cargo 复用库代码非常容易，因此 Rustacean 能够编写出由很多包组装而成的更轻巧的项目。

### 生成一个随机数

让我们开始使用 `rand` 来生成一个猜测的数字。下一步是更新 *src/main.rs*，如示例 2-3 所示。

<span class="filename">文件名：src/main.rs</span>

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-03/src/main.rs:all}}
```

<span class="caption">示例 2-3：添加生成随机数的代码</span>

首先，我们新增了一行 `use rand::Rng`。`Rng` 是一个 trait，它定义了随机数生成器应实现的方法，想使用这些方法的话，此 trait 必须在作用域中。第 10 章会详细介绍 trait。

接下来，我们在中间添加两行。在首行中，我们调用 `rand::thread_rng` 函数来为我们提供将要使用的特定随机数生成器：它位于当前执行线程的本地环境中，并从操作系统获取 seed。然后我们调用随机数生成器的 `gen_range` 方法。该方法由我们刚才使用 `use rand::Rng` 语句引入的 `Rng` trait 定义。`gen_range` 方法获得一个区间表达式（range expression）作为参数，并在区间内生成一个随机数。我们在这里使用的区间表达式采用的格式为 `start..end`。它包括起始端，但排除终止端。所以我们需要指定 `1..101` 生成一个 1 到 100 之间的数字。或者我们可以传入区间 `1..=100`，这和前面的表达等价。

> 注意：你不可能凭空就知道应该 use 哪个 trait 以及该从 crate 中调用哪个方法，所以每个 crate 都有使用说明文档。Cargo 有一个很棒的功能是：运行 `cargo doc --open` 命令来构建所有本地依赖提供的文档，并在浏览器中打开。例如，假设你对 `rand` crate 中的其他功能感兴趣，你可以运行 `cargo doc --open` 并点击左侧导航栏中的 `rand`。

新添加的第二行代码打印出了秘密数字。这在开发程序时很有用，因为可以测试它，不过在最终版本中会删掉它。如果游戏一开始就打印出结果就没什么可玩的了！

尝试运行程序几次：

<!-- manual-regeneration
cd listings/ch02-guessing-game-tutorial/listing-02-03/
cargo run
4
cargo run
5
-->

```console
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 2.53s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 7
Please input your guess.
4
You guessed: 4

$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.02s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 83
Please input your guess.
5
You guessed: 5
```

你应该能得到不同的随机数，同时它们应该都是在 1 和 100 之间的。干得漂亮！

## 比较猜测的数字和秘密数字

现在有了用户输入和一个随机数，我们可以比较它们。这个步骤如示例 2-4 所示。注意这段代码还不能通过编译，我们稍后会解释。

<span class="filename">文件名：src/main.rs</span>

```rust,ignore,does_not_compile
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-04/src/main.rs:here}}
```

<span class="caption">示例 2-4：处理比较两个数字可能的返回值</span>

首先我们增加了另一个 `use` 声明，从标准库引入了一个叫做 `std::cmp::Ordering` 的类型到作用域中。`Ordering` 也是一个枚举，不过它的成员是 `Less`、`Greater` 和 `Equal`。这是比较两个值时可能出现的三种结果。

接着，底部的五行新代码使用了 `Ordering` 类型，`cmp` 方法用来比较两个值并可以在任何可比较的值上调用。它获取一个被比较值的引用：这里是把 `guess` 与 `secret_number` 做比较。 然后它会返回一个刚才通过 `use` 引入作用域的 `Ordering` 枚举的成员。使用一个 [`match`][match]<!-- ignore --> 表达式，根据对 `guess` 和 `secret_number` 调用 `cmp` 返回的 `Ordering` 成员来决定接下来做什么。

一个 `match` 表达式由**分支（arm）** 构成。一个分支包含一个用于匹配的**模式**（*pattern*），给到 `match` 的值与分支模式相匹配时，应该执行对应分支的代码。Rust 获取提供给 `match` 的值并逐个检查每个分支的模式。模式和 `match` 结构是 Rust 中强大的功能，它体现了代码可能遇到的多种情形，并帮助你确保没有遗漏处理。这些功能将分别在第 6 章和第 18 章详细介绍。

让我们看看使用 `match` 表达式的例子。假设用户猜了 50，这时随机生成的秘密数字是 38。比较 50 与 38 时，因为 50 比 38 要大，`cmp` 方法会返回 `Ordering::Greater`。`Ordering::Greater` 是 `match` 表达式得到的值。它检查第一个分支的模式，`Ordering::Less` 与 `Ordering::Greater`并不匹配，所以它忽略了这个分支的代码并来到下一个分支。下一个分支的模式是 `Ordering::Greater`，**正确**匹配 `Ordering::Greater`！这个分支关联的代码被执行，在屏幕打印出 `Too big!`。`match` 表达式就此终止，因为该场景下没有检查最后一个分支的必要。

然而，示例 2-4 的代码并不能编译，可以尝试一下：

```console
{{#include ../listings/ch02-guessing-game-tutorial/listing-02-04/output.txt}}
```

错误的核心表明这里有**不匹配的类型**（*mismatched type*）。Rust 有一个静态强类型系统，同时也有类型推断。当我们写出 `let guess = String::new()` 时，Rust 推断出 `guess` 应该是 `String` 类型，并不需要我们写出类型。另一方面，`secret_number` 是数字类型。Rust 中有好几种数字类型拥有 1 到 100 之间的值：32 位数字 `i32`、32 位无符号数字 `u32`、64 位数字 `i64`，等等。Rust 默认使用 `i32`，这是 `secret_number` 的类型，除非额外指定类型信息，或任何能让 Rust 推断出不同数值类型的信息。这里错误的原因在于 Rust 不会比较字符串类型和数字类型。

所以我们必须把从输入中读取到的 `String` 转换为一个真正的数字类型，才好与秘密数字进行比较。这可以通过在 `main` 函数体中增加如下两行代码来实现：

<span class="filename">文件名：src/main.rs</span>

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/no-listing-03-convert-string-to-number/src/main.rs:here}}
```

这行代码是：

```rust,ignore
let guess: u32 = guess.trim().parse().expect("Please type a number!");
```

这里创建了一个叫做 `guess` 的变量。不过等等，不是已经有了一个叫做 `guess` 的变量了吗？确实如此，不过 Rust 允许用一个新值来**遮蔽** （*shadow*） `guess` 之前的值。这允许我们复用 `guess` 变量的名字，而不是被迫创建两个不同变量，诸如 `guess_str` 和 `guess` 之类。我们会在第 3 章介绍变量遮蔽的更多细节，目前暂时只需要知道这个功能通常用作转换值类型。

我们将这个新变量绑定到 `guess.trim().parse()` 表达式上。表达式中的 `guess` 是指原始的 `guess` 变量，其中包含作为字符串的输入。`String` 实例的 `trim` 方法会去除字符串开头和结尾的空白字符，我们必须执行此方法才能将字符串与 `u32` 比较，因为 `u32` 只能包含数值型数据。用户必须输入 <span class="keystroke">enter</span> 键才能让 `read_line` 返回，并输入他们的猜想，这会在字符串中增加一个换行符。例如，用户输入 <span class="keystroke">5</span> 并按下 <span class="keystroke">enter</span>，`guess` 看起来像这样：`5\n`，`\n` 代表 “换行”（在 Windows 中，按 <span
class="keystroke">enter</span> 键会得到一个回车和一个换行符 `\r\n`）。`trim` 方法会消除 `\n` 或 `\r\n`，只留下 `5`。

[字符串的 `parse` 方法][parse]<!-- ignore --> 将字符串解析成数字。因为这个方法可以解析多种数字类型，因此需要告诉 Rust 具体的数字类型，这里通过 `let guess: u32` 指定。`guess` 后面的冒号（`:`）告诉 Rust 我们指定了变量的类型。Rust 有一些内建的数字类型；`u32` 是一个无符号的 32 位整型。对于不大的正整数来说，它是不错的类型，第 3 章还会讲到其他数字类型。另外，程序中的 `u32` 标注以及与 `secret_number` 的比较，意味着 Rust 会推断出 `secret_number` 也是 `u32` 类型。现在可以使用相同类型比较两个值了！

由于 `parse` 方法只能用于可以逻辑转换为数字的字符，所以调用它很容易产生错误。例如，字符串中包含 `A👍%`，就无法将其转换为一个数字。因此，`parse` 方法返回一个 `Result` 类型。像前面 [“使用 `Result` 类型来处理潜在的错误”][handling-potential-failure-with-the-result-type]<!-- ignore--> 部分讨论的 `read_line` 方法那样，再次按部就班地用 `expect` 方法处理即可。如果 `parse` 不能从字符串生成一个数字，返回一个 `Result` 的 `Err` 成员时，`expect` 会使游戏崩溃并打印附带的信息。如果 `parse` 成功地将字符串转换为一个数字，它会返回 `Result` 的 `Ok` 成员，然后 `expect` 会返回 `Ok` 值中的数字。

现在让我们运行程序！

<!-- manual-regeneration
cd listings/ch02-guessing-game-tutorial/no-listing-03-convert-string-to-number/
cargo run
  76
-->

```console
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 0.43s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 58
Please input your guess.
  76
You guessed: 76
Too big!
```

漂亮！即便是在猜测之前添加了空格，程序依然能判断出用户猜测了 76。多运行程序几次，输入不同的数字来检验不同的行为：猜一个正确的数字，猜一个过大的数字和猜一个过小的数字。

现在游戏已经大体上能玩了，不过用户只能猜一次。增加一个循环来改变它吧！

## 使用循环来允许多次猜测

`loop` 关键字创建了一个无限循环。我们会增加循环来给用户更多猜数字的机会：

<span class="filename">文件名：src/main.rs</span>

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/no-listing-04-looping/src/main.rs:here}}
```

如上所示，我们将提示用户猜测之后的所有内容放入了循环。确保 loop 循环中的代码多缩进四个空格，再次运行程序。注意这里有一个新问题，因为程序忠实地执行了我们的要求：永远地请求另一个猜测，用户好像无法退出啊！

用户总能使用 <span class="keystroke">ctrl-c</span> 终止程序。不过还有另一个方法跳出无限循环，就是[“比较猜测的数字和秘密数字”][comparing-the-guess-to-the-secret-number]<!-- ignore -->部分提到的 `parse`：如果用户输入的答案不是一个数字，程序会崩溃。我们可以利用这一点来退出，如下所示：

<!-- manual-regeneration
cd listings/ch02-guessing-game-tutorial/no-listing-04-looping/
cargo run
(too small guess)
(too big guess)
(correct guess)
quit
-->

```console
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 1.50s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 59
Please input your guess.
45
You guessed: 45
Too small!
Please input your guess.
60
You guessed: 60
Too big!
Please input your guess.
59
You guessed: 59
You win!
Please input your guess.
quit
thread 'main' panicked at 'Please type a number!: ParseIntError { kind: InvalidDigit }', src/main.rs:28:47
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

输入 `quit` 将会退出程序，同时你会注意到输入其他任何非数字也一样。然而，这并不理想，我们想要当猜测正确的数字时游戏也能自动退出。

### 猜测正确后退出

让我们增加一个 `break` 语句，在用户猜对时退出游戏：

<span class="filename">文件名：src/main.rs</span>

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/no-listing-05-quitting/src/main.rs:here}}
```

通过在 `You win!` 之后增加一行 `break`，用户猜对了神秘数字后会退出循环。退出循环也意味着退出程序，因为循环是 `main` 的最后一部分。

### 处理无效输入

为了进一步改善游戏性，不要在用户输入非数字时崩溃，需要忽略非数字，让用户可以继续猜测。可以通过修改 `guess` 将 `String` 转化为 `u32` 那部分代码来实现，如示例 2-5 所示：

<span class="filename">文件名：src/main.rs</span>

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-05/src/main.rs:here}}
```

<span class="caption">示例 2-5: 忽略非数字的猜测并重新请求数字而不是让程序崩溃</span>

我们将 `expect` 调用换成 `match` 语句，从而实现遇到错误就崩溃转换成处理错误。须知 `parse` 返回一个 `Result` 类型，而 `Result` 是一个拥有 `Ok` 或 `Err` 成员的枚举。这里使用的 `match` 表达式，和之前处理 `cmp` 方法返回 `Ordering` 时用的一样。

如果 `parse` 能够成功的将字符串转换为一个数字，它会返回一个包含结果数字的 `Ok`。这个 `Ok` 值与 `match` 第一个分支的模式相匹配，该分支对应的动作返回 `Ok` 值中的数字 `num`，最后如愿变成新创建的 `guess` 变量。

如果 `parse` **不**能将字符串转换为一个数字，它会返回一个包含更多错误信息的 `Err`。`Err` 值不能匹配第一个 `match` 分支的 `Ok(num)` 模式，但是会匹配第二个分支的 `Err(_)` 模式：`_` 是一个通配符值，本例中用来匹配所有 `Err` 值，不管其中有何种信息。所以程序会执行第二个分支的动作，`continue` 意味着进入 `loop` 的下一次循环，请求另一个猜测。这样程序就有效的忽略了 `parse` 可能遇到的所有错误！

现在万事俱备，只需运行 `cargo run`：

<!-- manual-regeneration
cd listings/ch02-guessing-game-tutorial/listing-02-05/
cargo run
(too small guess)
(too big guess)
foo
(correct guess)
-->

```console
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 4.45s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 61
Please input your guess.
10
You guessed: 10
Too small!
Please input your guess.
99
You guessed: 99
Too big!
Please input your guess.
foo
Please input your guess.
61
You guessed: 61
You win!
```

太棒了！再有最后一个小的修改，就能完成猜数字游戏了：还记得程序依然会打印出秘密数字。在测试时还好，但正式发布时会毁了游戏。删掉打印秘密数字的 `println!`。示例 2-6 为最终代码：

<span class="filename">文件名：src/main.rs</span>

```rust,ignore
{{#rustdoc_include ../listings/ch02-guessing-game-tutorial/listing-02-06/src/main.rs}}
```

<span class="caption">示例 2-6：猜数字游戏的完整代码</span>

## 总结

此时此刻，你顺利完成了猜数字游戏。恭喜！

本项目通过动手实践，向你介绍了许多 Rust 的新概念：`let`、`match`、函数、使用外部 crate，等等。接下来的几章，你会继续深入学习这些概念。第 3 章介绍大部分编程语言都有的概念，比如变量、数据类型和函数，以及如何在 Rust 中使用它们。第 4 章探索所有权（ownership），这是一个 Rust 同其他语言大不相同的功能。第 5 章讨论结构体和方法的语法，而第 6 章侧重解释枚举。

[prelude]: https://rustwiki.org/zh-CN/std/prelude/index.html
[variables-and-mutability]: ch03-01-variables-and-mutability.html#变量和可变性
[comments]: ch03-04-comments.html
[string]: https://rustwiki.org/zh-CN/std/string/struct.String.html
[iostdin]: https://rustwiki.org/zh-CN/std/io/struct.Stdin.html
[read_line]: https://rustwiki.org/zh-CN/std/io/struct.Stdin.html#method.read_line
[ioresult]: https://rustwiki.org/zh-CN/std/io/type.Result.html
[result]: https://rustwiki.org/zh-CN/std/result/enum.Result.html
[enums]: ch06-00-enums.html
[expect]: https://rustwiki.org/zh-CN/std/result/enum.Result.html#method.expect
[recover]: ch09-02-recoverable-errors-with-result.html
[randcrate]: https://crates.io/crates/rand
[semver]: http://semver.org
[cratesio]: https://crates.io
[doccargo]: http://doc.crates.io
[doccratesio]: http://doc.crates.io/crates-io.html
[match]: ch06-02-match.html
[parse]: https://rustwiki.org/zh-CN/std/primitive.str.html#method.parse
[handling-potential-failure-with-the-result-type]: #使用-result-类型来处理潜在的错误
[comparing-the-guess-to-the-secret-number]: #比较猜测的数字和秘密数字
