---
title: 用chromebook安装git
layout: linux
---
在Chromebook上安装了Archlinux，合盖不能进入睡眠或挂起模式，不过最近用github的pages，主要是文本编辑，所以想改回ChromeOS，不过用github还是要有git比较好。


# 在Chromebook 上使用git

在网上搜索了一下，发现有个 [chromebrew](https://github.com/skycocker/chromebrew) 的包管理器


按照说明在开发者模式中的shell中输入

```
wget -q -O - https://raw.github.com/skycocker/chromebrew/master/install.sh | bash
```

不过用的是dropbox的下载，只好设置好代理后安装。

在安装过程中也已经把git安装上的了，版本比较旧是 1.8.4


  
  
后来觉得为了个git安装了一堆东西，感觉很不爽
在github中查看git这个包的依赖，发现只依赖几个包，就把几个包一起下载下来，解压放进/usr/里，这样就安装成功。下载文件如下，用tar解压。


```
-rw-r--r-- 1 chronos chronos   697985 Feb 11 23:19 curl-7.32.0-chromeos-x86_64.tar.gz
-rw-r--r-- 1 chronos chronos   416208 Feb 11 23:19 expat-2.1.0-chromeos-x86_64.tar.gz
-rw-r--r-- 1 chronos chronos  6719113 Feb 11 23:17 gettext-0.18.3.1-chromeos-x86_64.tar.gz
-rw-r--r-- 1 chronos chronos 24061547 Feb 11 23:17 git-1.8.4-chromeos-x86_64.tar.gz
-rw-r--r-- 1 chronos chronos   791884 Feb 11 23:17 libssh2-1.4.3-chromeos-x86_64.tar.gz
-rw-r--r-- 1 chronos chronos 15952847 Feb 11 23:19 perl-5.18.1-chromeos-x86_64.tar.gz
-rw-r--r-- 1 chronos chronos 33194143 Feb 11 23:13 python-3.3.2-chromeos-x86_64.tar.gz
-rw-r--r-- 1 chronos chronos   145039 Feb 11 23:14 zlib-1.2.8-chromeos-x86_64.tar.gz
```


```
sudo cp -R ./usr/local/* /usr/local/
```


下午再试了一下吧archlinux的git包放到usr/local里。试一下能不能用。
试了一次还是不行，算了，用1.8.4吧，最少还能用。