# projet_categorie


## *1. Prérequis*

- *Node.js* installé sur votre machine.
- *PostgreSQL* configuré avec un utilisateur et un mot de passe.
- *NPM* installé.

---

## *2. Configuration de la Base de Données*

1. *Créer une base de données PostgreSQL* :

   Connectez-vous à PostgreSQL et exécutez la commande suivante :
   sql
   CREATE DATABASE db_project;
   

2. *Créer les tables* :

   Exécutez les scripts SQL suivants dans la base db_project :

   sql
   CREATE TABLE IF NOT EXISTS categories (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL UNIQUE
   );

   CREATE TABLE IF NOT EXISTS projects (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       category_id INT REFERENCES categories(id)
   );
   

---

## *3. Configuration du Backend*

1. *Aller dans le dossier backend* :
   bash
   cd backend
   

2. *Modifier les informations de connexion à la base de données* :  
   Dans backend/src/app.ts, mettez à jour ces valeurs :
   typescript
   export const pool = new Pool({
       host: "localhost",
       port: 5432,
       user: "votre_utilisateur_postgres",
       password: "votre_mot_de_passe",
       database: "db_project",
   });
   

3. *Installer les dépendances* :
   bash
   npm install
   

4. *Démarrer le serveur* :
   bash
   npm start
   

5. *Tester le backend* :  
   Le serveur s'exécute sur http://localhost:3001.

---

## *4. Configuration du Frontend*

1. *Aller dans le dossier frontend* :
   bash
   cd frontend
   

2. *Installer les dépendances* :
   bash
   npm install
   

3. *Démarrer l’application React* :
   bash
   npm start
   

4. *Accéder à l’application* :  
   Ouvrez votre navigateur et allez sur http://localhost:3000.

---