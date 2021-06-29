//Ce fichier sert de base pour le browserify en bundle.js, afin que le require passe sur browser

var randomWords = require('random-words'); //un module qui permet de générer un mot aléatoire en anglais

var GuessCont = document.getElementById("guessWord"); //une variable pour le conteneur du mot
var randomWord= randomWords(); //on établit la variable du mot généré aléatoirement
var DivRandomWord = randomWord.split(""); //on sépare chaque lettre du mot généré
var uniqueGuess = [...new Set(DivRandomWord)]; //on crée un set pour n'avoir qu'une fois les différentes lettres du mot
var RightLetters = []; //arrays pour les lettres correctes et fausses à venir
var WrongLetters = [];
var uniqueRight = [...new Set(RightLetters)];
uniqueRight2 = Array.from(uniqueRight);
var uniqueWrong = [...new Set(WrongLetters)];
uniqueWrong2 = Array.from(uniqueWrong);

//set up de base du mot invisible
function writeWord() {
    DivRandomWord.forEach(letter => {
        var spanelem = document.createElement("span");
        spanelem.innerHTML = letter;
        spanelem.style.borderBottomColor = "white";
        spanelem.style.borderBottomWidth = "5px";
        spanelem.style.borderBottomStyle = "solid";
        spanelem.setAttribute("class", "HMLetter");
        GuessCont.appendChild(spanelem);
    })
}

writeWord(); //on appelle la fonction pour faire apparaitre le mot à chercher sur la page

document.getElementById("livesCount").innerHTML= " " + (6-uniqueWrong2.length) + "/6";//on donne le nombre de vies restantes

//fonction de l'event pour commencer une nouvelle partie
document.getElementById("newGame").addEventListener("click", () => {
    randomWord= randomWords();
    DivRandomWord = randomWord.split("");
    uniqueGuess = [...new Set(DivRandomWord)];
    document.getElementById("RightLetters2").innerHTML = "";
    document.getElementById("WrongLetters2").innerHTML = "";
    RightLetters = [];
    WrongLetters = [];
    uniqueRight = [...new Set(RightLetters)];
    uniqueRight2 = Array.from(uniqueRight);
    uniqueWrong = [...new Set(WrongLetters)];
    uniqueWrong2 = Array.from(uniqueWrong);
    GuessCont.innerHTML= "";
    document.getElementById("Advices").innerHTML = "";
    document.getElementById("TargetLetter").disabled = false;
    document.getElementById("livesCount").innerHTML= " " + (6-uniqueWrong2.length) + "/6";
    writeWord();
});

//actions quand on clique sur le bouton
document.getElementById("run").addEventListener("click", () => {

    GuessCont.innerHTML= ""; //on commence par clear le conteneur
    document.getElementById("Advices").innerHTML = ""; //on clear le message de l'advice, s'il y en a un
    
    var TargLetter = (document.getElementById("TargetLetter").value).toLowerCase(); //on prend la valeur entrée dans l'input

    //on réécrit chaque lettre du mot ...
    DivRandomWord.forEach(letter => {
        var spanelem = document.createElement("span");
        spanelem.innerHTML = letter;
        spanelem.style.borderBottomColor = "white";
        spanelem.style.borderBottomWidth = "5px";
        spanelem.style.borderBottomStyle = "solid";
        spanelem.setAttribute("class", "HMLetter");

        // ...en vérifiant que la lettre n'existe pas déjà dans les arrays ...

        if ((RightLetters.includes(TargLetter) == true) || (WrongLetters.includes(TargLetter) == true)) {
        document.getElementById("Advices").innerHTML = "You have already checked this letter";
        }

        //Et on fait apparaitre la lettre ou non si elle est correcte ou fausse, en changeant sa couleur

        else {
            if (TargLetter == letter) {
                spanelem.style.color = "white";
            }
            else {
                if (RightLetters.includes(letter) == true) {
                    spanelem.style.color = "white";
                }
                else {
                    spanelem.style.color = "rgba(0, 0, 0, 0)";
                }
            }
        }

        GuessCont.appendChild(spanelem);
    })

    //on check ensuite si la lettre est bien dans le mot pour la mettre dans l'array approprié
    if (DivRandomWord.includes(TargLetter) == true) {
        RightLetters.push(TargLetter);
    }
    else {
        WrongLetters.push(TargLetter);
    }

    //Si les deux arrays correspondent, c'est gagné !
    if (uniqueGuess.every(i => RightLetters.includes(i)) == true) {
        document.getElementById("Advices").innerHTML = "Congratulations ! You guessed the word !";
    }

    //Si on a fait trop d'erreurs, c'est perdu...
    if (WrongLetters.length == 6) {
        document.getElementById("Advices").innerHTML = "Sorry, you loose the game this time !";
        document.getElementById("TargetLetter").disabled = true;
        document.getElementById("newGame").innerHTML = "Try Again";
    }

    //On clear le contenu de l'affichage pour le remettre ensuite avec les ajouts
    document.getElementById("RightLetters2").innerHTML = "";
    document.getElementById("WrongLetters2").innerHTML = "";
    uniqueRight = [...new Set(RightLetters)];
    uniqueRight2 = Array.from(uniqueRight);
    uniqueWrong = [...new Set(WrongLetters)];
    uniqueWrong2 = Array.from(uniqueWrong);
    uniqueRight2.forEach(letters => {
        var spanelem2 = document.createElement("span");
        spanelem2.innerHTML = " " + letters;
        document.getElementById("RightLetters2").appendChild(spanelem2);
    })

    uniqueWrong2.forEach(letters => {
        var spanelem2 = document.createElement("span");
        spanelem2.innerHTML = " " + letters;
        document.getElementById("WrongLetters2").appendChild(spanelem2);
    })

    document.getElementById("livesCount").innerHTML= " " + (6-uniqueWrong2.length) + "/6";
    
    document.getElementById("TargetLetter").value="";

    
})

//faire en sorte qu'appuyer sur enter fasse le même event qu'appuyer sur le bouton
var input = document.getElementById("TargetLetter");
input.addEventListener("keyup", function(event) {
    let key = event.key;
    if (key && "Enter" === key) {
        event.preventDefault();
        document.getElementById("run").click();
    }
});

