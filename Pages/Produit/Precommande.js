const Retour = document.getElementById("Menu");
const envoyer = document.getElementById("Envoyer");
const contact = document.getElementById("contact-input");

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
});

Retour.addEventListener('click', () => {
    window.location.href = 'index.html#' + idFromUrl; // Redirige vers la page d'accueil
});

// Récupère l'ID depuis l'URL (ex: "#Produit2" → "Produit2")
const idFromUrl = window.location.hash.substring(1);
console.log("ID extrait de l'URL:", idFromUrl);

// Initialisation (si ce n'est pas déjà fait)
emailjs.init("u0luYOls1ADrXhG0M");

envoyer.addEventListener('click', (event) => {
    if (contact.value.trim() === "") {
        alert("Veuillez remplir le champ avant d'envoyer.");
        event.preventDefault(); // Empêche toute action par défaut
        return;
    }

    console.log(contact.value); // Affiche la valeur de l'input dans la console

    // Création et affichage de l'indicateur de chargement
    let loadingIndicator = document.getElementById("loading-indicator");
    if (!loadingIndicator) {
        loadingIndicator = document.createElement("div");
        loadingIndicator.id = "loading-indicator"; // Ajout d'un ID pour éviter les doublons
        loadingIndicator.textContent = "Envoi en cours...";
        loadingIndicator.style.marginTop = "10px";
        loadingIndicator.style.color = "white";
        loadingIndicator.style.fontFamily = "'Playfair Display', serif";
        envoyer.parentNode.insertBefore(loadingIndicator, envoyer.nextSibling);
    }
    loadingIndicator.style.display = "block";

    // Exemple de données à envoyer
    const templateParams = {
        mail: contact.value, // Récupère la valeur de l'input
        objet: idFromUrl
    };

    // Envoi de l'email
    emailjs.send('service_5djo6mt', 'template_lgx1w86', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message envoyé avec succès !');
            window.location.href = '../../index.html';

        }, function (error) {
            console.log('FAILED...', error);
            alert('Erreur lors de l\'envoi : ' + JSON.stringify(error));
        })
        .finally(() => {
            // Cache l'indicateur de chargement
            loadingIndicator.style.display = "none";
        });
});