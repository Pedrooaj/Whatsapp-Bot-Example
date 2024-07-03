const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('Usuario Autenticado');

});

client.on('message', async (message) => {
    const contact = message.getContact()
    const nameContact = (await contact).pushname || 'Cliente'

    const mensagem = await message.body.toLowerCase();

    if(mensagem == "ola" || mensagem == "olá" || mensagem == "oi"){
        message.reply(`Olá ${nameContact}, Seja Bem Vindo a nossa Loja Oque Deseja? \n\n 1️⃣ Para Cardapio \n 2️⃣ Para entrar em contato com Atendente \n 3️⃣ Para Mais Informações`)
    }
    else if(mensagem == "1"){
        message.reply(`Bem Este e nosso Cardapio: \n`)
    }
    else{
        message.reply(`Ops não entendi muito bem oque você falou...`)
    }


})


client.on('ready', async () => {
    const version = await client.getWWebVersion();
    console.log(`Versão do Whatsapp Web ${version}`);
});

client.initialize();