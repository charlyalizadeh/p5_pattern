class MazeGen {
    constructor(maze) {
        this.maze = maze;
        if(this.constructor == MazeGen) {
            throw new TypeError('Abstract class "MazeGen" cannot be instantiated directly');
        }
    }
    static run() {}
    run_step() {}
}
