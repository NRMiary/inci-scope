import sqlite3
import random
from datetime import datetime, timedelta

# Connect to the database
conn = sqlite3.connect('incidents.db')
cursor = conn.cursor()

# Create the Incident table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Incident (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_ouverture TEXT,
        date_cloture TEXT,
        type TEXT,
        criticite TEXT,
        statut TEXT,
        equipe_responsable TEXT
    )
''')
conn.commit()

# Lists of dummy data
types = ['Hardware', 'Software', 'Network', 'Security', 'Other']
criticites = ['Low', 'Medium', 'High']
statuts = ['Ouvert', 'En cours', 'Cloturé']
equipes = ['Equipe A', 'Equipe B', 'Equipe C']

# Generate between 50 and 100 random incidents
num_incidents = random.randint(50, 100)
base_date = datetime.now() - timedelta(days=30)

for _ in range(num_incidents):
    # Generate a random opening date within the past month
    delta_open = timedelta(days=random.randint(0, 30))
    date_ouverture = base_date + delta_open
    
    # Randomly choose the status
    statut = random.choice(statuts)
    if statut == 'Cloturé':
        # If the incident is closed, generate a closing date after the opening date
        delta_close = timedelta(days=random.randint(0, 10))
        date_cloture = date_ouverture + delta_close
        date_cloture_str = date_cloture.strftime('%Y-%m-%d')
    else:
        date_cloture_str = None

    # Insert the incident into the database
    cursor.execute('''
        INSERT INTO Incident (date_ouverture, date_cloture, type, criticite, statut, equipe_responsable)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        date_ouverture.strftime('%Y-%m-%d'),
        date_cloture_str,
        random.choice(types),
        random.choice(criticites),
        statut,
        random.choice(equipes)
    ))

conn.commit()
conn.close()

print(f"Database created with {num_incidents} incidents.")
