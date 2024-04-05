from flask import Flask, jsonify,request
from flask_cors import CORS
from flask_migrate import Migrate
from models import  db, User, Product,Review,Order

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
CORS(app)
db.init_app(app)

@app.route('/')
def index():
    return {"message": "success"}
# GET FOR ALL MODELS
@app.route('/products', methods=[ 'GET'])
def get_all_products():
    products = Product.query.all()
    product_list = [product.to_dict() for product in products]
    return jsonify(product_list)

# POST route to create a new product
@app.route('/products', methods=['POST'])
def create_product():
    data = request.json
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    image = data.get('image')

    new_product = Product(name=name, description=description, price=price, image=image)
    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201

# GET route to retrieve a specific product by ID
@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if product:
        return jsonify(product.to_dict()), 200
    else:
        return jsonify({'error': 'Product not found'}), 404

# PATCH route to update an existing product
@app.route('/products/<int:product_id>', methods=['PATCH'])
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    data = request.json
    if 'name' in data:
        product.name = data['name']
    if 'description' in data:
        product.description = data['description']
    if 'price' in data:
        product.price = data['price']
    if 'image' in data:
        product.image = data['image']

    db.session.commit()

    return jsonify(product.to_dict()), 200

# PUT route to update a product (using the same route as PATCH)
@app.route('/products/<int:product_id>', methods=['PUT'])
def replace_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    data = request.json
    product.name = data['name']
    product.description = data['description']
    product.price = data['price']
    product.image = data['image']

    db.session.commit()

    return jsonify(product.to_dict()), 200

# DELETE route to delete a product
@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted successfully'}), 200



  
if __name__ == '__main__':
    app.run(port=5000)