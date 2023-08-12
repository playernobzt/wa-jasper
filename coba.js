const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});
 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// Pangge OpenAI GPT code
const { Configuration, OpenAIApi } = require("openai")

const config = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(config);
//----------------------------------------
async function chatGPT(prompt) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2048,
      temperature: 1,
    });
    return response.data.choices[0].message.content;
  }
  
//---------------------------------------------------------
//             Dibawah ini Variabel Unik 


// fungsi chat dimulai
client.on('message', async message => {
    
   if (message.type === 'chat' && !message.id.fromMe) {
    try {
        // dapatkan nomor hape
        const senderNumber = message.from;
        let incomingMessages = message.body;
        incomingMessages = incomingMessages.toLowerCase();
        const reaction = '👌'; // Anda bisa mengganti ini dengan emoji reaksi yang diinginkan

        // dapatkan info dari grup atau bukan
        // pesan menyebut bot atau tidak
        const isMessagesFromGroup = senderNumber.includes('@g.us');
        const isMessageMentionBot = incomingMessages.includes('@6289653704834')

        // tampilkan di console
        console.log(message)
        console.log('Pengirim: ', senderNumber);
        console.log('isi Pesan: ', incomingMessages);

        // tampilkan menyebut bot dan dari grup true atau false
        console.log('Apakah pesan dari Grup ? : ', isMessagesFromGroup);
        console.log('Apakah pesan mention bot ? : ', isMessageMentionBot);


        //------------------------------------------------------------


        // Jika pesan japri *****
        if(!isMessagesFromGroup){

            if(incomingMessages.includes('.hyjasper')){
                message.react(reaction);
                setTimeout(function() {
                    message.reply('Hay \n\nperkenalkan saya adalah Asisten virtual yang diciptakan oleh seseorang yang gabut tidak memiliki goals dalam hidup dan saya malas dengan beliau, saya jijik menyebutkan namanya, silahkan anda cari aja dia di instagram @turisbelanda\n\nada yang bisa saya bantu ?');
                }, 2000);
            }// jika ada yang mengirim pesan 
            else if(incomingMessages !== "JASPER" && !incomingMessages.includes('.hyjasper')){
                message.react(reaction)

                async function runPrompt() {
                    const result = await chatGPT(incomingMessages);
                    message.reply(`${result}\n\n\nJangan lupa follow IG:@turisbelanda`)
                } 
                  runPrompt()
            };

        }


        //-----------------------------------------------------
        
        // Jika pesan Grup *****
        if(isMessagesFromGroup && isMessageMentionBot){

            if(incomingMessages.includes('.hyjasper')){
                message.react(reaction);
                setTimeout(function() {
                    message.reply('Hay \n\nperkenalkan saya adalah Asisten virtual yang diciptakan oleh seseorang yang gabut tidak memiliki goals dalam hidup dan saya malas dengan beliau, saya jijik menyebutkan namanya, silahkan anda cari aja dia di instagram @turisbelanda\n\nada yang bisa saya bantu ?');
                }, 2000);
            }// jika ada yang mengirim pesan 
            else if(incomingMessages !== "JASPER" && !incomingMessages.includes('.hyjasper')){
                message.react(reaction)

                async function runPrompt() {
                    const result = await chatGPT(incomingMessages)
                    message.reply(`${result}\n\n\nJangan lupa follow IG:@turisbelanda`);
    
                } 
                  runPrompt()
            };

        }

        //-----------------------------------------------------
        

        

       


    }catch(error){console.log(error)}



   }
    
});
 

client.initialize();
 