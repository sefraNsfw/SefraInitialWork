import {KeyValuePair} from "./keyvaluepair"

export class Edismax {
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
    public uf: string;
    public pf2: string;
    public pf3: string;
    public ps2: string;
    public ps3: string;
    public boost: string;
    public stopwords: boolean;
    public lowercaseOperators: boolean;

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
        this.uf = "";
        this.pf2 = "";
        this.pf3 = "";
        this.ps2 = "";
        this.ps3 = "";
        this.boost = ""; //TODO - Change to FUNCTION ???!!! How exactly, I need to clarify?
        this.stopwords = true;
        this.lowercaseOperators = true;
        
    }

    getParameters(): KeyValuePair<string>[] {
    // console.log("ENTERING:Facet:getParameters:this",this)
    var arrParams: KeyValuePair<string>[] = [];
    if (this.on) {
            arrParams.push({key:"edismax",value: "on"})

            if (this.q.alt != null && this.q.alt != "") {
                arrParams.push({key:"edismax.q.alt",value: this.q.alt})
            }
            if (this.qf != null && this.qf != "") {
                arrParams.push({key:"edismax.qf",value: this.qf})
            }
            if (this.mm != null && this.mm != "") {
                arrParams.push({key:"edismax.mm",value: this.mm})
            }
            if (this.pf != null && this.pf != "") {
                arrParams.push({key:"edismax.pf",value: this.pf})
            }
            if (this.ps != null && this.ps != "") {
                arrParams.push({key:"edismax.ps",value: this.ps})
            }
            if (this.qs != null && this.qs != "") {
                arrParams.push({key:"edismax.qs",value: this.qs})
            }
            if (this.tie != null) {
                arrParams.push({key:"edismax.tie",value: this.tie.toString()})
            }
            if (this.bq != null && this.bq != "") {
                arrParams.push({key:"edismax.bq",value: this.bq})
            }
            if (this.bf != null && this.bf != "") {
                arrParams.push({key:"edismax.bf",value: this.bf})
            }
            if (this.uf != null && this.uf != "") {
                arrParams.push({key:"edismax.uf",value: this.uf})
            }
            if (this.pf2 != null && this.pf2 != "") {
                arrParams.push({key:"edismax.pf2",value: this.pf2})
            }
            if (this.pf3 != null && this.pf3 != "") {
                arrParams.push({key:"edismax.pf3",value: this.pf3})
            }
            if (this.ps2 != null && this.ps2 != "") {
                arrParams.push({key:"edismax.ps2",value: this.ps2})
            }
            if (this.ps3 != null && this.ps3 != "") {
                arrParams.push({key:"edismax.ps3",value: this.ps3})
            }
            if (this.boost != null && this.boost != "") {
                arrParams.push({key:"edismax.boost",value: this.boost})
            }
            if (this.stopwords) {
            arrParams.push({key:"edismax.stopwords",value: "on"})
            }
            else {
                arrParams.push({key:"edismax.stopwords",value: "off"})
            }
            if (this.lowercaseOperators) {
                arrParams.push({key:"edismax.lowercaseOperators",value: "on"})
            }
            else {
                arrParams.push({key:"edismax.lowercaseOperators",value: "off"})
            }

        }
            // console.log("EXITING:Facet:getParameters:arrParams:***",arrParams)
    return arrParams;
    }

}
