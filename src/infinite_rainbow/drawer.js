class InfiniteRainbowDrawer {
    constructor(outline_props) {
        this.outline_props = outline_props.slice();
        this.compute_accumulated_radius();
        this.circle_template = new Circle(
            createVector(0, 0),
            outline_props.slice()
        )
        this.width_offset = this.get_width_offset();
        this.height_offset = this.get_height_offset();
        this.between_line_offset = this.get_between_line_offset();
    }

    get_width_offset() {
        return this.accumulated_radius;
    }
    get_height_offset() {
        return this.accumulated_radius / 4;
    }
    get_between_line_offset() {
        return this.accumulated_radius / 2;
    }
    update_offsets() {
        this.width_offset = this.get_width_offset();
        this.height_offset = this.get_height_offset();
        this.between_line_offset = this.get_between_line_offset();
    }
    update_circle_template_outline_props() {
        this.circle_template.outline_props = this.outline_props.slice();
    }
    compute_accumulated_radius() {
        this.accumulated_radius = 0;
        for(let i = 0; i < this.outline_props.length; i++) {
            this.outline_props[i]['accumulated_radius'] = this.outline_props[i]['radius'] + this.accumulated_radius;
            this.accumulated_radius += this.outline_props[i]['radius'];
        }
    }
    update_fill() {
        this.update_circle_template_outline_props();
    }
    update_radius() {
        this.compute_accumulated_radius()
        this.update_offsets();
        this.update_circle_template_outline_props();
    }

    add_outline() {
        this.outline_props.push(
            {'fill': 'black', 'radius': 10}
        )
        this.update_radius();
    }
    rem_outline() {
        this.outline_props = this.outline_props.splice(0, this.outline_props.length - 1);
        this.update_radius();
    }


    draw() {
        clear();
        this.circle_template.origin.x = 0;
        this.circle_template.origin.y = 0;
        let i = 0;
        while(this.circle_template.origin.y < height + this.accumulated_radius) {
            while(this.circle_template.origin.x < width + this.accumulated_radius) {
                this.circle_template.draw();
                this.circle_template.origin.x += this.width_offset;
            }
            this.circle_template.origin.y += this.height_offset;
            if(i % 2 == 0) {
                this.circle_template.origin.x = 0;
            }
            else {
                this.circle_template.origin.x = this.between_line_offset;
            }
            i++;
        }
    }

    draw_random_color_line(colors, outline, line_per_color) {
        clear();
        this.circle_template.origin.x = 0;
        this.circle_template.origin.y = 0;
        let i = 0;
        let current_color_index = 0;
        while(this.circle_template.origin.y < height + this.accumulated_radius) {
            if(i % line_per_color == 0) {
                let color_to_apply = colors[current_color_index % colors.length];
                current_color_index++;
                for(let j = 0; j < outline.length; j++) {
                    this.circle_template.outline_props[outline[j]]['fill'] = color_to_apply;
                }
            }
            while(this.circle_template.origin.x < width + this.accumulated_radius) {
                this.circle_template.draw();
                this.circle_template.origin.x += this.width_offset;
            }
            this.circle_template.origin.y += this.height_offset;
            if(i % 2 == 0) {
                this.circle_template.origin.x = 0;
            }
            else {
                this.circle_template.origin.x = this.between_line_offset;
            }
            i++;
        }
    }
    draw_random_color(colors, outline, probability) {
        clear();
        this.circle_template.origin.x = 0;
        this.circle_template.origin.y = 0;
        let i = 0;
        while(this.circle_template.origin.y < height + this.accumulated_radius) {
            while(this.circle_template.origin.x < width + this.accumulated_radius) {
                let r = random(1)
                console.log(r);
                if(r <= probability) {
                    let color_to_apply = colors[int(random(colors.length))];
                    let old_color = []
                    for(let j = 0; j < outline.length; j++) {
                        old_color.push(this.circle_template.outline_props[outline[j]]['fill']);
                        this.circle_template.outline_props[outline[j]]['fill'] = color_to_apply;
                    }
                    this.circle_template.draw();

                    for(let j = 0; j < outline.length; j++) {
                        this.circle_template.outline_props[outline[j]]['fill'] = old_color[j];
                    }
                }
                else {
                    this.circle_template.draw();
                }
                this.circle_template.origin.x += this.width_offset;
                this.circle_template.outline_props = this.outline_props.slice();
            }
            this.circle_template.origin.y += this.height_offset;
            if(i % 2 == 0) {
                this.circle_template.origin.x = 0;
            }
            else {
                this.circle_template.origin.x = this.between_line_offset;
            }
            i++;
        }
    }
}
