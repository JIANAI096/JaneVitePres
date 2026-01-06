# <center>其它</center>
 Shells.work:   __UNI__48D838F

Engie Energy  :__UNI__01ACDB8

Apk打包生成证书:

engie_energy(别名)

356000(密码)

36500是证书的有效期，表示100年有效期，单位天，建议时间设置长一点，避免证书过期
```c#
keytool -genkey -alias engie_energy -keyalg RSA -keysize 2048 -validity 36500 -keystore engie.keystore
```
> uniapp APP打开外部链接
url: ( String ) 必选 要打开的URL地址

字符串类型，各平台支持的地址类型存在差异，参考平台URL支持表。

errorCB: ( OpenErrorCallback ) 可选 打开URL地址失败的回调

打开指定URL地址失败时回调，并返回失败信息。

identity: ( String ) 可选 指定打开URL地址的程序名称
 ```c++
// #ifdef APP-PLUS
plus.runtime.openURL( url, errorCB, identity );
// #endif
```
> <h3>禁止用户截屏</h3>
 ```c++
forbidJp(){
    var android_mainActivity = plus.android.runtimeMainActivity();
    //禁止截屏
    plus.android.invoke(plus.android.invoke(android_mainActivity, "getWindow"), "addFlags", 0x00002000);
    //最简单的方法就是这两行
    }
``` 
