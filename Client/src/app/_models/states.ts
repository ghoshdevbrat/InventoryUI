import { Cities } from "../_model/masters/cities";

export class States {
    id:number;
    stateId: string;
    stateName: string;
    stateCode: string;
    gstStateCode: string;
    cities: Cities[];

    constructor() {
        this.id = 0;
        this.stateId = '';
        this.stateName = '';
        this.stateCode = '';
        this.gstStateCode = '';
        this.cities = [];
    }
}