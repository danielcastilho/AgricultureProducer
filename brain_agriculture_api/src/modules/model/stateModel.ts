import { BaseModel } from "./baseModel";
import { CityModel } from "./cityModel";

export class StateModel extends BaseModel {
  public name: string;
  public acronym: string;
  public cities?: CityModel[];
}
