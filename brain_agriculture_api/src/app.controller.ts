import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete
} from "@nestjs/common";
import { RuralProducerService } from "./modules/business/rural-producer/rural-producer.service";
import { RuralProducerModel } from "./modules/model/ruralProducerModel";
import { RuralProducerInputVM } from "./modules/model/viewModel/ruralProducerInputVM";

@Controller()
export class AppController {
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @Get(":id")
  async get(@Param("id") id: string): Promise<RuralProducerModel> {
    return await this.ruralProducerService.get(id);
  }
  @Post("create")
  async create(
    @Body() ruralProducerInput: RuralProducerInputVM
  ): Promise<RuralProducerModel> {
    return await this.ruralProducerService.create(ruralProducerInput);
  }

  @Put("update")
  async update(
    @Body() ruralProducerInput: RuralProducerInputVM
  ): Promise<boolean> {
    return await this.ruralProducerService.update(ruralProducerInput);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string): Promise<boolean> {
    return await this.ruralProducerService.delete(id);
  }
}
