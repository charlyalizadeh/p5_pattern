class NoeJacket {
    constructor(outline_props, offset_first_outline, offset=null) {
        this.outline_props = outline_props;
        this.offset_first_outline = offset_first_outline;
        this.cross_template = new Cross(
            createVector(0, 0),
            3,
            outline_props,
            offset_first_outline,
            0
        );
        this.between_line_x_offset = this.compute_between_line_x_offset();
        this.offset = offset === null ? this.compute_offset() : offset;
        if(this.offset < 0) {
            this.offset = 1;
        }
        this.x_offset = this.compute_x_offset();
        this.y1_offset = this.compute_y1_offset();
        this.y2_offset = this.compute_y2_offset();
    }
    compute_between_line_x_offset() {
        let cross;
        let points;
        let p;


        cross = new Cross(
            createVector(0, 0),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        );
        points = cross.get_outline_points_outline(1, this.outline_props.length - 1);
        p = points[2];
        return cross.origin.x - p.x;
    }
    compute_offset() {
        let cross_1, cross_2;
        let points_1, points_2;
        let p1, p2;


        cross_1 = new Cross(
            createVector(50, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        );
        cross_2 = new Cross(
            createVector(50 + this.between_line_x_offset, 109),
            3,
            this.outline_props,
            this.offset_first_outline,
            PI
        )
        points_1 = cross_1.get_outline_points_outline(2, this.outline_props.length - 1);
        p1 = points_1[points_1.length - 2];
        points_2 = cross_2.get_outline_points_outline(1, this.outline_props.length - 1);
        p2 = points_2[2];
        return 2 * (p2.x - p1.x);
    }
    compute_x_offset() {
        let cross;
        let points;
        let p, d;


        cross = new Cross(
            createVector(50, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        )
        points = cross.get_outline_points_outline(2, this.outline_props.length - 1);
        p = points[3];
        d = (p.x - cross.origin.x)
        return 2 * d + this.offset;
    }
    compute_y1_offset() {
        let cross;
        let points_1, points_2;
        let l1, l2;
        let bottom_point;
        let d1, d2;


        cross = new Cross(
            createVector(50, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        );
        points_1 = cross.get_outline_points_outline(1, this.outline_props.length - 1);
        points_2 = cross.get_outline_points_outline(2, this.outline_props.length - 1);
        l1 = new Line(points_1[1], points_1[2]);
        l2 = new Line(points_2[0], points_2[4]);
        bottom_point = l1.intersect(l2);
        d1 = bottom_point.y - cross.origin.y;
        d2 = points_1[2].y - cross.origin.y;
        return d1 + this.offset + d2;
    }
    compute_y2_offset() {
        let cross_1, cross_2;
        let points_0, points_1, points_2;
        let l1, l2;
        let p, d, d2;

        cross_1 = new Cross(
            createVector(50, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            PI
        )
        cross_2 = new Cross(
            createVector(50 + this.x_offset, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            PI
        )
        points_1 = cross_1.get_outline_points_outline(1, this.outline_props.length - 1);
        points_2 = cross_2.get_outline_points_outline(2, this.outline_props.length - 1);
        l1 = new Line(points_1[0], points_1[4]);
        l2 = new Line(points_2[1], points_2[2]);
        p = l1.intersect(l2);
        d = abs(cross_1.origin.y - p.y)

        points_0 = cross_1.get_outline_points_outline(0, this.outline_props.length - 1);
        d2 = abs(points_0[3].y - cross_1.origin.y)
        return  - d + d2 + this.offset;
    }
    compute_x_limit(image) {
        let cross;
        let points_1, points_2;

        cross = new Cross(
            createVector(50 + this.x_offset, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        )
        points_1 = cross.get_outline_points_outline(1, this.outline_props.length - 1);
        points_2 = cross.get_outline_points_outline(2, this.outline_props.length - 1);
        return image.width + abs(points_1[3].y - points_2[3].y);
    }
    compute_y_limit(image) {
        let cross;
        let points_1, points_2;


        cross = new Cross(
            createVector(50 + this.x_offset, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        )
        points_1 = cross.get_outline_points_outline(0, this.outline_props.length - 1);
        points_2 = cross.get_outline_points_outline(1, this.outline_props.length - 1);
        return image.height + abs(points_1[3].y - points_2[2].y);
    }
    draw(image) {
        let x;
        let line_x_offset;
        let y;
        let i;


        x = 0;
        line_x_offset = 0;
        y = 0;
        i = 0;
        while(y < this.compute_y_limit(image)) {
            while(x - 6 * this.between_line_x_offset < this.compute_x_limit(image)) {
                this.cross_template.origin = createVector(line_x_offset + x, y);
                this.cross_template.fill(image);
                x += this.x_offset;
            }
            this.cross_template.offset_rotation += PI;
            this.cross_template.compute_branch_unit_vector();
            x = 0;
            if(i % 2 == 0) {
                line_x_offset += this.between_line_x_offset;
                y += this.y1_offset;
            }
            else {
                line_x_offset -= 2 * this.between_line_x_offset;
                y += this.y2_offset;
            }
            i++;
            if(i % 8 == 0) {
                line_x_offset = 0;
            }
        }
    }
}
