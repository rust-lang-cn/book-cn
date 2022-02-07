## Hello, Cargo!

Cargo 是 Rust 的构建系统和包管理器。大多数 Rustacean 们使用 Cargo 来管理他们的 Rust 项目，因为它可以为你处理很多任务，比如构建代码、下载依赖库，以及编译这些库。（我们把代码所需要的库叫做**依赖**（*dependency*））。

最简单的 Rust 程序（如我们刚刚编写的）不含任何依赖。所以如果使用 Cargo 来构建 “Hello, world!” 项目，将只会用到 Cargo 构建代码的那部分功能。在编写更复杂的 Rust 程序时，你将添加依赖项，如果使用 Cargo 启动项目，则添加依赖项将更容易。

由于绝大多数 Rust 项目使用 Cargo，本书接下来的部分假设你也使用 Cargo。如果使用[“安装”][installation]<!-- ignore --> 部分介绍的官方安装包的话，则自带了 Cargo。如果通过其他方式安装的话，可以在终端输入如下命令检查是否安装了 Cargo：

```console
$ cargo --version
```

如果你看到了版本号，说明安装成功！如果看到类似 `command not found` 的错误，你应该查看相应安装文档以确定如何单独安装 Cargo。

### 使用 Cargo 创建项目

我们使用 Cargo 创建一个新项目，然后看看与上面的 Hello, world! 项目有什么不同。回到 *projects* 目录（或者你存放代码的目录）。接下来，可在任何操作系统下运行以下命令：

```console
$ cargo new hello_cargo
$ cd hello_cargo
```

第一行命令新建了名为 *hello_cargo* 的目录。我们将项目命名为 *hello_cargo*，同时 Cargo 在一个同名目录中创建项目文件。

进入 *hello_cargo* 目录并列出文件。将会看到 Cargo 生成了两个文件和一个目录：一个 *Cargo.toml* 文件，一个 *src* 目录，以及位于 *src* 目录中的 *main.rs* 文件。

它也在 *hello_cargo* 目录初始化了一个 Git 仓库，并带有一个 *.gitignore* 文件。如果在现有的 Git 仓库中运行 `cargo new`，则不会生成 Git 文件；你可以使用 `cargo new --vcs=git` 来覆盖此行为。

> 注意：Git 是一个常用的版本控制系统（version control system， VCS）。可以通过 `--vcs` 参数使 `cargo new` 切换到其它版本控制系统，或者不使用 VCS。运行 `cargo new --help` 查看可用的选项。

使用你喜欢的文本编辑器打开 *Cargo.toml* 文件。它应该看起来如示例 1-2 所示：

<span class="filename">文件名：Cargo.toml</span>

```toml
[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

[dependencies]
```

<span class="caption">示例 1-2：*cargo new* 命令生成的 *Cargo.toml* 的内容</span>

