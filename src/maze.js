const directions = {
    TOP: "top",
    BOTTOM: "bottom",
    RIGHT: "right",
    LEFT: "left"
}

class Maze {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.graph = new Graph(width * height);
        this.cell_states = Array(this.graph.nv()).fill(false);
    }
    get_coord(coord) {
    }
    has_edge(x, y, direction) {
        let v1 = y * this.width + x;
        let v2 = -1;
        switch(direction) {
            case directions.TOP:
                v2 = (y - 1) * this.width + x;
                break;
            case directions.BOTTOM:
                v2 = (y + 1) * this.width + x;
                break;
            case directions.RIGHT:
                v2 = y * this.width + (x + 1);
                break;
            case directions.LEFT:
                v2 = y * this.width + (x - 1);
                break;
        }
        return this.graph.has_edge(v1, v2);
    }
    neighbors_filtered(v, filter) {
        let results = [];
        let [x, y] = this.get_cell_coord(v);
        let neighbors = [
            [x, y - 1], // TOP
            [x, y + 1], // BOTTOM
            [x - 1, y], // LEFT
            [x + 1, y], // RIGHT
        ]
        for(const n of neighbors) {
            let index = n[1] * this.width + n[0]
            if(n[0] >= 0 && n[0] < this.width && n[1] >= 0 && n[1] < this.height
               && filter[index]) {
                results.push(index);
            }
        }
        return results;
    }
    get_cell_state(coord) {
        if(Array.isArray(coord))
            coord = this.get_cell_index(...coord);
        return this.cell_states[coord];
    }
    set_cell_state(coord, state) {
        if(Array.isArray(coord))
            coord = this.get_cell_index(...coord);
        this.cell_states[coord] = state;
    }
    set_cell_states(states) {
        this.cell_states = states;
    }
    get_inter_cell(coord, direction) {
        let [nx, ny] = [-1, -1];
        switch(direction) {
            case directions.TOP:
                [nx, ny] = [x, y - 1];
                break;
            case directions.BOTTOM:
                [nx, ny] = [x, y + 1];
                break;
            case directions.RIGHT:
                [nx, ny] = [x + 1, y];
                break;
            case directions.LEFT:
                [nx, ny] = [x - 1, y];
                break;
        }
        if(nx < 0 || ny < 0 || nx >= this.width || ny >= this.height)
            return null;
        else
            return [nx, ny]
    }
    get_adj_matrix() {
        return this.graph.adj_matrix;
    }
    set_adj_matrix(adj_matrix) {
        this.graph.adj_matrix = adj_matrix;
    }
    get_cell_coord(v) {
        let y = Math.trunc(v / this.width);
        let x = v - y * this.width;
        return [x, y];
    }
    get_cell_index(x, y) {
        return y * this.width + x;
    }
    get_wall_on(coord) {
        if(!Array.isArray(coord))
            coord = this.get_cell_coord(coord);
        let [x, y] = coord;
        let walls = [];
        if(x > 0 && !this.has_edge(x, y, directions.LEFT))
            walls.push([x, y, directions.LEFT])
        if(y > 0 && !this.has_edge(x, y, directions.TOP))
            walls.push([x, y, directions.TOP])
        if(x < this.width - 1 && !this.has_edge(x, y, directions.RIGHT))
            walls.push([x, y, directions.RIGHT]);
        if(y < this.height - 1 && !this.has_edge(x, y, directions.BOTTOM))
            walls.push([x, y, directions.BOTTOM]);
        return walls;
    }
}


class MazeDrawer {
    constructor(maze,
                dim=[10, 10],
                cell_args=[0, 0, 0, 0],
                search_cell_args=[0, 0, 0, 0],
                wall_on=[0, 0, 0],
                wall_off=[255, 255, 255],
                revealed_cell=[255, 255, 255],
                hidden_cell=[0, 0, 0],
                search_cell=[0, 255, 0],
                stroke_weight=4,
                ) {
        this.maze = maze;

        this.dim = dim;
        this.cell_args = cell_args;
        this.search_cell_args = search_cell_args;
        this.wall_on = wall_on;
        this.wall_off = wall_off;
        this.revealed_cell = revealed_cell;
        this.hidden_cell = hidden_cell;
        this.search_cell = search_cell;
        this.stroke_weight = stroke_weight;
        this.offset = stroke_weight / 2;
    }

    draw(g) {
        g.strokeWeight(this.stroke_weight);
        g.stroke(this.wall_on);
        for(let x = 0; x < this.maze.width; x++) {
            for(let y = 0; y < this.maze.height; y++) {
                if(!this.maze.get_cell_state([x, y])) {
                    this.draw_cell(g, x, y, this.hidden_cell, this.wall_on);
                }
                else {
                    this.draw_cell(g, x, y, this.revealed_cell, this.wall_on);
                }
            }
        }
        for(let x = 0; x < this.maze.width; x++) {
            for(let y = 0; y < this.maze.height; y++) {
                if(this.maze.has_edge(x, y, directions.BOTTOM)) {
                    this.draw_wall(g, x, y, directions.BOTTOM, this.wall_off);
                }
                if(this.maze.has_edge(x, y, directions.RIGHT)) {
                    this.draw_wall(g, x, y, directions.RIGHT, this.wall_off);
                }
            }
        }
    }
    draw_wall(g, x, y, direction, wall_stroke) {
        let [x1, y1, x2, y2] = [-1, -1, -1, -1];
        switch(direction) {
            case directions.TOP:
                x1 = x * this.dim[0]; y1 = y * this.dim[1];
                x2 = (x + 1) * this.dim[0]; y2 = y * this.dim[1];
                break;
            case directions.BOTTOM:
                x1 = x * this.dim[0]; y1 = (y + 1) * this.dim[1];
                x2 = (x + 1) * this.dim[0]; y2 = (y + 1) * this.dim[1];
                break;
            case directions.RIGHT:
                x1 = (x + 1) * this.dim[0]; y1 = y * this.dim[1];
                x2 = (x + 1) * this.dim[0]; y2 = (y + 1) * this.dim[1];
                break;
            case directions.LEFT:
                x1 = x * this.dim[0]; y1 = y * this.dim[1];
                x2 = x * this.dim[0]; y2 = (y + 1) * this.dim[1];
                break;
        }
        g.stroke(wall_stroke);
        g.strokeCap(PROJECT)
        if([directions.TOP, directions.BOTTOM].includes(direction)) {
            g.line(x1 + this.offset + this.stroke_weight, y1 + this.offset, x2 - this.offset, y2 + this.offset);
        }
        else {
            g.line(x1 + this.offset, y1 + this.offset + this.stroke_weight, x2 + this.offset, y2 - this.offset);
        }
    }

    draw_cell(g, x, y, f, s, w=null) {
        g.fill(f);
        g.stroke(s);
        if(w == null)
            g.strokeWeight(this.stroke_weight);
        else if(w == 0) {
            g.noStroke();
        }
        else
            g.strokeWeight(w);
        g.rect(x * this.dim[0] + this.offset, y * this.dim[1] + this.offset, ...this.dim);
    }
}
