## Hello, World!

现在我们已经安装好了 Rust，接着我们编写第一个 Rust 程序。按照传统，在学习一门新语言时都会编写一个输出“Hello, world!”（你好，世界）的小程序，本章我们也是如此。

> 注意：本书假定你已经熟悉基本的命令行。Rust 本身对编辑器、工具或代码存放的位置都没有特别要求。所以要是你更喜欢 IDE 而不是命令行的话，可以随意选用你喜爱的 IDE。

### 创建项目文件

首先，创建一个文件来存放 Rust 代码。Rust 不关心代码存放的地方，但对于本书，我们建议在系统用户的家目录（home）下创建一个 *projects* 文件夹，并保存你的所有项目。打开终端并输入以下命令为此特定项目创建目录：

Linux 或 Mac:

```text
$ mkdir ~/projects
$ cd ~/projects
$ mkdir hello_world
$ cd hello_world
```

Windows:

```cmd
> mkdir %USERPROFILE%\projects
> cd %USERPROFILE%\projects
> mkdir hello_world
> cd hello_world
```

### 编写和运行 Rust 程序

接下来，创建一个源文件并命名为 *main.rs*。Rust 文件通常以 *.rs* 扩展名结尾。如果文件名中使用了多个单词，请使用下划线将它们隔开。例如，采用 *hello_world.rs* 而不是 *helloworld.rs*。

现在打开刚创建好的 *main.rs* 文件，然后键入以下代码：

<span class="filename">文件名：main.rs</span>

```rust
fn main() {
    println!("Hello, world!");
}
```
保存文件，然后返回到终端窗口。在 Linux 或 OSX 上，输入以下命令：

```text
$ rustc main.rs
$ ./main
Hello, world!
```

在 Windows 上，运行 `.\main.exe` 而不是 `./main`。不管哪个操作系统，你都应该看到 `Hello, world!` 打印到了终端上。要是你做到了，那么祝贺你！你已经正式编写了一个 Rust 程序！欢迎进入 Rust 大家庭。

### Rust 程序的详解

现在我们来深入了解 “Hello, world!” 程序的细节。这是 Rutt 代码的主体结构（Here's the first piece of the puzzle）：

```rust
fn main() {

}
```

这几行定义了 Rust 中的函数。`main` 函数（也称为主函数）很特别：它是每个可执行的 Rust 程序的入口。第一行说：“我声明了一个名为 `main` 的函数，不带参数也没有返回值。”如果有参数，那么它们的名字会放到括号内，`(` 和 `)`。

另外注意到函数体包裹在大括号 `{` 和 `}` 中。Rust 需要函数体的所有内容都被括号包围起来。一种好的编程风格是将左大括号放在函数声明的同一行，且之间带有一个空格。

`main` 函数的内部：

```rust
    println!("Hello, world!");
```

此行执行了这个小程序的所有工作：将文本打印到屏幕上。这里有很多细节需要注意。第一点是 Rust 的风格是使用 4 个空格而不是制表符作为缩进。

第二个重要部分是 `println!`。这是在调用 Rust **宏**（*macro*），其中宏展示了 Rust 是如何元编程（metaprogramming）的。如果调用的是函数，那看起来类似这样：`println`（没有 `!`）。我们将在第 24 章详细讨论 Rust 的宏，但现在只需要知道，当看到一个 `!`，则意味着调用的是宏而不是普通的函数。

接下来是 `"Hello, world!"`，这是一个**字符串**（*string*）。我们将这个字符串作为参数传递给 `println!`，接着 `println!` 将字符串打印到屏幕上。就是如此简单！

本行以分号（`;`）结尾。`;` 表示此表达式已结束，并且准备开始下一行。Rust 的大多数行都以一个 `;` 结尾。

### 编译和运行是独立的步骤

在“编写和运行 Rust 程序”小节中，我们展示了如何运行一个新创建的程序。现在我们将分解这个过程，并检查每个步骤。

在运行 Rust 程序之前，你必须编译它。可以使用 Rust 编译器，输入 `rustc` 命令并传入源文件的名称，如下所示：

```text
$ rustc main.rs
```

如果有 C 或 C++ 语言基础，你会注意到这点和 `gcc` 或 `clang` 类似。编译成功后，Rust 就会输出一个二进制可执行文件，在 Linux 或 OSX 上输入 `ls` 命令将看到这些文件，如下所示：

```text
$ ls
main  main.rs
```

在 Windows，需要输入：

```cmd
> dir /B %= the /B option says to only show the file names =%
main.exe
main.rs
```

这里显示了两个文件：源代码文件（扩展名为 *.rs*），可执行文件（在 Windows 上格式为 *main.exe*，其他系统为 *main*）。还剩下要做的就是运行 *main* 或 *main.exe* 文件，像这样：

