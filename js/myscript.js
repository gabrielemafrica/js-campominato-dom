
// costruisco una griglia con square numerati e cliccabili
//prendo un container
const container = document.getElementById("grid");


//prendo il bottone

const play = document.getElementById("play");

//evento click
play.addEventListener(
    "click",
    function(){

        //pulisco la pagina
        container.innerHTML = "";

        //prendo il livello
        const level = parseInt(document.getElementById("level").value);
        console.log("livello di gioco:" ,level);

        //variabile numero celle e difficoltá
        let numeroCelle;
        let levelClass;

        //cambio celle in base al livello
        if (level === 1) {
            numeroCelle = 100;
            levelClass = "easy";
        } else if (level === 2){
            numeroCelle = 81;
            levelClass = "normal";
        } else if (level === 3){
            numeroCelle = 49;
            levelClass = "hard";
        }

        //creo array di numeri casuali
        const bombArray = generaArray(1, numeroCelle, 16);
        console.log(bombArray);

        for (let i = 1; i <= numeroCelle; i++) {
            
            //creo il quadrato
            const square = createElemento("div", "square");

            //metto i numeri nel quadrato
            square.innerHTML = i;

            //assegno le classi
            square.classList.add(levelClass);

            //al click lo square si colora
            square.addEventListener(
                'click',
                function () {
                    if(!bombArray.includes(i)){

                        if (this.classList.contains('selected')) {
                            this.classList.remove('selected');
                            console.log(`Hai DESELEZIONATO il numero ${i}`);
                        }else{
                            this.classList.add('selected');
                            console.log(`Hai SELEZIONATO il numero ${i}`);
                        }
                    }else{
                        //aggiungo classe bomba
                        this.classList.add('bomb');
                        console.log(`BOOOOM!! il numero ${i} nascondeva una BOMBA!`);
                        //conto i punti
                        const punti = document.getElementsByClassName('selected').length;
                        console.log(`Hai totalizzato ${punti} punti.`);
                    }
                    
                }
            )
            //metto square nel container
            container.append(square);
            //assegno classe al container
            container.classList.add("container-grid");
        }
    }

)




//funzioni

// creare un elemento e assegnargli una classe
function createElemento(tagType, classToAdd) {
    const newElement = document.createElement(tagType);
    newElement.classList.add(classToAdd);
    return newElement;
}

//genera numeri casuali in un range
function numeroCasuale(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//genera array di numeri
function generaArray(numMin, numMax, quantiNum){
    //creo array vuoto
    const arrayDiNumeri = [];

    //aggiungo a array
    //fino a che la lunghezza dell'array é minore della quantitá che voglio
    while (arrayDiNumeri.length < quantiNum){

        //creo un numero random
        const numRandom = numeroCasuale(numMin, numMax);

        //se l'array non contiene giá il numero, push
        if(!arrayDiNumeri.includes(numRandom)){
            arrayDiNumeri.push(numRandom);
        }
    }
    //restituisco l'array
    return arrayDiNumeri;
}
const prova = generaArray(1, 100, 16);
console.log(prova);








