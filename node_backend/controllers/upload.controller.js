import { summarizeFileWithGemini, processChat } from "../services/upload.service.js";

export const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const mimeType = req.file.mimetype;
    const fileData = req.file.buffer.toString("base64"); // Convert buffer to base64

    // Summarize with Gemini
    const summary = await summarizeFileWithGemini(fileData, mimeType);

    res.status(200).json({ summary });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Something went wrong while processing the file." });
  }
};



export async function chatController(req, res) {
  try {
    
    const { query, history, context } = req.body;

    if (
        typeof query === "undefined" ||
        typeof history === "undefined" ||
        typeof context === "undefined"
      ) {
        return res.status(400).json({ error: "query, history, and context are required" });
      }


    const response = await processChat(query, history, context);

    res.json(response);
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
