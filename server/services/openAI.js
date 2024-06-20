'use strict'
const OpenAI = require("openai")
const openai = new OpenAI({
    apiKey: 'sk-proj-8I3MxkJPDt5YLWdCYuZCT3BlbkFJWO7K0zYq3DlOIfUcL2j3'
})

module.exports = {
    AutoReply: async (message) => {
        let prompt = ''

        const chatCompletion = await openai.chat.completions.create({
            model: "ft:gpt-3.5-turbo-1106:personal::9ZASmzso",
            messages: [{ "role": "user", "content": `${prompt}` }],
        });

        const gptResponse = chatCompletion.choices[0].message
        if (typeof (gptResponse.content) !== 'string') {
            return 'Mohon tunggu,..'
        }
    }
}