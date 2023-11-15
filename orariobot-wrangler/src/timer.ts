
let is_active: boolean = false

export async function sendMex(token:string,chatID:string,text:string):Promise<Response> {
    if (!is_active) {
        is_active = true;
        setInterval(async () => {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${text}`);
        }, 60000);
    }
    return new Response("Timer running...")
}
