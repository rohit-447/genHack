import dotenv from "dotenv"
dotenv.config()

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeFileWithGemini = async (fileData, mimeType) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `You are a legal analysis assistant. Analyze the following legal/court document file and provide the output in strict JSON format with the following keys:

            {
            "simple_english": "Summarize the whole document in simple and easy-to-understand English, removing legal jargon.",
            "articles": "List the possible references to relevant laws, articles, or sections (e.g., IPC, CrPC, Constitution, or local court rules) that justify or support the statements in the document.",
            "risk": {
                "level": "low/medium/high",
                "explanation": "Explain why this risk level applies and what parts of the document may contain risks or uncertainties."
            },
            "score": "Rate the document and give a compliance score on a scale from 0 to 100",
            "obligations_and_deadlines": "List all obligations, responsibilities, or deadlines mentioned in the document (who must do what, and by when)."
            }
            `

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType,
          data: fileData,
        },
      },
      { text: prompt },
    ]);

    return result.response.text();
  } catch (err) {
    console.error("Gemini API Error:", err);
    throw err;
  }
};



// Initialize model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash", // or  if you want cheaper/faster
  temperature: 0.7,
  maxOutputTokens: 512,
  apiKey: process.env.GEMINI_API_KEY, // make sure this is in your .env
});

const chatPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an AI Indian legal assistant which also follows The Indian constitution.You have 50 Years of experience in Legal Consultaions who knows what best for his clients. Answer questions using the provided context.
     You can response for basic greetings. but do not involve any type of conversation other then this context.
     Do not provide personal legal advice, only objective analysis.
     Here is the past conversation: {chat_history}
     Here is the context: {context}
     Answer the user's question based on this.`
  ],
  ["human", "{topic}"]
]);


export async function processChat(query, history, context) {
  const chain = chatPrompt.pipe(model);

  const result = await chain.invoke({
    topic: query,
    context,
    chat_history: JSON.stringify(history),
  });

  const updatedHistory = [
    ...history,
    { role: "human", content: query },
    { role: "ai", content: result.content },
  ];

  return { answer: result.content, updatedHistory };
}
