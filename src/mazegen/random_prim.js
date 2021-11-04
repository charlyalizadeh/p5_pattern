class RandomPrim extends MazeGen {
    constructor(maze, v=0) {
        super(maze);
        this.maze.set_cell_state(v, true);
        this.walls = this.maze.get_wall_on(v);
        let [x, y] = this.maze.get_cell_coord(v);
    }
    run_step() {
        if(!this.walls.length) {
            return false;
        }
        let wall = random(this.walls);
        let cell0 = wall.slice(0, 2);
        let cell1 = [...cell0];
        switch(wall[2]) {
            case directions.TOP:
                cell1[1] -= 1;
                break;
            case directions.BOTTOM:
                cell1[1] += 1;
                break;
            case directions.RIGHT:
                cell1[0] += 1;
                break;
            case directions.LEFT:
                cell1[0] -= 1;
                break;
        }
        let index0 = this.maze.get_cell_index(...cell0);
        let index1 = this.maze.get_cell_index(...cell1);
        if(!this.maze.get_cell_state(index0) && this.maze.get_cell_state(index1)) {
            this.maze.graph.add_edge(index0, index1);
            this.maze.set_cell_state(index0, true);
            walls.push(...this.maze.get_wall_on(index0));
        }
        else if(this.maze.get_cell_state(index0) && !this.maze.get_cell_state(index1)) {
            this.maze.graph.add_edge(index0, index1);
            this.maze.set_cell_state(index1, true);
            this.walls.push(...this.maze.get_wall_on(index1));
        }
        this.walls = this.walls.filter(itm => itm !== wall);
        return true;
    }
    static run(maze, v=0) {
        let to_visit = Array(maze.graph.nv()).fill(true);
        to_visit[v] = false;
        let walls = maze.get_wall_on(v);
        while(walls.length) {
            let wall = random(walls);
            let cell0 = wall.slice(0, 2);
            let cell1 = [...cell0];
            switch(wall[2]) {
                case directions.TOP:
                    cell1[1] -= 1;
                    break;
                case directions.BOTTOM:
                    cell1[1] += 1;
                    break;
                case directions.RIGHT:
                    cell1[0] += 1;
                    break;
                case directions.LEFT:
                    cell1[0] -= 1;
                    break;
            }
            let index0 = maze.get_cell_index(...cell0);
            let index1 = maze.get_cell_index(...cell1);
            if(to_visit[index0] && !to_visit[index1]) {
                maze.graph.add_edge(index0, index1);
                to_visit[index0] = false;
                walls.push(...maze.get_wall_on(index0));
            }
            else if(!to_visit[index0] && to_visit[index1]) {
                maze.graph.add_edge(index0, index1);
                to_visit[index1] = false;
                walls.push(...maze.get_wall_on(index1));
            }
            walls = walls.filter(function(itm){
                return itm !== wall;
            })
        }
        maze.cell_states = to_visit.map(x => !x)
    }
}

