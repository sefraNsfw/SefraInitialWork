import {KeyValuePair} from "./keyvaluepair"

export class Spatial {
    public on: boolean = false;
    public pt: string;
    public sfield?: string;
    public d?: string;

    constructor (on:boolean) {
        this.on = on;        
    }

    getParameters(): KeyValuePair<string>[] {
        // console.log("ENTERING:Facet:getParameters:this",this)
        var arrParams: KeyValuePair<string>[] = [];
        if (this.on) {
                arrParams.push({key:"spatial",value: "on"})

                if (this.pt != null && this.pt != "") {
                    arrParams.push({key:"spatial.pt",value: this.pt})
                }
                if (this.sfield != null && this.sfield != "") {
                    arrParams.push({key:"spatial.sfield",value: this.sfield})
                }
                if (this.d != null && this.d != "") {
                    arrParams.push({key:"spatial.d",value: this.d})
                }
        }
            // console.log("EXITING:Facet:getParameters:arrParams:***",arrParams)
    return arrParams;
    }
}
