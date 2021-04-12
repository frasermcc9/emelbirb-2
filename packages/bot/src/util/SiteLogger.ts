import { FullLogEntry, Logger } from "@frasermcc/overcord";
import GraphClient from "../apollo";
import { MUTATE_CREATE_LOG } from "../graphql/functions/Server";
import { CreateLog, CreateLogVariables } from "../graphql/typings/CreateLog";

export default class LoggingMixin implements Logger {
  async log(logEntry: Partial<FullLogEntry>): Promise<void> {
    if (!logEntry.guild?.id) return;

    await GraphClient.mutate<CreateLog, CreateLogVariables>({
      mutation: MUTATE_CREATE_LOG,
      variables: {
        ...logEntry,
        guild: logEntry.guild.id,
        affectedUsers: logEntry.affectedUsers?.map((u) => u.id),
        invokingUser: logEntry.invokingUser?.id,
        message: logEntry.message?.id,
      },
    });
  }
}
