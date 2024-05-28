/*********************************
AUTHOR: Justin Pan
PURPOSE: TreeNode Class to create each node that will store the pointer to the file in SharePoint
INSTANCE FIELDS: root (TreeNode)
**********************************/

export default class TreeNode{
    constructor()
    {
        this.name = "";
        this.uri = "";
        this.parent = null;
        // List of nodes
        this.children = [];
    }

    /*************************************** 
     * NAME: setParent()
     * PURPOSE: Set the parent of the current node, and update the children list of the parent node
    ****************************************/
    setParent(map, parentName) {
        let parentNode = map.get(parentName);  
        
        if(parentNode)
        {
            this.parent = parentNode;

            // Update the parent's children list
            parentNode.children.push(this);
        }
        else
        {
            console.log(`The parent node ${parentName} could not be found`);
        }
    }
}

// module.exports = TreeNode;