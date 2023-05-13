import { Cities } from "../_model/cities";

export interface States {
    id:number;
    stateName: string;
    stateCode: string;
    gstStateCode: string;
    cities: Cities[];
}