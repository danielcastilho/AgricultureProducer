import { BaseModel } from "./baseModel";
import { StateModel } from "./stateModel";

export class CityModel extends BaseModel {
  name: string;
  stateId: string;
  state?: StateModel;
}
