# from models import db, User, Product, Order, Review
# from faker import Faker
# import random
# from flask import Flask
# import requests

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///database.db'
# db.init_app(app)

# def seed_data():
#     fake = Faker()

#     with app.app_context():
#       products = []
#       for _ in range(15):
#         product = Product(
#             name=fake.word().capitalize(),
#             description=fake.text(),
#             price=random.uniform(10, 100),
#             image=generate_random_image_url()  
#         )
#         products.append(product)
#       db.session.add_all(products)
#       db.session.commit()
      
      
#         # # Seed Users
#         # users = []
#         # for _ in range(15):
#         #     user = User(username=fake.user_name(), email=fake.email(), password=fake.password())
#         #     users.append(user)
#         # db.session.add_all(users)

#         # # Seed Products
#         # products = []
#         # for _ in range(15):
#         #     product = Product(name=fake.word().capitalize(), description=fake.text(), price=random.uniform(10, 100))
#         #     products.append(product)
#         # db.session.add_all(products)

#         # # Seed Orders
#         # orders = []
#         # for _ in range(15):
#         #     order = Order(user_id=random.randint(1, len(users)), total_price=random.uniform(50, 200))
#         #     orders.append(order)
#         # db.session.add_all(orders)

#         # # Seed Reviews
#         # reviews = []
#         # for _ in range(15):
#         #     review = Review(user_id=random.randint(1, len(users)), product_id=random.randint(1, len(products)), rating=random.randint(1, 5), comment=fake.paragraph())
#         #     reviews.append(review)
#         # db.session.add_all(reviews)
#         # Product.query.delete()
        

# if __name__ == '__main__':
#     seed_data()

from models import db, User, Product, Order, Review
from faker import Faker
import random
from flask import Flask
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///database.db'
db.init_app(app)

def generate_random_image_url():
    """
    Function to generate a random image URL using Lorem Picsum.
    """
    response = requests.get('https://picsum.photos/200')  # Fetch a random image
    if response.status_code == 200:
        return response.url
    else:
        return None

def seed_data():
    fake = Faker()

    with app.app_context():
        products = []
        for _ in range(15):
            product = Product(
                name=fake.word().capitalize(),
                description=fake.text(),
                price=random.uniform(10, 100),
                image=generate_random_image_url()  
            )
            products.append(product)
        db.session.add_all(products)
        db.session.commit()

if __name__ == '__main__':
    seed_data()

