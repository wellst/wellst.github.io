---
title: python send email
layout: code  
category: python
---
用smtplib发送email。  

```python
import smtplib  
import email.mime.multipart  
import email.mime.text  

msg=email.mime.multipart.MIMEMultipart()  
#发件人
sender = 'aaa@163.com'
#收件人
receiver = 'bbb@139.com'  
#邮件内容
msg['from']=sender
msg['to']=receiver
msg['subject']='python3自动发送邮件'  
content='''
你好， 
        这是一封自动发送的邮件。 

    from well-st
'''  
txt=email.mime.text.MIMEText(content,'plain','utf-8')
msg.attach(txt)  
#登录服务器
smtp=smtplib.SMTP() 
smtpserver='smtp.163.com'
smtpport='25'
smtp.connect(smtpserver,smtpport)  
smtp.login(sender,'')  
#发送邮件
smtp.sendmail(sender,receiver,str(msg))  
smtp.quit()    
```