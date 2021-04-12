import { Field, ID, ObjectType } from "type-graphql";
import { GlobalProps } from "../../models/global/global.model";
import { ServerProps } from "../../models/server/server.model";

@ObjectType({ description: "Provides settings for the entire bot" })
export class GlobalType {
    @Field((type) => Date, { nullable: true })
    dateOfEntry?: Date;

    @Field((type) => Date, { nullable: true })
    lastUpdated?: Date;

    @Field((type) => [String], { nullable: true })
    commandGroups?: string[];

    @Field((type) => [String], { nullable: true })
    commandDescriptions?: string[];
}
