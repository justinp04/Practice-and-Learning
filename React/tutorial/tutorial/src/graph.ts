import * as d3 from "d3";

export class fileObject {
    constructor(private name: string, private children?: fileObject[]) {
        this.name = name;
        this.children = children; // The question mark is for properties that my be null
    }

    getChildren() {
        if(this.children)
        {
            return this.children;
        }
        else
        {
            return null;
        }
    }

    addChild(pObject: fileObject) {
        if(pObject)
        {
            if(!this.children)
            {   
                this.children = [];
            }
            this.children.push(pObject);
        }
        else
        {
            console.log('Could not be added as the file is null');
        }
    }
}