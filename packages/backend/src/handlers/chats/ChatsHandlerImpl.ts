import { ChatId } from "@2025-personal-portfolio/common/dist/ids";
import { Inject, Injectable } from "@tsed/di";
import { Context } from "@tsed/platform-params";
import { ChatsHandler } from "~/generated/apis/chats/Chats.handler";
import { CreateChatResponse } from "~/generated/models/CreateChatResponse";
import { DiscordEventPayload } from "~/generated/models/DiscordEventPayload";
import { DiscordEvents200Response } from "~/generated/models/DiscordEvents200Response";
import { PostMessage200Response } from "~/generated/models/PostMessage200Response";
import { PostMessageRequest } from "~/generated/models/PostMessageRequest";
import { ChatSseService } from "~/services/ChatSseService";
import { DiscordBridgeService } from "~/services/DiscordBridgeService";

@Injectable({
  provide: ChatsHandler
})
export class ChatsHandlerImpl implements ChatsHandler {

  private chatToThread = new Map<ChatId, string>();
  private threadToChat = new Map<string, ChatId>();

    private baseUrl = process.env.DISCORD_BRIDGE_URL || "http://localhost:4001";


  @Inject()
  private bridge: DiscordBridgeService;

  @Inject()
  private sse: ChatSseService;

  async createChat(): Promise<CreateChatResponse> {
    console.log("createChat");
    const chatId = new ChatId();
    const { threadId } = await this.bridge.createThread(chatId);
    this.chatToThread.set(chatId, threadId);
    this.threadToChat.set(threadId, chatId);
    return { chatId, threadId } as CreateChatResponse;
  }

  async discordEvents(payload: DiscordEventPayload): Promise<DiscordEvents200Response> {
    console.log("discordEvents", payload);
    const chatId = (payload as any).chatId || this.threadToChat.get((payload as any).threadId);
    if (!chatId) return { ignored: true } as any;
    this.sse.push(chatId, { type: "discord_message", data: payload } as any);
    return { ok: true } as any;
  }

  async postMessage(chatId: ChatId, body: PostMessageRequest): Promise<PostMessage200Response> {
    console.log("postMessage", chatId, body.content);
    const threadId = this.chatToThread.get(chatId);
    if (!threadId) throw new Error("Unknown chatId");
    console.log("posted");
        const resp = await fetch(`${this.baseUrl}/threads/${threadId}/messages`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ content: body.content })
        });
        if (!resp.ok) throw new Error(`Discord bridge error ${resp.status}`);
    return { ok: true } as any; // matches PostMessage200Response shape
  }

  streamChat(ctx: Context, chatId: ChatId): Promise<String> {
    console.log("streamChat", chatId);
    const res = ctx.response; // PlatformResponse
    // SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    (res as any).flushHeaders?.();

    // Register client
    this.sse.addClient(chatId, (res as any).getResponse());
    (res as any).getResponse().write(`data: ${JSON.stringify({ type: "system", data: { message: "connected" } })}\n\n`);

    // When client disconnects
    (res as any).getRequest().on("close", () => {
      this.sse.removeClient(chatId, (res as any).getResponse());
    });

    return Promise.resolve("");
  }
}