import { dispachCommand } from "./commands";

export interface Env {
	TOKEN:string
	CHAT_ID: string
	NAMESPACE: string
}

interface Message {
    ID:string
    chatID:string
    text:string
    command?:string
}

interface TelegramCommand{
    offset:number
    length:number
    type:string
}

export const lessons = 	[	
							"Buona domenica, pezzo di coglione!",
							"08:30 - 11-30 Algoritmica\n11:30 - 13:30 Agile\n14:30 - 16:30 TCC*\n16:30 - 18-30 Information Theory", 
							"08:30 - 11:30 Bioinformatica\n11:30 - 13:30 Tecnologie del Web*\n14:30 - 16:30 Information Theory\n16:30 - 18:30 Web Engineering",
							"08:30 - 10:30 TCC*\n10:30 - 13:30 Tecnologie del Web*\n14:30 - 16:30 Mobile",
							"09:30 - 11:30 Web Engineering\n11:30 - 13:30 Bioinformatica\n14:30 - 16:30 Algoritmica\n16:30 - 18:30 Machine Learning",
							"09:30 - 11:30 Agile\n11:30 - 13:30 Sviluppo Web Avanzato\n14:30 - 16:30 Machine Learning\n16:30 - 18:30 Mobile",
							"Sabato è il giorno dei froci, frocio"
						]



export default {
	async scheduled(event:any, env:Env, ctx:ExecutionContext) {
		/**
		 * Domenica: 0
		 * Lunedì: 1
		 * Martedì: 2
		 * Mercoledì: 3
		 * Giovedì: 4
		 * Venerdì: 5
		 * Sabato: 6
		 */
		

		if (event['cron'] === "* * * * *") {
			// Trigger di test che viene eseguito ogni minuto
			//await replyWithText(env.TOKEN, env.CHAT_ID, "Luca frociazzo di merda, MERDA!")
		} else if (event['cron'] === "0 20 * * *") {
			// Trigger serale (21:00)
			if((new Date().getDay() + 1) % 7 === 0 || (new Date().getDay() + 1) % 7 === 6) {
				// è sabato o domenica
				await replyWithText(env.TOKEN, 
					env.CHAT_ID, 
					lessons[new Date().getDay()])
			} else {
				await replyWithText(env.TOKEN, 
									env.CHAT_ID, 
									"<b>Lezioni di domani</b>\n\n" + lessons[(new Date().getDay() + 1) % 7])
			}
		} else if (event['cron'] === "0 4 * * *"){
			// Trigger giornaliero (05:00)
			if(new Date().getDay() === 0 || new Date().getDay() === 6) {
				// è sabato o domenica
				await replyWithText(env.TOKEN, 
					env.CHAT_ID, 
					lessons[new Date().getDay()])
			} else {
				await replyWithText(env.TOKEN, 
									env.CHAT_ID, 
									"<b>Lezioni di domani</b>\n\n" + lessons[new Date().getDay()])
			}
		} else if (event['cron'] === "0 13 * * *"){
			// Trigger easter egg
			const probability = Math.floor(Math.random() * 10) + 1
			if (probability == 1) {
				await replyWithText(env.TOKEN, 
									env.CHAT_ID, 
									"Si stava meglio quando i bot non esistevano...")
			}

		}
	},

	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if(request.method === "POST"){
			const payload = await request.json() as any
			if('message' in payload){
				const messageInfo:Message = getMessageInfo(payload.message)
				if(""+messageInfo.chatID === ""+env.CHAT_ID)
					if("command" in messageInfo) {
						let result = dispachCommand(messageInfo.command!)
						if (result !== "Errore") await replyWithText(env.TOKEN, env.CHAT_ID, result)
					}
			}
		}
		return new Response(`Running...`);
	},
};

async function replyWithText(token:string,chatID:string,text:string):Promise<Response>{
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${text}&parse_mode=HTML`;
    return fetch(url)
}

function getMessageInfo(message:any): Message{
    let command:string = ""
    let text:string = "text" in message ? message.text : ""
    if("entities" in message){
        const commandINFO = message.entities[0] as TelegramCommand
        if(commandINFO.type === "bot_command"){
            const atPosition = text.indexOf("@")
            if(atPosition == -1) {

				//Here if the command doesn't contain the @
                command = text.substring(1)
			} else {
				
                command = text.substring(commandINFO.offset+1,atPosition)
				console.log(command)
			}
			return {ID:message.message_id,chatID:message.chat.id,text:text,command:command} 
        }
    }
    return {ID:message.message_id,chatID:message.chat.id,text:text}
}
