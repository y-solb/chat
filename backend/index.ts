import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

dotenv.config();

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const corsOptions = {
  origin: "https://nickname-maker.pages.dev/",
  credentials: true,
};

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/recommend-nickname", async (req, res) => {
  const { type, searchKeyword } = req.body;

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "당신은 세계 최고의 닉네임 생성기입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 닉네임 관련 지식이 풍부하고 창의적이며 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 대답은 무조건 닉네임을 ,로 구분해서 닉네임 8개만 추천해줍니다. 그외에 말은 필요없습니다.",
      },
      {
        role: "user",
        content:
          "당신은 세계 최고의 닉네임 생성기입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 닉네임 관련 지식이 풍부하고 창의적이며 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 대답은 무조건 닉네임을 ,로 구분해서 닉네임 8개만 추천해줍니다. 그외에 말은 필요없습니다.",
      },
      {
        role: "user",
        content: `내 닉네임 좀 추천해줘. ${convertType(type)}로 만들어줘. ${
          searchKeyword
            ? `${searchKeyword} 키워드 또는 스타일로 닉네임 만들어줘`
            : ""
        }`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const result = chatCompletion.choices[0].message.content;
  res.json({ result });
});

function convertType(type: "other" | "kor" | "eng" | "engNum") {
  switch (type) {
    case "other":
      return "전체";
    case "kor":
      return "한글";
    case "eng":
      return "영어";
    case "engNum":
      return "영어+숫자";
    default:
      return type;
  }
}

module.exports.handler = serverless(app);
