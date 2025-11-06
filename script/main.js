let gameContainer = document.querySelector("#gameContainer");
let game = document.querySelector("#game");
let result = document.querySelector("#resultContainer");
let btn = document.querySelector("#ajout")
let userPropose = document.querySelector("#userPropose");
let msgError = document.querySelector("#error")
let msgWin = document.querySelector("#winner")
let wordToFind = "javascript";
let cpt = 0;

document.getElementById("ajout").addEventListener("click", function () {
    findWord();
});
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
function draw(cpt) {

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
            ctx.arc(156, 30, 10, 180, Math.PI * 2, true)
            ctx.stroke();
            break;
        case 4:
            ctx.moveTo(150, 40);
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
        default:
            break;
    }
}
// btn.addEventListener("click", function () {
//     cpt++;
//     draw(cpt);
// });

function findWord() {
    if (userPropose.value != "") {
        let newDiv = document.createElement("div");
        let letter = document.createElement("p");

        msgError.textContent = ""
        msgWin.textContent = ""

        result.appendChild(newDiv);
        newDiv.appendChild(letter);
        // letter.textContent = userPropose.value;
        for (let i = 0; i < wordToFind.length; i++) {
            if (userPropose.value == wordToFind[i]) {
                letter.textContent = userPropose.value;
                msgWin.textContent = "Gagné !"

            } else if (userPropose.value != wordToFind[i]) {
                letter.textContent = userPropose.value + "_";
                cpt++;
                draw(cpt);
            }
        }

    } else {
        msgError.textContent = "Veuillez entrer une lettre"
    }
}