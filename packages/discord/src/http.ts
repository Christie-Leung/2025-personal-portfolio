import express, { Request, Response } from "express";
import { Client, ChannelType, TextChannel, ThreadAutoArchiveDuration } from "discord.js";
import { getChannelForGuild, pickAnyTextChannel } from "./store/channelStore";

export function buildHttp(client: Client, opts: { backendWebhook: string }) {
  const app = express();
  app.use(express.json());

  // Create a new thread for a chat
  app.post("/threads", async (req: Request<{}, {}, { chatId: string; name?: string }>, res: Response) => {
    const { chatId, name } = req.body as { chatId: string; name?: string };

    // Resolve a parent TextChannel: prefer configured ones; otherwise pick any reasonable default.
    let parent: TextChannel | null = null;

    // Try to use any guild where a channel was configured
    for (const guild of client.guilds.cache.values()) {
      const cid = getChannelForGuild(guild.id);
      if (cid) {
        const ch = await client.channels.fetch(cid).catch(() => null);
        if (ch && ch.type === ChannelType.GuildText) { parent = ch as TextChannel; break; }
      }
    }

    if (!parent) parent = await pickAnyTextChannel(client);
    if (!parent) return res.status(400).json({ error: "No suitable text channel found. Use /setchannel in a guild." });

    const thread = await parent.threads.create({
      name: name || `chat-${chatId}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
      reason: `Chat ${chatId}`
    });

    await thread.send(`New web chat started: ${chatId}`);

    return res.status(201).json({ threadId: thread.id, name: thread.name });
  });

  // Post a message into an existing thread
  app.post("/threads/:threadId/messages", async (req: Request<{ threadId: string }, {}, { content: string }>, res: Response) => {
    console.log("received thread");
    const { threadId } = req.params;
    const { content } = req.body as { content: string };
    const thread = await client.channels.fetch(threadId).catch(() => null);
    if (!thread || (thread.type !== ChannelType.PublicThread && thread.type !== ChannelType.PrivateThread)) {
      return res.status(404).json({ error: "Thread not found" });
    }
    // @ts-ignore - both public/private threads have send
    const message = await (thread as any).send(content);
    return res.status(201).json({ messageId: message.id });
  });

  // Health
  app.get("/health", (_req: any, res: { json: (arg0: { ok: boolean; }) => any; }) => res.json({ ok: true }));

  return app;
}