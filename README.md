# Rust 程序设计语言

[![Build Status](https://travis-ci.org/rust-lang/book.svg?branch=master)](https://travis-ci.org/rust-lang/book)

> Chinese translation of [The Rust Programming Language][book-en]  
> 持续翻译中...

[book-en]： https://github.com/rust-lang/book

这是新版的《Rust 程序设计语言》，上一版是放在 [Rust 主代码库][src]中。如果想阅读上一版文档，可[在网上][prod]直接直接查阅。

[src]: https://github.com/rust-lang/rust/tree/master/src/doc/book
[prod]: https://doc.rust-lang.org/book/

如果你想看当前版本的内容，可[点击阅读][html-cn]（英文原版在 [Gihub pages][html] 上）。

[html-cn]: https://rustwiki.org/zh-CN/book-cn
[html]: http://rust-lang.github.io/book/

## 要求

构建这本书需要 [mdBook] >= v0.0.13。执行以下命令安装：

[mdBook]: https://github.com/azerupi/mdBook

```
$ cargo install mdbook
```

## 构建

构建此书，请输入：

```
$ mdbook build
```

输出落在 `book` 子目录中。可使用浏览器打开来查看内容。

_Firefox:_
```
$ firefox book/index.html           # Linux
$ open -a "Firefox" book/index.html # OS X
```

_Chrome:_
```
$ google-chrome book/index.html           # Linux
$ open -a "Google Chrome" book/index.html # OS X
```

运行测试:

```
$ mdbook test
```

## 参与贡献

您的帮助，我们将感激不尽(We'd love your help)！请参见 [CONTRIBUTING.md][contrib]。

[contrib]: https://github.com/rust-lang/book/blob/master/CONTRIBUTING.md

## No Starch

> No Starch 是美国的一家出版社

本书（英文原版）将由 No Starch 出版社出版，我们先在这里更新迭代，再将文本发送到 No Starch。然后他们进一步编辑，最后我们将内容取回来。

所以这里有一个 *nostarch* 目录，对应 No Starch 系统的文本。

当我们开始和 No Starch 配合使用 Word 文档后，我们还会在 *nostarch/odt* 目录中核对这些内容并加到库中。要将文本从 Word 文档中提取成 Markdown 格式，以便追踪线上书籍（即本书）的变更记录：

1. 在 LibreOffice 打开 doc 文件
1. 接受所有跟踪的更改
1. 另存为 Microsoft Word 2007-2013 XML (.docx) 文件到 *tmp* 目录
1. 运行 `./doc-to-md.sh`
1. 检查 *nostarch* 目录中的 Markdown 文件所做的更改，并适当地将变更的内容复制到 *src* 目录。

## Graphviz dot

> Graphviz 是一种图形绘制工具，使用 dot 语言来编写绘制

这主要是给 Carol 参考的，因为她不得不检查这些内容（原文：This is mostly for Carol's reference because she keeps having to look it up）。

我们使用 [Graphviz](http://graphviz.org/) 来绘制一些书中需要的图表。这些文件的源文件位于 `dot` 目录中。要将 `dot` 文件转换成 `svg` 文件，如转换 `dot/trpl04-01.dot` 文件，运行：

```
$ dot dot/trpl04-01.dot -Tsvg > src/img/trpl04-01.svg
```

在生成的 SVG 中，从 `svg` 元素中删除了宽度和高度属性，并将 `viewBox` 属性设置成 `0.00 0.00 1000.00 1000.00` 或其他不会截断图像的值。

## 拼写检查（仅对英文检查起作用）

要扫描源文件的拼写错误，可以使用 `spellcheck.sh` 脚本。这需要一个带有有效单词的字典文件，由 `dictionary.txt` 提供。如果脚本产生了一个假阳性（比如说，你使用了 `BTreeMap` 单词，但脚本认为无效），就需要将这个单词添加到 `dictionary.txt` 文件（保持排序的顺序以确保一致性）。

## 将 Windows 换行符转换为 Unix 的

这主要是给 Carol 参考，因为她不得不检查不规范的换行符。（原文：This is mostly for Carol's reference because she keeps having to look it up.）

```
$ tr -d '\015' < DOS-file > UNIX-file
```
