import {MemoryDB, addKeyword, createBot, createFlow, createProvider}from '@bot-whatsapp/bot';
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'
import dotenv from 'dotenv';
dotenv.config();


const flowBienvenida = addKeyword('hola').addAnswer('Hola te habla el bot de Hardy')

/**
 * 
 */

const main = async () =>{

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http.server.post('/send-message',handleCtx(async (bot, req,res) => {
        const body = req.body
        const message = body.message
        const mediaUrl = body.mediaUrl

        await bot.sendMessage(process.env.FRIEND_NUMBER, message,{
            media: mediaUrl
        })
        res.end('Server de polka')

    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()