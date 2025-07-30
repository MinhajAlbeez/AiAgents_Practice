const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");

dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "you:",
});

r1.on("line", async (line) => {
    if (line.toLowerCase() === "exit") {
      r1.close();
      return;
    }
  
    const model = await genAi.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  
    const prompt = `Summarize the following text:\n\n${line}`;
  
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const summary = await response.text();
  
      console.log(`\nGemini: ${summary}\n`);
    } catch (err) {
      console.error("⚠️ Oops! Something went wrong:", err.message);
    }
  
    r1.prompt();
  });
  

