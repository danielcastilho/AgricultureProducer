import { BaseModel } from "./baseModel";
import { CityModel } from "./cityModel";
export declare class StateModel extends BaseModel {
    name: string;
    acronym: string;
    cities?: CityModel[];
}
