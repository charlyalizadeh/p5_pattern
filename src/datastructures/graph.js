class Graph {
    constructor(nv) {
        this.adj_matrix = Array.from(Array(nv), () => new Array(nv).fill(0));
        for (let i = 0; i < nv; i++) {
            this.adj_matrix[i][i] = 1;
        }
    }
    has_edge(v1, v2) {
        return Boolean(this.adj_matrix[v1][v2]);
    }
    nv() {
        return this.adj_matrix.length;
    }
    ne() {
        let nb_edges = 0;
        for(let i = 0; i < this.adj_matrix.length; i++) {
            for(let j = i + 1; j < this.adj_matrix.length; j++) {
                nb_edges += Number(this.adj_matrix[i][j] != 0)
            }
        }
        return nb_edges;
    }
    neighbors(v) {
        let neighbors = []
        for(let i = 0; i < this.nv(); i++) {
            if(i != v && this.has_edge(i, v)) {
                neighobrs.push(i);
            }
        }
        return neighbors;
    }
    add_edge(v1, v2) {
        this.adj_matrix[v1][v2] = 1;
        this.adj_matrix[v2][v1] = 1;
    }
    rem_edge(v1, v2) {
        this.adj_matrix[v1][v2] = 0;
        this.adj_matrix[v2][v1] = 0;
    }
}
