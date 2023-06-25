const fs = require('fs');
const path = require('path')


const generateUsername = async () =>{
    try{
        const data = fs.readFileSync(path.join(__dirname,'../words/noun.json'), 'utf8');
        const adjectiveData = fs.readFileSync(path.join(__dirname,'../words/adjective.json'),'utf8')
        const jsonDataNoun = JSON.parse(data).nouns;
        const jsonDataAdjective = JSON.parse(adjectiveData).adjectives;
        const randomNoun = getRandomElement(jsonDataNoun);
        const randomAdjective = getRandomElement(jsonDataAdjective);
        const randomUsername = randomAdjective + " " + randomNoun;
        return randomUsername
    }catch(e){
        console.log("username error")
        console.log(e)
    }
}


function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }


  module.exports = {generateUsername};