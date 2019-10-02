import {KeyValuePair} from "./keyvaluepair"

export class Dismax {
    on: boolean = false;
    public q: {alt: string};
    public qf: string;
    public mm: string;
    public pf: string;
    public ps: string;
    public qs: string;
    public tie: number;
    public bq: string;
    public bf: string;

    constructor (on:boolean) {
        this.on = on;
        this.q = {alt: ""};
        this.qf = "";
        this.mm = "";
        this.pf = "";
        this.ps = "";
        this.qs = "";
        // this.tie = 0;
        this.bq = "";
        this.bf = "";
        
    }

    getParameters(): KeyValuePair<string>[] {
    // console.log("ENTERING:Facet:getParameters:this",this)
    var arrParams: KeyValuePair<string>[] = [];
    if (this.on) {
            arrParams.push({key:"dismax",value: "on"})

            if (this.q.alt != null && this.q.alt != "") {
                arrParams.push({key:"dismax.q.alt",value: this.q.alt})
            }
            if (this.qf != null && this.qf != "") {
                arrParams.push({key:"dismax.qf",value: this.qf})
            }
            if (this.mm != null && this.mm != "") {
                arrParams.push({key:"dismax.mm",value: this.mm})
            }
            if (this.pf != null && this.pf != "") {
                arrParams.push({key:"dismax.pf",value: this.pf})
            }
            if (this.ps != null && this.ps != "") {
                arrParams.push({key:"dismax.ps",value: this.ps})
            }
            if (this.qs != null && this.qs != "") {
                arrParams.push({key:"dismax.qs",value: this.qs})
            }
            if (this.tie != null) {
                arrParams.push({key:"dismax.tie",value: this.tie.toString()})
            }
            if (this.bq != null && this.bq != "") {
                arrParams.push({key:"dismax.bq",value: this.bq})
            }
            if (this.bf != null && this.bf != "") {
                arrParams.push({key:"dismax.bf",value: this.bf})
            }
        }
            // console.log("EXITING:Facet:getParameters:arrParams:***",arrParams)
    return arrParams;
    }

}
