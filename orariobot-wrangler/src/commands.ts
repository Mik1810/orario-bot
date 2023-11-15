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
    let result:string = ""
    for (let lesson of lessons) {
        result += lesson + "\n\n"
    }
    return result
}