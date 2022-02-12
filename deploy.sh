#!/bin/bash

set -o errexit -o nounset

rev=$(git rev-parse --short HEAD)

cd book

git init
git config user.name "Aaran Xu"
git config user.email "aaranxu@outlook.com"

git remote add upstream "git@github.com:rust-lang-cn/book-cn.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages > /dev/null 2>&1


cd ../english/book

git init
git config user.name "Aaran Xu"
git config user.email "aaranxu@outlook.com"

git remote add upstream "git@github.com:rust-lang-cn/book-cn.git"
git fetch upstream
git reset upstream/gh-pages-en

touch .

git add -A .
git commit -m "rebuild English pages at ${rev}"
git push -q upstream HEAD:gh-pages-en > /dev/null 2>&1
