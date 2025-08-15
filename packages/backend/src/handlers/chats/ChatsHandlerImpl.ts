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
import { markdownToBlocks } from "~/utils/markdownToBlocks";

@Injectable({
  provide: ChatsHandler
})
export class ChatsHandlerImpl implements ChatsHandler {

  private chatToThread = new Map<ChatId, string>();
  private threadToChat = new Map<string, ChatId>();


  @Inject()
  private bridge: DiscordBridgeService;

  @Inject()
  private sse: ChatSseService;


  async createChat(): Promise<CreateChatResponse> {
    const chatId = new ChatId();
    const { threadId } = await this.bridge.createThread(chatId);
    this.chatToThread.set(chatId, threadId);
    this.threadToChat.set(threadId, chatId);
    return { chatId, threadId } as CreateChatResponse;
  }

  async discordEvents(payload: DiscordEventPayload): Promise<DiscordEvents200Response> {
    let chatId: ChatId | undefined;

    if (payload.chatId) {
      chatId = new ChatId(payload.chatId);
    }
    
    if (!chatId && payload.threadId) {
      chatId = this.threadToChat.get(payload.threadId);
    }
    
    if (!chatId) {
      console.log("ChatId not found for payload:", payload);
      return { ignored: true } as any;
    }

    this.sse.push(chatId, {
      isSystem: true,
      data: markdownToBlocks(payload.content)
    }, true);

    return { ok: true } as any;
  }

  async postMessage(chatId: ChatId, body: PostMessageRequest): Promise<PostMessage200Response> {
    let id = this.chatToThread.get(chatId);
    if (!id) {
      const { threadId } = await this.bridge.createThread(chatId);
      id = threadId;
    }
    await this.bridge.postMessage(id, body.content);
    return { ok: true } as any; // matches PostMessage200Response shape
  }

  async streamChat(ctx: Context, chatId: ChatId): Promise<string> {
    const pres = ctx.response as any;

    const res: any =
    pres.getResponse?.() ?? pres.raw ?? pres.res ?? ctx.response;

    // SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.setHeader("Access-Control-Allow-Origin", process.env.ENVIRONMENT === 'local' ? process.env.FRONTEND_URL : "https://christie.murphyshome.net");
    res.flushHeaders?.();

    res.write(`data: ${JSON.stringify({ message: "Connection established." })}\n\n`);

    this.sse.addClient(chatId, res);

    // keep-alive to prevent proxies from closing idle connections
    const ping = setInterval(() => {
      try { 
        res.write(`: ping ${Date.now()}\n\n`);
      } catch {}
    }, 15000);

    // Resolve only when the client disconnects
    await new Promise<void>(resolve => res.on("close", resolve));

    clearInterval(ping);
    this.sse.removeClient(chatId, res);

    // return a dummy string just to satisfy the generated method signature
    return "";
  }

}