# Discord bot template

Template repo: https://github.com/alvesvaren/discord-ts-template

This is a simple template to create discord bots with typescript and slash
commands using discord.js. Mostly based on the official docs, but has some extra features and
structure out of the box

## To use:

1. Create a bot on https://discord.com/developers
1. Create repo based on template, clone it and install packages with `yarn` (to
   use another package manager, remove `yarn.lock` and update the scripts
   section of `package.json` )
1. Copy `.env.example` to `.env` and populate it with your bot token
1. Run the bot using `yarn start`

## To deploy:

You can deploy this however you want, but I've added a nixpacks config to make
it easy to use [railway.app](https://railway.app?referralCode=HvmU0L) (referral
link), or easily deploy it manually as a container using [nixpacks](https://nixpacks.com/docs/getting-started).

## File structure:

### Main files

- index.ts - code to run the bot
- .env - contains environment variables that will be loaded when starting
- .env.example - template for .env
- types.ts - the types used for commands
- commands/ - where you put slash-commands for the bot
  - echo.ts - the command echo, can be copied and changed as needed
