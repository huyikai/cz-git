---
title: 控制相关
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---

# 配置 - 控制相关

## alias

- **描述** : 定义常用的 commit message 别名
- **类型** : `{ [alias: string]: string }`
- **默认** : `{ fd: "docs: fix typos" }`

::: tip
更多用法和示例 [⇒ 更多小窍门](/zh/recipes/alias.html)
:::

## scopes

- **描述** : 自定义选择 **模块范围** 命令行显示信息
- **类型** : `string[] | Array<{ name: string, value?: string }>`
- **默认** : `[]`

::: tip
如果你使用 [commitlint](https://github.com/conventional-changelog/commitlint) 规则定义了 `scope-enum`，会自动引入。<br>
[⇒ 更多小窍门](/zh/recipes/#scopes)
:::

## scopeOverrides

- **描述** : 自定义选择了特定**类型**后 **覆盖模块范围** 命令行显示信息
- **类型** : <br>`{ [type: string]: string[] | Array<{ name: string, value?: string }> } | undefined`
- **默认** : `undefined`
- **例子** : `scopeOverrides: { "test": ["e2eTest", "unitTest"] }`
- **使用** : 针对选择 ==特定== 的 commit **类型** `type` 后选择模块范围时显示 自定义的模块范围选择

:::tip
如果定义`scopeOverrides` 就要定义通用的 `scopes`
:::

## scopeFilters

- **描述** : 根据 scope.value 过滤模块范围中的选项
- **类型** : `string[]`
- **默认** : `[".DS_Store"]`

## enableMultipleScopes

- **描述** : 是否开启在选择 **模块范围** 时使用多选模式
- **类型** : `boolean`
- **默认** : `false`

:::tip
尝试运行命令 **可在当前会话直接开启多选模式**
- 使用 Commitizen CLI + cz-git: `checkbox=1 cz`
- 使用 cz-git CLI: `czg checkbox`

示例与使用方式 [⇒ 查看小窍门](/zh/recipes/#支持多选-scopes)
:::

## scopeEnumSeparator

- **描述** : 在多选模式下 **模块范围** 之间的分隔符
- **类型** : `string`
- **默认** : `,`

## allowCustomScopes

- **描述** : 是否在选择 **模块范围** 显示自定义选项(custom)
- **类型** : `boolean`
- **默认** : `true`
- **使用** : 没有使用 `commitlint`并且想在选择中关闭自定义选项

:::tip
会自动检测 [commitlint](https://github.com/conventional-changelog/commitlint) 规则 `scope-enum`的定义是否严格，自动不显示。
:::

## allowEmptyScopes

- **描述** : 是否在选择 **模块范围** 显示为空选项(empty)
- **类型** : `boolean`
- **默认** : `true`

:::tip
会自动检测 [commitlint](https://github.com/conventional-changelog/commitlint) 规则 `scope-empty`的定义是否严格，自动不显示。
:::

## markBreakingChangeMode

- **描述** : 添加额外的问题重大变更(BREAKING CHANGES)提问，询问是否需要添加 =="!"== 标识于头部
- **使用** : 当你想添加 ! 标识于头部，表明该 commit 为重大变更时，请使用该选项
- **类型** : `boolean`
- **默认** : `false`

:::tip
更多用法与示例 [⇒ 查看小窍门](/zh/recipes/breakingchange.html)
:::

## allowBreakingChanges

- **描述** : 允许出现 重大变更(BREAKING CHANGES)的特定 **type**
- **类型** : `string[]`
- **默认** : `['feat', 'fix']`

## useAI

- **描述** : 是否使用 [OpenAI](https://openai.com/) API 自动生成提交信息 **subject** <sup>简短描述</sup>
- **类型** : `boolean`
- **默认** : `false`

:::tip

尝试运行命令 **可在当前会话直接开启 OpenAI API 生成模式**
- 使用 Commitizen CLI + cz-git: `czai=1 cz`
- 使用 cz-git CLI: `czg ai`

示例与使用方式 [⇒ 查看小窍门](/zh/recipes/openai)
:::

## aiNumber

- **描述** : 如果大于 1 ，则会让 OpenAI 返回指定的多个选项，并开启选择模式
- **类型** : `number`
- **默认** : `1`

:::tip
尝试运行命令 **可在当前会话直接开启 OpenAI API 返回多个的选择模式**
- 使用 Commitizen CLI + cz-git: `czai=1 cz_ainum=3 cz`
- 使用 czg CLI: `czg ai -N=3`

Demo And Usage [⇒ see the recipes](/recipes/openai)
:::

## aiType

- **描述** : 设置使用的 AI 模型

|      aiType      |     模型         | 描述 | 
|     ---        |      ---         | --- |
| openAI-Turbo   | gpt-3.5-turbo     | 更快，API 代币消耗为 `text-davinci-003` 的 10 分之一 |
| openAI-Davinci | text-davinci-003  |  更好的质量、更准确以及丰富的内容产出 |

- **类型** : `"openAI-Turbo" | "openAI-Davinci"`
- **default** : `openAI-Turbo`

## aiDiffIgnore

- **描述** : 设置忽略目标文件的 diff 信息数据发送 OpenAI API
- **类型** : `string[]`
- **默认** : `[ "package-lock.json", "yarn.lock", "pnpm-lock.yaml" ]`
- **例子** : `[ "pnpm-lock.yaml", "docs/public" ]`

## aiQuestionCB

- **描述** : 该回调函数可利用已知的信息自定义设置发送给 OpenAI 的请求文案
- **类型** : `(param: GenerateAIPromptType) => string`

```ts
export interface GenerateAIPromptType {
  type: string
  defaultScope?: string
  maxSubjectLength?: number
  upperCaseSubject?: boolean
  diff?: string
}
```

- **例子** : 

:::: code-group
::: code-group-item 英文

```js
module.exports = {
  aiQuestionCB: ({ maxSubjectLength, diff }) => `Write an insightful and concise Git commit message in the present tense for the following Git diff code, without any prefixes, and no longer than ${maxSubjectLength} characters.: \`\`\`diff\n${diff}\n\`\`\``,
}
```

:::
::: code-group-item 中文

```js
module.exports = {
  aiQuestionCB: ({ maxSubjectLength, diff }) => `用完整句子为以下 Git diff 代码写一个有见解并简洁的 Git 中文提交消息，不加任何前缀，并且内容不能超过 ${maxSubjectLength} 个字符: \`\`\`diff\n${diff}\n\`\`\``,
}
```

::::


## upperCaseSubject

- **描述** : 是否自动将简短描述(subject)第一个字符进行大写处理
- **类型** : `boolean`
- **默认** : `false`

## breaklineNumber

- **描述** : 详细描述(body)和重大变更(BREAKING CHANGES)中根据字符超过该数值自动换行
- **类型** : `number`
- **默认** : `100`
- **使用** : 当没有使用 commitlint 并要使用规范化时

:::tip
主要根据**单词完整性**进行换行 <br>
如果使用 commitlint 会自动读取 `body-max-line-length` 进行设置
:::

## breaklineChar

- **描述** : 详细描述(body)和重大变更(BREAKING CHANGES)中换行字符
- **类型** : `string`
- **默认** : `"|"`

## issuePrefixes

- **描述** : 自定义选择issue前缀
- **类型** : `Array<{ value: string, name: string }>`
- **默认** : `[{ value: "closed", name: "closed:   ISSUES has been processed" }]`

:::tip
国内用户如果使用 Gitee 作为项目管理，那么该工具可以很好<br/> ==利用 commit message改变issue状态== [⇒ 查看小窍门](/zh/recipes/issue-prefixs.html)
:::

## allowCustomIssuePrefix

- **描述** : 是否在选择 **ISSUE 前缀** 显示自定义选项(custom)
- **类型** : `boolean`
- **默认** : `true`

## allowEmptyIssuePrefix

- **描述** : 是否在选择 **ISSUE 前缀** 显示为跳过选项(skip)
- **类型** : `boolean`
- **默认** : `true`

## maxHeaderLength

- **描述** : 定义commit message中的 header 长度, 给予在命令行中的校验信息
- **类型** : `number`
- **默认** : `Infinity`
- **使用** : 当没有使用 commitlint 并要使用规范化时

:::tip
如果使用 commitlint 会自动读取 `header-max-length` 进行设置给予在命令行中的提示
:::

## maxSubjectLength

- **描述** : 定义commit message中的 subject 长度, 给予在命令行中的校验信息
- **类型** : `number`
- **默认** : `Infinity`
- **使用** : 当没有使用 commitlint，并要使用规范化时
:::tip
如果使用 commitlint 会自动读取 `subject-max-length` 进行设置给予在命令行中的提示
:::

## minSubjectLength

- **描述** : 定义commit message中的 subject 长度, 给予在命令行中的校验信息
- **类型** : `number`
- **默认** : `0`
- **使用** : 当没有使用 commitlint，并要使用规范化时
:::tip
如果使用 commitlint 会自动读取 `subject-min-length` 进行设置给予在命令行中的提示
:::

## useCommitSignGPG

- **描述** :  使用 GPG 签名 commit message
- **类型** : `boolean`
- **默认** : `false`

:::tip
- 此 options 仅对 `czg` cz-git CLI 有效
- 运行下列命令可 **可直接在当前会话中开启使用 GPG 签名 commit message模式**
  - cz-git CLI: `czg gpg`

关于 GPG 签名 commit message 的更多信息可查看: [Zhengqbbb/cz-git#58](https://github.com/Zhengqbbb/cz-git/issues/58)
:::

## skipQuestions

- **描述** : 自定义选择指定的问题不显示
- **类型** : `Array<'scope' | 'body' | 'breaking' | 'footerPrefix' | 'footer' | 'confirmCommit'>`
- **默认** : `[]`

## formatMessageCB

- **描述** : 使用此回调函数可自定义最终的 message 格式以及输出
- **类型** : `(messageMod: CommitMessageOptions) => string`

```ts
interface CommitMessageOptions {
  type: string
  scope: string
  emoji: string
  markBreaking: string
  subject: string
  defaultHeader: string
  body: string
  breaking: string
  footer: string
  defaultMessage: string
}
```

- **默认** : `({ defaultMessage }) => defaultMessage`
