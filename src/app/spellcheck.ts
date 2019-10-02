import {KeyValuePair} from "./keyvaluepair"

export class Spellcheck {
    on: boolean = false;
    build: boolean = false;
    reload: boolean = false;
    q: string = "";
    dictionary: string = "";
    count?: number;
    onlyMorePopular: boolean = false;
    extendedResults: boolean = false;
    collate: boolean = false;
    maxCollations?: number;
    maxCollationTries?: number;
    maxAccuracy?: number;

    constructor (on:boolean) {
        this.on = on;
    }

    getParameters(): KeyValuePair<string>[] {
        // console.log("ENTERING:Spellcheck:getParameters:this",this)
        var arrParams: KeyValuePair<string>[] = [];
        if (this.on) {
                arrParams.push({key:"spellcheck",value: "on"})

                if (this.build == true) {arrParams.push({key:"spellcheck.build", value: "on"})}
                else {arrParams.push({key:"spellcheck.build", value: "off"})}
                if (this.reload == true) {arrParams.push({key:"spellcheck.reload", value: "on"})}
                else {arrParams.push({key:"spellcheck.reload", value: "off"})}

                if (this.q != null && this.q != "") {
                    arrParams.push({key:"spellcheck.q",value: this.q})
                }
                if (this.dictionary != null && this.dictionary != "") {
                    arrParams.push({key:"spellcheck.dictionary",value: this.dictionary})
                }
                if (this.count != null) {
                    arrParams.push({key:"spellcheck.count",value: this.count.toString()})
                }
                if (this.onlyMorePopular == true) {arrParams.push({key:"spellcheck.onlymorepopular", value: "on"})}
                else {arrParams.push({key:"spellcheck.onlymorepopular", value: "off"})}
                if (this.extendedResults == true) {arrParams.push({key:"spellcheck.extendedresults", value: "on"})}
                else {arrParams.push({key:"spellcheck.extendedresults", value: "off"})}
                if (this.collate == true) {arrParams.push({key:"spellcheck.collate", value: "on"})}
                else {arrParams.push({key:"spellcheck.collate", value: "off"})}

                if (this.maxCollations != null) {
                    arrParams.push({key:"spellcheck.maxcollations",value: this.maxCollations.toString()})
                }
                if (this.maxCollationTries != null) {
                    arrParams.push({key:"spellcheck.maxcollationTries",value: this.maxCollationTries.toString()})
                }
                if (this.maxAccuracy != null) {
                    arrParams.push({key:"spellcheck.maxaccuracy",value: this.maxAccuracy.toString()})
                }
        }
            // console.log("EXITING:Facet:getParameters:arrParams:***",arrParams)
    return arrParams;
    }

}
