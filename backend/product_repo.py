import sqlite3
from flask import g
DATABASE = 'simple.db'

# 📌 DB connection helper
def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row  # Enables dictionary-style access
    return g.db

# ✅ Close DB after each request


def init_db():
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS PRODUCT (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            code VARCHAR(100) NOT NULL UNIQUE,
            catogry VARCHAR(100) NOT NULL,
            quantity INTEGER CHECK(quantity >= 0),
            price DOUBLE CHECK(price>0),
            create_date DATE NOT NULL,
            exp_date DATE 
        )
    ''')
    db.execute('''
        CREATE TABLE IF NOT EXISTS PRODUCT_SOLD (
            id INTEGER,
            code VARCHAR(100) NOT NULL UNIQUE,
            quantity INTEGER CHECK(quantity >= 0),
            catogry VARCHAR(100) NOT NULL,
            FOREIGN KEY(id) REFERENCES PRODUCT(id)
        )
    ''')
    db.commit()
    return ({'message': 'Tables created successfully'})

def create_product(name,code,catogry,quantity,price,create_date,exp_date):
    db=get_db()
    db.execute('insert into PRODUCT(name,code,catogry,quantity,price,create_date,exp_date) values (?,?,?,?,?,?,?)',(name,code,catogry,quantity,price,create_date,exp_date))
    db.commit()
    id = db.execute("SELECT * FROM PRODUCT WHERE code = ?", (code,)).fetchone()
    id=dict(id)["id"]
    db.execute('insert into PRODUCT_SOLD(id,code,quantity,catogry) values (?,?,?,?)',(id,code,0,catogry))
    db.commit()
    return "success"

def sold_product(code):
    db=get_db()
    print(code)
    data_p1=db.execute("SELECT * FROM PRODUCT WHERE code = ?", (code,)).fetchone()
    data_s1=db.execute("SELECT * FROM PRODUCT_SOLD WHERE code = ?", (code,)).fetchone()
    data_p=dict(data_p1)
    data_s=dict(data_s1)
    db.execute("UPDATE PRODUCT SET quantity=? WHERE id=?",(data_p["quantity"]-1,data_p["id"],))
    db.execute("UPDATE PRODUCT_SOLD SET quantity=? WHERE id=?",(data_s["quantity"]+1,data_s["id"],))
    db.commit()
    return {"product_left":data_p["quantity"]-1}

def sold_product(code,qnt):
    db=get_db()
    print(code)
    data_p1=db.execute("SELECT * FROM PRODUCT WHERE code = ?", (code,)).fetchone()
    data_s1=db.execute("SELECT * FROM PRODUCT_SOLD WHERE code = ?", (code,)).fetchone()
    data_p=dict(data_p1)
    data_s=dict(data_s1)
    db.execute("UPDATE PRODUCT SET quantity=? WHERE id=?",(data_p["quantity"]-qnt,data_p["id"],))
    db.execute("UPDATE PRODUCT_SOLD SET quantity=? WHERE id=?",(data_s["quantity"]+qnt,data_s["id"],))
    db.commit()
    return {"product_left":data_p["quantity"]-qnt}

def sold_add(code,qnt):
    db=get_db()
    data_p1=db.execute("SELECT * FROM PRODUCT WHERE code = ?", (code,)).fetchone()
    data_p=dict(data_p1)
    db.execute("UPDATE PRODUCT SET quantity=? WHERE id=?",(data_p["quantity"]+qnt,data_p["id"],))
    db.commit()
    return {"product_left":data_p["quantity"]+qnt}

def delete_product(code):
    db=get_db()
    data_p1=db.execute("SELECT * FROM PRODUCT WHERE code = ?", (code,)).fetchone()
    data_p=dict(data_p1)
    if int(data_p["quantity"])!=0: 
        return {"message":"product need to be deleted","qnty":data_p["quantity"]}
    
    db.execute("DELETE FROM PRODUCT WHERE id=?",(data_p["id"],))
    db.execute("DELETE FROM PRODUCT_SOLD WHERE id=?",(data_p["id"],))
    db.commit()
    return "sucess"
def get_product_left(catogry):
    db=get_db()
    if(catogry=='ALL'):
        data=db.execute("SELECT * FROM PRODUCT").fetchall()
        return [dict(row) for row in data]
    else :
        data=db.execute("SELECT * FROM PRODUCT WHERE catogry=?",(catogry,)).fetchall()
        return [dict(row) for row in data]

def get_product_sold(catogry):
    db=get_db()
    if(catogry=='ALL'):
        data=db.execute("SELECT * FROM PRODUCT_SOLD").fetchall()
        return [dict(row) for row in data]
    else :
        data=db.execute("SELECT * FROM PRODUCT_SOLD WHERE catogry=?",(catogry,)).fetchall()
        return [dict(row) for row in data]
    
def get_product_code(code):
    db=get_db()
    data1=db.execute("SELECT * FROM PRODUCT WHERE code=?",(code,)).fetchone()
    data2=db.execute("SELECT * FROM PRODUCT_SOLD WHERE code=?",(code,)).fetchone()
    return [dict(data1),dict(data2)]

def get_product_top(limit):
    db=get_db()
    if limit!=-1:
        data=db.execute("SELECT * FROM PRODUCT_SOLD ORDER BY quantity DESC LIMIT ?",(limit,)).fetchall()
        return [dict(row) for row in data]
    data=db.execute("SELECT * FROM PRODUCT_SOLD ORDER BY quantity DESC").fetchall()
    return [dict(row) for row in data]
