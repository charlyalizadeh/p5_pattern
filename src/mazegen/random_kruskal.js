class RandomKruskal extends MazeGen {
    constructor(maze) {
        super(maze);
        this.cell_sets = new DisjointSet();
        let walls = [];
        for(let x = 0; x < maze.width; x++) {
            for(let y = 0; y < maze.height; y++) {
                this.cell_sets.make_set([x, y]);
                walls.push(...maze.get_relevant_wall(x, y));
            }
        }
        this.walls_random = walls.sort((a, b) => 0.5 - Math.random());
        [this.cell1, this.cell2] = [null, null];
        this.current_wall;
    }
    run_step() {
        if(!this.walls_random.length)
            return false;
        this.current_wall = this.walls_random.pop();
        let cell1 = this.current_wall.slice(0, 2);
        let cell2 = this.maze.get_inter_cell(...this.current_wall);
        if(cell2 == null)
            return true;
        if(this.cell_sets.find(cell1) != this.cell_sets.find(cell2)) {
            let index1 = cell1[1] * this.maze.width + cell1[0];
            let index2 = cell2[1] * this.maze.width + cell2[0]
            this.maze.cell_states[index1] = true;
            this.maze.cell_states[index2] = true;
            this.maze.graph.add_edge(index1, index2)
            this.cell_sets.union(cell1, cell2);
        }
        return true;
    }
    static run(maze) {
        let cell_sets = new DisjointSet();
        let walls = []
        for(let x = 0; x < maze.width; x++) {
            for(let y = 0; y < maze.height; y++) {
                cell_sets.make_set([x, y]);
                walls.push(...maze.get_relevant_wall(x, y));
            }
        }
        console.log(walls);
        const walls_random = walls.sort((a, b) => 0.5 - Math.random());
        for(const wall of walls_random) {
            let cell1 = wall.slice(0, 2);
            let cell2 = maze.get_inter_cell(...wall);
            if(cell2 == null)
                continue;
            if(cell_sets.find(cell1) != cell_sets.find(cell2)) {
                let index1 = cell1[1] * maze.width + cell1[0];
                let index2 = cell2[1] * maze.width + cell2[0]
                maze.cell_states[index1] = true;
                maze.cell_states[index2] = true;
                maze.graph.add_edge(index1, index2)
                cell_sets.union(cell1, cell2);
            }
        }
    }
}
