---
title: python 模拟登录
date: 2017-02-15 11:04
layout: code
category: python python2
---

因为有些数据每天都要登录网站去下载，所以用python模拟登录后下载。代码用python2 因为实际使用中还需要pyamf（好像只支持python2)

# python 模拟登录

一般流程：  
- 打开首页获取相关的cookie(.net还有一些其他的数据)  
- 保存相关的cookie和数据  
- 打开登录页面  
- 提交登录数据,完成登录  


```python
#-*- coding: utf-8 -*-
import urllib2
import cookielib
import urllib

homeurl='home.jsp'
loginurl='login.jsp'
exiturl = 'exit.jsp'
account='username'
pwd = 'password'

headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2970.0 Safari/537.36'}

#声明一个CookieJar对象实例来保存cookie
cookie = cookielib.CookieJar()
#利用urllib2库的HTTPCookieProcessor对象来创建cookie处理器
handler=urllib2.HTTPCookieProcessor(cookie)
#通过handler来构建opener
opener = urllib2.build_opener(handler)
#此处的open方法同urllib2的urlopen方法，也可以传入request
opener.open(homeurl)
#登录
postData = urllib.urlencode({
            'account':account,
            'pwd':pwd
        })
opener.open(loginurl,postData)
#退出

opener.open(exiturl)

```