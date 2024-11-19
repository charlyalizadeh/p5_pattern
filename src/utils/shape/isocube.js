class IsoCube {
    constructor(origin, width, height, triangle_height, outline, colors) {
        this.hexagon = new Hexagon(origin, width, height, triangle_height);
        this.outline = outline;
        this.colors = colors;
        this.hexagon_outline = this.hexagon.outline_edge(outline);
        let p2 = p5.Vector.add(this.hexagon.origin, this.hexagon.outline_line_down_left(1).vector);
        this.center = line_intersection(
            this.hexagon.up, this.hexagon.down,
            this.hexagon.origin, p2
        );
        this.quad1 = new Quad(this.center, this.hexagon.origin, this.hexagon.up, this.hexagon.up_right, this.colors[0]);
        this.quad2 = new Quad(this.center, this.hexagon.down, this.hexagon.down_left, this.hexagon.origin, this.colors[1]);
        this.quad3 = new Quad(this.center, this.hexagon.up_right, this.hexagon.down_right, this.hexagon.down, this.colors[2]);
    }
    fill_shadow(image) {
        let midpoint1, midpoint2, midpoint3;
        let shadow_quad1, shadow_quad2;

        midpoint1 = line_midpoint(this.quad1.p1, this.quad1.p2);
        midpoint2 = line_midpoint(this.quad1.p2, this.quad1.p3);
        midpoint3 = line_midpoint(this.quad1.p3, this.quad1.p4);
        console.log(this.colors[4]);
        shadow_quad1 = new Quad(
            this.quad1.p2,
            midpoint2,
            line_midpoint(midpoint1, midpoint3),
            midpoint1,
            this.colors[3]
        );
        midpoint1 = line_midpoint(this.quad2.p4, this.quad2.p3);
        midpoint2 = line_midpoint(this.quad2.p1, this.quad2.p4);
        midpoint3 = line_midpoint(this.quad2.p1, this.quad2.p2);
        shadow_quad2 = new Quad(
            this.quad2.p4,
            midpoint2,
            line_midpoint(midpoint1, midpoint3),
            midpoint1,
            this.colors[3]
        );
        shadow_quad1.fill(image);
        shadow_quad2.fill(image)
    }
    fill(image, shadow=false) {
        this.hexagon_outline.fill(this.colors[3], image);
        if(this.outline > 0)
            this.hexagon_outline.fill(this.colors[3], image);
        image.noStroke()
        this.quad1.fill(image);
        this.quad2.fill(image);
        this.quad3.fill(image);
        if(this.outline > 0) {
            image.stroke(this.colors[3]);
            image.strokeWeight(this.outline);
            image.line(
                this.hexagon_outline.down.x, this.hexagon_outline.down.y,
                this.center.x, this.center.y,
            );
            image.line(
                this.hexagon_outline.origin.x, this.hexagon_outline.origin.y,
                this.center.x, this.center.y,
            )
            image.line(
                this.hexagon_outline.up_right.x, this.hexagon_outline.up_right.y,
                this.center.x, this.center.y,
            )
        }
        if(shadow)
            this.fill_shadow(image)
    }
}
