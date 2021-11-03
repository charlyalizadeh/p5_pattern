class RandomDFS extends MazeGen {
    constructor(maze, v = 0) {
        super(maze);
        this.stack = [v];
        this.to_visit = Array(this.maze.graph.nv()).fill(true);
        this.to_visit[v] = false;
        this.current_v = v;
    }
    run_step() {
        if(!this.stack.length) {
            return false;
        }
        this.current_v = this.stack.pop();
        this.maze.set_cell_state(...this.maze.get_cell_coord(this.current_v), true);
        let neighbors = this.maze.neighbors_filtered(this.current_v, this.to_visit);
        if(neighbors.length) {
            this.stack.push(this.current_v);
            let next_v = random(neighbors);
            this.maze.graph.add_edge(this.current_v, next_v);
            this.to_visit[next_v] = false;
            this.stack.push(next_v)
        }
        return true;
    }
    static run(maze, v = 0) {
        let stack = [v]
        let to_visit = Array(maze.graph.nv()).fill(true);
        to_visit[v] = false;
        while(stack.length) {
            let current_v = stack.pop();
            let neighbors = maze.neighbors_filtered(current_v, to_visit);
            if(neighbors.length) {
                stack.push(current_v);
                let next_v = random(neighbors);
                maze.graph.add_edge(current_v, next_v);
                to_visit[next_v] = false;
                stack.push(next_v)
            }
        }
        maze.cell_states = to_visit.map(x => !x)
    }
}