此文件使用 [*TOML*](https://toml.io)<!-- ignore --> (*Tom's Obvious, Minimal Language*) 格式，这是 Cargo 配置文件的格式。

第一行，`[package]`，是一个表块（section）标题，表明下面的语句用来配置一个包（package）。随着我们在这个文件增加更多的信息，还将增加其他表块。

接下来的三行设置了 Cargo 编译程序所需的配置：项目的名称、版本，以及使用的 Rust 大版本号（edition，区别于 version）。[附录 E][appendix-e]<!-- ignore --> 会介绍 `edition`（译注：Rust 的核心版本，即 2015、2018、2021 版等） 的值。

最后一行的 `[dependencies]` 是罗列项目依赖的表块的开始。在 Rust 中，代码包被称为 *crate*。这个项目并不需要其他的 crate，不过在第 2 章的第一个项目会用到依赖，那时会用得上这个表块。

现在打开 *src/main.rs* 看看：

<span class="filename">文件名：src/main.rs</span>

```rust
fn main() {
    println!("Hello, world!");
}
```

Cargo 生成了一个 “Hello, world!” 程序，正如我们之前编写的示例 1-1！到目前为止，之前项目与 Cargo 生成项目的区别是，Cargo 将代码放在 *src* 目录，同时项目根目录包含一个 *Cargo.toml* 配置文件。

Cargo 期望源文件存放在 *src* 目录中。项目根目录只存放说明文件（README）、许可协议（license）信息、配置文件和其他跟代码无关的文件。使用 Cargo 可帮助你保持项目干净整洁，一切井井有条。

对于没有使用 Cargo 开始的项目，比如我们之前创建的 Hello,world! 项目，你可以将其转化为一个 Cargo 项目。将代码放入 *src* 目录，并创建一个合适的 *Cargo.toml* 文件。

### 构建并运行 Cargo 项目

现在让我们看看通过 Cargo 构建和运行 “Hello, world!” 程序有什么不同！在 *hello_cargo* 目录下，输入下面的命令来构建项目：

```console
$ cargo build
   Compiling hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 2.85 secs
```

这个命令会创建一个可执行文件 *target/debug/hello_cargo* （在 Windows 上是 *target\debug\hello_cargo.exe*），而不是放在目前目录下。可以通过这个命令运行可执行文件：

```console
$ ./target/debug/hello_cargo # 或者在 Windows 下为 .\target\debug\hello_cargo.exe
Hello, world!
```

如果一切顺利，终端上应该会打印出 `Hello, world!`。首次运行 `cargo build` 时，也会使 Cargo 在项目根目录创建一个新文件：*Cargo.lock*。这个文件记录项目依赖的实际版本。这个项目并没有依赖，所以其内容比较少。你自己永远也不需要碰这个文件，让 Cargo 处理它就行了。

我们刚刚使用 `cargo build` 构建了项目，并使用 `./target/debug/hello_cargo` 运行了程序，也可以使用 `cargo run` 在一个命令中同时编译代码并运行生成的可执行文件：

```console
$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running `target/debug/hello_cargo`
Hello, world!
```

注意这一次并没有出现表明 Cargo 正在编译 `hello_cargo` 的输出。Cargo 发现文件并没有被改变，就直接运行了二进制文件。如果修改了源文件的话，Cargo 会在运行之前重新构建项目，并会出现像这样的输出：

```console
$ cargo run
   Compiling hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.33 secs
     Running `target/debug/hello_cargo`
Hello, world!
```

Cargo 还提供了一个名为 `cargo check` 的命令。该命令快速检查代码确保其可以编译，但并不产生可执行文件：

```console
$ cargo check
   Checking hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.32 secs
```

为什么你会不需要可执行文件呢？通常 `cargo check` 要比 `cargo build` 快得多，因为它省略了生成可执行文件的步骤。如果你在编写代码时持续的进行检查，`cargo check` 会加速开发！为此很多 Rustacean 编写代码时定期运行 `cargo check` 确保它们可以编译。当准备好使用可执行文件时才运行 `cargo build`。

我们回顾下已学习的 Cargo 内容：

- 可以使用 `cargo build` 构建项目。
- 可以使用 `cargo run` 一步构建并运行项目。
- 可以使用 `cargo check` 构建项目而无需生成二进制文件来检查错误。
- 有别于将构建结果放在与源码相同的目录，Cargo 会将其放到 _target/debug_ 目录。

使用 Cargo 的一个额外的优点是，不管你使用什么操作系统，其命令都是一样的。所以从现在开始本书将不再为 Linux 、macOS 或 Windows 提供平台特定的命令。

### 发布构建

当项目最终准备好发布时，可以使用 `cargo build --release` 来优化编译项目。这会在 *target/release* 而不是 *target/debug* 下生成可执行文件。这些优化可以让 Rust 代码运行的更快，不过启用这些优化也需要消耗更长的编译时间。这也就是为什么会有两种不同的配置：一种是为了开发，你需要经常快速重新构建；另一种是为用户构建最终程序，它们不会经常重新构建，并且希望程序运行得越快越好。如果你要对代码运行时间进行基准测试，请确保运行 `cargo build --release` 并使用 *target/release* 下的可执行文件进行测试。

### 使用 Cargo 当作习惯

对于简单项目， Cargo 并不比 `rustc` 提供了更多的优势，不过随着开发的深入，终将证明其价值。对于拥有多个 crate 的复杂项目，交给 Cargo 来协调构建将简单的多。

即便 `hello_cargo` 项目十分简单，它现在也使用了很多在你之后的 Rust 生涯将会用到的实用工具。实际中，要在任何已存在的项目上构建时，可以使用下面命令通过 Git 检出代码，进入到该项目目录并构建：

```console
$ git clone example.org/someproject
$ cd someproject
$ cargo build
```

关于更多 Cargo 的信息，请查阅[相应文档][its documentation]<!-- ignore -->。

[its documentation]: https://rustwiki.org/zh-CN/cargo/

## 总结

你已经准备好开启 Rust 之旅了！在本章中，你学习了如何：

- 使用 `rustup` 安装最新稳定版的 Rust
- 更新到新版的 Rust
- 打开本地安装的文档
- 直接通过 `rustc` 编写并运行 “Hello, world!” 程序
- 使用更常用的 Cargo 创建并运行新项目

是时候通过构建更具强大的程序来熟悉阅读和编写 Rust 代码了。所以在第 2 章我们会构建一个猜数字游戏程序。如果你更愿意从学习 Rust 常用的编程概念开始，请阅读第 3 章，接着再回到第 2 章。

[installation]: ch01-01-installation.html#安装
[appendix-e]: appendix-05-editions.html
