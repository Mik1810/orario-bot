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
    let result:string = ""
    for (let i = 0; i < days.length; i++) {
        result += "<b>" + days[i] + "</b>:\n"
        result += lessons[i] + "\n\n"
    }
    return result
}