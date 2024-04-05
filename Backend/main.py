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


# DELETE a product
@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    # Delete associated reviews
    reviews = Review.query.filter_by(product_id=product_id).all()
    for review in reviews:
        db.session.delete(review)

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product and associated reviews deleted successfully"})

# REVIEWS
# GET all reviews
@app.route('/reviews', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    review_list = [review.to_dict() for review in reviews]
    return jsonify(review_list)

# GET a review by ID
@app.route('/reviews/<int:review_id>', methods=['GET'])
def get_review_by_id(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"message": "Review not found"}), 404

    return jsonify(review.to_dict())


# POST a new review
@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    new_review = Review(user_id=data.get('user_id'),
                        product_id=data.get('product_id'),
                        rating=data.get('rating'),
                        comment=data.get('comment'))
    db.session.add(new_review)
    db.session.commit()
    return jsonify({"message": "Review created successfully"})

# PUT to update a review
@app.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"message": "Review not found"}), 404
    data = request.get_json()
    review.user_id = data.get('user_id', review.user_id)
    review.product_id = data.get('product_id', review.product_id)
    review.rating = data.get('rating', review.rating)
    review.comment = data.get('comment', review.comment)
    db.session.commit()
    return jsonify({"message": "Review updated successfully"})

# PATCH to partially update a review
@app.route('/reviews/<int:review_id>', methods=['PATCH'])
def partially_update_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"message": "Review not found"}), 404
    data = request.get_json()
    if 'user_id' in data:
        review.user_id = data['user_id']
    if 'product_id' in data:
        review.product_id = data['product_id']
    if 'rating' in data:
        review.rating = data['rating']
    if 'comment' in data:
        review.comment = data['comment']
    db.session.commit()
    return jsonify({"message": "Review partially updated successfully"})

# DELETE a review
@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"message": "Review not found"}), 404
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully"})




  
if __name__ == '__main__':
    app.run(port=5000)