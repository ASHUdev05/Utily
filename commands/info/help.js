const { SlashCommandBuilder } = require('@discordjs/builders');
const { Embed } = require('discord.js');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);


module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Stop it! Get some help... Usage: /help <options>")
    .addSubcommand((subcommand) =>
      subcommand.setName("help").setDescription("Stop it! Get some help...")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("eco")
        .setDescription("Help for category economy")
        .addStringOption((option) =>
          option
            .setName("categoryeco")
            .setDescription("The gif category")
            .setRequired(false)
            .addChoice("bal", "bal")
            .addChoice("beg", "beg")
            .addChoice("buy", "buy")
            .addChoice("daily", "daily")
            .addChoice("inventory", "inventory")
            .addChoice("leaderboard", "leaderboard")
            .addChoice("monthly", "monthly")
            .addChoice("search", "search")
            .addChoice("shop", "shop")
            .addChoice("weekly", "weekly")
            .addChoice("work", "work")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("fun")
        .setDescription("Help for category fun")
        .addStringOption((option) =>
          option
            .setName("categoryfun")
            .setDescription("The gif category")
            .setRequired(false)
            .addChoice("count", "count")
            .addChoice("meme", "meme")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("info")
        .setDescription("Help for category info")
        .addStringOption((option) =>
          option
            .setName("categoryinfo")
            .setDescription("The gif category")
            .setRequired(false)
            .addChoice("help", "help")
            .addChoice("ping", "ping")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("mod")
        .setDescription("Help for category mod")
        .addStringOption((option) =>
          option
            .setName("categorymod")
            .setDescription("The gif category")
            .setRequired(false)
            .addChoice(`ban`, `ban`)
            .addChoice(`kick`, `kick`)
            .addChoice(`mute`, `mute`)
            .addChoice(`permmute`, `permmute`)
            .addChoice(`unban`, `unban`)
            .addChoice(`unmute`, `unmute`)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("util")
        .setDescription("Help for category util")
        .addStringOption((option) =>
          option
            .setName("categoryutil")
            .setDescription("The gif category")
            .setRequired(false)
            .addChoice(`purge`, `purge`)
            .addChoice(`setup`, `setup`)
        )
    ),
  async execute(interaction) {
    const search =
      interaction.options.getString("categoryeco") ||
      interaction.options.getString("categoryfun") ||
      interaction.options.getString("categoryinfo") ||
      interaction.options.getString("categorymod");
    if (search) {
      const item = interaction.client.commands.get(search);
      if (item) {
        const embed = new Embed()
          .setTitle(`Help for ${item.data.name}`)
          .setDescription(item.data.description);
        return interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        return interaction.reply({
          content: "No help found for this category.",
          ephemeral: true,
        });
      }
    }
    const exampleEmbed = new Embed()
      .setColor(0x0099ff)
      .setTitle("UTILY's Help Menu")
      .setAuthor({
        name: "v0.0.0 beta [pre-release]",
        iconURL:
          "https://cdn.discordapp.com/avatars/877804982689234994/6054386e76c804285a5c1e270890f10e.webp?size=80",
        url: "https://www.instagram.com/__legend05__",
      })
      .setDescription("A list of commands and their descriptions.")
      .addFields(
        { name: "Categories:", value: "eco | fun | info | mod" },
        { name: "\u200B", value: "\u200B" },
        { name: "eco", value: "`bal | beg | buy | daily | inventory | leaderboard | monthly | search | shop | weekly | work`", inline: false },
        { name: "fun", value: "`count | meme`", inline: true },
        { name: "info", value: "`help | ping`", inline: true },
        { name: "mod", value: "`ban | kick | mute | permmute | unban | unmute`", inline: true },
        { name: "util", value: "`clear`", inline: false },
        { name: "Example:", value:"`/helpfun categoryfun count`"}
      )
      .setThumbnail(interaction.client.user.displayAvatarURL({ format: "png" }))
      .setTimestamp()
      .setFooter({
        text: `REQUESTED BY ${interaction.member.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ format: "png" }),
      });

    return interaction.reply({ embeds: [exampleEmbed] });
  },
};