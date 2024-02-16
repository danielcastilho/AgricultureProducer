import { Module } from "@nestjs/common";
import { RuralProducerRepository } from "./ruralProducerRepository";
import { AgriculturalCultureRepository } from "./AgriculturalCultureRepository";
import { CityRepository } from "./cityRepository";
import { ModelModule } from "../model/model.module";
import { RepositoryBaseService } from "./repositorybase.service";

@Module({
  imports: [ModelModule],
  controllers: [],
  providers: [
    RuralProducerRepository,
    AgriculturalCultureRepository,
    CityRepository
  ],
  exports: [
    RepositoryBaseService,
    RuralProducerRepository,
    AgriculturalCultureRepository,
    CityRepository
  ]
})
export class RepositoryModule {}
