
from flask import Flask, request, jsonify, g
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # ✅ Allow only from port 5173 (Vite, etc.)
import product_service
@app.teardown_appcontext
def close_db(exception):
    db = g.pop('db', None)
    if db:
        db.close()

@app.route('/init', methods=['POST'])
def init():
    return product_service.init_service()

@app.route('/product/create',methods=['POST'])
def create_product():
    data=request.get_json()
    print(data["name"],data["code"],data["catogry"],data["quantity"],data["price"],data["exp_date"])
    return product_service.create_product(data["name"],data["code"],data["quantity"],data["price"],data["catogry"],data["exp_date"])

@app.route('/product/sold/<string:code>',methods=['PATCH'])
def product_sold(code):
    return jsonify(product_service.product_sold(code))

@app.route('/product/soldByQnt',methods=['PATCH'])
def product_sold2():
    data=request.get_json()
    return jsonify(product_service.product_sold(data["code"],data["qnt"]))

@app.route('/product/add',methods=['PATCH'])
def product_add():
    data=request.get_json()
    return jsonify(product_service.product_add(data["code"],data["qnt"]))

@app.route('/product/delete/<string:code>',methods=["DELETE"])
def delete_product(code):
    return jsonify(product_service.delete_product(code))

@app.route('/product/get/leftall',methods=['GET'])
def get_product_left():
    return jsonify(product_service.get_product_left("ALL"))

@app.route('/product/get/soldall',methods=['GET'])
def get_product_sold():
    return jsonify(product_service.get_product_sold("ALL"))

@app.route('/product/get/left',methods=['GET'])
def get_product_left_catogry():
    catogry=request.args.get("catogry")
    return jsonify(product_service.get_product_left(catogry))

@app.route('/product/get/sold',methods=['GET'])
def get_product_sold_catogry():
    catogry=request.args.get("catogry")
    return jsonify(product_service.get_product_sold(catogry))

@app.route('/product/getByCode',methods=['GET'])
def get_product_sold_code():
    code=request.args.get("code")
    return jsonify(product_service.get_product_code(code))

@app.route('/product/getTop',methods=['GET'])
def get_product_top_sold():
    limit=request.args.get("limit")
    limit=int(limit)
    if limit>=0 or limit==-1 :
        return jsonify(product_service.get_product_top(limit))
    else :
        return jsonify(False)

if __name__ == '__main__':
    app.run(debug=True)