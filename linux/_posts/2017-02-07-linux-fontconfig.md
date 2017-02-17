---
title: linux 字体设置
layout: linux
--- 

linux字体配置文件，看着还不错 


# linux字体配置  
位置 ~/.config/fontconfig/fonts.conf  
  
```xml
<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM 'fonts.dtd'>
<fontconfig>
    <dir>~/.fonts</dir>
    
    <!-- Default font (no fc-match pattern) -->
    <!-- 这个在默认系统字体配置文件
         /etc/fonts/conf.d/60-family-prefer.conf
         下面只是根据个人喜好的重新设定。
    -->
    <!-- Default serif fonts -->
    <alias>
        <family>Droid Serif</family>
        <default>
            <family>serif</family>
        </default>
    </alias>
    <alias>
        <family>serif</family>
        <prefer>
            <family>Droid Serif</family>
            <family>Noto Serif</family>
            <family>HanaMinA</family>
            <family>Noto Sans CJK SC</family>
        </prefer>
    </alias>
    
    <!-- Default sans-serif font -->
    <alias>
        <family>Roboto</family>
        <default>
            <family>sans-serif</family>
        </default>
    </alias>
    <alias>
        <family>sans-serif</family>
        <prefer>
            <family>Roboto</family>
            <family>Noto Sans</family>
            <family>Noto Sans CJK SC</family>
        </prefer>
    </alias>
    
    <!-- Default monospace fonts -->
    <alias>
        <family>Roboto Mono</family>
        <default>
            <family>monospace</family>
        </default>
    </alias>
    <alias>
        <family>monospace</family>
        <prefer>
            <family>Roboto Mono</family>
            <family>Liberation Mono</family>
            <family>WenQuanYi Micro Hei Mono</family>
            <family>Noto Sans Mono CJK SC</family>
        </prefer>
    </alias>
    
    <!-- To disable embedded bitmap for all fonts -->
    <match target="font">
        <edit name="embeddedbitmap" mode="assign">
            <bool>false</bool>
        </edit>
    </match>
</fontconfig>
```
