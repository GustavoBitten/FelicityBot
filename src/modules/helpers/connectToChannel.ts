import { joinVoiceChannel } from '@discordjs/voice';
import { StageChannel, VoiceChannel } from 'discord.js';

export const connectToChannel = (channel: VoiceChannel | StageChannel) =>
  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    // @ts-ignore
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
