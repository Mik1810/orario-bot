import { lessons } from "."

export function dispachCommand(com:string){
    switch(com){
        //case "orarioINFBot":
        case "lessons":
            return lessonsCommand()
        case "tomorrow":
            return nextDayCommand()
        default :
            return "Errore"
    }
}

function nextDayCommand() {

    if((new Date().getDay() + 1) % 7 === 0 || (new Date().getDay() + 1) % 7 === 6) {
        // è sabato o domenica
        return lessons[(new Date().getDay() + 1) % 7]
    }
    return "Lezioni di domani:\n\n" + lessons[(new Date().getDay() + 1) % 7]
    
}


function lessonsCommand(){

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
    const weekDay = days[(today.getDay() - 1) %7];
    const monthNumber = today.getMonth();

    // Crea la stringa completa
    const stringaOggi = `Oggi è ${weekDay} ${today.getDate()} ${months[monthNumber]}`;
    let result:string = stringaOggi + "\n\n"
    for (let i = 1; i < days.length-1; i++) {
        result += "<b>" + days[(i - 1 )%7] + "</b>:\n"
        result += lessons[i] + "\n\n"
    }
    return result
}