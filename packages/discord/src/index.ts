import { ChannelType, Client, Events, GatewayIntentBits, PermissionsBitField, TextChannel } from "discord.js";
import dotenv from "dotenv";
import { buildHttp } from "./http";
import fetch from "node-fetch";
import { setChannelForGuild } from "./store/channelStore";

dotenv.config();

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const BACKEND_WEBHOOK = process.env.BACKEND_WEBHOOK_URL || "http://localhost:3000/api/chats/discord/events";
const HTTP_PORT = Number(process.env.PORT || 4001);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, async c => {
  console.log(`Discord bot logged in as ${c.user.tag}`);
  // Register the /setchannel command for all guilds the bot is in
  for (const guild of client.guilds.cache.values()) {
    try {
      await guild.commands.set([
        {
          name: "setchannel",
          description: "Set the channel used to create web chat threads (defaults to current channel if omitted)",
          default_member_permissions: String(PermissionsBitField.Flags.ManageGuild),
          dm_permission: false,
          options: [
            {
              name: "channel",
              description: "Channel where new web chat threads will be created",
              type: 7, // ApplicationCommandOptionType.Channel
              required: false
            }
          ]
        }
      ]);
    } catch (e) {
      console.warn(`Failed to register commands in guild ${guild.id}:`, e);
    }
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "setchannel") return;

  // Permission gate: Manage Guild
  const member = await interaction.guild?.members.fetch(interaction.user.id);
  if (!member?.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return interaction.reply({ content: "You need Manage Server permission to use this.", ephemeral: true });
  }

  const chosen = interaction.options.getChannel("channel");
  const channel = (chosen ?? interaction.channel);
  if (!channel || channel.type !== ChannelType.GuildText) {
    return interaction.reply({ content: "Please pick a text channel (or run in a text channel).", ephemeral: true });
  }

  // cast to TextChannel so we can access .guild
  const guildTextChannel = channel as TextChannel;
  setChannelForGuild(guildTextChannel.guild.id, guildTextChannel.id);
  return interaction.reply({ content: `Okay! I'll create web chat threads in <#${channel.id}> for this server.`, ephemeral: true });
});

client.on(Events.MessageCreate, async msg => {
  // Only forward human replies in threads we created (chat-<uuid>)
  const channel: any = msg.channel;
  if (!channel?.isThread?.() || msg.author.bot) return;
  const threadName = channel.name as string;
  if (!/^chat-/.test(threadName)) return;

  const chatId = threadName.replace(/^chat-/, "");

  const payload = {
    chatId,
    threadId: channel.id,
    messageId: msg.id,
    authorId: msg.author.id,
    authorUsername: msg.author.username,
    content: msg.content,
    createdAt: msg.createdAt.toISOString()
  };

  try {
    await fetch(BACKEND_WEBHOOK, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("Failed to call backend webhook:", err);
  }
});

(async () => {
  await client.login(BOT_TOKEN);
  const app = buildHttp(client, { backendWebhook: BACKEND_WEBHOOK });
  app.listen(HTTP_PORT, () => console.log(`Discord bridge HTTP listening on ${HTTP_PORT}`));
})();