```text
$ ./main  # or .\main.exe on Windows
```

如果 *main.rs* 是 “Hello, world!”程序，这将会打印 `Hello, world!` 到终端上。

如果你只用过动态语言，如 Ruby、Python 或 JavaScript，你很可能不习惯分开多个步骤来编译和运行程序的方式。Rust 是一门**预编译**(*ahead-of-time compiled*)语言，这意味着你可以编译一个程序，将编译后的可执行文件给别人，即使他们没有安装 Rust 也可以运行程序。如果你给某人 `.rb`、`.py` 或 `.js` 文件，那就是另外一种情形，对方也需要分别安装对应 Ruby、Python 或 JavaScript 的语言实现，但只需要一条命令来编译和运行程序。一切都是语言设计权衡的结果。

使用 `rustc` 编译对简单的程序可以轻松胜任，但随着项目的增长，你将会想要管理项目中所有相关内容，并想让其他用户和项目能够容易共享你的代码。接下来，我们将引入一个名为 Cargo 的工具，这将帮助你学会编写真实开发环境的 Rust 程序。

## 使用 Cargo

Cargo 是 Rust 的构建系统和包管理器，Rustaceans 使用 Cargo 来管理他们的 Rust 项目，因为它使很多任务变得更容易。例如，Cargo 负责构建代码，下载项目代码依赖的库，以及构建这些库。我们将项目代码需要的库称为**依赖**（*dependency*）。

最简单的 Rust 程序，比如我们到目前为止编写的程序，没有任何依赖，所以现在你只能用到 Cargo 负责构建代码的那部分功能。随着你编写更复杂的 Rust 程序，你将需要增加依赖，如果你开始使用 Cargo，那将会更容易做到。

既然绝大多数 Rust 项目都使用 Cargo，我们也将假设您在本书的剩下部分都使用它。如果你使用安装的章节提到的官方安装方式，那么 Cargo 将会随着 Rust 一块安装。如果你通过其他方式安装 Rust，你可以通过在终端中键入以下内容来检查是否安装了 Cargo：

```text
$ cargo --version
```

如果能看到一个版本号，那相当棒！如果是见到类似这样的错误 `command not found`，那就阅读你选择安装方式的文档，以确定如何单独安装 Cargo。

### Hello, Cargo!

我们使用 Cargo 创建一个新的项目，并看看它与前面的 `hello_world` 项目有什么不同。回到你的项目目录（或者你自己选定的存放代码的位置）：

Linux 和 Mac:

```text
$ cd ~/projects
```

Windows:

```cmd
> cd %USERPROFILE%\projects
```

然后在任一操作系统中运行：

```text
$ cargo new hello_cargo --bin
$ cd hello_cargo
```

我们将 `-bin` 参数传给了 `cargo new`，因为我们的目标是创建一个可执行的应用程序，而不是一个库。可执行文件二进制可执行文件，通常只称作**二进制文件**。我们将 `hello_cargo` 作为项目的名称，Cargo 在一个同名的目录中创建了相关文件，然后我们可以进到目录内。

如果我们在 *hello_cargo* 目录中列出文件，我们可以看到 Cargo 为我们生成了两个文件和一个目录：一个 *Cargo.toml*，以及一个带有 *main.rs* 文件的 *src* 目录。它还为我们在 *hello_cargo* 目录中初始化了一个新的 git 仓库，以及一个 *.gitignore* 文件；你可以通过使用 `--vcs` 标志更改成使用其他版本控制系统或不使用版本控制系统。

在您选择的文本编辑器中打开 *Cargo.toml*。它的内容看起来类似这样：

<span class="filename">文件：Cargo.toml</span>

```toml
[package]
name = "hello_cargo"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]

[dependencies]
```

