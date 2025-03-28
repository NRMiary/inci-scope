from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)  # To allow access from the React front-end

def get_db_connection():
    conn = sqlite3.connect('incidents.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/incidents')
def get_incidents():
    conn = get_db_connection()
    incidents = conn.execute('SELECT * FROM Incident').fetchall()
    conn.close()
    # Convert rows to dictionaries
    incidents_list = [dict(incident) for incident in incidents]
    return jsonify(incidents_list)

@app.route('/api/kpis')
def get_kpis():
    conn = get_db_connection()
    cursor = conn.cursor()
    total_incidents = cursor.execute("SELECT COUNT(*) FROM Incident").fetchone()[0]
    closed_incidents = cursor.execute("SELECT COUNT(*) FROM Incident WHERE statut = 'Cloturé'").fetchone()[0]
    open_incidents = total_incidents - closed_incidents

    # Calculate the average resolution time for closed incidents
    cursor.execute("SELECT date_ouverture, date_cloture FROM Incident WHERE statut = 'Cloturé' AND date_cloture IS NOT NULL")
    durations = []
    for row in cursor.fetchall():
        date_ouverture = datetime.strptime(row[0], '%Y-%m-%d')
        date_cloture = datetime.strptime(row[1], '%Y-%m-%d')
        durations.append((date_cloture - date_ouverture).days)
    avg_resolution = sum(durations) / len(durations) if durations else 0

    # Breakdown by criticality
    cursor.execute("SELECT criticite, COUNT(*) as count FROM Incident GROUP BY criticite")
    criticite_counts = {row[0]: row[1] for row in cursor.fetchall()}

    # Breakdown by team
    cursor.execute("SELECT equipe_responsable, COUNT(*) as count FROM Incident GROUP BY equipe_responsable")
    equipe_counts = {row[0]: row[1] for row in cursor.fetchall()}

    conn.close()
    kpis = {
        'total_incidents': total_incidents,
        'closed_incidents': closed_incidents,
        'open_incidents': open_incidents,
        'avg_resolution': avg_resolution,
        'criticite_counts': criticite_counts,
        'equipe_counts': equipe_counts
    }
    return jsonify(kpis)

if __name__ == '__main__':
    app.run(debug=True)
