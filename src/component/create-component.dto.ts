import { IsString, IsUrl, IsOptional } from "class-validator";
export class CreateComponentDto {
  @IsString()
  path: string;
  @IsUrl()
  js: string;
  @IsOptional()
  @IsUrl()
  css: string;
}
