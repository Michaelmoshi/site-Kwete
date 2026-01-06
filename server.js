const express = require("express");
const path = require("path");
const app = express();

// Définir le dossier statique (où sont index.html, style.css, images, etc.)
const publicPath = path.join(__dirname);
app.use(express.static(publicPath));

// Rediriger toutes les requêtes vers index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(
    `✅ Le site Harmonia est accessible sur http://localhost:${PORT}`
  );
});
