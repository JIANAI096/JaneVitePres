# <center>macOS SSH Key</center>

## 1. 生成 SSH Key
```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
## 2. 添加 SSH Key 到 ssh-agent
### 1.1 使用keychain
```shell
brew install keychain
```
### 1.2添加到 ~/.bash_profile 或 ~/.zshrc
```shell
eval $(keychain --eval --agents ssh id_rsa)
```
## 3 使配置生效
```shell
source ~/.bash_profile
#or
source ~/.zshrc
```
## 4. 添加 SSH Key 到 GitHub/GitLab
> 执行下方命令复制到剪贴板.然后添加到 GitHub/GitLab/Gitee/Gitea 的 SSH Key 设置中。
```shell
pbcopy < ~/.ssh/id_rsa.pub
```