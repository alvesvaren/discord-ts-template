import { SlashCommandBuilder } from 'discord.js';
import { CommandRun } from '../types';

// To be able to easily rename the options, we can use an enum
enum Options {
  Input = 'input',
  Uppercase = 'uppercase',
}

export const command = new SlashCommandBuilder()
  .setName('echo')
  .setDescription('A command that echoes back your input')
  .addStringOption(option => {
    return option
      .setName(Options.Input)
      .setDescription('The input to echo back')
      .setRequired(true);
  })
  .addBooleanOption(option => {
    return option
      .setName(Options.Uppercase)
      .setDescription('Convert the input to uppercase');
  });

export const run: CommandRun = async (client, interaction) => {
  // Cast the value to a string, as it is a string option
  const { value: input } = interaction.options.get(Options.Input, true) as {
    value: string;
  };
  const { value: uppercase = false } = (interaction.options.get(
    Options.Uppercase,
  ) || {}) as { value?: boolean };

  // Run command logic here
  const messageReply = uppercase ? input.toUpperCase() : input;

  // Use editReply as we already have deferred the reply, and we want to update it
  await interaction.editReply(messageReply);
};
