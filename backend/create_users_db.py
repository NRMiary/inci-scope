import sqlite3
from werkzeug.security import generate_password_hash

# Connect to the database (the file will be created if it doesn't exist)
conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# Create the User table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
''')
conn.commit()

# Insert a test user
username = 'testuser'
email = 'testuser@example.com'
password = 'password123'
hashed_password = generate_password_hash(password)

cursor.execute('''
    INSERT INTO User (username, email, password_hash)
    VALUES (?, ?, ?)
''', (username, email, hashed_password))

conn.commit()
conn.close()

print("Database 'users.db' created successfully and user added.")
