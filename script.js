console.log('Script chargé avec succès !');

function setupImageHover(id, urlHover, urlDefault) {
  const element = document.getElementById(id);

  element.addEventListener('mouseover', () => {
    element.style.opacity = '0'; // Réduit l'opacité pour cacher l'image actuelle
    element.src = urlHover; // Change l'image pour celle au survol
    element.style.opacity = '1'; // Rétablit l'opacité pour afficher la nouvelle image
  });

  element.addEventListener('mouseout', () => {
    element.style.opacity = '0'; // Réduit l'opacité pour cacher l'image actuelle
    element.src = urlDefault; // Change l'image pour celle par défaut
    element.style.opacity = '1'; // Rétablit l'opacité pour afficher la nouvelle image
  });
}




const ApropButton = document.getElementById('Propos');
ApropButton.addEventListener('click', () => {
  window.location.href = 'Pages/APropos/index.html'; // Redirige vers la page "À propos"
});



fetch('DATA.csv')

  .then(response => response.text())
  
  .then(text => {
    console.log('CSV chargé !'); // 🔍 debug
    console.log('Contenu brut du CSV :');
    console.log(text);
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Stoppe la boucle si la ligne est vide
      if (line === '') break;

      const columns = line.split(';'); // Sépare les colonnes par le point-virgule

      // Securité au cas où la ligne n'a pas assez de colonnes
      if (columns.length < 4) continue;

      // Création des variables à partir des colonnes 1 à 4
      const col1 = columns[0].trim();
      const col2 = columns[1].trim();
      const col3 = columns[2].trim();
      const col4 = columns[3].trim();
      const col7 = columns[6].trim();

      // Appels de la fonction pour chaque produit
      createChatVente(col7, col1, col1+"-btn", col2); // Crée un élément Chat_vente avec l'ID de l'image et le prix
      setupImageHover(col1, col3, col4);
      document.getElementById(col1).src = col4; // Définit l'image par défaut

      document.getElementById(col1+"-btn").addEventListener('click', () => {
        window.location.href = 'Pages/Produit/index.html#'+col1; // Redirige vers la page "À propos"
      })
      

      console.log(`Ligne ${i + 1}`);
      console.log('Colonne 1 :', col1);
      console.log('Colonne 2 :', col2);
      console.log('Colonne 3 :', col3);
      console.log('Colonne 4 :', col4);
      console.log('------------------------');
    }
  })
  .catch(err => console.error('Erreur lors du chargement du fichier CSV :', err));


// Fonction pour créer un élément Chat_vente
function createChatVente(containerId, imageId, buttonId, price) {
  // Sélectionner le conteneur où ajouter le nouvel élément
  const container = document.getElementById(containerId);

  // Créer le div principal
  const chatVenteDiv = document.createElement('div');
  chatVenteDiv.className = 'Chat_vente';

  // Créer l'image
  const img = document.createElement('img');
  img.id = imageId;

  // Créer le bouton
  const button = document.createElement('button');
  button.className = 'GeneralButton';
  button.id = buttonId;
  button.textContent = 'Voir plus';

  // Créer l'élément pour le prix
  const priceElement = document.createElement('p');
  priceElement.className = 'Chat_vente-price';
  priceElement.textContent = `${price}`;

  // Ajouter l'image, le prix et le bouton au div principal
  chatVenteDiv.appendChild(img);
  chatVenteDiv.appendChild(priceElement);
  const buttonWrapper = document.createElement('p');
  buttonWrapper.appendChild(button);
  chatVenteDiv.appendChild(buttonWrapper);

  // Ajouter le div principal au conteneur
  container.appendChild(chatVenteDiv);
}

