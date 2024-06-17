# config.py

import string
import secrets

# Function to generate a random JWT secret key
def generate_jwt_secret_key():
    characters = string.ascii_letters + string.digits + "!@#$%^&*()_+-=[]{}|;:,.<>?/~"
    return ''.join(secrets.choice(characters) for _ in range(32))

# JWT secret key
JWT_SECRET_KEY = generate_jwt_secret_key()
