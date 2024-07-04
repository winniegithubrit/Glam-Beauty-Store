from flask import Flask, jsonify,request
from flask_cors import CORS
from flask_migrate import Migrate
from models import  db, User, Product,Review,Order,Cart
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from config import JWT_SECRET_KEY 
import requests
import datetime
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = JWT_SECRET_KEY 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY


CORS(app)
migrate = Migrate(app, db)
db.init_app(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Replace with your actual M-Pesa credentials
CONSUMER_KEY = 'zqEvxLG6lBnqA2cr7dDTHIhtzdUh0XBC6gja0AwhxFkcfnUB'
CONSUMER_SECRET = 'qEufBcljvh5VwBGRAvwRL6C2B0cmn1a9XCasB6USaeNfR1Exz0AiSMO7cvABAwGr'


#MPESA INTERGRATION

@app.route('/mpesa/stk', methods=['POST'])
def mpesa_stk_push():
    data = request.json
    phone_number = data.get('phone_number')
    amount = data.get('amount')
    product_name = data.get('product_name')

    access_token = generate_access_token()

    if access_token:
        api_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        password = generate_password(timestamp)

        payload = {
            'BusinessShortCode': SHORTCODE,
            'Password': password,
            'Timestamp': timestamp,
            'TransactionType': 'CustomerPayBillOnline',
            'Amount': amount,
            'PartyA': phone_number,
            'PartyB': SHORTCODE,
            'PhoneNumber': phone_number,
            'CallBackURL': 'http://callback.url',  # Replace with your callback URL
            'AccountReference': 'your_account_reference',
            'TransactionDesc': f'Payment for {product_name}'
        }

        response = requests.post(api_url, json=payload, headers=headers)

        if response.status_code == 200:
            return jsonify({'message': 'STK push initiated successfully', 'data': response.json()}), 200
        else:
            return jsonify({'error': 'Failed to initiate STK push', 'data': response.json()}), response.status_code

    return jsonify({'error': 'Failed to generate M-Pesa access token'}), 500

def generate_access_token():
    url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate'
    headers = {
        'Authorization': 'Basic ' + base64.b64encode(f'{CONSUMER_KEY}:{CONSUMER_SECRET}'.encode()).decode(),
        'Content-Type': 'application/json'
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()['access_token']
    else:
        return None

def generate_password(timestamp):
    return base64.b64encode(f'{SHORTCODE}{PASSKEY}{timestamp}'.encode()).decode()


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

# ORDERS

# CREATE an order
@app.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    user_id = data.get('user_id')
    total_price = data.get('total_price')
    product_ids = data.get('product_ids') 

    if not user_id or not total_price or not product_ids:
        return jsonify({"message": "Missing required fields"}), 400

    # Create the order
    order = Order(user_id=user_id, total_price=total_price)
    for product_id in product_ids:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({"message": f"Product with ID {product_id} not found"}), 404
        order.products.append(product)

    db.session.add(order)
    db.session.commit()

    return jsonify({"message": "Order created successfully", "order_id": order.id}), 201


# READ all orders
@app.route('/orders', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    order_list = [order.to_dict() for order in orders]
    return jsonify(order_list)


# READ an order by ID
@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order_by_id(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"message": "Order not found"}), 404

    return jsonify(order.to_dict())


# UPDATE an order by ID
@app.route('/orders/<int:order_id>', methods=['PUT', 'PATCH'])
def update_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"message": "Order not found"}), 404

    data = request.json
    user_id = data.get('user_id')
    total_price = data.get('total_price')
    product_ids = data.get('product_ids')

    if user_id:
        order.user_id = user_id
    if total_price:
        order.total_price = total_price
    if product_ids:
        order.products = []
        for product_id in product_ids:
            product = Product.query.get(product_id)
            if not product:
                return jsonify({"message": f"Product with ID {product_id} not found"}), 404
            order.products.append(product)

    db.session.commit()

    return jsonify({"message": "Order updated successfully"})


# DELETE an order by ID
@app.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"message": "Order not found"}), 404

    db.session.delete(order)
    db.session.commit()

    return jsonify({"message": "Order deleted successfully"})

# CREATE a user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "Missing required fields"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({"message": "Email already exists"}), 400

    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully", "user_id": user.id}), 201


# READ all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    return jsonify(user_list)


# READ a user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify(user.to_dict())


# UPDATE a user by ID
@app.route('/users/<int:user_id>', methods=['PUT', 'PATCH'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if username:
        user.username = username
    if email:
        user.email = email
    if password:
        user.password = password

    db.session.commit()

    return jsonify({"message": "User updated successfully"})

@app.route('/cart/<int:id>', methods=['GET'])
def get_cart_item(id):
    cart_item = Cart.query.get(id)
    if cart_item:
        return jsonify(cart_item.to_dict()), 200
    else:
        return jsonify({'error': 'Cart item not found'}), 404

# DELETE a user by ID
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"})

# CARTS FUNCTIONALITY
@app.route('/carts', methods=['GET'])
def get_all_cart_items():
    cart_items = Cart.query.all()
    return jsonify([item.to_dict() for item in cart_items]), 200

@app.route('/carts', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    name = data.get('name')
    price = data.get('price')
    description = data.get('description')
    image = data.get('image')
    quantity = data.get('quantity')
    total = data.get('total')
    user_id = data.get('user_id')
    
    if not all([name, price, description, image, quantity, total, user_id]):
        return jsonify({'error': 'Missing data'}), 400

    new_cart_item = Cart(
        name=name,
        price=price,
        description=description,
        image=image,
        quantity=quantity,
        total=total,
        user_id=user_id
    )
    
    db.session.add(new_cart_item)
    db.session.commit()
    
    return jsonify(new_cart_item.to_dict()), 201

@app.route('/carts/<int:cart_id>', methods=['DELETE'])
def delete_cart(cart_id):
    cart = Cart.query.get(cart_id)
    if not cart:
        return jsonify({"message": "Cart item not found"}), 404

    db.session.delete(cart)
    db.session.commit()

    return jsonify({"message": "Cart item deleted successfully"}), 200

@app.route('/carts/<int:item_id>/increase-quantity', methods=['PUT'])
def increase_quantity(item_id):
    item = Cart.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    item.quantity += 1
    item.total = item.price * item.quantity
    db.session.commit()

    return jsonify({"quantity": item.quantity, "total": item.total}), 200


@app.route('/carts/<int:item_id>/decrease-quantity', methods=['PUT'])
def decrease_quantity(item_id):
    item = Cart.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    if item.quantity > 1:
        item.quantity -= 1
        item.total = item.price * item.quantity
        db.session.commit()
        return jsonify({"quantity": item.quantity, "total": item.total}), 200
    else:
        return jsonify({"message": "Quantity cannot be less than 1"}), 400

# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "Missing required fields"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username=username, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Missing required fields"}), 400

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(hours=1))
        return jsonify({"token": access_token, "username": user.username}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


# Protected Route Example
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"logged_in_as": user.username}), 200
  
if __name__ == '__main__':
    app.run(port=5000)