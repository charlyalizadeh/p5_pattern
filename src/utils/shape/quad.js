function get_outline_line_opposite(p1, p2, width, center) {
    let norm;
    let p1_outline;
    let p2_outline;


    norm = line_norm(p1, p2);
    p1_outline = p5.Vector.add(p1, norm);
    if(point_dist(p1_outline, center) < point_dist(p1, center)) {
        norm.mult(-1);
    }
    norm.mult(width);
    p1_outline = p5.Vector.add(p1, norm);
    p2_outline = p5.Vector.add(p2, norm);
    return Line(p1_outline, p2_outline);
}

class Quad {
    constructor(p1, p2, p3, p4, color) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.color = color;
        this.center = line_intersection(this.p1, this.p3, this.p2, this.p4);
    }
    outline_edge(width) {
        let outline1, outline2, outline3, outline4;
        let new_p1, new_p2, new_p3, new_p4;


        outline1 = get_outline_line_opposite(this.p1, this.p2, width, this.center);
        outline2 = get_outline_line_opposite(this.p2, this.p3, width, this.center);
        outline3 = get_outline_line_opposite(this.p3, this.p4, width, this.center);
        outline4 = get_outline_line_opposite(this.p4, this.p1, width, this.center);
        new_p2 = outline1.intersect(outline2);
        new_p3 = outline2.intersect(outline3);
        new_p4 = outline3.intersect(outline4);
        new_p1 = outline4.intersect(outline1);
        return Quad(new_p1, new_p2, new_p3, new_p4);
    }
    fill(image) {
        image.fill(this.color);
        image.stroke(this.color);
        image.quad(
            this.p1.x, this.p1.y,
            this.p2.x, this.p2.y,
            this.p3.x, this.p3.y,
            this.p4.x, this.p4.y
        );
    }
}
