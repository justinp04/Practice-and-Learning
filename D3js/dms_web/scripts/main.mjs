/*********************************
AUTHOR: Justin Pan
PURPOSE: To test the Tree representation of the document library
**********************************/

// import d3 from 'https://cdn.skypack.dev/d3';
import Tree from './Tree.mjs';
import TreeNode from './TreeNode.mjs'
import d3Tree from './d3Tree.mjs';

// const Tree = require('./Tree.js');
// const TreeNode = require('./TreeNode.js');
// const d3Tree = require('./d3Tree.js');

const map = new Map();

// Make a new tree
const tree = new Tree();

// This will be the root node
const testMGP = new TreeNode();

testMGP.name = 'testMGP';
testMGP.uri = 'www.testuri.com/testMGP';
testMGP.children = [];
map.set(testMGP.name, testMGP);

const testPRO = new TreeNode();

testPRO.name = 'testPRO';
testPRO.uri = 'www.testuri.com/testPRO';
testPRO.setParent(map, 'testMGP');
testPRO.children = [];

map.set(testPRO.name, testPRO);

const testFRM = new TreeNode();

testFRM.name = 'testFRM';
testFRM.uri = 'www.testuri.com/testFRM';
testFRM.setParent(map, 'testPRO');
testFRM.children = [];

map.set(testFRM.name, testFRM);

tree.root = testMGP;

// Tests
if(map.size == 3)
    console.log('Map.set() test: PASSED');
if(testPRO.parent == testMGP && testMGP.children[0] == testPRO)
    console.log('setParent() test: PASSED')

console.log(map.get('testFRM'));

// const treeSvg = d3Tree(tree);