import { IExecuteParameters, IPermissions } from '../interfaces/customInterfaces';
import Logger from '../logger/Logger';

export const permissionsHandler =
  (commandFunction: Function, userPermissions: IPermissions, botPermissions: IPermissions) =>
  async ({ client, message, args }: IExecuteParameters) => {
    Logger.log('DEBUG', `${message.guildId}:Checking permissions.`, new Error());

    const botMember = message.guild?.members.cache.get(client.user?.id as string);

    const botHaveUniquePermission = botPermissions.atLeastOne.find((perm) =>
      botMember?.permissions.has(perm)
    );

    if (!botHaveUniquePermission && botPermissions.atLeastOne[0]) {
      return message.reply(
        `Eu não tenho pelo menos uma dessas permissões! ${botPermissions.atLeastOne}`
      );
    }

    const botMissingPermissions = botPermissions.mustHave.filter(
      (perm) => !botMember?.permissions.has(perm)
    );

    if (botMissingPermissions[0]) {
      return message.reply(
        `Eu não tenho as seguintes permissões necessárias para executar esse comando: ${botMissingPermissions}`
      );
    }

    const authorMember = message.member;

    const userHaveUniquePermission = userPermissions.atLeastOne.find((perm) =>
      authorMember?.permissions.has(perm)
    );

    if (!userHaveUniquePermission && userPermissions.atLeastOne[0]) {
      return message.reply(
        `Você não tem pelo menos uma dessas permissões! ${userPermissions.atLeastOne}`
      );
    }

    const userMissingPermissions = botPermissions.mustHave.filter(
      (perm) => !authorMember?.permissions.has(perm)
    );

    if (userMissingPermissions[0]) {
      return message.reply(
        `Você não tem as seguintes permissões necessárias para executar esse comando: ${userMissingPermissions}`
      );
    }

    Logger.log('DEBUG', `${message.guildId}:User and Bot has necessary permissions.`, new Error());

    return commandFunction({ client, message, args });
  };
