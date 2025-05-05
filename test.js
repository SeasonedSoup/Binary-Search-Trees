import { Tree } from "./bst.js";


function provideRandomNumbers() {
    let arr = []
    for (let i = 0; i < 20; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
};

const treeArr = provideRandomNumbers();

const TreeTest = new Tree(treeArr);

//checks if treee is balanced
console.log(TreeTest.isBalanced());

//prints all the values in inorder, preorder, and postorder

logDfsValues();

//unbalance
for (let i = 0; i < 20; i++) {
    const val = Math.floor(Math.random() * 100 + 100);
    console.log(val)
    TreeTest.insert(val)
}
//tree is now unbalanced
console.log(TreeTest.isBalanced());

//try rebalancing using inorder traversal
TreeTest.rebalance();

//check if it is now balanced
console.log(TreeTest.isBalanced());

//reprint new vals in dfs traversals

logDfsValues();



function logDfsValues() {
    
    const inOrderArr = []
    const preOrderArr = []
    const postOrderArr = []

    TreeTest.inOrder(value => inOrderArr.push(value))
    const inOrderRes = inOrderArr.join('->')
    console.log('In Order Tree Value:',inOrderRes);


    TreeTest.preOrder(value => preOrderArr.push(value))
    const preOrderRes = preOrderArr.join('->')
    console.log('Pre Order Tree Values:', preOrderRes);

    TreeTest.postOrder(value => postOrderArr.push(value))
    const postOrderRes = postOrderArr.join('->')
    console.log('Post Order Tree Values:', postOrderRes)
}