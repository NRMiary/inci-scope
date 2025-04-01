from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required,
    get_jwt_identity, get_jwt
)
import datetime
import sqlite3
from werkzeug.security import check_password_hash
import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'secretkey1234'  
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=1)
jwt = JWTManager(app)

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    if not username or not password:
        return jsonify({"msg": "Username and password required"}), 400

    # Connect to the SQLite database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT password_hash FROM User WHERE username = ?", (username,))
    row = cursor.fetchone()
    conn.close()
    
    if row is None:
        return jsonify({"msg": "Invalid credentials"}), 401

    stored_password_hash = row[0]
    if not check_password_hash(stored_password_hash, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=username)
    logging.debug(f"New token for {username}: {access_token}")
    return jsonify(access_token=access_token), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# Use token blacklisting
blacklist = set()

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in blacklist

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    blacklist.add(jti)
    return jsonify(msg="Logged out"), 200

if __name__ == '__main__':
    app.run(debug=True)
