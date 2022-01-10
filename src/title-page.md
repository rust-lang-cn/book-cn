# Rust 程序设计语言

*由 Steve Klabnik 和 Carol Nichols，以及来自 Rust 社区贡献者撰写*

> 中文翻译注（Chinese translation of the [The Rust Programming Language][book-website]）：
>
> 1. **本站翻译已参照最新的 [Rust 1.57.0 版][rust-1.57.0]及[开发版][rust-nightly]进行调整**，这是目前网上最新的中文版本，最后更新时间 2022 年 1 月 11 日。
> 2. 《Rust 程序设计语言》(The Rust Programming Language 中文版) 翻译自 [The Rust Programming Language][book-website]，查看此书的 [GitHub 翻译项目][book-cn]。
> 3. 《Rust 程序设计语言》中文出版书名为《Rust 权威指南》，参见[“为什么 The Rust Programming Language 在线版书名翻译成《Rust 程序设计语言》”][trpl-translation]。
> 4. 本书已有由 [KaiserY 翻译完的版本](https://github.com/KaiserY/trpl-zh-cn)，Rust 中文翻译项目组将把之前未翻译完的内容直接采用 KaiserY 版内容，后续 Rust 中文翻译项目组将跟随 Rust 官方的英文版本更新。
> 5. 许可协议：跟随英文原书使用 MIT 和 Apache 2.0 双许可授权。
> 6. <a href="https://rustwiki.org/en/book" style="color:red;">本站支持文档中英文切换</a>，点击页面右上角语言图标可切换到相同章节的英文页面，**英文版每天都会自动同步一次官方的最新版本**。
> 7. 若发现本页表达错误或帮助我们改进翻译，可点击右上角的编辑按钮打开本页对应源码文件进行编辑和修改，Rust 中文资源的开源组织发展离不开大家，感谢您的支持和帮助！

本书的版本假设你使用 Rust 1.57（2021 年 12 月 2 日发布） 或更高版本。请参阅第 1 章的[“安装”][install]<!-- ignore -->部分来安装或更新 Rust。

HTML 格式可在 [https://rustwiki.org/zh-CN/book/](https://rustwiki.org/zh-CN/book/) 网站上阅读（英文版为：[https://doc.rust-lang.org/stable/book/](https://doc.rust-lang.org/stable/book/)）， 而离线阅读可在安装 Rust 后使用 `rustup` 生成（注：目前此命令只生成英文版，需要中文离线版可从[本书的中文翻译 GitHub 仓库][book-cn]上获取） ；运行 `rustup docs --book` 来打开本书。

可以从 [No Starch Press 获得平装图书和电子书格式][nsprust]（注：中文出版书名为《Rust 权威指南》，可从购书平台中购买）。

[rust-1.57.0]: https://doc.rust-lang.org/1.57.0/book/
[rust-nightly]: https://doc.rust-lang.org/nightly/book/
[book-website]: https://doc.rust-lang.org/book
[book-cn]: https://github.com/rust-lang-cn/book-cn
[trpl-translation]: https://rustwiki.org/wiki/translate/other-translation/#the-rust-programing-language
[install]: ch01-01-installation.html
[nsprust]: https://nostarch.com/rust
