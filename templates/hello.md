---
outputDirectory: ./hello/
name: Hello
description: The Hello World of scffld
keywords: [hello]
authors: [lindsayevans]
props:
  name:
    type: string
    required: true
---

# Hello

<!-- @scffld-usage-start -->

## Usage

```sh
npx @scffld/cli@latest reg:hello \
  --name="Your Name"
```

<!-- @scffld-usage-end -->

## Template files

```txt { filename: 'Hello_${ @scffld-pascal name }.txt' }
Hello /* @scffld name */! 🥳
```
