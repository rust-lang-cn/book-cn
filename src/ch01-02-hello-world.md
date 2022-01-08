## Hello, World!

我们已经安装好了 Rust，接着编写第一个 Rust 程序。按照传统，在学习一门新语言时都会编写一个输出“Hello, world!”（你好，世界）的简单程序，本章我们也是如此。

> 注意：本书假定你已经熟悉基本的命令行。Rust 本身对编辑器、工具或代码存放的位置都没有特殊要求。所以要是你更喜欢 IDE 而不是命令行的话，可以随意选用你喜爱的 IDE。目前很多 IDE 都提供了一定程度的 Rust 支持。有关详细信息，请查看 IDE 的文档。最近，Rust 团队一直致力于提供出色的 IDE 支持，并且在这方面取得了迅速的进步！

### 创建项目目录

首先，创建一个存放 Rust 代码的目录。Rust 不关心代码存放的位置，但是对于本书中的练习和项目，我们建议在操作系统的主目录（home，在 Windows 下即用户目录）中创建一个 *projects* 目录，并保存你的全部项目。

打开终端，输入下面命令来创建 *projects* 目录，以在此目录里面创建 “Hello, world!” 项目目录。

对于 Linux、macOS 和 Windows 的 PowerShell，请输入以下命令：

```console
$ mkdir ~/projects
$ cd ~/projects
$ mkdir hello_world
$ cd hello_world
```

对于 Windows CMD，输入以下内容：

```cmd
> mkdir "%USERPROFILE%\projects"
> cd /d "%USERPROFILE%\projects"
> mkdir hello_world
> cd hello_world
```

### 编写和运行 Rust 程序

接下来，创建一个源文件并命名为 *main.rs*。Rust 文件通常以 *.rs* 扩展名结尾。如果文件名中使用了多个单词，请使用下划线将它们隔开。例如，命名为 *hello_world.rs*，而不是 *helloworld.rs*。

现在打开刚创建好的 *main.rs* 文件，输入示例 1-1 中的代码。

<span class="filename">文件名：main.rs</span>

```rust
fn main() {
    println!("Hello, world!");
}
```

<span class="caption">示例 1-1：一个打印 `Hello, world!` 的程序</span>

保存文件，并回到终端窗口。在 Linux 或 macOS 上，输入以下命令，编译并运行文件：

```console
$ rustc main.rs
$ ./main
Hello, world!
```

在 Windows 上，输入 `.\main.exe` 来代替 `./main`：

```powershell
> rustc main.rs
> .\main.exe
Hello, world!
```

不管你使用哪种操作系统，该字符串 `Hello, world!` 都应打印到了终端上。如果看不到此输出，请参考“安装”小节的 [“疑难解答”][troubleshooting]<!-- ignore --> 小节来查找解决方法。

如果 `Hello, world!` 打印成功，那么祝贺你！你已经正式编写了一个 Rust 程序。你已经成为了一名 Rust 开发者——欢迎加入 Rust 大家庭！

### Rust 程序剖析

让我们详细回顾一下 “Hello, world!” 程序发生了什么。这是拼图的第一块:

```rust
fn main() {

}
```

这几行定义了 Rust 的函数。`main` 函数（也称为主函数）很特殊：它始终是每个可执行 Rust 程序中运行的第一个代码。第一行声明一个名为 `main` 的函数，不带参数也没有返回值。如果有参数，那么它们的名字会放到括号内，它们将放在括号 `()` 内。

另外，请注意，函数主体用大括号 `{}` 括起来。Rust 需要函数体的所有内容都被括号包围起来。一种好的代码风格是将左大括号放在函数声明的同一行，且之间带有一个空格。

如果想在 Rust 项目中坚持标准代码风格，则可以使用自动格式化程序工具 `rustfmt` 来将代码格式化为特定风格。Rust 团队已将此工具包含在标准 Rust 发行版中（如 `rustc`），因此它应该已经安装在你的计算机上！更多相关详细信息，请查看在线文档。

`main` 函数内部是以下代码：

```rust
    println!("Hello, world!");
```

该行完成了此简单程序中的所有工作：它将文本打印到屏幕上。这里有 4 个要注意的重要细节。

首先，Rust 风格的缩进使用 4 个空格，而不是制表符。

其次，`println!` 调用 Rust 宏。如果改为调用函数，则应该将其输入为 `println`（不含 `!`）。我们将在第 19 章中更详细地讨论 Rust 宏。现在只需要知道，当看到一个 `!`，则意味着调用的是宏而不是普通的函数。

第三，你看到 `"Hello, world!"` 字符串。我们将这个字符串作为参数传递给 `println!`，接着 `println!` 将字符串打印到屏幕上。

第四，我们用分号（`;`，注意这是英文分号）结束该行，这表明该表达式已结束，下一个表达式已准备好开始。Rust 代码的大多数行都以一个 `;` 结尾。

### 编译和运行是独立的步骤

刚才我们运行一个新创建的程序。现在我们将分解这个过程，并检查每个步骤。

在运行 Rust 程序之前，必须使用 Rust 编译器来编译它，输入 `rustc` 命令并传入源文件的名称，如下所示：

```console
$ rustc main.rs
```

如果有 C 或 C++ 语言基础，你会注意到这点和 `gcc` 或 `clang` 类似。编译成功后，Rust 就会输出一个二进制可执行文件。

在 Linux、macOS 或 Windows 的 PowerShell 中，可通过输入 `ls` 命令来查看可执行文件。在 Linux 和 macOS 中，你将看到两个文件。使用 Windows 的 PowerShell，你将看到与使用 CMD 相同的三个文件。

```console
$ ls
main  main.rs
```

对于 Windows 的 CMD，可输入以下内容：

```cmd
> dir /B %= the /B option says to only show the file names =%
main.exe
main.pdb
main.rs
```

这显示了带有 *.rs* 扩展名的源代码文件，可执行文件（在 Windows 上是 *main.exe*，在所有其他平台上是 *main*），以及在使用 Windows 时包含一个带有 *.pdb* 扩展名的调试信息的文件。在这里，运行 *main* 或 *main.exe* 文件，如下所示：

```console
$ ./main # or .\main.exe on Windows
```

如果 *main.rs* 是 “Hello, world!” 程序，这将会打印 `Hello, world!` 到终端上。

如果你只熟悉动态语言，如 Ruby、Python 或 JavaScript，你很可能不习惯分多个步骤来编译和运行程序的方式。Rust 是一门**预编译**(*ahead-of-time compiled*)语言，这意味着你可以编译一个程序，将编译后的可执行文件给别人，即使他们没有安装 Rust 也可以运行程序。如果你为其他人提供 *.rb*、*.py* 或 *.js* 文件，那么对方也需要分别安装对应 Ruby、Python 或 JavaScript 的语言支持环境。但是在这些语言中，只需要一条命令来编译和运行程序。一切都是语言设计权衡的结果。

使用 `rustc` 编译对简单的程序可以轻松胜任，但随着项目的增长，你将会想要管理项目中所有相关内容，并想让其他用户和项目能够容易共享你的代码。接下来，我们将引入 Cargo 工具，这将帮助你学会编写真实开发环境的 Rust 程序。

[troubleshooting]: ch01-01-installation.html#troubleshooting
