import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// const genAI = new GoogleGenerativeAI("plain api key");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function summarizeText(text) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

        const prompt = `You are a legal analysis assistant. Analyze the following legal/court document and provide the output in strict JSON format with the following keys:

            {
            "simple_english": "Summarize the whole document in simple and easy-to-understand English, removing legal jargon.",
            "articles": "List the possible references to relevant laws, articles, or sections (e.g., IPC, CrPC, Constitution, or local court rules) that justify or support the statements in the document.",
            "risk": {
                "level": "low/medium/high",
                "explanation": "Explain why this risk level applies and what parts of the document may contain risks or uncertainties."
            },
            "obligations_and_deadlines": "List all obligations, responsibilities, or deadlines mentioned in the document (who must do what, and by when)."
            }

            Document Text: ${text}`;

        const result = await model.generateContent(prompt);

        return result.response.text();
    } catch (err) {
        console.error("Gemini API Error:", err);
        throw err;
    }
}


const inputText = `
    OFFICE OF THE CHIEF JUDICIAL MAGISTRATE
    MODIFICATION DUTY ROSTER FOR THE MONTH OF AUGUST-2025

    MODIFICATION

    In view of the request received from the Court of Sh. Sahil Monga, Ld JMFC NI Act-06, PHC, NDD, New Delhi and in partial modification of Duty Roster for the month of August-2025, it is directed that Ms. Vanshika Mehta, Ld JMFC NI Act-04, PHC, NDD shall work as Duty JMFC on 29.08.2025, in place of Sh. Sahil Monga, Ld JMFC Act-06, PHC, NDD, New Delhi and Sh. Sahil Monga, Ld JMFC NI Act-04, PHC, NDD, New Delhi shall work as Duty JMFC on 30.08.2025 in place of Ms. Vanshika Mehta, Ld JMFC NI Act-04, PHC, NDD, New Delhi.

    Rest of the conditions shall remain unchanged.

    (Shriya Agrawal)
    Chief Judicial Magistrate
    Patiala House Courts, New Delhi.

    No. 3032-3052 /2025/CJM/PHC/New Delhi.    Dated 28.08.2025

    Copy forwarded for information and necessary action :-

    1. The Ld. Registrar General, Hon'ble High Court of Delhi, New Delhi.
    (Through Ld. District & Sessions Judge, Patiala House Court, New Delhi).
    2. P.S. to Ld. Principal District & Sessions Judge, Patiala House Court, New Delhi.
    3. All the other Ld. Principal District & Sessions Judges, Delhi & New Delhi.
    4. All the Ld. Chief Judicial Magistrates, Delhi & New Delhi.
    5. All the Ld. ACJMs/JMFCs, Patiala House Courts, New Delhi District.
    6. The Chief Prosecutor, New Delhi District.
    7. The D.C.P., Delhi & New Delhi District.
    8. The Incharge, District Courts Web-Site Committee, Tis Hazari Courts, Delhi.
    9. The Incharge, Computer Room, Patiala House Courts, New Delhi.
    10. The Controlling Officer, Pool-Car, New Delhi.
    11. The Care Taker, New Delhi District with the direction to affix the copies of the same at all the notice boards at Patiala House Courts Complex.
    12. The Incharge, Lock-Up, New Delhi.
    13. The Incharge Cash Branch, New Delhi- District, Patiala House Courts.
    14. The Secretary, N.D.B.A.
    15. Office File.

    Chief Judicial Magistrate
    Patiala House Courts, New Delhi.

`;

const summary = await summarizeText(inputText);
console.log("Summary:", summary);