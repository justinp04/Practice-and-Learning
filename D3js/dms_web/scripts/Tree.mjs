/*********************************
AUTHOR: Justin Pan
PURPOSE: Tree Class to create the hierarchical structure of the n-ary document tree
INSTANCE FIELDS: root (TreeNode)
**********************************/

import TreeNode from './TreeNode.mjs';

export default class Tree{
    constructor()
    {
        this.root = new TreeNode();
    }

    // Insert method, we insert, looking for the parent node with the same ID
    // This may take a while so it may serve useful to take note of the layer of the tree as well.
    insert(node, map) 
    {
        // Check if the parent exists in the tree
        if(node.parent != null)
        {
            // If the parent node does exist in the tree, add it to the list of children
            node.parent.children.push(node);
            map.set(node.name, node);
            return true;
        }
        return false;
    }

    // Update the list of children for the node in the tree
    updateChildren(id, children)
    {
        let node = getNode(id);
        node.children = children;
    }    

    // Get node
    getNode(id)
    {
        let found = false;
        let current = this.root;

        // Loop through to find the node with the corresponding ID
        while(current && !found) 
        {
            // How will we know which node is the next one to go to?
            // Depth of recursion?
            // We can limit the search to substrings found in the name 'MGP', 'PRO', or 'FRM'
            if(current.id == id)
            {
                return current;
            }
        }

        // The node is not in the tree yet
        return null;
    }
}

// module.exports = Tree;