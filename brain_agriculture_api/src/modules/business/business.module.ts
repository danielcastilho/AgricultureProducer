import { Module } from "@nestjs/common";
import { RepositoryModule } from "../repository/repository.module";
import { RuralProducerService } from "./rural-producer/rural-producer.service";
import { AgriculturalCultureRepository } from "../repository/AgriculturalCultureRepository";
import { CityRepository } from "../repository/cityRepository";
import { RuralProducerRepository } from "../repository/ruralProducerRepository";

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [
    RuralProducerService,
    AgriculturalCultureRepository,
    CityRepository,
    RuralProducerRepository
  ],
  exports: [RuralProducerService]
})
export class BusinessModule {}
