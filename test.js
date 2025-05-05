import { Tree } from "./bst.js";


function provideRandomNumbers() {
    let arr = []
    for (let i = 0; i < 20; i++) {
        arr.push(Math.floor(Math.random() * 100))
    }
    return arr
}

const treeArr = provideRandomNumbers();

const TreeTest = new Tree(treeArr);

console.log(TreeTest.root);
TreeTest.prettyPrint(TreeTest.root);