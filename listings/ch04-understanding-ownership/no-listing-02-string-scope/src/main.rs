fn main() {
    // ANCHOR: here
    {
        let s = String::from("hello"); // 从此处起，s 开始有效

        // 使用 s
    }                                  // 此作用域已结束，
                                       // s 不再有效
    // ANCHOR_END: here
}
