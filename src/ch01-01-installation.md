## 安装

使用 Rust 的第一步就是安装它。运行本章的命令需要联网，因为要从网络上下载 Rust。

我们将使用终端来显示一些命令，这些行都以 `$` 符号开头。`$` 符号不需要键入，它们在那里表示每个命令的起始。网上很多教程和示例都遵循这个约定：`$` 表示命令以普通用户运行，`#` 表示命令以管理员用户运行。不以 `$` 开头的行通常表示上一个命令的输出内容。

### 在 Linux 或 Mac 上安装

如果您使用的是 Linux 或 Mac，您只需打开一个终端并输入：

```text
$ curl https://sh.rustup.rs -sSf | sh
```

这将下载一个脚本并开始安装。系统可能会提示您输入密码。如果一切顺利，您将会看到：

```text
Rust is installed now. Great!
```

当然，若是你不认可 `curl | sh` 模式，你可以以你喜欢的方式下载，检查，再运行脚本。

### 在 Windows 上安装

在 Windows 上，请到 [https://rustup.rs](https://rustup.rs/)<!-- ignore --> 网站上按照说明下载 rustup-init.exe。双击运行并按照提示装好。

在本书其余地方用到的 Windows 特定的命令都假定您使用的是 `cmd` 作为 `shell`。如果使用不同的 `shell`，很可能运行的命令与 Linux 和 Mac 的命令一样。要是都不能工作，请参考您正在使用的 shell 说明文档。

### 自定义安装

如果你出于某些原因而不喜欢使用 rustup.rs，请参阅 [Rust 安装说明页](https://www.rust-lang.org/install.html)的其他选项。

### 卸载

卸载 Rust 和安装 Rust 一样简单。在你的 shell 中运行卸载脚本：

```text
$ rustup self uninstall
```

### 疑难解答

如果已经安装好 Rust，你可以打开一个 shell，并键入：

```text
$ rustc --version
```

你将看到版本号，提交的哈希值（commit hash），以及提交日期。对于安装好的最新稳定版，该命令输出内容的格式类似这样：

```text
rustc x.y.z (abcabcabc yyyy-mm-dd)
```

若你看到这些内容，则说明 Rust 已经安装成功！恭喜！

要是看不到这些输出内容，且你正在使用 Windows，请检查 Rust 是否已经加入到 `%PATH%` 系统变量中。

如果还是不能工作，你可以在一些地方寻求帮助。最简单的方式就是使用 [irc.mozilla.org 上的 #rust 频道][irc]<!-- ignore -->，可以通过 [Mibbit][mibbit] 访问。进入该频道，你就和其他的 Rustaceans（我们称呼自己的昵称，译注：指 Rust 程序员或爱好者）交流，他们会帮助你。其他不错的资源还有 [Rust 用户论坛][users] 和 [Stack Overflow][stackoverflow]。

[irc]: irc://irc.mozilla.org/#rust
[mibbit]: http://chat.mibbit.com/?server=irc.mozilla.org&channel=%23rust
[users]: https://users.rust-lang.org/
[stackoverflow]: http://stackoverflow.com/questions/tagged/rust

### 本地文档

安装程序还包括文档的副本存放在本地，可以方便地离线阅读。运行 `rustup doc` 让浏览器上打开本地文档。(译注：自 Rust Stable 1.14.0 版本后，Rust 安装程序默认不再自带本地文档，需要添加本地文档的话，需要执行 `rustup component list` 查看 rust-docs 是否高亮，若无的话，则需要通过命令手动安装 `rustup component add rust-docs`，装好后 `rustup doc` 就可用了。参见[reddit][rustup-issue])

[rustup-issue]: https://www.reddit.com/r/rust/comments/5jv5lm/is_rustup_docs_broken_for_other_people/

遇到标准库提供的类型或函数不知道怎么用时，可在 API 文档找到相关的说明。
