import { RuralProducerInputVM } from "./../../model/viewModel/ruralProducerInputVM";
import { RuralProducerService } from "./rural-producer.service";
import { RuralProducerRepository } from "src/modules/repository/ruralProducerRepository";
import { AgriculturalCultureRepository } from "src/modules/repository/AgriculturalCultureRepository";
import { CityRepository } from "src/modules/repository/cityRepository";
import { RuralProducerModel } from "src/modules/model/ruralProducerModel";
import { Test } from "@nestjs/testing";
import { ModelModule } from "src/modules/model/model.module";
import { RepositoryModule } from "src/modules/repository/repository.module";
import { BusinessModule } from "../business.module";

describe("RuralProducerService", () => {
  let service: RuralProducerService;
  let repo: RuralProducerRepository;
  let agCulturesRepo: AgriculturalCultureRepository;
  let cityRepo: CityRepository;
  beforeEach(async () => {
    jest.resetAllMocks();
    repo = new RuralProducerRepository();
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        RuralProducerService,
        RuralProducerRepository,
        AgriculturalCultureRepository,
        CityRepository
      ],
      imports: [ModelModule, BusinessModule, RepositoryModule]
    }).compile();

    // agCulturesRepo = new AgriculturalCultureRepository();
    // cityRepo = new CityRepository();
    // service = new RuralProducerService(repo, agCulturesRepo, cityRepo);
    agCulturesRepo = moduleRef.get<AgriculturalCultureRepository>(
      AgriculturalCultureRepository
    );
    cityRepo = moduleRef.get<CityRepository>(CityRepository);
    repo = moduleRef.get<RuralProducerRepository>(RuralProducerRepository);
    service = moduleRef.get<RuralProducerService>(RuralProducerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a rural producer", async () => {
    const mockResult: RuralProducerModel = {
      id: "ae6412bf-fb6f-4cd4-a83d-4f5bca6368d1",
      name: "Rural Producer 1",
      cityId: "af33eb71-91f2-4bb6-a9f3-59cebc826365",
      document: "07687982134",
      totalArea: 100,
      agriculturalArea: 50,
      vegetationArea: 50,
      farmName: "Farm 1",
      agriculturalCultures: [
        {
          id: "af33eb71-91f2-4bb6-a9f3-59cebc826365",
          name: "Beterraba",
          createdAt: new Date(2024, 1, 1),
          updatedAt: new Date(2024, 1, 1)
        }
      ],
      createdAt: new Date(2024, 1, 1),
      updatedAt: new Date(2024, 1, 1)
    };

    jest.spyOn(cityRepo, "byNameAndStateAcronym").mockResolvedValue({
      id: "af33eb71-91f2-4bb6-a9f3-59cebc826365",
      name: "Pindamonhangaba",
      stateId: "af33eb71-91f2-4bb6-a9f3-59cebc826365"
    });

    jest.spyOn(agCulturesRepo, "byName").mockResolvedValue({
      id: "af33eb71-91f2-4bb6-a9f3-59cebc826365",
      name: "Beterraba",
      createdAt: new Date(2024, 1, 1),
      updatedAt: new Date(2024, 1, 1)
    });

    jest.spyOn(repo, "create").mockResolvedValue(mockResult);

    const ruralProducer: RuralProducerInputVM = {
      name: "Rural Producer 1",
      cityName: "Pindamonhangaba",
      stateCityAccronym: "SP",
      document: "07687982134",
      totalArea: 100,
      agriculturalArea: 50,
      vegetationArea: 50,
      farmName: "Farm 1",
      agriculturalCultures: []
    };
    const result = await service.create(ruralProducer);
    expect(result).toEqual(mockResult);
  });
});
