## Refutability（可反驳性）: 模式是否会匹配失效

模式有两种形式：refutable（可反驳的）和 irrefutable（不可反驳的）。能匹配任何传递的可能值的模式被称为是 **不可反驳的**（*irrefutable*）。一个例子就是 `let x = 5;` 语句中的 `x`，因为 `x` 可以匹配任何值所以不可能会失败。对某些可能的值进行匹配会失败的模式被称为是 **可反驳的**（*refutable*）。一个这样的例子便是 `if let Some(x) = a_value` 表达式中的 `Some(x)`；如果变量 `a_value` 中的值是 `None` 而不是 `Some`，那么 `Some(x)` 模式不能匹配。

函数参数、 `let` 语句和 `for` 循环只能接受不可反驳的模式，因为通过不匹配的值程序无法进行有意义的工作。`if let` 和 `while let` 表达式被限制为只能接受可反驳的模式，因为根据定义他们意在处理可能的失败：条件表达式的功能就是根据成功或失败执行不同的操作。

通常我们无需担心可反驳和不可反驳模式的区别，不过确实需要熟悉可反驳性的概念，这样当在错误信息中看到时就知道如何应对。遇到这些情况，根据代码行为的意图，需要修改模式或者使用模式的结构。

让我们看看一个尝试在 Rust 要求不可反驳模式的地方使用可反驳模式以及相反情况的例子。在示例 18-8 中，有一个 `let` 语句，不过模式被指定为可反驳模式 `Some(x)`。如你所见，这不能编译：

```rust,ignore,does_not_compile
let Some(x) = some_option_value;
```

<span class="caption">示例 18-8: 尝试在 `let` 中使用可反驳模式</span>

若 `some_option_value` 的值是 `None`，则不会成功匹配模式 `Some(x)`，表明这个模式是可反驳的。然而 `let` 语句只能接受不可反驳模式，因为代码不能通过 `None` 值进行有效的操作。Rust 会在编译时抱怨我们尝试在要求不可反驳模式的地方使用可反驳模式：

```text
error[E0005]: refutable pattern in local binding: `None` not covered
 -->
  |
3 | let Some(x) = some_option_value;
  |     ^^^^^^^ pattern `None` not covered
```

因为我们没有覆盖（也无法覆盖！）模式 `Some(x)` 的每一个可能的有效值，Rust 理所当然地产生了编译器错误。

为了修复在需要不可反驳模式的地方使用可反驳模式的情况，可以修改使用模式的代码：不同于使用 `let`，可以使用 `if let`。如此，如果模式不匹配，大括号中的代码将被忽略，其余代码保持有效。示例 18-9 展示了如何修复示例 18-8 中的代码。

```rust
# let some_option_value: Option<i32> = None;
if let Some(x) = some_option_value {
    println!("{}", x);
}
```

<span class="caption">示例 18-9: 使用 `if let` 和一个带有可反驳模式的代码块来代替 `let`</span>

我们给了代码一个得以继续的出路！这段代码完全有效，尽管这意味着我们不能在避免产生警告的情况下使用无可辩驳的模式。如果为 `if let` 提供了一个总是会匹配的模式，比如示例 18-10 中的 `x`，编译器会给出一个警告。

```rust,ignore
if let x = 5 {
    println!("{}", x);
};
```

<span class="caption">示例 18-10: 尝试把不可反驳模式用到 `if let` 上</span>

Rust 会抱怨将不可反驳模式用于 `if let` 是没有意义的：

```text
warning: irrefutable if-let pattern
 --> <anon>:2:5
  |
2 | /     if let x = 5 {
3 | |     println!("{}", x);
4 | | };
  | |_^
  |
  = note: #[warn(irrefutable_let_patterns)] on by default
```

基于此，`match` 匹配分支必须使用可反驳模式，除了最后一个分支需要使用能匹配任何剩余值的不可反驳模式。Rust 允许我们在只有一个匹配分支的 `match` 中使用不可反驳模式，不过这么做不是特别有用，并可以被更简单的 `let` 语句替代。

目前我们已经讨论了所有可以使用模式的地方, 以及可反驳模式与不可反驳模式的区别，下面让我们一起去把可以用来创建模式的语法过目一遍吧。
