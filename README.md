# Projet final NodeJS - Enzo Bassot

## Variables d'environnement

### Base de données MySQL
Modifier les variables suivantes dans le fichier .env en fonction de votre configuration MySQL :
- DB_HOST (port MySQL ou 0.0.0.0)
- DB_USER (nom d'utilisateur MySQL)
- DB_PASSWORD (mot de passe MySQL)
- DB_DATABASE (nom de la base de données)

### Service d'email
Modifier les variables suivantes dans le fichier .env en fonction de votre service d'email :
- EMAIL_HOST (lien vers le service d'email)
- EMAIL_PORT (port du service d'email)

J'ai utilisé Ethereal comme service d'email avec la configuration suivante :
- EMAIL_HOST=smtp.ethereal.email
- EMAIL_PORT=587

Lien vers Ethereal : https://ethereal.email/.

Si un utilisateur est créé avec un email et un mot de passe ne provenant pas d'Ethereal, une erreur de login sera déclenchée.
#

## Lancer l'application
```
npm i
npm start
```

#
En vous souhaitant une bonne journée 👍