// 🎮 === VARIABLES PRINCIPALES ===
let buttonStart = document.querySelector("#start");          // Bouton "Démarrer"
let buttonRestart = document.querySelector("#restart");      // Bouton "Rejouer"
let gameContainer = document.querySelector("#gameContainer");// Conteneur du jeu
let userPropose = document.querySelector("#userPropose");    // Champ de saisie de la lettre
let msgError = document.querySelector("#error");             // Message d’erreur
let msgWin = document.querySelector("#winner");              // Message de victoire
let msgLost = document.querySelector("#lost");               // Message de défaite
let displayWord = document.querySelector("#wordDisplay");    // Zone d’affichage du mot


// 🧠 === VARIABLES DE JEU ===
let words = ["gandalf", "aragorn", "javascript", "dofus", "pikachu", "warcraft",];
let wordToFind = "";     // Mot à deviner
let hiddenWord = [];     // Mot caché sous forme de "_"
let letterchoice = [];   // Lettres déjà proposées
let cpt = 0;             // Compteur d’erreurs


// 🕵️‍♀️ === FONCTIONS PRINCIPALES ===

// Fonction 1 : Afficher les "_" à la place des lettres du mot
function hideWord(word) {
    displayWord.textContent = "";
    hiddenWord = [];
    for (let i = 0; i < word.length; i++) {
        if (word[i] === "'" || word[i] === "-" || word[i] === " ") {
            hiddenWord.push(word[i]); // Affiche les caractères spéciaux
        } else {
            hiddenWord.push("_"); // Cache les lettres
        }
    }
    displayWord.textContent = hiddenWord.join(" ");
}


// Fonction 2️ : Vérifie la lettre proposée par le joueur
function findWord() {
    // 🧱 Empêche de jouer si la partie est terminée
    if (msgWin.textContent.includes("Bravo") || msgLost.textContent.includes("Perdu")) {
        msgError.textContent = "La partie est terminée ! Cliquez sur 'Rejouer'.";
        return;
    }
    const guess = userPropose.value.toLowerCase().trim();
    // Vérifie si le champ est vide
    if (guess === "") {
        msgError.textContent = "Veuillez entrer une lettre avant de valider !";
        return;
    }
    // Vérifie si la lettre a déjà été utilisée
    if (letterchoice.includes(guess)) {
        msgError.textContent = "Vous avez déjà proposé cette lettre !";
        return;
    }
    // Réinitialisation des messages
    msgError.textContent = "";
    msgWin.textContent = "";
    msgLost.textContent = "";

    let found = false;

    // Parcours du mot pour vérifier la lettre
    for (let i = 0; i < wordToFind.length; i++) {
        if (wordToFind[i].toLowerCase() === guess) {
            hiddenWord[i] = wordToFind[i];
            found = true;
        }
    }

    // Mise à jour de l'affichage du mot
    displayWord.textContent = hiddenWord.join(" ");
    // Vérifie si la lettre est correcte ou non
    if (found) {
        msgWin.textContent = "Bien joué !";
    } else {
        cpt++;
        draw(cpt); // Dessine une nouvelle partie du pendu
        msgLost.textContent = "Raté !";
    }
    // Ajoute la lettre à la liste des propositions
    letterchoice.push(guess);
    document.querySelector("#lettersUsed").textContent = letterchoice.join(", ");
    // 🏆 Vérifie la victoire
    if (!hiddenWord.includes("_")) {
        msgWin.textContent = "Bravo ! Vous avez trouvé le mot !";
        buttonRestart.style.display = "block";
    }
    // 💀 Vérifie la défaite (trop d’erreurs)
    if (cpt >= 8) {
        msgLost.textContent = `Perdu ! Le mot était "${wordToFind}"`;
        buttonRestart.style.display = "block";
    }
    // Vide le champ de saisie
    userPropose.value = "";
}

// Fonction 3️⃣ : Dessine le pendu étape par étape sur le canvas
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
function draw(cpt) {
    switch (cpt) {
        case 1: // Base
            ctx.beginPath();
            ctx.moveTo(50, 150);
            ctx.lineTo(100, 150);
            ctx.stroke();
            break;
        case 2: // Poteau vertical
            ctx.beginPath();
            ctx.moveTo(75, 150);
            ctx.lineTo(75, 0);
            ctx.stroke();
            break;
        case 3: // Barre horizontale + tête
            ctx.beginPath();
            ctx.moveTo(75, 0);
            ctx.lineTo(150, 0);
            ctx.lineTo(150, 10);
            ctx.arc(150, 25, 10, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 4: // Corps
            ctx.beginPath();
            ctx.moveTo(150, 35);
            ctx.lineTo(150, 70);
            ctx.stroke();
            break;
        case 5: // Bras gauche
            ctx.beginPath();
            ctx.moveTo(150, 50);
            ctx.lineTo(130, 60);
            ctx.stroke();
            break;
        case 6: // Bras droit
            ctx.beginPath();
            ctx.moveTo(150, 50);
            ctx.lineTo(170, 60);
            ctx.stroke();
            break;
        case 7: // Jambe gauche
            ctx.beginPath();
            ctx.moveTo(150, 70);
            ctx.lineTo(130, 90);
            ctx.stroke();
            break;
        case 8: // Jambe droite
            ctx.beginPath();
            ctx.moveTo(150, 70);
            ctx.lineTo(170, 90);
            ctx.stroke();
            break;
    }
}
// Démarrage du jeu
buttonStart.addEventListener("click" , function () {
    gameContainer.style.display = "block";     // Affiche le conteneur du jeu
    buttonStart.style.display = "none";        // Cache le bouton "Démarrer"

    // Sélectionne un mot aléatoire et le masque
    wordToFind = words[Math.floor(Math.random() * words.length)];
    hideWord(wordToFind);
});

// Validation d’une lettre
document.querySelector("#ajout").addEventListener("click", function () {
    findWord();
});
// Validation avec la touche "Entrée"
userPropose.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        findWord();
    }
});

// Redémarrage du jeu
buttonRestart.addEventListener("click", function () {
    location.reload(); // Recharge la page

});

