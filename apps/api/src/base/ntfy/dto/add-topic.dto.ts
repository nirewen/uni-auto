import { IsString } from "class-validator";

export class AddTopicDTO {
    @IsString()
    topic: string
}