export interface Env {
	TOKEN:string
	CHAT_ID: string
}

let lessons = 	["08:30 - 11-30 Robotica \n11:30-12:30 Reti \n14:30-16:30 Compilatori", 
				"Martedì",
				"08:30 - 11:30 Reti \n11:30 - 13:30 AI \n14:30 - 17:30 Inglese"]

export default {
	async scheduled(event:any, env:Env, ctx:ExecutionContext) {
		await replyWithText(env.TOKEN, env.CHAT_ID, lessons[new Date().getDay() - 1])
	},



	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if(request.method === 'POST'){
			const payload = await request.json() as any
			if('message' in payload){
				//console.log(env.CHAT_ID)
				//await replyWithText(env.BOT_TOKEN, payload.message.chat.id, payload.message.text)
				//await replyWithText(env.BOT_TOKEN, payload.message.chat.id, payload.message.text)
			}
		}
		return new Response(`Running...`);
	},
};

async function replyWithText(token:string,chatID:string,text:string):Promise<Response>{
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${text}`;
    return fetch(url)
}
