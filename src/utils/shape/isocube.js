class IsoCube {
    constructor(origin, width, height, triangle_height, outline) {
        this.hexagon = new Hexagon(origin, width, height, triangle_height);
        this.outline = outline;
        this.hexagon_outline = this.hexagon.outline_edge(outline);
        let p2 = p5.Vector.add(this.hexagon.origin, this.hexagon.outline_line_down_left(1).vector);
        this.center = line_intersection(
            this.hexagon.up, this.hexagon.down,
            this.hexagon.origin, p2
        );
        this.quad1 = new Quad(this.hexagon.up, this.hexagon.up_right, this.center, this.hexagon.origin);
        this.quad2 = new Quad(this.hexagon.origin, this.center, this.hexagon.down, this.hexagon.down_left);
        this.quad3 = new Quad(this.hexagon.up_right, this.hexagon.down_right, this.hexagon.down, this.center);
    }
    fill(colors, image) {
        //this.hexagon.fill('red', image);
        this.hexagon_outline.fill(colors[3], image);
        image.noStroke()
        this.quad1.fill(colors[0], image);
        this.quad2.fill(colors[1], image);
        this.quad3.fill(colors[2], image);
        image.stroke(colors[3]);
        image.strokeWeight(this.outline);
        image.line(
            this.hexagon.down.x, this.hexagon.down.y, 
            this.center.x, this.center.y,
        );
        image.line(
            this.hexagon.origin.x, this.hexagon.origin.y, 
            this.center.x, this.center.y,
        )
        image.line(
            this.hexagon.up_right.x, this.hexagon.up_right.y, 
            this.center.x, this.center.y,
        )
    }
}