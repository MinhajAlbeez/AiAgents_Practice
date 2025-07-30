const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function textSummarize(text) {
  const model = await genAi.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `Summarize the following text:\n\n${text}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const summary = await response.text();
  return summary;
}
const inputText = `Artificial intelligence is rapidly transforming industries across the globe. From personalized recommendations in e-commerce to automated diagnostics in healthcare, the integration of machine learning and AI technologies is reshaping the way we live and work. Companies are investing billions to develop smarter systems that can predict consumer behavior, optimize logistics, and even write code. However, with this growing reliance on AI comes the need for robust ethical guidelines, transparency, and accountability to prevent misuse. As we enter this new era, the balance between innovation and responsibility will define the success of AI in society.`;

textSummarize(inputText)
  .then((summary) => {
    console.log("Summary:", summary);
  })
  .catch((error) => {
    console.error("Error summarizing text:", error);
  });
