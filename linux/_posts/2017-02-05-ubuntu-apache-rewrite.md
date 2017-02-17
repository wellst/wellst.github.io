---
title: 在ubuntu中apache2启用rewrite
layout: linux
---
CI 启用rewrite后的url好看很多。记录一下在ubuntu中启用的配置。

# 在ubuntu中启用rewrite  

以下为具体步骤  

1. 修改 /etc/apache2/apache2.conf 中的<Directory /var/www/>里 AllowOverride None 改为 AllowOverride All  

```
<Directory /var/www/>
    Options Indexes FollowSymLinks  
    AllowOverride All  
    Require all granted
<Directory>
```

2. 加载rewrite模块  

```
ln -s /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enable/rewrite.load
```

3. .htaccess 文件内容 CI项目  

```
RewriteEngine On  
RewriteCond %{REQUEST_FILENAME} !-f  
RewriteCond %{REQUEST_FILENAME} !-d  
RewriteRule ^(.*)$ index.php/$ [L]  
```

4. 以上完成后重启 apache2  

```
systemctl restart apache2
```
