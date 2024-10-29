class Cross {
    constructor(origin, nbranch, outline_props, offset_first_outline=5, offset_rotation=0) {
        this.origin = origin;
        this.nbranch = nbranch;
        this.outline_props = outline_props;
        this.offset_first_outline = offset_first_outline;
        this.offset_rotation = offset_rotation;
        this.offset_angle = {
            'degree': 360 / this.nbranch,
            'radian': (2 * PI) / this.nbranch,
        }
        this.compute_branch_unit_vector();
        this.compute_accumulated_width();
    }

    compute_branch_unit_vector() {
        this.branch_unit_vector = [];
        for(let i = 0; i < this.nbranch; i++) {
            let unit_vector = createVector(0, -1);
            unit_vector.rotate(-this.offset_rotation - this.offset_angle['radian'] * i).normalize();
            this.branch_unit_vector.push(unit_vector);
        }
    }

    compute_accumulated_width() {
        this.accumulated_width = this.outline_props[0]['width'];
        for(let i = 1; i < this.outline_props.length; i++) {
            this.outline_props[i]['accumulated_width'] = this.accumulated_width + this.outline_props[i]['width'];
            this.accumulated_width += this.outline_props[i]['width'];
        }
    }
    get_outline_points_main_cross(branch) {
        let normal_vector = p5.Vector.rotate(this.branch_unit_vector[branch], PI / 2);
        normal_vector.normalize().mult(this.outline_props[0]['width']);
        let bottom_right = p5.Vector.add(this.origin, p5.Vector.mult(normal_vector, -1));
        let bottom_left = p5.Vector.add(this.origin, normal_vector);
        let branch_vector = p5.Vector.mult(this.branch_unit_vector[branch], this.outline_props[0]['length']);
        let top_right = p5.Vector.add(bottom_right, branch_vector);
        let top_left = p5.Vector.add(bottom_left, branch_vector);
        return [bottom_right, bottom_left, top_left, top_right];
    }
    get_outline_points_first_outline(branch) {
        let normal_vector = p5.Vector.rotate(this.branch_unit_vector[branch], PI / 2);
        normal_vector.normalize().mult(this.outline_props[1]['accumulated_width']);
        let bottom_right = p5.Vector.add(this.origin, normal_vector);
        let bottom_left = p5.Vector.add(this.origin, p5.Vector.mult(normal_vector, -1));
        let branch_vector = p5.Vector.mult(this.branch_unit_vector[branch], this.outline_props[0]['length'] + this.offset_first_outline);
        let trig_top = p5.Vector.add(this.origin, branch_vector);
        let trig_right_vect = p5.Vector.rotate(
            this.branch_unit_vector[branch],
            this.offset_angle['radian']
        ).normalize().mult(20);
        let trig_left_vect = p5.Vector.rotate(
            this.branch_unit_vector[branch],
            -this.offset_angle['radian']
        ).normalize().mult(20);


        let line_right = new Line(bottom_right, p5.Vector.add(bottom_right, this.branch_unit_vector[branch]));
        let line_left = new Line(bottom_left, p5.Vector.add(bottom_left, this.branch_unit_vector[branch]));


        let line_trig_right = new Line(trig_top, p5.Vector.add(trig_top, trig_right_vect));
        let line_trig_left = new Line(trig_top, p5.Vector.add(trig_top, trig_left_vect));

        let top_right = line_right.intersect(line_trig_right);
        let top_left = line_left.intersect(line_trig_left);
        return [bottom_right, bottom_left, top_left, trig_top, top_right];
    }

    get_outline_points_outline(branch, outline_id) {
        let normal_vector = p5.Vector.rotate(this.branch_unit_vector[branch], PI / 2);
        normal_vector.normalize().mult(this.outline_props[outline_id]['accumulated_width']);
        let bottom_right = p5.Vector.add(this.origin, normal_vector);
        let bottom_left = p5.Vector.add(this.origin, p5.Vector.mult(normal_vector, -1));
        let branch_vector = p5.Vector.mult(
            this.branch_unit_vector[branch],
            this.outline_props[0]['length'] + this.offset_first_outline + this.outline_props[outline_id]['accumulated_width'] - this.outline_props[0]['width'] - this.outline_props[1]['width']
        );
        let trig_top = p5.Vector.add(this.origin, branch_vector);
        let trig_right_vect = p5.Vector.rotate(
            this.branch_unit_vector[branch],
            this.offset_angle['radian']
        ).normalize().mult(20);
        let trig_left_vect = p5.Vector.rotate(
            this.branch_unit_vector[branch],
            -this.offset_angle['radian']
        ).normalize().mult(20);


        let line_right = new Line(bottom_right, p5.Vector.add(bottom_right, this.branch_unit_vector[branch]));
        let line_left = new Line(bottom_left, p5.Vector.add(bottom_left, this.branch_unit_vector[branch]));


        let line_trig_right = new Line(trig_top, p5.Vector.add(trig_top, trig_right_vect));
        let line_trig_left = new Line(trig_top, p5.Vector.add(trig_top, trig_left_vect));

        let top_right = line_right.intersect(line_trig_right);
        let top_left = line_left.intersect(line_trig_left);
        return [bottom_right, bottom_left, top_left, trig_top, top_right];
    }


    draw_main_cross() {
        fill(this.outline_props[0]['color']);
        for(let b = 0; b < this.nbranch; b++) {
            let points = this.get_outline_points_main_cross(b);
            quad(
                points[0].x, points[0].y,
                points[1].x, points[1].y,
                points[2].x, points[2].y,
                points[3].x, points[3].y,
            );
        }
    }
    draw_branch_number() {
        strokeWeight(1);
        textSize(16);
        fill(0, 102, 153)
        for(let b = 0; b < this.nbranch; b++) {
            let points = this.get_outline_points_outline(b, this.outline_props.length - 1);
            let p = points[points.length - 2];
            text(b, p.x, p.y);
        }
    }
    draw_outlines() {
        strokeWeight(0)
        for(let i = this.outline_props.length - 1; i > 0; i--) {
            fill(this.outline_props[i]['color']);
            for(let b = 0; b < this.nbranch; b++) {
                let points = [];
                if(i == 1) {
                    points = this.get_outline_points_first_outline(b);
                }
                else {
                    points = this.get_outline_points_outline(b, i);
                }
                beginShape(TESS);
                points.forEach(p => vertex(p.x, p.y));
                vertex(points[0].x, points[0].y);
                endShape(TESS);
            }
        }
    }

    draw(draw_outlines=true) {
        if(draw_outlines)
            this.draw_outlines();
        this.draw_main_cross();
    }
}
