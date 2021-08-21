const treeify = require('treeify');
const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.get('/treeify', function(req, res){
    res.sendFile(path.join(__dirname, 'treeify.html'))
})

app.get('/results', function(req, res){
    res.sendFile(path.join(__dirname, 'results.html'))
})

app.post('/results', async function (req, res) {
	let results = await req.body.NumberInput;
	results = results.split(',');
	console.log(results)
	let myTree = new AVLTree();
	for (let i = 0; i < results.length; i++) {
	myTree.insert(results[i]);
	}
	res.send(`<pre>${JSON.stringify(myTree, null, 2)}</pre>`);
	console.log(treeify.asTree(myTree, true));
	console.log(results);
	});

class AVLTreeNode {
	constructor(value, left = null, right = null) {
		this.value = value;
		this.left = left;
		this.right = right;
	}
}
class AVLTree {
	constructor(root = null) {
		this.root = root;
	}
	insert(value){
		const recursive_Helper = (node) => {
			if(node === null) {
				return new AVLTreeNode(value);
			}else if(value < node.value) {
				node.left = recursive_Helper(node.left);
			}else if(value > node.value) {
				node.right = recursive_Helper(node.right);
			}else{
				throw new Error("Inserts cannot be equal!")
			}
			
			if(nodeBalance(node) > 1) {
				return nodeRotateLeft(node);
			}else if(nodeBalance < -1) {
				return nodeRotateRight(node);
			}else{
				return node;
			}
		}
		this.root = recursive_Helper(this.root);
	}
	search(value){
		const recursiveSearchHelper = (node) => {
			if(node === null) {
				return false;
			}else if(value < node.value){
				return recursiveSearchHelper(node.left);
			}else if (value > node.value){
				return recursiveSearchHelper(node.right);
			}else{
				return true;
			}
		}
		return recursiveSearchHelper(this.root)
	}
}

const myTree = new AVLTree();

function nodeHeight(node){
	if(node === null) {
		return -1;
	}else if(node.left === null && node.right === null){
		return 0;
	}else{
		return 1 + Math.max(nodeHeight(node.left), nodeHeight(node.right));
	}
	

}

function nodeBalance(node){
	return nodeHeight(node.right) - nodeHeight(node.left);
}

function nodeRotateLeft(node){
	if(node === null || node.right === null){
		return node;
	}
	const newRoot = node.right;
	node.right = newRoot.left;
	newRoot.left = node;
	return newRoot;
}

function nodeRotateRight(node){
	if(node === null || node.left === null){
		return node;
	}
	const newRoot = node.left;
	node.left = newRoot.right;
	newRoot.right = node;
	return newRoot;
}

app.listen(3000, function(){
    console.log("listening at http://localhost:3000")
})

module.exports = {
	AVLTreeNode,
	AVLTree
}