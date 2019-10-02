import {Dismax} from "./dismax";
import {Edismax} from "./edismax";
import {Highlight} from "./highlight";
import {Facet} from "./facet";
import {Spatial} from "./spatial";
import {Spellcheck} from "./spellcheck";
import {KeyValuePair} from "./keyvaluepair"

export class SolrQuery {
    q: string;
    fq?: string[]; //filter query
    sort?: string; //sort field or function with asc|desc
    start: number = 0;
    rows: number = 10;
    fl: string; //field list, comma separated
    df: string; //default search field
    rqp: string; //raw query parameters key1=val1&key2=val2 ...
    wt?: string; //json, xml, python, ruby, php, csv
    indent?: boolean;
    debugQuery?: boolean;
    dismax?: Dismax; // to be implemented later
    edismax?: Edismax; // to be implemented later
    hl?: Highlight;
    facet?: Facet;
    spatial?: Spatial;
    spellcheck?: Spellcheck;

    constructor(q: string) {
        console.log("ENTERING:SolrQuery:Constructor: with q=%s",q);
        this.q = q;
        this.wt = "json"; // we need to fix response to JSON
        this.df = "tekst";
        this.start = 0;
        this.rows = 10;
        this.fl = "*,score";
        this.hl = new Highlight(true);
        // this.hl.simple.pre = "";
        // this.hl.simple.post = "";
        this.dismax = new Dismax(false);
        this.edismax = new Edismax(false);
        this.facet = new Facet(false);
        this.spatial = new Spatial(false);
        this.spellcheck = new Spellcheck(false);
        console.log("SolrQuery:Constructor: created new SolqQuery object:",JSON.stringify(this));
        console.log("EXITING:SolrQuery:Constructor: with q=%s",q);
        // TEST TEST TODO: Remove
        // this.hl.on = true;
        // this.hl.fl = "tekst";
    }

    getParameters(): KeyValuePair<string>[] {
        // console.log("ENTERING : getParameters:this",this)
        var arr: KeyValuePair<string>[] = [];
        if (this.q != null) {
            arr.push({key: 'q', value: this.q})
        }
        if (this.fq != null) {
            // TODO: DONE : implement iterate over this.fq
            for (let fq of this.fq ) {
            arr.push({key: 'fq', value: fq})
            }
        }
        if (this.wt != null) {
        arr.push({key: 'wt', value: this.wt})
        }
        if (this.df != null) {
        arr.push({key: 'df', value: this.df})
        }

        // pickup all properties for all modules which can be enabled
        // dismax, edismax, hl, spatial, facet
        for (let module of [this.dismax, this.edismax, this.hl, this.spatial, this.spellcheck]){
            let moduleParams:KeyValuePair<string>[] = module.getParameters();
            arr = arr.concat(moduleParams)
        }
        // if (this.dismax != null && this.dismax.on != false) {
        //     let dismaxParams:KeyValuePair<string>[] = this.dismax.getParameters();
        //     arr = arr.concat(dismaxParams)
        // }
        // if (this.edismax != null && this.edismax.on != false) {
        //     let edismaxParams:KeyValuePair<string>[] = this.edismax.getParameters();
        //     arr = arr.concat(edismaxParams)
        // }
        // if (this.hl != null && this.hl.on != false) {
        //     let hlParams:KeyValuePair<string>[] = this.hl.getParameters();
        //     arr = arr.concat(hlParams)
        // }
        // if (this.spatial != null && this.spatial.on != false) {
        //     let spatialParams:KeyValuePair<string>[] = this.spatial.getParameters();
        //     arr = arr.concat(spatialParams)
        // }
        if (this.sort != null) {
        arr.push({key: 'sort', value: this.sort})
        }
        console.log("SolrQuery:getParameters:this.start=:",this.start);
        if (this.start != null && length >= 0) {
        console.log("getParameters:getParameters:this.start=:",this.start);
        arr.push({key: 'start', value: this.start.toString()})
        }
        if (this.rows != null) {
            arr.push({key: 'rows', value: this.rows.toString()})
        }
        if (this.fl != null) {
            arr.push({key: 'fl', value: this.fl})
        }
        if (this.facet != null && this.facet.on != false) {
            let facetParams:KeyValuePair<string>[] = this.facet.getParameters();
            console.log("PROCES: getParameters:facetParams=:",facetParams);
            arr = arr.concat(facetParams);
        }
        console.log("EXITING:solrquery:getParameters:arr=:",arr);
        return arr;
        }

        nextPage(): void {
                if (this.start != null){
        if (this.start < this.rows) {
            this.start = 0;
        } else {
            this.start = this.start + this.rows;
            }
        }  else {
            this.start = 0;
        }
        }
        getQ(): string {
            // TODO: Implement returning multiple Q as array
        console.log("ENTERING : getQ:this",this)
        let q = this.q;
        console.log("EXITING:solrquery:getQ:q=:",q);
        return q;
        }

        setQ(guiQ: string): void {
            this.q = guiQ;
        }

        setVebran(vebran: string) {
            this.q = vebran;
        }

}
