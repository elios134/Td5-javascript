let buttonStart = document.querySelector("#start");
let gameContainer = document.querySelector("#gameContainer");
let userPropose = document.querySelector("#userPropose");
let msgError = document.querySelector("#error");
let msgWin = document.querySelector("#winner");
let msgLost = document.querySelector("#lost");
let displayWord = document.querySelector("#wordDisplay");

let wordToFind = "aujourd'hui";
let hiddenWord = [];
let letterchoice = [];
let cpt = 0;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


buttonStart.addEventListener("click", function () {
  gameContainer.style.display = "block";
  buttonStart.style.display = "none";
  hideWord(wordToFind);
});


document.querySelector("#ajout").addEventListener("click", function () {
  findWord();
});


function hideWord(word) {//fonction qui affiche l"espaces pour le mot a trouver
  displayWord.textContent = ""; 
  hiddenWord = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === "'" || word[i] === "-") {
      hiddenWord.push(word[i]);
    } else {
      hiddenWord.push("_");
    }
  }
  displayWord.textContent = hiddenWord.join(" ");
}


function findWord() {
  const guess = userPropose.value.toLowerCase();

  // Si la lettre a déjà été proposée
  if (letterchoice.includes(guess)) {
    msgError.textContent = "Vous avez déjà proposé cette lettre !";
    return;
  }
  msgError.textContent = "";
  msgWin.textContent = "";
  msgLost.textContent = "";

  let found = false;
  for (let i = 0; i < wordToFind.length; i++) {
    if (wordToFind[i].toLowerCase() === guess) {
      hiddenWord[i] = wordToFind[i];
      found = true;
    }
  }

  displayWord.textContent = hiddenWord.join(" ");

  if (found) {
    msgWin.textContent = "Bien joué !";
  } else {
    cpt++;
    draw(cpt);
    msgLost.textContent = "Raté !";
  }

  // On ajoute la lettre dans la liste des tentatives
  letterchoice.push(guess);

  // Affiche les lettres déjà proposées
  document.querySelector("#lettersUsed").textContent = letterchoice.join(", ");

  if (!hiddenWord.includes("_")) {
    msgWin.textContent = "Bravo ! Vous avez trouvé le mot !";
  }

  if (cpt >= wordToFind.length) {
    msgLost.textContent = `Perdu ! Le mot était "${wordToFind}"`;
  }
  userPropose.value = "";
}

function draw(cpt) {//function draw le pendu
  switch (cpt) {
    case 1:
      ctx.beginPath();
      ctx.moveTo(50, 150);
      ctx.lineTo(100, 150);
      ctx.stroke();
      break;
    case 2:
      ctx.moveTo(75, 150);
      ctx.lineTo(75, 0);
      ctx.stroke();
      break;
    case 3:
      ctx.lineTo(150, 0);
      ctx.lineTo(150, 10);
      ctx.arc(150, 25, 10, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 4:
      ctx.moveTo(150, 35);
      ctx.lineTo(150, 70);
      ctx.stroke();
      break;
    case 5:
      ctx.moveTo(150, 50);
      ctx.lineTo(130, 60);
      ctx.stroke();
      break;
    case 6:
      ctx.moveTo(150, 50);
      ctx.lineTo(170, 60);
      ctx.stroke();
      break;
    case 7:
      ctx.moveTo(150, 70);
      ctx.lineTo(130, 90);
      ctx.stroke();
      break;
    case 8:
      ctx.moveTo(150, 70);
      ctx.lineTo(170, 90);
      ctx.stroke();
      break;
  }
}
