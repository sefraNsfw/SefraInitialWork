import {KeyValuePair} from "./keyvaluepair"

export class Facet {
    public on: boolean = false;
    public query: string;
    public field: string;
    public prefix: string;

    constructor (on:boolean) {
        this.on = on;        
    }

    getParameters(): KeyValuePair<string>[] {
        // console.log("ENTERING:Facet:getParameters:this",this)
        var arrParams: KeyValuePair<string>[] = [];
        if (this.on) {
                if (this.query != null && this.query != "") {
                    arrParams.push({key:"facet.query",value: this.query})
                }
                if (this.field != null && this.field != "") {
                    arrParams.push({key:"facet.field",value: this.field})
                }
                if (this.prefix != null && this.prefix != "") {
                    arrParams.push({key:"facet.prefix",value: this.prefix})
                }
        }
            // console.log("EXITING:Facet:getParameters:arrParams:***",arrParams)
    return arrParams;
    }

}
