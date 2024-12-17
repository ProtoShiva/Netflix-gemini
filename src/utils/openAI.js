import OpenAI from "openai"
import { OPENAI_KEY } from "./constants"

export const client = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
})
