import { lessons } from "."

export function dispachCommand(com:string){
    switch(com){
        case "orarioINFBot":
        case "orario":
            return hoursCommand()
        default :
            return "Errore"
    }
}


function hoursCommand(){

    const days = [  
                    'Lunedì', 
                    'Martedì', 
                    'Mercoledì', 
                    'Giovedì', 
                    'Venerdì',
                    'Sabato',
                    'Domenica'
                ]

    const months = ['Gennaio', 
                    'Febbraio', 
                    'Marzo', 
                    'Aprile', 
                    'Maggio', 
                    'Giugno', 
                    'Luglio', 
                    'Agosto', 
                    'Settembre', 
                    'Ottobre', 
                    'Novembre', 
                    'Dicembre'
                ];
    const today = new Date();
    const weekDay = days[(today.getDay()-1)%7];
    const monthNumber = today.getMonth();

    // Crea la stringa completa
    const stringaOggi = `Oggi è ${weekDay} ${today.getDate()} ${months[monthNumber]}`;
    let result:string = stringaOggi + "\n\n"
    for (let i = 0; i < days.length-2; i++) {
        result += "<b>" + days[i] + "</b>:\n"
        result += lessons[i] + "\n\n"
    }
    return result
}