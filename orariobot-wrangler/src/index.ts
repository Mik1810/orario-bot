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

export const lessons = 	["08:30 - 11-30 Robotica\n11:30 - 12:30 Reti\n14:30 - 16:30 Compilatori", 
						"09:30 - 11:30 Compilatori\n11:30 - 13:30 Immagini\n16:30 - 18:30 AI",
						"08:30 - 11:30 Reti\n11:30 - 13:30 AI\n14:30 - 17:30 Inglese",
						"14:30 - 16:30 Immagini\n16:30 - 18:30 Robotica",
						"14:30 - 17:30 Mobile",
						"Giacomo frocio",
						"Giacomo froci0"]

export default {
	async scheduled(event:any, env:Env, ctx:ExecutionContext) {
		await replyWithText(env.TOKEN, env.CHAT_ID, lessons[new Date().getDay() - 1])
	},



	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if(request.method === 'POST'){
			const payload = await request.json() as any
			if('message' in payload){
				const messageInfo:Message = getMessageInfo(payload.message)
				console.log()
				console.log(env.CHAT_ID)
				console.log(messageInfo.chatID === env.CHAT_ID)
				if(""+messageInfo.chatID === ""+env.CHAT_ID)
					if("command" in messageInfo) {
						console.log(messageInfo.command)
						let result = dispachCommand(messageInfo.command!)
						if (result !== "Errore") await replyWithText(env.TOKEN, env.CHAT_ID, result)
					}
				
				//await replyWithText(env.BOT_TOKEN, payload.message.chat.id, payload.message.text)
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
