## 安装

第一步是安装 Rust。运行本章的命令需要联网，因为要从网络上下载 Rust。

第一步是安装 Rust。我们将通过 `rustup` 来下载 Rust，这是一个管理 Rust 版本和相关工具的命令行工具。您需要互联网连接才能下载。

> 注意：如果你出于某些原因不想用 `rustup`，请参阅 请参阅 [Rust 其他安装方法的页面][otherinstall] 了解更多选项。

[otherinstall]: https://forge.rust-lang.org/infra/other-installation-methods.html

下面步骤将安装 Rust 编译器的最新稳定版本。Rust 的稳定性保证可确保本书中所有能编译的示例在更新的 Rust 版本中能够继续通过编译。不同版本之间的输出可能会略有不同，因为 Rust 经常会改进错误消息和警告。也就是说，任何通过这些步骤安装的较新稳定版本的 Rust 应该都可以正常运行本书的内容。

### 命令行符号

> 在本章以及整本书中，我们将展示一些在终端中使用的命令。在终端中输入的行均以 `$` 开头，你不需输入 `$` 字符；它表示每个命令的开始。不以 `$` 开头的行通常表示上一个命令的输出内容。另外，专用于 PowerShell 的示例将使用 `>` 而不是 `$`。

### 在 Linux 或 macOS 上安装 `rustup`

如果你使用的是 Linux 或 macOS，打开终端并输入下面命令：

```console
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

这个命令将下载一个脚本并开始安装 `rustup` 工具，此工具将安装 `Rust` 的最新稳定版本。可能会提示你输入密码。如果安装成功，将出现下面这行：

```text
Rust is installed now. Great!
```

此外，你需要某种类型的链接器。很可能链接器已经安装好，但是当你尝试编译 Rust 程序并收到提示链接器无法执行的错误时，这意味着你的系统上未安装链接器，你需要手动安装一个链接器。C 编译器通常带有正确的链接器。查阅平台的相关文档，以了解如何安装 C 编译器。另外，一些常见的 Rust 包依赖于 C 代码，并且需要 C 编译器。因此，很值得立即安装一个。

此外，你还需要一个链接器（linker），这是 Rust 用来将其编译的输出关联到一个文件中的程序。很可能你已经有一个了。如果你遇到了链接器错误，请尝试安装一个 C 编译器，其通常包括一个链接器。C 编译器也很有用，因为一些常见的 Rust 包依赖于 C 代码，因此需要安装一个 C 编译器。

在 macOS 上，可运行以下命令获得 C 编译器：

```console
$ xcode-select --install
```

Linux 用户一般应按照相应发行版的文档来安装 GCC 或 Clang。例如，如果你使用 Ubuntu，则可安装 `build-essential` 包。

### 在 Windows 上安装 `rustup`

在 Windows 上，访问 [https://www.rust-lang.org/tools/install][install] 页面并按照说明安装 Rust。在安装过程的某个步骤，你可能会收到一条消息，提示你还需要适用于 Visual Studio 2013 或更高版本的 C++ 的构建工具（C++ build tools）。获取这些构建工具的最简单方法是安装 [Visual Studio 2019 的构建工具][visualstudio]。当被问及要安装哪些内容时，请确保已选择 “C++ build tools”，并包括 Windows 10 SDK 和英文语言包。

[install]: https://www.rust-lang.org/tools/install
[visualstudio]: https://visualstudio.microsoft.com/visual-cpp-build-tools/

本书的其余部分使用的命令行在 `cmd.exe` 和 `PowerShell` 中都可以运行。如果有特定差异，我们将说明使用哪个。

### 更新和卸载

通过 `rustup` 安装 Rust 后，更新到最新版本很简单。在 shell 中运行以下更新命令：

```console
$ rustup update
```

要卸载 `Rust` 和 `rustup`，在 shell 中运行以下卸载命令：

```console
$ rustup self uninstall
```

### 疑难解答

要检查是否正确安装了 Rust，可打开 shell 并输入下面这行：

```console
$ rustc --version
```

你应该看到最新发布的稳定版本的版本号、提交哈希值和提交日期，如下所示格式：

```text
rustc x.y.z (abcabcabc yyyy-mm-dd)
```

如果你看到此信息，则说明您已成功安装 Rust！如果没看到此信息，并且你使用的是 Windows，请检查 Rust 是否在 `%PATH%` 系统变量中。如果都正确，但 `Rust` 仍然无法正常工作，那么你可以在很多地方获得帮助。最简单的是去 [Rust 官方 Discord][discord] 的 #beginners 频道 。在这里，你可以和其他 Rustacean（Rust 用户，自嘲的昵称）聊天并寻求帮助。其他不错的资源还有 [Rust 用户论坛][users] 和 [Stack Overflow][stackoverflow]。

[discord]: https://discord.gg/rust-lang
[users]: https://users.rust-lang.org/
[stackoverflow]: https://stackoverflow.com/questions/tagged/rust

### 本地文档

Rust 的安装还自带文档的本地副本，可以方便地离线阅读。运行 `rustup doc` 让浏览器打开本地文档。

每当遇到标准库提供的类型或函数不知道怎么用时，都可以在 API 文档中查找到！
