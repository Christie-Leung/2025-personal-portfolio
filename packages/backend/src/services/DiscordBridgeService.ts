import { ChatId } from "@2025-personal-portfolio/common/dist/ids";
import { Service } from "@tsed/di";
import fetch from "node-fetch";

interface CreateThreadRes { threadId: string; name: string; }

@Service()
export class DiscordBridgeService {
  private baseUrl = process.env.DISCORD_BRIDGE_URL || "http://localhost:4001";

  async createThread(chatId: ChatId): Promise<CreateThreadRes> {
    const resp = await fetch(`${this.baseUrl}/threads`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chatId, name: `chat-${chatId}` })
    });
    if (!resp.ok) throw new Error(`Discord bridge error ${resp.status}`);
    return resp.json() as Promise<CreateThreadRes>;
  }

  async postMessage(threadId: string, content: string) {
    console.log("posted");
    const resp = await fetch(`${this.baseUrl}/threads/${threadId}/messages`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content })
    });
    if (!resp.ok) throw new Error(`Discord bridge error ${resp.status}`);
    return resp.json();
  }
}