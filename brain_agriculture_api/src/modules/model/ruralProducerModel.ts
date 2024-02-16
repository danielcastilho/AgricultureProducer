import { BaseModel } from "./baseModel";
import { AgriculturalCultureModel } from "./agriculturalCultureModel";
import { CityModel } from "./cityModel";

export class RuralProducerModel extends BaseModel {
  name: string;
  document: string;
  farmName: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  cityId: string;
  city?: CityModel;
  agriculturalCultures?: AgriculturalCultureModel[];
}
