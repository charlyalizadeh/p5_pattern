/* TODO: more efficient implementation */
class DisjointSet {
    constructor() {
        this.parents = [];
        this.index_map = new Map();
        this.size = [];
    }
    make_set(node) {
        if(!this.index_map.has(node)) {
            let index = this.parents.length;
            this.parents.push(index);
            this.index_map[node] = index;
            this.size.push(1);
        }
    }
    make_sets(nodes) {
        for(const node of nodes) {
            this.make_set(node);
        }
    }
    find(node) {
        let current_index = this.index_map[node]
        while(current_index != this.parents[current_index]) {
            current_index = this.parents[current_index]
        }
        return current_index;
    }
    union(node1, node2) {
        let root1 = this.find(node1);
        let root2 = this.find(node2);
        if(root1 == root2)
            return
        if(this.size[root1] < this.size[root2])
            [root1, root2] = [root2, root1]
        this.parents[root2] = root1
        this.size[root1] += this.size[root2]
    }
}

