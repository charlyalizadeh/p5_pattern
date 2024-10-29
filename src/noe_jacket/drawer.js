class NoeJacket {
    constructor(image, outline_props, offset_first_outline, offset=null) {
        this.image = image;
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

        this.x_limit = this.compute_x_limit();
        this.y_limit = this.compute_y_limit();
    }

    compute_between_line_x_offset() {
        let cross = new Cross(
            createVector(0, 0),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        );
        let points = cross.get_outline_points_outline(1, this.outline_props.length - 1);
        let p = points[2];
        return cross.origin.x - p.x;
    }
    compute_offset() {
        let cross_1 = new Cross(
            createVector(50, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        );
        let cross_2 = new Cross(
            createVector(50 + this.between_line_x_offset, 109),
            3,
            this.outline_props,
            this.offset_first_outline,
            PI
        )
        let points_1 = cross_1.get_outline_points_outline(2, this.outline_props.length - 1);
        let p1 = points_1[points_1.length - 2];
        let points_2 = cross_2.get_outline_points_outline(1, this.outline_props.length - 1);
        let p2 = points_2[2];
        return 2 * (p2.x - p1.x);
    }
    compute_x_offset() {
        let cross = new Cross(
            createVector(50, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        )
        let points = cross.get_outline_points_outline(2, this.outline_props.length - 1);
        let p = points[3];
        let d = (p.x - cross.origin.x)
        return 2 * d + this.offset;
    }
    compute_y1_offset() {
        let cross = new Cross(
            createVector(50, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        );
        let points_1 = cross.get_outline_points_outline(1, this.outline_props.length - 1);
        let points_2 = cross.get_outline_points_outline(2, this.outline_props.length - 1);
        let l1 = new Line(points_1[1], points_1[2]);
        let l2 = new Line(points_2[0], points_2[4]);
        let bottom_point = l1.intersect(l2);
        let d1 = bottom_point.y - cross.origin.y;
        let d2 = points_1[2].y - cross.origin.y;
        return d1 + this.offset + d2;
    }
    compute_y2_offset() {
        let cross_1 = new Cross(
            createVector(50, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            PI
        )
        let cross_2 = new Cross(
            createVector(50 + this.x_offset, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            PI
        )
        let points_1 = cross_1.get_outline_points_outline(1, this.outline_props.length - 1);
        let points_2 = cross_2.get_outline_points_outline(2, this.outline_props.length - 1);
        let l1 = new Line(points_1[0], points_1[4]);
        let l2 = new Line(points_2[1], points_2[2]);
        let p = l1.intersect(l2);
        let d = abs(cross_1.origin.y - p.y)

        let points_0 = cross_1.get_outline_points_outline(0, this.outline_props.length - 1);
        let d2 = abs(points_0[3].y - cross_1.origin.y)
        return  - d + d2 + this.offset;
    }

    compute_x_limit() {
        let cross = new Cross(
            createVector(50 + this.x_offset, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        )
        let points_1 = cross.get_outline_points_outline(1, this.outline_props.length - 1);
        let points_2 = cross.get_outline_points_outline(2, this.outline_props.length - 1);
        return width + abs(points_1[3].y - points_2[3].y);
    }

    compute_y_limit() {
        let cross = new Cross(
            createVector(50 + this.x_offset, 50),
            3,
            this.outline_props,
            this.offset_first_outline,
            0
        )
        let points_1 = cross.get_outline_points_outline(0, this.outline_props.length - 1);
        let points_2 = cross.get_outline_points_outline(1, this.outline_props.length - 1);
        return height + abs(points_1[3].y - points_2[2].y);
    }

    draw() {
        let x = 0;
        let line_x_offset = 0;
        let y = 0;
        let i = 0;
        while(y < this.y_limit) {
            while(x - 6 * this.between_line_x_offset < this.x_limit) {
                this.cross_template.origin = createVector(line_x_offset + x, y);
                this.cross_template.draw();
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
