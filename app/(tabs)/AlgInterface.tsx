
export interface algButton {
   type:  string,
   text:  string,
   rid?: string,
   note?: string,
   warning?: string
 }

export interface AlgNode  {
    isLeaf: boolean,
    isStartingSymptom: boolean
    type  : string, //"normalNode" or "yesNoNode"
    q      : string
    }
   
export interface normalNode extends AlgNode {
  buttons: algButton[],
  "redFlagButton"?: string
}
 
export interface yesNoNode extends AlgNode {
  "yesRID"    : string, 
  "noRID"     : string, 
  "selections": string[] 
}
 