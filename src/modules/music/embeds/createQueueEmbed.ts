import { Message, MessageEmbed } from 'discord.js';
import { QueueItem } from '../interfaces/QueueItem';
import { addTime } from './helpers/addTime';
import { formatTime } from './helpers/formatTime';

export const createQueueEmbed = (
  message: Message,
  currentlyPlaying: QueueItem,
  queue: QueueItem[],
  page: number
) => {
  const { guild } = message;
  const subArray = queue.slice(page, page + 10);
  const parsedSubArray = subArray
    .map(
      (song, index) =>
        `${index + 1 + page}: ${song.title} [${formatTime(
          addTime(song, { hour: 0, minute: 0, second: 0 })
        )}]\n`
    )
    .join('');
  return new MessageEmbed()
    .setTitle(currentlyPlaying.title)
    .setURL(currentlyPlaying.url)
    .setAuthor(
      `Tocando agora em: ${guild?.name}` || '',
      guild?.iconURL() || undefined
    )
    .setDescription(`${parsedSubArray}`)
    .setTimestamp()
    .setFooter(guild?.name || '', guild?.iconURL() || undefined);
};
