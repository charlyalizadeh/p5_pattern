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
        this.compute_absolute_width();
    }
    /**
     * Compute the unit vector for each branch of the cross.
     */
    compute_branch_unit_vector() {
        let unit_vector;


        this.branch_unit_vector = [];
        for(let i = 0; i < this.nbranch; i++) {
            unit_vector = createVector(0, -1);
            unit_vector.rotate(-this.offset_rotation - this.offset_angle['radian'] * i).normalize();
            this.branch_unit_vector.push(unit_vector);
        }
    }
    /**
     * Compute the absolute width for each outline.
     * 
     * Each outline is given a relative width that corresponds to its distance
     * from the outline it preceeds. To draw an outline we need to compute
     * it's distance from the origin.
     */
    compute_absolute_width() {
        this.absolute_width = this.outline_props[0]['width'];
        for(let i = 1; i < this.outline_props.length; i++) {
            this.outline_props[i]['absolute_width'] = this.absolute_width + this.outline_props[i]['width'];
            this.absolute_width += this.outline_props[i]['width'];
        }
    }
    /**
     * Compute the vertices of the main branches' quads
     * 
     * @param {Int} branch the branch id
     * @returns a 4 a dimensional array containing the points defining the quad of the branch `branch`
     */
    get_outline_points_main_cross(branch) {
        let normal_vector;
        let bottom_right, bottom_left;
        let branch_vector;
        let top_right, top_left;


        // Compute the normal vector of the branch to compute the "bottom" vertices
        normal_vector = p5.Vector.rotate(this.branch_unit_vector[branch], PI / 2);
        normal_vector.normalize().mult(this.outline_props[0]['width']);
        
        // Use the normal vector computed above to compute the 4 vertex of the quad
        bottom_right = p5.Vector.add(this.origin, p5.Vector.mult(normal_vector, -1));
        bottom_left = p5.Vector.add(this.origin, normal_vector);
        branch_vector = p5.Vector.mult(this.branch_unit_vector[branch], this.outline_props[0]['length']);
        top_right = p5.Vector.add(bottom_right, branch_vector);
        top_left = p5.Vector.add(bottom_left, branch_vector);
        return [bottom_right, bottom_left, top_left, top_right];
    }
    /**
     * Compute the vertices of the first outline branches' quads
     * 
     * @param {Int} branch the branch id
     * @returns a 5 a dimensional array containing the points defining the quad and the triangle of the given first outline
     */
    get_outline_points_first_outline(branch) {
        let normal_vector;
        let bottom_right, bottom_left;
        let branch_vector;
        let trig_top;
        let trig_right_vect, trig_left_vect;
        let line_right, line_left;
        let line_trig_right, line_trig_left;
        let top_right, top_left;


        // Compute the normal vector of the branch to compute the "bottom" vertices
        normal_vector = p5.Vector.rotate(this.branch_unit_vector[branch], PI / 2);
        normal_vector = p5.Vector.rotate(this.branch_unit_vector[branch], PI / 2);
        normal_vector.normalize().mult(this.outline_props[1]['absolute_width']);
        bottom_right = p5.Vector.add(this.origin, normal_vector);
        bottom_left = p5.Vector.add(this.origin, p5.Vector.mult(normal_vector, -1));

        // The outlines have a triangle at the end of their branch
        branch_vector = p5.Vector.mult(this.branch_unit_vector[branch], this.outline_props[0]['length'] + this.offset_first_outline);
        trig_top = p5.Vector.add(this.origin, branch_vector);
        trig_right_vect = p5.Vector.rotate(
            this.branch_unit_vector[branch],
            this.offset_angle['radian']
        ).normalize().mult(20);
        trig_left_vect = p5.Vector.rotate(
            this.branch_unit_vector[branch],
            -this.offset_angle['radian']
        ).normalize().mult(20);

        line_right = new Line(bottom_right, p5.Vector.add(bottom_right, this.branch_unit_vector[branch]));
        line_left = new Line(bottom_left, p5.Vector.add(bottom_left, this.branch_unit_vector[branch]));

        line_trig_right = new Line(trig_top, p5.Vector.add(trig_top, trig_right_vect));
        line_trig_left = new Line(trig_top, p5.Vector.add(trig_top, trig_left_vect));

        top_right = line_right.intersect(line_trig_right);
        top_left = line_left.intersect(line_trig_left);
        return [bottom_right, bottom_left, top_left, trig_top, top_right];
    }
    /**
     * 
     * @param {Int} branch the branch id
     * @param {Int} outline_id the outline id
     * @returns a 5 a dimensional array containing the points defining the quad and the triangle of the given outline
     */
    get_outline_points_outline(branch, outline_id) {
        let normal_vector;
        let branch_vector;
        let bottom_right, bottom_left;
        let trig_top;
        let trig_right_vect, trig_left_vect;
        let line_right, line_left;
        let line_trig_right, line_trig_left;
        let top_right, top_left;


        normal_vector = p5.Vector.rotate(this.branch_unit_vector[branch], PI / 2);
        normal_vector.normalize().mult(this.outline_props[outline_id]['absolute_width']);
        bottom_right = p5.Vector.add(this.origin, normal_vector);
        bottom_left = p5.Vector.add(this.origin, p5.Vector.mult(normal_vector, -1));
        branch_vector = p5.Vector.mult(
            this.branch_unit_vector[branch],
            this.outline_props[0]['length'] + this.offset_first_outline + this.outline_props[outline_id]['absolute_width'] - this.outline_props[0]['width'] - this.outline_props[1]['width']
        );
        trig_top = p5.Vector.add(this.origin, branch_vector);
        trig_right_vect = p5.Vector.rotate(
            this.branch_unit_vector[branch],
            this.offset_angle['radian']
        ).normalize().mult(20);
        trig_left_vect = p5.Vector.rotate(
            this.branch_unit_vector[branch],
            -this.offset_angle['radian']
        ).normalize().mult(20);

        line_right = new Line(bottom_right, p5.Vector.add(bottom_right, this.branch_unit_vector[branch]));
        line_left = new Line(bottom_left, p5.Vector.add(bottom_left, this.branch_unit_vector[branch]));

        line_trig_right = new Line(trig_top, p5.Vector.add(trig_top, trig_right_vect));
        line_trig_left = new Line(trig_top, p5.Vector.add(trig_top, trig_left_vect));

        top_right = line_right.intersect(line_trig_right);
        top_left = line_left.intersect(line_trig_left);
        return [bottom_right, bottom_left, top_left, trig_top, top_right];
    }
    draw_main_cross(image) {
        let points;


        image.fill(this.outline_props[0]["color"]);
        for(let b = 0; b < this.nbranch; b++) {
            let points = this.get_outline_points_main_cross(b);
            image.quad(
                points[0].x, points[0].y,
                points[1].x, points[1].y,
                points[2].x, points[2].y,
                points[3].x, points[3].y,
            );
        }
    }
    draw_branch_number(image) {
        let points;
        let p;
        

        image.strokeWeight(1);
        image.textSize(16);
        image.fill(0, 102, 153)
        for(let b = 0; b < this.nbranch; b++) {
            points = this.get_outline_points_outline(b, this.outline_props.length - 1);
            p = points[points.length - 2];
            image.text(b, p.x, p.y);
        }
    }
    draw_outlines(image) {
        let points;


        image.strokeWeight(0)
        for(let i = this.outline_props.length - 1; i > 0; i--) {
            console.log(`${this.outline_props[i]["color"]}`);
            image.fill(this.outline_props[i]["color"]);
            for(let b = 0; b < this.nbranch; b++) {
                points = [];
                if(i == 1) {
                    points = this.get_outline_points_first_outline(b);
                }
                else {
                    points = this.get_outline_points_outline(b, i);
                }
                image.beginShape(TESS);
                points.forEach(p => image.vertex(p.x, p.y));
                image.vertex(points[0].x, points[0].y);
                image.endShape(TESS);
            }
        }
    }
    fill(image) {
        this.draw_outlines(image);
        this.draw_main_cross(image);
    }
}
