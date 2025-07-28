

const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");

dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.on("line", async (input) => {
  const model = await genAi.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  try {
    const result = await model.generateContentStream([input]);
    for await (const chunk of result.stream) {
      process.stdout.write(chunk.text());
    }
    console.log(); 
  } catch (error) {
    console.error("❌ Error:", error.message || error);
  }

  userInterface.prompt(); 
});

console.log("🤖 Gemini AI is ready! Type something (or 'exit' to quit):");
userInterface.prompt();
