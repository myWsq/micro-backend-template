import { Controller, Post, Body, Get } from "@nestjs/common";
import { CreateComponentDto } from "./create-component.dto";
import { ComponentService } from "./component.service";
import { ValidationException } from "../../exception/validation.exception";

@Controller("component")
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}
  @Get()
  async getComponents() {
    return this.componentService.getComponents();
  }
  @Post()
  async createComponent(@Body() createComponentDto: CreateComponentDto) {
    if (
      await this.componentService.getComponentByPath(createComponentDto.path)
    ) {
      throw new ValidationException([
        {
          field: "path",
          code: "alreadyExists",
        },
      ]);
    }
    return this.componentService.createComponent(createComponentDto);
  }
}
