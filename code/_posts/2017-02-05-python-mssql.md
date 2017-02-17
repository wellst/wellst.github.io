---
title: python3 import from mssql to pgsql
layout: code
---
从mssql导出数据，导入pgsql  

```python
import pymssql
import psycopg2
#取数据
mscn = pymssql.connect(host='服务器地址',user='账号',password='密码',database='数据库',charset='utf8')
mscur = mscn.cursor()
sql="SELECT * FROM table"
mscur.execute(sql)
rows = mscur.fetchall()
mscn.close()
#插入数据
pgcn = psycopg2.connect(host='服务器地址',user='账号',password='密码',database='数据库',port='5432',charset='utf8')
pgcur = pgcn.cursor()
insert_tmp_sql = "INSERT INTO table (field1,field2,field3) VALUES ('%s','%s','%s')"
for row in rows:
    insert_sql = insert_tmp_sql % (row[0],row[1],row][2])
    pgcur.execute(insert_sql)
pgcn.commit()
pgcn.close()
```