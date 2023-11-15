let is_active: boolean = false



export interface Env {
	BOT_TOKEN:string
	CHAT_ID: string
}

export default {

	async scheduled(event:any, env:Env, ctx:ExecutionContext) {
		ctx.waitUntil(replyWithText(env.BOT_TOKEN, "313592737", "Sgozzati"))
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
		return new Response('Hello World!');
	},
};

async function sendMessage(token:string, chatID:string, message:string) {
    const response = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatID,
            text: message.toString().substring(0, 4096)
        })
    })
    return response
}

async function replyWithText(token:string,chatID:string,text:string):Promise<Response>{
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${text}`;
    return fetch(url)
}

async function sendMex(token:string,chatID:string,text:string):Promise<Response> {
    if (!is_active) {
        is_active = true;
		await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${"Starting response"}`);
        setInterval(async () => {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${text}`);
        }, 5000);
    }
    return new Response("Timer running...")
}
