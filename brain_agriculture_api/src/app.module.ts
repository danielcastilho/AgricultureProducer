import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BusinessModule } from "./modules/business/business.module";
import { ModelModule } from "./modules/model/model.module";

@Module({
  imports: [ModelModule, BusinessModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
