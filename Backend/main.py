from flask import Flask
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
  
if __name__ == '__main__':
    app.run(port=5555)