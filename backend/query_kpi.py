import sqlite3
from datetime import datetime

conn = sqlite3.connect('incidents.db')
cursor = conn.cursor()

# Total number of incidents
cursor.execute("SELECT COUNT(*) FROM Incident")
total_incidents = cursor.fetchone()[0]

# Number of closed incidents
cursor.execute("SELECT COUNT(*) FROM Incident WHERE statut = 'Cloturé'")
closed_incidents = cursor.fetchone()[0]

# Number of incidents not closed
cursor.execute("SELECT COUNT(*) FROM Incident WHERE statut <> 'Cloturé'")
open_incidents = cursor.fetchone()[0]

# Calculate the average resolution time (in days) for closed incidents
cursor.execute("SELECT date_ouverture, date_cloture FROM Incident WHERE statut = 'Cloturé' AND date_cloture IS NOT NULL")
durations = []
for row in cursor.fetchall():
    date_ouverture = datetime.strptime(row[0], '%Y-%m-%d')
    date_cloture = datetime.strptime(row[1], '%Y-%m-%d')
    durations.append((date_cloture - date_ouverture).days)

avg_resolution = sum(durations) / len(durations) if durations else 0

# Distribution by criticality
cursor.execute("SELECT criticite, COUNT(*) FROM Incident GROUP BY criticite")
criticite_counts = cursor.fetchall()

# Distribution by team
cursor.execute("SELECT equipe_responsable, COUNT(*) FROM Incident GROUP BY equipe_responsable")
equipe_counts = cursor.fetchall()

conn.close()

print("=== IT Incident Tracking KPIs ===")
print(f"Total incidents: {total_incidents}")
print(f"Closed incidents: {closed_incidents}")
print(f"Open/In-progress incidents: {open_incidents}")
print(f"Average resolution time (in days): {avg_resolution:.2f}\n")

print("Distribution by criticality:")
for criticite, count in criticite_counts:
    print(f" - {criticite}: {count}")

print("\nIncidents by team:")
for equipe, count in equipe_counts:
    print(f" - {equipe}: {count}")
