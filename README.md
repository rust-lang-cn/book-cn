# Rust 程序设计语言

![Build Status](https://github.com/rust-lang-cn/book-cn/workflows/CI/badge.svg)
[![LICENSE-MIT](https://img.shields.io/badge/license-MIT-green)](https://raw.githubusercontent.com/rust-lang-cn/book-cn/master/LICENSE-MIT)
[![LICENSE-APACHE](https://img.shields.io/badge/license-Apache%202-blue)](https://raw.githubusercontent.com/rust-lang-cn/book-cn/master/LICENSE-APACHE)
![GitHub last commit](https://img.shields.io/github/last-commit/rust-lang-cn/book-cn?color=gold)
![GitHub contributors](https://img.shields.io/github/contributors/rust-lang-cn/book-cn?color=pink)
![Locatized 100%](https://img.shields.io/badge/localized-100%25-purple)
![rustwiki.org](https://img.shields.io/website?up_message=rustwiki.org&url=https%3A%2F%2Frustwiki.org)

> Chinese translation of [The Rust Programming Language][github-en]
>
> - 鉴于目前网上的中文版已经滞后英文内容，所以重新开启本书翻译，跟进原书，本书是 Rust 中文翻译项目组的重点翻译项目。
> - 本文档已 100% 翻译成中文，最后更新时间为 2022-01-30。
> - 本仓库翻译内容包括 Rust 中文翻译项目组本身原有的翻译以及采用网上已有的开源的翻译版本（如：[KaiserY/trpl-zh-cn][KaiserY] 译本），我们尽可能避免不必要的重复劳动，我们对原译者感激不尽！

[github-en]: https://github.com/rust-lang/book
[KaiserY]: https://github.com/KaiserY/trpl-zh-cn

本仓库包含《Rust 程序设计语言》图书的源码。

可以从 [No Starch 出版社购买本书的英文纸质图书][nostarch]。

> 中文译版注：
>
> 1. 中文出版书名为《Rust 权威指南》，可以在线上或线下购书平台购买。
> 2. 出版的版本翻译独立于本仓库翻译。

[nostarch]: https://nostarch.com/rust

在线版可以在本组织官网上[阅读中文版][book-cn]（**支持同一页面中英双语切换**）或在 Rust 官网上[阅读英文版][book-en]。另外在 Rust 官网的英文版在线阅读可以选择 [stable]、[beta] 和 [nightly] 三个不同的分支版本，这几个分支版本可能滞后于[英文仓库][github-en]的最新内容。

[book-cn]: https://rustwiki.org/zh-CN/book
[book-en]: https://doc.rust-lang.org/book/
[github-en]: https://github.com/rust-lang/book
[stable]: https://doc.rust-lang.org/stable/book/
[beta]: https://doc.rust-lang.org/beta/book/
[nightly]: https://doc.rust-lang.org/nightly/book/

## 依赖

构建本书需要 [mdBook]，最好使用的版本和 `rust-lang/rust` 在[这个文件][rust-mdbook]中指定的版本一致。执行以下命令安装：

[mdBook]: https://github.com/rust-lang-nursery/mdBook
[rust-mdbook]: https://github.com/rust-lang/rust/blob/master/src/tools/rustbook/Cargo.toml

```bash
$ cargo install mdbook --vers [version-num]
```

## 构建

构建此书，请输入：

```
$ mdbook build
```

输出内容存放在 `book` 子目录中。可使用浏览器打开来查看内容。

_Firefox:_

```bash
$ firefox book/index.html                       # Linux
$ open -a "Firefox" book/index.html             # OS X
$ Start-Process "firefox.exe" .\book\index.html # Windows (PowerShell)
$ start firefox.exe .\book\index.html           # Windows (Cmd)
```

_Chrome:_

```bash
$ google-chrome book/index.html                 # Linux
$ open -a "Google Chrome" book/index.html       # OS X
$ Start-Process "chrome.exe" .\book\index.html  # Windows (PowerShell)
$ start chrome.exe .\book\index.html            # Windows (Cmd)
```

运行测试:

```bash
$ mdbook test
```

## 参与贡献

您的帮助，我们将感激不尽(We'd love your help)！请参见 [CONTRIBUTING.md][contrib-cn]（英文原项目参与贡献指引 [CONTRIBUTING-EN.md][contrib]）。

[contrib-cn]: https://github.com/rust-lang-cn/book-cn/blob/master/CONTRIBUTING.md
[contrib]: https://github.com/rust-lang/book/blob/main/CONTRIBUTING.md

## 翻译

我们很乐意翻译这本书！请参阅[“翻译”][Translations]标签（在[英文原仓库][github-en]）以加入当前正在进行的工作。新建一个 Issue，开始使用新语言！在我们合并任何内容之前，我们正在等待 [mdbook 对多种语言的支持][mdbook support]，只要支持后将随时可以开始！

[github-en]: https://github.com/rust-lang/book
[Translations]: https://github.com/rust-lang/book/issues?q=is%3Aopen+is%3Aissue+label%3ATranslations
[mdbook support]: https://github.com/rust-lang-nursery/mdBook/issues/5

## 拼写检查

要扫描源文件是否存在拼写错误，可以使用 `ci` 目录中的脚本 `spellcheck.sh`。这需要一个带有有效单词的字典文件，由 `ci/dictionary.txt` 提供。如果脚本产生误报（例如，使用了词语 `BTreeMap` 被脚本认为无效），则需要在 `ci/dictionary.txt` 中添加该单词（保持排序顺序以确保一致性）。

## 授权协议

《Rust 程序设计语言》（中文版与英文版 The Rust Programming Language 均） 使用以下两种协议的任一种进行授权：

* Apache 2.0 授权协议，（[LICENSE-APACHE](LICENSE-APACHE) 或 http://www.apache.org/licenses/LICENSE-2.0）
* MIT 授权协议 ([LICENSE-MIT](LICENSE-MIT) 或 http://opensource.org/licenses/MIT)

可以根据自己选择来定。

除非您有另外说明，否则您在本仓库提交的任何贡献均按上述方式进行双重许可授权，就如 Apache 2.0 协议所规定那样，而无需附加任何其他条款或条件。
