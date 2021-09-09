## 定义模块来控制作用域与私有性

在本节，我们将讨论模块和其它一些关于模块系统的部分，如允许你命名项的 *路径*（*paths*）；用来将路径引入作用域的 `use` 关键字；以及使项变为公有的 `pub` 关键字。我们还将讨论 `as` 关键字、外部包和 glob 运算符。现在，让我们把注意力放在模块上！

*模块* 让我们可以将一个 crate 中的代码进行分组，以提高可读性与重用性。模块还可以控制项的 *私有性*，即项是可以被外部代码使用的（*public*），还是作为一个内部实现的内容，不能被外部代码使用（*private*）。

在餐饮业，餐馆中会有一些地方被称之为 *前台*（*front of house*），还有另外一些地方被称之为 *后台*（*back of house*）。前台是招待顾客的地方，在这里，店主可以为顾客安排座位，服务员接受顾客下单和付款，调酒师会制作饮品。后台则是由厨师工作的厨房，洗碗工的工作地点，以及经理做行政工作的地方组成。

我们可以将函数放置到嵌套的模块中，来使我们的 crate 结构与实际的餐厅结构相同。通过执行 `cargo new --lib restaurant`，来创建一个新的名为 `restaurant` 的库。然后将示例 7-1 中所罗列出来的代码放入 *src/lib.rs* 中，来定义一些模块和函数。

Filename: src/lib.rs

```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn server_order() {}

        fn take_payment() {}
    }
}
```
<span class="caption">示例 7-1：一个包含着含有函数的其他模块们的 `front_of_house` 模块</span>

我们用关键字 `mod` 定义一个模块，指定模块的名字（在示例中为 `front_of_house`），并用大括号包围模块的主体。我们可以在模块中包含其他模块，就像本示例中的 `hosting` 和 `serving` 模块。模块中也可以包含其他项，比如结构体、枚举、常量、trait，或者像示例 7-1 一样——包含函数。

通过使用模块，我们可以把相关的定义组织起来，并通过模块命名来解释为什么它们之间有相关性。使用这部分代码的程序员可以更方便的循着这种分组找到自己需要的定义，而不需要通览所有。编写这部分代码的程序员通过分组知道该把新功能放在哪里以便继续让程序保持组织性。

之前我们提到，*src/main.rs* 和 *src/lib.rs* 被称为 crate 根。如此称呼的原因是，这两个文件中任意一个的内容会构成名为 `crate` 的模块，且该模块位于 crate 的被称为 *模块树* 的模块结构的根部（"at the root of the crate’s module structure"）。

示例 7-2 展示了示例 7-1 所对应的模块树。

```text
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```

<span class="caption">示例 7-2：示例 7-1 中代码对应的模块树</span>

这个树展示了模块间是如何相互嵌套的（比如，`hosting` 嵌套在 `front_of_house` 内部）。这个树还展示了一些模块互为 *兄弟* ，即它们被定义在同一模块内（`hosting` 和 `serving` 都定义在 `front_of_house` 内）。继续使用家族比喻，如果模块A包含在模块B的内部，我们称模块A是模块B的 *孩子* 且模块B是模块A的 *父辈* 。注意整个模块树的根位于名为 `crate` 的隐式模块下。

模块树或许让你想起了电脑上文件系统的目录树。这是一个非常恰当的比喻！就像文件系统中的目录那样，你应使用模块来组织你的代码。而且就像一个目录中的文件那样，我们需要一个找到我们的模块的方式。
