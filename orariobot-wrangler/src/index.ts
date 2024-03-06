import { dispachCommand } from "./commands";

export interface Env {
	TOKEN:string
	CHAT_ID: string
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

export const lessons = 	[	"08:30 - 11-30 Algoritmica\n11:30 - 13:30 Agile\n14:30 - 16:30 TCC*\n16:30 - 18-30 Information Theory", 
							"09:30 - 11:30 Bioinformatica\n11:30 - 13:30 Tecnologie del Web*\n14:30 - 16:30 Information Theory\n16:30 - 18:30 Web Engineering",
							"08:30 - 10:30 TCC*\n10:30 - 13:30 Tecnologie del Web*\n14:30 - 16:30 Mobile",
							"09:30 - 11:30 Web Engineering\n11:30 - 13:30 Bioinformatica\n14:30 - 16:30 Algoritmica\n16:30 - 18:30 Machine Learning",
							"09:30 - 11:30 Agile\n11:30 - 13:30 Sviluppo Web Avanzato\n14:30 - 16:30 Machine Learning\n16:30 - 18:30 Mobile",
							"Godetevi un sereno sabato!",
							"Buona domenica, la festa del signore!"
						]

export default {
	async scheduled(event:any, env:Env, ctx:ExecutionContext) {
		await replyWithText(env.TOKEN, env.CHAT_ID, lessons[new Date().getDay() - 1])
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
				
				//await replyWithText(env.BOT_TOKEN, payload.message.chat.id, payload.message.text)
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
