const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "you: ",
});

console.log("🤖 Gemini AI is ready! Type something (or 'exit' to quit):");
rl.prompt();

rl.on("line", async (line) => {
  if (line.toLowerCase() === "exit") {
    rl.close();
    return;
  }

  console.log("📥 Received input:", line);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  try {
    const prompt = `Summarize the following text:\n\n${line}`;

    const result = await model.generateContentStream(prompt);

    process.stdout.write("\nGemini: "); 

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      process.stdout.write(chunkText);
    }

    console.log("\n");

  } catch (error) {
    console.error("⚠️ Error:", error.message);
  }
  rl.prompt();
});
rl.on("close", () => {
  console.log("👋 Peace out!");
  process.exit(0);
});