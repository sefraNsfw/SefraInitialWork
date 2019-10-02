// import {Simple} from "./Simple";
import {KeyValuePair} from "./keyvaluepair"

export class Highlight {
    public on: boolean;
    public fl: string;
    public fragsize: number;
    public simple: { pre: string, post: string };
    public requireFieldMatch: boolean;
    public usePhraseHighlighter: boolean;
    public highlightMultiTerm: boolean;

    constructor (on:boolean) {
        this.on = on;
        this.fl = "tekst";
        this.fragsize = 51200;
        this.simple = {pre: "",post: ""};
        this.simple.pre = "<mark>"

        this.simple.post = "</mark>"
        this.requireFieldMatch = false;
        this.usePhraseHighlighter = false;
        this.highlightMultiTerm = false;
        
    }
    isOn(): boolean {
    return this.on;
    }
    setFl(fl:string): void{
        this.fl = fl;
    }
    getParameters(): KeyValuePair<string>[] {
    console.log("ENTERING:Highlight:getParameters:this",this)
    var arrParams: KeyValuePair<string>[] = [];
    if (this.on) {
    console.log("ENTERING:Highlight:getParameters:this",this)
            arrParams.push({key:"hl",value: "on"})

            // HL is on, let's see if we need to supply other parameters
            if (this.fl != null && this.fl != "") {
            arrParams.push({key:"hl.fl",value: this.fl})
            }
            if (this.fragsize != null) {
                arrParams.push({key:"hl.fragsize",value: this.fragsize.toString()})
            }
            if (this.simple.pre != "" || this.simple.post != "") {
            arrParams.push({key:"hl.simple.pre",value: this.simple.pre})
            arrParams.push({key:"hl.simple.post",value: this.simple.post})
            }
            if (this.requireFieldMatch) {
            arrParams.push({key:"hl.requirefieldMatch",value: "on"})
            }
            if (this.usePhraseHighlighter) {
            arrParams.push({key:"hl.usePhraseHighlighter",value: "on"})
            }
            if (this.highlightMultiTerm) {
            arrParams.push({key:"hl.highlightMultiTerm",value: "on"})
            }

        } else {
            console.log("EXITING:Highlight:getParameters:is EMPTY, HL arrParams should be empty!!!",arrParams)
 
        }
        // console.log("EXITING:Highlight:getParameters:arrParams:***",arrParams)
    return arrParams;
    }
}
