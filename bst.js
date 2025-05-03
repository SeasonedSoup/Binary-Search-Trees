class Node {
    constructor(value, left = null, right = null) {
        this.value = value
        this.left = left 
        this.right = right 
    };
}
export class Tree {
    constructor(arr = []) {
        this.arr = {...new Set(arr.sort((a, b) => a - b))}
        this.root = buildTree(this.arr)
    }
    buildTree(arr, start = 0, end = arr.length - 1) {
        if(start > end ) {
            return null
        }
        let m = Math.floor((start + end) / 2)

        const node = newNode(arr[m])
        
        node.left = this.buildTree(arr, start, m - 1)
        node.right =this.buildTree(arr, m + 1, end)

        return node
    }
    insert(value, node = this.root) {
        if (node === null) {
            return newNode(value);
        }

        if (node.value === value) {
            return node
        }
        else if (node.value < value) {
            node.left = this.insert(value, node.left)
        } else if (this.root.value > value) {
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

    find(value, node = this.root) {
        if (node === null) {
            return node
        }
        if(node.value < value) {
            return this.find(value, node.left) 
        } else if(node.value > value) {
            return this.find(value, node.right)
        } else {
            return node
        }
    }

    levelOrder(callBack) {
        if(!callBack) throw new Error('This Function Requires A Callback');

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
}