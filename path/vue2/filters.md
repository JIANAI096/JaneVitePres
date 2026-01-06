>语法
```c#
{{shopid|formatid}}
```
>过滤器可以串联
```c#
{{message|filterA|filterB}}
```
>过滤器参数
> >过滤器如果设置了参数那么filterA被定义为接收三个参数的额过滤函数.其中message的值作为第一个参数,普通字符串'arg1'作为第二个三叔,表达式arg2的值作为第三个参数.
```c#
{{message|filterA('arg1',arg2)}}
```
>main.js
```c#
import * as filters from '@/utils/fliters.js'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]) //插入过滤器名和对应方法
})
```
>filters.js
```c#
export function fix2(number, num = 4) {
	let numstr = String(number)
	if (numstr && numstr.trim() != "") {
		if (!numstr.split('.')[1]) {
			let numend = ''

			if (num !== 0) {
				while (numend.length != num) {
					numend += '0'
				}
				numend = '.' + numend
			}
			if (num == 0) {
				numend = ''
			}
			return numstr.split('.')[0] + numend
		} else {
			return numstr.split('.')[0] + '.' + numstr.split('.')[1].substring(0, num)
		}
	} else {
		return number
	}
}

export function timeStampToString(str, format = "Y-m-d H:i:s") {
	format = format.toLowerCase();
	let formatArr = ["y", "m", "d", "h", "i", "s"];
	let timeData = format;

	// 使用 UTC 时间创建日期对象
	let dateNum = new Date(str * 1000);

	formatArr.forEach((item) => {
		if (format.search(item) != -1) {
			switch (item) {
				case "y": {
					// 使用 UTC 年份
					timeData = timeData.replace(eval("/" + item + "/g"), dateNum.getUTCFullYear())
					break;
				}
				case "m": {
					// 使用 UTC 月份
					let MM = dateNum.getUTCMonth() + 1;
					MM = MM < 10 ? ('0' + MM) : MM;
					timeData = timeData.replace(eval("/" + item + "/g"), MM)
					break;
				}
				case "d": {
					// 使用 UTC 日期
					let d = dateNum.getUTCDate();
					d = d < 10 ? ('0' + d) : d;
					timeData = timeData.replace(eval("/" + item + "/g"), d)
					break;
				}
				case "h": {
					// 使用 UTC 小时
					let h = dateNum.getUTCHours();
					h = h < 10 ? ('0' + h) : h;
					timeData = timeData.replace(eval("/" + item + "/g"), h)
					break;
				}
				case "i": {
					// 使用 UTC 分钟
					let m = dateNum.getUTCMinutes();
					m = m < 10 ? ('0' + m) : m;
					timeData = timeData.replace(eval("/" + item + "/g"), m)
					break;
				}
				case "s": {
					// 使用 UTC 秒数
					let s = dateNum.getUTCSeconds();
					s = s < 10 ? ('0' + s) : s;
					timeData = timeData.replace(eval("/" + item + "/g"), s)
					break;
				}
				default:
			}
		}
	})

	return timeData;
}

```

>index.vue
```c#
<template>
	<view class="box bgt">
		{{number|fix2}}
	</view>
</template>
<script>
	export default {
		data() {
			return {
				number: '20.1321',

			}
		}
	}
</script>



```