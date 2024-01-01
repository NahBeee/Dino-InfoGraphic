    /**
    * @description Represents a dinosaur constructor
    * @constructor
    * @param {Object} data - The data of Dino
    */
    // Create Dino Constructor
function DinoConstr(data){
    this.species = data.species;
    this.weight = data.weight;
    this.height = data.height;
    this.diet = data.diet;
    this.where = data.where;
    this.when = data.when;
    this.fact = data.fact;
}
    /**
    * @description Creates the dinosaur object array by calling constructor
    * @returns {Array} Array of dinosaur objects from constructor
    */
    // Create Dino Objects
let dino= [];
fetch('/dino.json')
    .then(response => response.json()) //converted to JSON format
    .then(json =>
        dino = json.Dinos.map(dino => new DinoConstr(dino)) ) 
        // iterate over each elements. for each data from dino, a new instance of Dino Constructor is created 
        // and added to to dino array 
    /**
    * @description Creates the human object
    * @returns {Object} Human objects
    */
    // Create Human Object
function Human(name,weight,height,diet){
    this.name =name;
    this.weight=weight;
    this.height=height;
    this.diet=diet;
}
    // Use IIFE to get human data from form
function inputValue(elementId){
    return document.getElementById(elementId).value;
}// function to get values from users to by accessing id tag in HTML file

function create(){
    return (function(){
        let name= inputValue("name");
        let weight = parseFloat(inputValue("weight"));
        let height =parseFloat(inputValue("inches"));
        let diet = inputValue("diet");
        return new Human(name, weight, height, diet);
        //getting users input into objects above and putting it to Human object
    })();
}

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
DinoConstr.prototype.heightCompare = function(height){
    let result ="Same Height bro";
    if (this.height > height){
        result= "I'm Taller";
    }
    else if (this.height < height){
        result="Wait You're taller than me?"
    }
    this.fact= result;
}
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
DinoConstr.prototype.weightCompare = function(weight){
    let result ="Same Weight bro";
    if (this.weight > weight){
        result= "I'm Bigger";
    }
    else if (this.weight < weight){
        result="Wait You're bigger than me?"
    }
    this.fact= result;
}
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
DinoConstr.prototype.dietCompare = function(diet){
    let result= "Same Diet Bro";
    if (this.diet !== diet){
        result = "Which Diet are you on?";
    }
    this.fact= result;
}
DinoConstr.prototype.getRandomFact = function () {
    let index = Math.floor(Math.random() * 10) % this.facts.length;
    return this.facts[index];
};
    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen
function getTitles(species,image,fact){
    let itemDiv = document.createElement("div");
    itemDiv.className="grid-item";

    let speciesDiv= document.createElement("h3");
    speciesDiv.innerText = species;
    itemDiv.appendChild(speciesDiv);

    let imageDiv = document.createElement("img");
    imageDiv.src= image;
    itemDiv.appendChild(imageDiv);

    if(fact){
        let factDiv= document.createElement("p");
        factDiv.innerText= fact;
        itemDiv.appendChild(factDiv);
    }
    return itemDiv;
}

// On button click, prepare and display infographic
document.getElementById("btn")
.addEventListener("click", function(){
    const user = create();
    dino.forEach(dino => {
        let index = Math.floor(Math.random()*3,10); // generate numbers between 0 and 3 and loop all case below to do comparison
        switch(index){
            case 0:
                dino.heightCompare(user.height);
            break;
            case 1:
                dino.weightCompare(user.weight);
            break;
            case 2:
                dino.dietCompare(user.diet);
            break;
        }
    });
//hide the form from present UI
document.getElementById("dino-compare").style.display= "none";
//Generate DOM above to new UI with the result of comparison.
for(let index in dino){
    let result= dino[index];
    let fact= result.fact;
    if (result.species =="Tyrannosaurus Rex"){
        fact= "The largest known skull measures in at 5 feet long."
    }
    let itemDiv= getTitles(result.species, "images/" +result.species.toLowerCase() + ".png", fact);

    document.getElementById("grid")
    .appendChild(itemDiv)

    if (index ==3){
        fact="This is Human Fact";
        let humanTitle= getTitles(user.name, "images/human.png", fact)

        document.getElementById("grid")
        .appendChild(humanTitle);
    }

}
})
