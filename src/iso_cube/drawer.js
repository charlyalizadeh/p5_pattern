class IsoCubePattern {
    constructor(image, dims, outline) {
        this.image = image;
        this.dims = dims;
        this.outline = outline;
    }
    draw(colors) {
        let offset = 0;
        let y = 0;
        let cube;
        while(y < this.image.height) {
            for(let x = offset; x < this.image.width; x += this.dims[0] + this.outline) {
                cube = new IsoCube(
                    createVector(x, y),
                    this.dims[0],
                    this.dims[1],
                    this.dims[2],
                    this.outline
                );
                cube.fill(colors, this.image);
            }
            offset = offset == 0 ? - (this.dims[0] + this.outline) / 2 : 0;
            y = cube.hexagon_outline.down.y;
        }
    }
}