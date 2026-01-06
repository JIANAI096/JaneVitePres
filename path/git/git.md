# <center>git日常命令</center>

## 1. 标签

```shell
	//创建标签
git tag  v1.0.0
	//删除标签
git tag -d v1.0.0
	//删除远程标签
git push origin --delete tag v1.0.0


git tag -a 
//打包tag  
git tag -a tagname -m "备注信息"
```

## 2. 分支

```shell
//更新远程分支
git remote update --prune
//追踪远程分支
git branch --set-upstream-to=origin/master
//推送并新建分支
git push --set-upstream origin release
//删除分支
git branch -d dev
//删除远程分支
git push origin --delete dev
```

## 3. 强制更新

```shell
git fetch --all && git reset --hard origin/master && git pull
```

## 4. 推送

```shell
git add . && git commit -m '20220730' && git push 
```

## 5. 不验证SSL

```shell
git config --global http.sslVerify false
```

## 6.Linux Or Mac 自动提交Git

```shell
#!/bin/zsh

source /Users/codemiracle/.zshrc

#检测网络链接畅通
function network()
{
#超时时间
local timeout=1

#目标网站
local target=www.baidu.com

#获取响应状态码
local ret_code=`curl -I -s --connect-timeout ${timeout} ${target} -w %{http_code} | tail -n1`

if [ "x$ret_code" = "x200" ]; then
#网络畅通
return 1
else
#网络不畅通
return 0
fi

return 0
}

function gitPush(){

	cd /Volumes/SourceData/Markdown/md 

	git add . 

	git commit -m 'ww' 

	git push
}

network
if [ $? -eq 0 ];then
	echo "网络不畅通，请检查网络设置！"
	exit -1
fi

gitPush
```

## 7.远程
> 查看远程地址
```shell
git remote -v

```
> 查看远程分支
```shell
git branch -r

```
> 删除远程
```shell
git remote rm origin

```
> 添加远程
```shell
git remote add origin url

```
> 更换远程
```shell
git remote set-url origin newusrl

```
> 打开git设置
```shell
open .git/config

```