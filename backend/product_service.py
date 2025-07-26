import product_repo
from datetime import datetime
from datetime import date
format_string = "%Y-%m-%d"
def init_service():
    return product_repo.init_db()

def create_product(name,code,quantity,price,catogry,exp_date):
    exp_date1 = datetime.strptime(exp_date, format_string)
    return product_repo.create_product(name,code,catogry,quantity,price,date.today(),exp_date1)

def product_sold(code):
    return product_repo.sold_product(code)
def product_sold(code,qnt):
    return product_repo.sold_product(code,qnt)
def product_add(code,qnt):
    return product_repo.sold_add(code,qnt)
def delete_product(code):
    return product_repo.delete_product(code)

def get_product_left(catogry):
    return product_repo.get_product_left(catogry)

def get_product_sold(catogry):
    return product_repo.get_product_sold(catogry)
def get_product_code(code):
    return product_repo.get_product_code(code)

def get_product_top(limit):
    return product_repo.get_product_top(limit)