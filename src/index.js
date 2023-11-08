// // Exercice 0:
// console.log("message javascript du serveur");

// var myApp = require("simple-hello-world-example");
// var msg = myApp.printMsg();

// // Exercice 1 :

// let express = require("express");
// let app = express();
// // Page affichant le site DREAM
// app.use("/dream", express.static("public"));

// // Page du formulaire
// app.get("/form", function (req, res) {
//   res.sendfile("src/TVA/tva.html");
// });

// // Page récup info formulaire
// app.get("/recup", function (req, res) {
//   //   res.json(req.query);

//   // Afficher les infos recup par le formulaire
//   let tva = req.query.taux_tva;
//   let ht = req.query.prix_ht;
//   //   res.send("Prix HT " + ht + " | Taux TVA " + tva + "%");

//   // Calcul de la TTC (Prix HT+TVA)
//   let calctva = ht * ((1 * tva) / 100);
//   res.send(calctva);
// });

// app.listen(8080);

// CODE AIOLAH

//exercice 0:
console.log("message javascript du serveur");

// Utilisation du module Simple-hello-world-example installé précédemment
let myApp = require("simple-hello-world-example");
let msg = myApp.printMsg(); // print and return " Hello World! "

// Utilisation du module Express
let express = require("express");
let app = express();
// Publication du site statique
app.use("/lp-dream", express.static("public"));
// Route vers la page du formulaire
app.get("/form", function (req, res) {
  res.sendfile("src/TVA/tva.html");
});

// Récupération des données du formulaire en GET à la route donnée
// La route de réucpération des données doit être différente de celle de l'affichage du formulaire
// req = requête et res = response
app.get("/recup", function (req, res) {
  // req.query contient les données du formulaire
  // res.json(req.query);
  console.log(req.query);
  let prix = req.query.prix_ht;
  let taux = req.query.taux_tva;
  let prixttc = prix * ((1 + taux) / 100);
  let message =
    "Prix HT : " +
    prix +
    ", Taux TVA : " +
    taux +
    " | Le prix TTC vaut " +
    prixttc +
    "€";
  // On renvoie le message pour l'afficher sur la page web
  res.send(message);
  console.log(message);
});

// Récupération des données du formulaire en POST à la route donnée
// -- middleware pour express permettant d’alimenter l’objet body de request
// avec les valeurs saisies dans le formulaire
let bodyParser = require("body-parser");
// utiliser le module middleware de parsing
app.use(bodyParser.urlencoded({ extended: true }));
// route de gestion de la validation du formulaire
app.post("/affichage-donnees", function (req, res) {
  // res.json(req.body);

  let prix = req.body.prix;
  let taux = req.body.taux;
  let prixttc = prix * ((1 + taux) / 100);
  let message =
    "Prix HT : " +
    prix +
    ", Taux TVA : " +
    taux +
    " | Le prix TTC vaut " +
    prixttc +
    "€";
  // On renvoie le message pour l'afficher sur la page web
  res.send(message);
  console.log(message);
});

// Ecoute sur le port 8080
app.listen(8080);
