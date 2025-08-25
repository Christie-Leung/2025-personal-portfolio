import { ChatId } from "@2025-personal-portfolio/common/dist/ids";
import { Service } from "@tsed/di";
import EventEmitter from "events";
import type { Response } from "express";
import { StreamEvent } from "~/generated/models/StreamEvent";


type SseClient = {
    res: Response;
    lastMessageId: number;
};

@Service()
export class ChatSseService extends EventEmitter{
  private clients: Map<string, SseClient> = new Map();

  public addClient(chatId: ChatId, res: Response) {
    if (this.clients.has(chatId.toString())) {
      console.log(`Closing existing SSE connection for chatId ${chatId} before adding a new one.`);
      const existingClient = this.clients.get(chatId.toString());
      try {
        existingClient?.res.end(); // Or send an error event and end the connection
      } catch (e) {
        // The client might already be gone, so this is a best-effort.
      }
    }

    const client = { res, lastMessageId: 0 };
    this.clients.set(chatId.toString(), client);
  }

  public removeClient(chatId: ChatId, res: Response) {
    const client = this.clients.get(chatId.toString());
    if (client && client.res === res) {
      this.clients.delete(chatId.toString());
      console.log(`Removed SSE client for chatId ${chatId}`);
    }
  }

  public push(chatId: ChatId, event: StreamEvent, isDiscord?: boolean) {
    console.log(`Pushing event to SSE clients for chatId ${chatId}:`, event);
    const client = this.clients.get(chatId.toString());
    let data = `data: ${JSON.stringify(event.data)}\n\n`
    if (isDiscord) {
      data = `event: discord_message\ndata: ${JSON.stringify(event.data)}\n\n`;
      console.log(`Pushing Discord event to SSE clients for chatId ${chatId}:`, event);
    }
    console.log(this.clients, client);
    if (client) {
      try {
        client.res.write(data);
      } catch (error) {
        console.error(`Error writing to SSE stream for chatId ${chatId}:`, error);
        // Consider removing this client if writing fails
        this.removeClient(chatId, client.res);
      }
    }
  }

  public hasClients(chatId: ChatId): boolean {
    return this.clients.has(chatId.toString());
  }
}
