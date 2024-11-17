import axios from 'axios';

async function getToken(): Promise<string> {
    const response = await axios.post(
        "https://iam.api.cloud.yandex.net/iam/v1/tokens",
        {"yandexPassportOauthToken":process.env["YANDEX_OAUTH"]}
    )
    return response.data["iamToken"]
}

export async function getChecklist(goal: string, skills: string): Promise<string> {
    let data = {
        "modelUri": `gpt://${process.env["YANDEX_FOLDER"]}/yandexgpt-lite`,
        "completionOptions": {
          "stream": false,
          "temperature": 0.3,
          "maxTokens": "3000"
        },
        "messages": [
          {
            "role": "system",
            "text": "Ты помощник, который помогает составить чек лист для достижения целей в программировании, пиши только чек лист и ничего более в формате \
            1. Задача \n +*Подзадача* \n +*Подзадача* \n 2. Задача \n +*Подзадача* \n +*Подзадача*"
          },
          {
            "role": "user",
            "text": `Напиши чек лист для : "${goal}" \n Учитывая, что я уже знаю: "${skills}" и если я это уже знаю, то дай чек лист для повышения квалификации`
          }
        ]
      }
    const token = await getToken()

    let response = await axios.post(
        "https://llm.api.cloud.yandex.net/foundationModels/v1/completion",
        data,
        {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }
    )
    
    return response.data.result.alternatives[0].message.text.replace(/\*/g, "")
}