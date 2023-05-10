
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
        console.log('numeri bomba: ', bombArray);

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
                function colora() {
                    if(!bombArray.includes(i)){
                        //possibilità di deselezionare e selezionare
                        if (this.classList.contains('selected')) {
                            this.classList.remove('selected');
                            console.log(`Hai DESELEZIONATO il numero ${i}`);
                        }else{
                            this.classList.add('selected');
                            console.log(`Hai SELEZIONATO il numero ${i}`);
                        }
                    }else{
                        //aggiungo classe bomba
                        this.classList.add('boom');
                        console.log(`BOOOOM!! il numero ${i} nascondeva una BOMBA!`);

                        //faccio vedere tutte le bombe
                            //prendo gli square, creo un array
                        const squareNumArray = document.getElementsByClassName("square");

                        //variabile con classe dad aggiungere
                        const bombClass = "bomb";

                        //controllo presenza e assegno classe
                        controlloPresenzaAssegnoClasse(bombArray, squareNumArray, bombClass);
                        /*
                        //qui nel dettaglio la funzione
                        for (let i = 0; i < bombArray.length; i++) {
                            //prendo il numero di ogni bomba
                            const numeroBomba = bombArray[i];

                            for (let i = 0; i < squareNumArray.length; i++) {
                                //prendo il numero di ogni square
                                const squareNumero = i + 1;

                                //se coincidono inserisci la classe
                                if (squareNumero === numeroBomba) {
                                    squareNumArray[i].classList.add('bomb');
                                }
                            }
                        }
                        */
                        //conto i punti
                        const punti = document.getElementsByClassName('selected').length;
                        console.log(`Hai totalizzato ${punti} punti.`);

                        //disattivo il gioco non va
                        //creo un div che scherma
                        const gameOver = document.createElement('div');
                        gameOver.classList.add('game-over');
                        
                        container.prepend(gameOver);
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

//controllo prenza numero di un array in un altro array con numeri ordinati e aggiungo una classe
function controlloPresenzaAssegnoClasse(arrayRicercato, arrayInCuiCerco, classeDaAggiungere) {
    
    for (let i = 0; i < arrayRicercato.length; i++) {
        //prendo il numero di ogni bomba
        const numeroBomba = arrayRicercato[i];
        
        for (let i = 0; i < arrayInCuiCerco.length; i++) {
            //prendo il numero di ogni square
            const squareNumero = i + 1;
            
            //se coincidono inserisci la classe
            if (squareNumero === numeroBomba) {
                arrayInCuiCerco[i].classList.add(classeDaAggiungere);
            }
        }
    }
}









