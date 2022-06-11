document.querySelector(".js-d20").addEventListener("click", d20Clicked);
document.querySelector(".js-dx").addEventListener("click", dxClicked);
document.querySelector(".js-letter-button").addEventListener("click", guessClicked);

let lives = 7;
let lettersGuessed = 0;

let words = [
  "TEERULL",
  "PROGRAMMEERIMINE",
  "TARKVARAARENDUS"
];

let word = words[Math.floor(Math.random() * words.length)].split("");
let guessWord = word.map(function() {return "_";});


document.querySelector(".js-dx").disabled = true;
document.querySelector(".js-letter-button").disabled = true;
  

update();

function d20Clicked() {

  rnum = Math.floor(Math.random() * 20) + 1;
  console.log("Veeretasite D20, tulemuseks on: " + rnum);

  switch(rnum) {
    case "1":
      console.log("Tulemuse 1 korral on mäng läbi");
      break;
    case "20":
      console.log("Veeretasid 20 saad ühe elu juurde");
      lives++;
      break;
  }

  update();
  document.querySelector(".js-d20").disabled = true;
  document.querySelector(".js-dx").disabled = false;
}

function dxClicked() {
  rnum = Math.floor(Math.random() * 10) * 10;

  if (rnum == 0)
    rnum = 100;



  let fillPercent = rnum / 2;
  let lettersToFill = word.length * fillPercent / 100;

  let consoleOutput = "Veeretasid D%, mille tulemuseks on " + rnum;
  consoleOutput += ". Valitud sõnas on " + word.length;
  consoleOutput += " tähte, seega " + fillPercent + "% " + word.length + "-st on " + Math.round(lettersToFill, 1);
  consoleOutput +=  ", ehk kasutajale avatakse " + Math.floor(lettersToFill) + " tähte.";
  
  console.log(consoleOutput); 
  
  lettersToFill = Math.floor(lettersToFill);
  initialFIll(lettersToFill);

  document.querySelector(".js-dx").disabled = true;
  document.querySelector(".js-letter-button").disabled = false;

  update();
}

function guessClicked() {
  let letter = document.querySelector(".js-letter-input").value;
  if (letter.length > 1) {
    alert("Sisesta ainult üks täht");
    return;
  }
  else {
    letter = letter.toUpperCase();
  
    let numOfLetters = 0
    
    for (let i = 0; i < word.length; i++) {
      if (word[i] == letter) {
        let letterFound = word[i];
        word[i] = "_";
        guessWord[i] = letterFound;
        numOfLetters++; 
      }
    } 
  
    lettersGuessed += numOfLetters;


    if (numOfLetters < 1) {
      lives--;
      console.log("Täht " + letter + " ei esine sõnas, alles on " + lives + " elu.")
    }
  
    document.querySelector(".js-letter-input").value = "";
    
    if (lives == 0) {
      console.log("Oled kaotanud - elud on otsas");
    }

    if (lettersGuessed == word.length) {
      console.log("Oled võitnud, arvasid sõna ära");
    }
    update();
    
  }

}



function initialFIll(lettersToFill) {

  let length = word.length;
  let rnums = [];

  while (rnums.length < lettersToFill) {
    rnum = Math.floor(Math.random() * length);
    if (!rnums.includes(rnum))
      rnums.push(rnum);
  }

  for (i = 0; i < rnums.length; i++) {
    index = rnums[i];

    letter = word[index];
  
    word[index] = "_";
    guessWord[index] = letter;
  }   

  lettersGuessed += lettersToFill;
}


function update() {
  document.querySelector(".js-word").innerHTML = guessWord.join(" ");
}




