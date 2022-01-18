## 注释

很多开发者都在努力使他们的代码容易理解，但有时需要额外的解释。在这种情况下，开发者在它们的源代码中留下笔记或注释，编译器将会忽略掉这些内容，但读源代码的人可能会发现有用。

这是一条简单的注释：

```rust
// Hello, world.
```

在 Rust 中，惯用的注释形式以两个斜杆开头，直到该行尾结束。对于超出单行的注释，需要在注释的每行行首加上 `//`，如下所示：

```rust
// 我们在这里处理一些复杂事情，需要足够长的解释，使用
// 多行注释可做到这点。哇！我们希望这个注释将解释接下
// 来要实现的内容。
```

注释也可以放在包含代码的行后面：

<span class="filename">文件名：src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-24-comments-end-of-line/src/main.rs}}
```

不过下面的这种格式会更常见，将注释放到需要解释的代码的上面单独一行：

<span class="filename">文件名：src/main.rs</span>

```rust
{{#rustdoc_include ../listings/ch03-common-programming-concepts/no-listing-25-comments-above-line/src/main.rs}}
```

Rust 还具有另一种注释，即文档注释，我们将在第 14 章的“将 crate 发布到 Crates.io” 章节中进行讨论。
