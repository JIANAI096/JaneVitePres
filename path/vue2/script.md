# <center>vue 更新script</center>

## 更新代码

```C#
const oldScript = document.querySelector('script[data-callType="callScript"]');
	    if (oldScript) {
	        oldScript.remove();
		}
		// 创建新的script
		const script = document.createElement('script');
		script.type = "text/javascript"; // 修正style为type
		script.setAttribute("data-callType", "callScript");
		script.src = val.customer;
		script.async = true;
		script.onload = () => {
		    console.log('Script loaded successfully!!!');
		};
		script.onerror = () => {
		    console.error('Script load failed');
		};
		document.head.appendChild(script);
```