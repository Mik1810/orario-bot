let is_active: boolean = false



export interface Env {
	TOKEN:string
	CHAT_ID: string
}
let count = 0
export default {
	async scheduled(event:any, env:Env, ctx:ExecutionContext) {
		await replyWithText(env.TOKEN, "313592737", "Sgozzati")
        // add logic with Schedule Table for all the lectures...
	},

	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if(request.method === 'POST'){
			const payload = await request.json() as any
			if('message' in payload){
				console.log(payload)
				//await replyWithText(env.BOT_TOKEN, payload.message.chat.id, payload.message.text)
				//await replyWithText(env.BOT_TOKEN, payload.message.chat.id, payload.message.text)
			}
		}
		return new Response(`count ${count}`);
	},
};
async function replyWithText(token:string,chatID:string,text:string):Promise<Response>{
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${text}`;
    return fetch(url)
}
