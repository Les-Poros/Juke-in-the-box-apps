# Juke-in-the-box-apps

Membres du projet :
- Maeva Butaye    ( Lilychaan )
- Pauline Monteil ( Littlefox974 )
- Camille Schwarz ( S-Camille )
- Léo Galassi     ( ElGitariste )
- Quentin Rimet   ( QuentinRimet )

# Prérequis :

* cordova
* plugin : cordova plugins add phonegap-plugin-barcodescanner

# Pour récupérer l'application barman et l'application client

* Cloner le dépôt soit :
    - via SSH : git clone git@github.com:Les-Poros/Juke-in-the-box-apps.git
    - via HTTPS : git clone https://github.com/Les-Poros/Juke-in-the-box-apps.git
    
# Si l'on souhaite lancer l'application barman sur un téléphone branché à votre ordinateur

* Lancer un terminal dans le dossier cloné puis faire :
    - cd jukeInTheBoxBar/www
    - npm install
    - npm run build
    - cd ..
    - cordova run android --device

# Si l'on souhaite lancer l'application client sur un téléphone branché à votre ordinateur

* Lancer un terminal dans le dossier cloné puis faire :
    - cd jukeInTheBoxUti/www
    - npm install
    - npm run build
    - cd ..
    - cordova run android --device

# Si l'on souhaite lancer une des application en mode développement sur votre navigateur :
    - cd jukeInTheBoxUti/www ou cd jukeInTheBoxUti/www
    - npm install
    - npm run build
    - npm run dev
    - il faudra modifier manuelement le token dans votre localstorage
