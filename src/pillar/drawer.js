class PillarDrawer {
    constructor(dims, outline, colors) {
        this.dims = dims;
        this.outline = outline;
        this.colors = colors;
        this.vect_offset_new_line = this.compute_offset_new_line();
        this.x_offset_same_line = this.compute_offset_same_line();
    }
    // Need `this.vect_offset_new_line` to be computed
    compute_offset_same_line() {
        let vect = createVector(this.dims[0] / 2, -this.dims[1] / 2);
        vect = vect.setMag(vect.mag() + this.dims[2]);
        let next_x = p5.Vector.add(this.vect_offset_new_line, vect)
        return next_x.x;
    }
    compute_offset_new_line() {
        let p1 = createVector(0, 0);
        let p2 = createVector(this.dims[0] / 2, this.dims[1] / 2);
        let vect = createVector(p2.x - p1.x, p2.y - p1.y);
        return vect.setMag(vect.mag() + this.dims[2]);
    }
    draw(image) {
        let x, y;
        let apply_offset;
        let pillar_length;

        x = 0;
        y = -2 * this.vect_offset_new_line.y;
        apply_offset = true;
        pillar_length = image.height;
        image.strokeWeight(this.outline);
        image.stroke(this.colors[3]);
        console.log(this.x_offset_same_line);
        console.log(this.vect_offset_new_line);
        while(y < image.height) {
            while(x < image.width) {
                if(random(0, 1) == 0) {
                    x += this.x_offset_same_line;
                    continue;
                }
                let new_y = y + random(-100, 100);
                image.fill(this.colors[0]);
                image.quad(
                    x, new_y + this.dims[1] / 2,
                    x + this.dims[0] / 2, new_y,
                    x + this.dims[0], new_y + this.dims[1] / 2,
                    x + this.dims[0] / 2, new_y + this.dims[1]
                );
                image.fill(this.colors[1]);
                image.quad(
                    x, new_y + this.dims[1] / 2,
                    x + this.dims[0] / 2, new_y + this.dims[1],
                    x + this.dims[0] / 2, new_y + this.dims[1] + pillar_length,
                    x, new_y + this.dims[1] / 2 + pillar_length,
                );
                image.fill(this.colors[2]);
                image.quad(
                    x + this.dims[0], new_y + this.dims[1] / 2,
                    x + this.dims[0] / 2, new_y + this.dims[1],
                    x + this.dims[0] / 2, new_y + this.dims[1] + pillar_length,
                    x + this.dims[0], new_y + this.dims[1] / 2 + pillar_length,
                )
                x += this.x_offset_same_line;
            }
            x = apply_offset ? -this.vect_offset_new_line.x: 0
            apply_offset = !apply_offset;
            y += this.vect_offset_new_line.y;
        }
    }
}
