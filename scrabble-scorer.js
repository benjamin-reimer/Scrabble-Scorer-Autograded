// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";
 
   for (let i = 0; i < word.length; i++) {
 
     for (const pointValue in oldPointStructure) {
 
       if (oldPointStructure[pointValue].includes(word[i])) {
         letterPoints += `Points for '${word[i]}': ${pointValue}\n`
       }
 
     }
   }
   return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let newPointStructure = transform(oldPointStructure);

function initialPrompt() {
   console.log("Let's play some scrabble! \n");
   let wordInput = input.question('Enter a word to score: ');
   return wordInput;
   
};

let simpleScorer;
let vowelBonusScorer;
let scrabbleScorer = function scrabbleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;

      for(let i = 0; i < word.length; i++) {
         for(letter in newPointStructure) {
            if(letter===word[i]) {
            letterPoints += newPointStructure[letter];
         }
      }
   }
return letterPoints;
}

simpleScorer = function simpleScorer(word){
   word = word.toUpperCase();
   let points = 0;
      for(let i = 0; i < word.length; i++){
         points+= 1;
   }
   return points;
}

vowelBonusScorer = function vowelBonusScorer(word){
    word = word.toUpperCase();
   let points = 0;
   let vowels = ['A','E','I','O','U','Y']
      for(let i = 0; i < word.length; i++){
         if(vowels.includes(word[i])){
            points+= 3;
         } else{
            points+= 1;
         }
   }
   return points;
}


const scoringAlgorithms = [
{
      "name": "Simple Score",
      "description": "Each letter is worth one point.",
      "scorerFunction": simpleScorer
},
{
      "name": "Bonus Vowels",
      "description": "Vowels are 3 pts. Consonants are 1 pt.",
      "scorerFunction": vowelBonusScorer
},
{
      "name": "Scrabble",
      "description": "The traditional scoring algorithm",
      "scorerFunction": scrabbleScorer
}
];

function scorerPrompt(word) {
   console.log(`Which scoring algorithm would you like to use?\n`);
   for(let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i}- ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
     }
     let response = (input.question('Enter 0, 1, or 2: '));

   if(response == 0) {
      console.log(`Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
   }else if(response == 1) {
       console.log(`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
   }else if(response == 2){
      console.log(`Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`);
   }else {
      response = input.question('enter a valid input.')
   }
}

function transform(object) {
   let newObject = {};
   for (key in object) {
      for (let i = 0; i < object[key].length; i++) {
         newObject[object[key][i].toLowerCase()] = Number(key);         
      }
      
   }
return newObject;
};




function runProgram() {
   
  //console.log(vowelBonusScorer(initialPrompt()));
   scorerPrompt(initialPrompt());
}
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};

