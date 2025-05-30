class Node {
    constructor(value, left = null, right = null) {
        this.value = value
        this.left = left 
        this.right = right 
    };
}
export class Tree {
    constructor(arr = []) {

        if(!Array.isArray(arr)) {
            throw new Error("Not a valid array");
        }

        this.arr = [...new Set(arr.sort((a, b) => a - b))]
        this.root = this.buildTree(this.arr)
    }
    buildTree(arr, start = 0, end = arr.length - 1) {
        if(start > end ) {
            return null
        }
        let m = Math.floor((start + end) / 2)

        const node = new Node(arr[m])
        
        node.left = this.buildTree(arr, start, m - 1)
        node.right =this.buildTree(arr, m + 1, end)

        return node
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    insert(value, node = this.root) {
        if (node === null) {
            return new Node(value);
        }

        if (node.value === value) {
            return node
        }
        else if (node.value > value) {
            node.left = this.insert(value, node.left)
        } else if (node.value < value) {
            node.right = this.insert(value, node.right)
        }   
        return node
    }

    delete(value, node = this.root) {
        //get the right and smalles left value next to be replaced when theres more than two children deep
        const getSucc = (cur) => {
            cur = cur.right 

            while(cur !== null && cur.left !== null) {
                cur = cur.left
            }
            return cur
        }
        
        if (node === null) {
            return node
        }

        if(node.value < value) {
            node.left = this.delete(value, node.left) 
        } else if(node.value > value) {
            node.right = this.delete(value, node.right)
        } else {
            if(node.left === null) {
                return node.right
            } 
            if (node.right === null) {
                return node.left
            }
            let succ = getSucc(node)
            node.value = succ.value 
            node.right = this.delete(succ.value, node.right)
        }
        return node
    }
    //find the node containing the value
    find(value, node = this.root) {
        if (node === null) {
            return node
        }
        if(node.value > value) {
            return this.find(value, node.left) 
        } else if(node.value < value) {
            return this.find(value, node.right)
        } else {
            return node
        }
    }
    //bfs trav
    levelOrder(callBack) {
        if(typeof(callBack) !== 'function') throw new Error('This Function Requires A Callback');

        if (this.root === null) return;

        const queue = [];
        queue.push(this.root);
        
        while (queue.length !== 0) {
            let cur = queue[0];
            
            callBack(cur)
            if(cur.left !== null) queue.push(cur.left);
            if(cur.right !== null) queue.push(cur.right);
            queue.shift();
        }
    }
    //3 dfs trav
    inOrder(callBack) {
        const traverseInOrder = (node) => {
            if (!node) return
            traverseInOrder(node.left);
            callBack(node.value)
            traverseInOrder(node.right);
        }

        if(typeof(callBack) !== 'function') throw new Error('This Function Requires A Callback');

        if (this.root === null) return;
        traverseInOrder(this.root)
    }

    preOrder(callBack) {
        const traversePreOrder = (node) => {
            if (!node) return
            callBack(node.value)
            traversePreOrder(node.left);
            traversePreOrder(node.right);
        }

        if(typeof(callBack) !== 'function') throw new Error('This Function Requires A Callback');

        if (this.root === null) return;
        traversePreOrder(this.root)
    }

    postOrder(callBack) {
        const traversePostOrder = (node) => {
            if (!node) return
            
            traversePostOrder(node.left)
            traversePostOrder(node.right)
            callBack(node.value)
        }

        if(typeof(callBack) !== 'function') throw new Error('This Function Requires A Callback');

        if (this.root === null) return;
        traversePostOrder(this.root)
    }
    //get height
    height(value) {
        let node = this.root 
        let cur = findNode(node)
        
        if(cur) {
            return calcHeight(cur);
        } else {
            return -1;
        }
        
        function findNode(node) {
            if (!node) return null
            if(node.value === value) return node;
            if(node.value > value) {
                return findNode(node.left)
            } else {
                return findNode(node.right)
            }
        }

        function calcHeight(node) {
            if(!node) return -1

            let leftHeight = calcHeight(node.left)
            let rightHeight = calcHeight(node.right)

            return Math.max(leftHeight, rightHeight) + 1
        };
    }
    //get depth
    depth(value) {
        let node = this.root 
        if(!node) return null;

        return calcDepth(node)

        function calcDepth(node) {
            if (!node) return -1

            if(node.value === value) return 0;
            let leftDepth = calcDepth(node.left)
            let rightDepth = calcDepth(node.right)

            if(leftDepth === -1 && rightDepth === -1) {
                return null
            }

            return Math.max(leftDepth, rightDepth) + 1
        }
    }

    isBalanced() {
        let node = this.root 
        let balanced = true
        balanceChecker(node) 
        return balanced
        
        function balanceChecker(node) {
            if(node === null) return 0 
            if(balanced === false) return -1
            let left = balanceChecker(node.left)
            let right = balanceChecker(node.right)

            if(Math.abs(left - right) > 1) {
                balanced = false
            }

            return Math.max(left, right) + 1
        }
    }
    //utilize inorder traversal
    rebalance() {
        let newArr = [];
        this.inOrder(node => newArr.push(node))
        newArr = [...new Set(newArr.sort((a, b ) => a - b))]
        this.root = this.buildTree(newArr);
    }
}