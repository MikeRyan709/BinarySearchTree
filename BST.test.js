const bst = require("./BST.js");

const AVLTreeNode = bst.AVLTreeNode;
const AVLTree = bst.AVLTree;

describe('Test AVLTreetNode class constructor', ()=>{
    it('Can be constructed with a given value', ()=>{
        const node = new AVLTreeNode(10);
        expect(node.value).toBe(10);
    });

})

describe("Test AVLTree class constructor", ()=>{
    it('Can be constrcuted as null', ()=>{
        const Tree = new AVLTree();
        expect(Tree.root).toBe(null);  
    })
})

describe("Test AVLTree Inserts", ()=>{
    it('Can insert a root to the Tree', ()=>{
      const Tree = new AVLTree();
      Tree.insert(25);
      expect(Tree.root).not.toBe(null);
      expect(Tree.root.value).toBe(25);
    })
})