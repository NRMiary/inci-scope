# inci-scope
Ce mini projet est une application web qui intègre une authentification utilisateur et un dashboard affichant des données d'incidents informatiques. L’application présente notamment :

- Une page de connexion.
- Un dashboard qui affiche des KPI, des graphiques et une liste détaillée des incidents.
- Une page qui affiche la liste des incidents ouverts.

## Fonctionnalités

- **Authentification** :  
  Les utilisateurs se connectent via un formulaire de connexion et reçoivent un token JWT.

- **Dashboard** :  
  Affiche les KPI et les données incidents récupérées.

- **Affichage incidents ouverts** :  
  Affiche la liste des incidents, seules les incidents ouverts/en cours sont affichées.

- **Alerte** :  
  Affiche un badge sur la cloche de notification indiquant le nombre d’incidents ouverts en temps réel.

## Technologies utilisées

- **Frontend** :  
  React, Axios, react-router-dom, jQuery 

- **Backend** :  
  Flask, SQLite, Flask-JWT-Extended, Flask-CORS 

- **Data Visualization** :  
  Chart.js, DataTables (jQuery)

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/NRMiary/inci-scope.git
cd inci-scope
```
### Installer les dépendances
1. Naviguez dans le dossier `backend`:
```bash
cd backend
pip install -r requirements.txt
```
Lancez le serveur Flask:
```bash
python auth_api.py
python api.py
```
2. Naviguez dans le dossier `frontend`:
```bash
cd frontend
npm install
```
Lancez le serveur Flask:
```bash
python auth_api.py
python api.py
```
3. Vérifiez que le fichier package.json contient le proxy:
```bash
"proxy": "http://localhost:5000"
```
4. Lancez l’application:
```bash
npm start
```

