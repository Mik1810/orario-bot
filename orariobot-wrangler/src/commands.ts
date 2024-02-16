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

    const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"]
    const oggi = new Date();
    const giornoSettimanaNumero = oggi.getDay();
    const nomiGiorniSettimana = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const giornoSettimana = nomiGiorniSettimana[giornoSettimanaNumero];
    const giornoMese = oggi.getDate();
    const mese = oggi.toLocaleString('default', { month: 'long' });

    // Crea la stringa completa
    const stringaOggi = `Oggi è ${giornoSettimana} ${giornoMese} ${mese}`;
    let result:string = stringaOggi + "\n\n"
    for (let i = 0; i < days.length; i++) {
        result += "<b>" + days[i] + "</b>:\n"
        result += lessons[i] + "\n\n"
    }
    return result
}