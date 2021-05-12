# Rust 程序设计语言

*由 Steve Klabnik 和 Carol Nichols，以及来自 Rust 社区贡献者撰写*

> 中文翻译注（Chinese translation of the [The Rust Programming Language][book-website]）：<br>
> 1. 《Rust 程序设计语言》(The Rust Programming Language 中文版) 翻译自 [The Rust Programming Language][book-website]，查看此书的 [Github 翻译项目][book-cn]。
> 2. 本书已有由 [KaiserY 翻译完的版本](https://github.com/KaiserY/trpl-zh-cn)，Rust 中文翻译项目组将把之前未翻译完的内容直接采用 KaiserY 版内容，后续将跟随 Rust 官方的英文版本更新。
> 3. 许可协议：跟随英文原书使用 MIT 和 Apache 2.0 双许可授权。
> 4. <a href="https://rustwiki.org/zh-CN/book" style="color:red;">本站支持文档中英文切换</a>，点击页面右上角语言图标可切换到相同章节的英文页面，**英文版每天都会自动同步一次官方的最新版本**。
> 5. 若发现本页表达错误或帮助我们改进翻译，可点击右上角的编辑按钮打开本页对应源码文件进行编辑和修改，Rust 中文资源的开源组织发展离不开大家，感谢您的支持和帮助！

[book-website]: https://doc.rust-lang.org/book
[book-cn]: https://github.com/rust-lang-cn/book-cn

本书的版本假设你使用 Rust 1.52 或在所有项目中的 *Cargo.toml* 添加 `edition = "2018"` 指明使用 Rust 2018 版之后的更高版本。请参阅第 1 章的[“安装”][install]<!-- ignore -->部分来安装或更新 Rust，并参阅新的[附录 E][editions]<!-- ignore --> 来获取有关版本的信息。

2018 版的 Rust 语言包含许多改进，使Rust更符合人体工程学且更易于学习。本书的迭代更新过程包含许多更改并反映了这些改进：

- 第 7 章“使用程序包，crate 和模块管理不断增长的项目”已被大部分重写。这使得 2018 版中的模块系统和路径工作方式更加一致。
- 第 10 章有新的标题为“作为参数的特质”和“返回实现特质的类型”的部分，它们解释了新的 `impl Trait` 语法。
- 第 11 章增加了一个标题为 “在测试中使用 `Result<T, E>`”的新部分，该部分显示了如何编写使用 `?` 运算符的测试。
- 删除了第19章中的“高级生命周期”部分，因为编译器的改进使该部分中的构造更加罕见。
- 先前的附录 D “宏”已扩展为包含过程宏，并已移至第 19 章的“宏”部分。
- 附录 A “关键字”还介绍了新的原始标识符功能，该功能使在 2015 版和 2018 版中编写的代码能够互操作。
- 附录 D 现在的标题为“有用的开发工具”，涵盖了最近发布的可帮助您编写 Rust 代码的工具。
- 我们整本书中修复了一些小错误和措辞不准确的问题。感谢报告这些问题的读者！


请注意，即使在更新所用的 Rust 编译器版本时 ，所编译的 **Rust 程序设计语言**的早期迭代中的所有代码也将能够继续编译，而无需在项目的 *Cargo.toml* 中指明 edition="2018"。这就是 Rust 对向后兼容性的保证！

HTML 格式可从 [https://rustwiki.org/zh-CN/book/](https://rustwiki.org/zh-CN/book/) 在线阅读（英文版为：[https://doc.rust-lang.org/stable/book/](https://doc.rust-lang.org/stable/book/)）， 而脱机使用 `rustup` （注：目前只有英文） ；可以使用安装的 Rust 离线阅读。运行 `rustup docs --book` 来打开本书。

可以从 [No Starch Press 获得此文本的用书版本和电子书格式][nsprust]（注：中文出版书名为《Rust 权威指南》，可从购书平台中购买）。

[install]: ch01-01-installation.html
[editions]: appendix-05-editions.html
[nsprust]: https://nostarch.com/rust
