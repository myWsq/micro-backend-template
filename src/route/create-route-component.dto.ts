import { IsString, IsUrl } from "class-validator";
export class CreateRouteComponentDto {
  @IsString()
  path: string;
  @IsUrl()
  url: string;
}
