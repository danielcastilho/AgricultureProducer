import { BaseModel } from "./baseModel";
import { StateModel } from "./stateModel";
export declare class CityModel extends BaseModel {
    name: string;
    stateId: string;
    state?: StateModel;
}
