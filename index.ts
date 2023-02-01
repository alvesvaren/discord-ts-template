// Require the necessary discord.js classes
import {
  Client,
  CommandInteraction,
  Events,
  GatewayIntentBits,
} from 'discord.js';
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from './types';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands: Record<string, Command> = {};

// Find all command files
const filePath = fileURLToPath(import.meta.url);
const commandsPath = path.join(path.dirname(filePath), 'commands');
const commandFiles = await fs.readdir(commandsPath);

// Dynamically import all command files and add them to commands
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command: Command = await import(filePath);
  commands[command.command.name] = command;
}

// This runs whenever a slash command for this bot is ran
const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction,
) => {
  const slashCommand = commands[interaction.commandName];
  if (!slashCommand) {
    interaction.followUp({ content: 'Command not found' });
    return;
  }

  // Defer reply so that it shows up as "thinking" in discord
  await interaction.deferReply();
  try {
    // Run the command from the command file
    await slashCommand.run(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.editReply('An error has occurred');
  }
};

client.once(Events.ClientReady, async c => {
  // Create the commands in discord and make sure they are up to date
  await c.application.commands.set(Object.values(commands).map(c => c.command));
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  // Only handle slash commands by default
  if (!(interaction.isCommand() || interaction.isContextMenuCommand())) return;
  console.log(
    `Command: ${interaction.commandName} (${interaction.user.tag})
    - args: {${interaction.options.data
      .map(o => `${o.name}: ${JSON.stringify(o.value)}`)
      .join(', ')}}`,
  );

  await handleSlashCommand(client, interaction);
});

client.login(process.env.TOKEN);
