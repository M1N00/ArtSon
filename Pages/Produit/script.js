const element = document.getElementById('TextExplicatif');
const titre = document.getElementById('titre');
const image1 = document.getElementById('ImageProduit1');
const image2 = document.getElementById('ImageProduit2');
const price = document.getElementById('Prix');
const Précommande = document.getElementById('commander');



// Récupère l'ID depuis l'URL (ex: "#Produit2" → "Produit2")
const idFromUrl = window.location.hash.substring(1);
console.log("ID extrait de l'URL :", idFromUrl);

fetch('../../DATA.csv') // adapte le chemin si nécessaire
  .then(response => response.text())
  .then(text => {
    const lines = text.trim().split('\n');
    for (let line of lines) {
      const columns = line.trim().split(';'); // Sépare les colonnes par le point-virgule
      console.log("Ligne lue :", columns);
      if (columns[0].trim() === idFromUrl) {
        console.log("Produit trouvé :", columns[0].trim());
        element.innerHTML = columns[4].trim(); // ✅ on met à jour le contenu du DOM ici
        titre.innerHTML = columns[5].trim(); // Met à jour le titre
        image1.src = "../../"+columns[2].trim(); // Met à jour la première image
        image2.src = "../../"+columns[3].trim(); // Met à jour la première image
        price.innerHTML = columns[1].trim(); // Met à jour le prix
        break;
      }
    }
  })
  .catch(error => {
    console.error("Erreur lors du chargement du fichier CSV :", error);
    element.innerHTML = "<strong>Erreur lors du chargement de la description du produit.</strong>";
  });

Précommande.addEventListener('click', () => {
  window.location.href = 'Precommande.html#'+idFromUrl; // Redirige vers la page de précommande
});