此文件采用 [*TOML*][toml]<!-- ignore --> (Tom's Obvious, Minimal Language) 格式。TOML 类似于 INI，但有一些额外的好处，并用作 Cargo 的配置格式。

[toml]: https://github.com/toml-lang/toml

第一行 `[package]` 是一个小节标题，表示下面语句正在配置包。当我们向此文件添加更多信息时，我们将添加其他小节。

接下来的三行设置了 Cargo 需要查看的三个配置点，以便知道它应该编译你的程序：程序名称，版本号，编写作者。Cargo 将从您的环境中获取您的姓名和电子邮件信息。如果信息有误，请修正并保存文件。

最后一行 `[dependencies]` 是另一个小节的开始，此节可列出项目将要依赖的任意 *crates*（这是我们对 Rust 代码的包的称呼），从而让 Cargo 知道下载和编译这些内容。我们在此项目不需要任何 cretes，但下一章节中的猜数字游戏就需要了。

现在我们来看看 *src/main.rs*:

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    println!("Hello, world!");
}
```

Cargo 生成了一个“Hello, world!”，就像我们前面编写过的一样。所以这一部分是一样的。之前的项目和 Cargo 生成的项目之间的差异，我们目前看到的是：

- 我们的代码放在 *src* 目录中
- 项目的顶层包含一个 *Cargo.toml* 配置文件

Cargo 期望您的源文件位于 *src* 目录中，以便顶层项目目录只存放 READMEs（说明文档）、license（许可证信息）、配置文件，以及任何与代码无关的其他内容。像这样，Cargo 可以保持项目美观且整洁。物各有其位，物各在其位（原文：There's a place for everything, and everything is in its place）。

如果你启动了一个不使用 Cargo 的项目，正如我们在 *hello_world* 目录中的项目所做的一样，你可以通过将源代码移动到 *src* 目录并创建一个合适的 *Cargo.toml*，就可以达到和 Cargo 创建的项目一样。

### 构建并运行一个 Cargo 项目

现在我们来看看通过 Cargo 构建和运行 “Hello Wrold” 程序不同之处。为此，请输入以下命令：

```text
$ cargo build
   Compiling hello_cargo v0.1.0 (file:///projects/hello_cargo)
```

这应该已经在 *target/debug/hello_cargo*（或 Windows 上的 *target\debug\hello_cargo.exe*）中创建了一个可执行文件，您可以使用此命令运行：

```text
$ ./target/debug/hello_cargo # or .\target\debug\hello_cargo.exe on Windows
Hello, world!
```

如果一切顺利，“Hello, world!” 将再次打印到终端。

第一次运行 `cargo build` 也会触发 Cargo 在顶层目录创建一个名为 *Cargo.lock* 的新文件，其格式如下：

<span class="filename">文件名： Cargo.lock</span>

```toml
[root]
name = "hello_cargo"
version = "0.1.0"
```

Cargo 使用 *Cargo.lock* 来保持跟踪应用程序中的依赖关系。本项目没有依赖，所以内容有点少。实际上，你不需要自己接触这个文件；交给 Cargo 处理就可以了。

我们刚刚使用 `cargo build` 构建项目并使用 `./target/debug/hello_cargo`来运行，其实我们也可以使用 `cargo run` 来编译并运行：

```text
$ cargo run
     Running `target/debug/hello_cargo`
Hello, world!
```

注意，这一次我们并没有见到输出结果告诉我们 Cargo 正在编译 `hello_cargo`。Cargo 推断出文件并没有改变，所以它只是运行二进制文件。如果你修改了源代码，Cargo 将在运行它之前重新构建项目，你会看到像这样的内容：

```text
$ cargo run
   Compiling hello_cargo v0.1.0 (file:///projects/hello_cargo)
     Running `target/debug/hello_cargo`
Hello, world!
```

所以现在我们看到了更多的差异：

- 不使用 `rustc`，而使用 `cargo build` 构建项目（或使用 `cargo run` 一次性构建并运行）
- Cargo 构建的结果不和代码放在同一目录，而是将它放到 *target/debug* 目录中。

使用 Cargo 的另一个优点是无论您用什么操作系统，命令都是相同的。所以到了这点，我们将不再为 Linux 或 Mac 提供特定的指令。


### 为发布构建

当您的项目最终准备发布时，你可以使用 `cargo build --release` 加上优化来编译项目。这将在 *target/release* （而不是在 *target/debug*）上创建一个可执行文件。这些优化可以使 Rust 代码运行更快，但打开它们后会使程序的编译时间变得更长。这就是有两个不同的配置文件的原因：一个用于开发，适用于快速重新构建和频繁更新的情况；另一个用于构建最终的程序，交付给用户，不考虑重新构建，且希望运行尽可能快。如果你要对代码运行进行基准测试，请确保运行 `cargo build --release` 并使用 *target/release* 的可执行文件进行基准测试。

### 约定使用 Cargo

在简单项目中，Cargo 相比仅仅使用 `rustc` 并没有提供太多价值，但持续使用后将会证明它的价值所在。在由多个 crates 组成的复杂项目，使用 Cargo 整合构建则明显更加便利。有了 Cargo，你只需运行 `cargo build`，它就会恰当的方式工作。即使本项目很简单，但它也用到了很多真正的实用工具，并可用于后续使用 Rust 的开发中。事实上，您可以使用以下命令开始使用几乎所有要处理的 Rust 项目：

```text
$ git clone someurl.com/someproject
$ cd someproject
$ cargo build
```

> 注意：如果你想了解 Cargo 的更多详情，请查看官方的 [Cargo 指南][Cargo guide]，这涵盖了它所有的特性。

[Cargo guide]: http://doc.crates.io/guide.html
