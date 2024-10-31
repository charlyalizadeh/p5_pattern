class IsoCubePattern {
    constructor(dims, outline, colors) {
        this.dims = dims;
        this.outline = outline;
        this.colors = colors;
    }
    draw(image) {
        let offset;
        let y;
        let cube;


        offset = 0;
        y = 0;
        cube;
        while(y < image.height) {
            for(let x = offset; x < image.width; x += this.dims[0] + this.outline) {
                cube = new IsoCube(
                    createVector(x, y),
                    this.dims[0],
                    this.dims[1],
                    this.dims[2],
                    this.outline,
                    this.colors
                );
                cube.fill(image);
            }
            offset = offset == 0 ? - (this.dims[0] + this.outline) / 2 : 0;
            y = cube.hexagon_outline.down.y;
        }
    }
}
