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
    draw(image) {
        let i;


        clear();
        this.circle_template.origin.x = 0;
        this.circle_template.origin.y = 0;
        i = 0;
        while(this.circle_template.origin.y < height + this.accumulated_radius) {
            while(this.circle_template.origin.x < width + this.accumulated_radius) {
                this.circle_template.fill(image);
                this.circle_template.origin.x += this.width_offset;
            }
            this.circle_template.origin.y += this.height_offset;
            if(i % 2 == 0)
                this.circle_template.origin.x = 0;
            else
                this.circle_template.origin.x = this.between_line_offset;
            i++;
        }
    }
    draw_random_color_line(image, colors, outline, line_per_color) {
        let i;
        let current_color_index;
        let color_to_apply;


        clear();
        this.circle_template.origin.x = 0;
        this.circle_template.origin.y = 0;
        i = 0;
        current_color_index = 0;
        while(this.circle_template.origin.y < height + this.accumulated_radius) {
            if(i % line_per_color == 0) {
                color_to_apply = colors[current_color_index % colors.length];
                current_color_index++;
                for(let j = 0; j < outline.length; j++) {
                    this.circle_template.outline_props[outline[j]]['fill'] = color_to_apply;
                }
            }
            while(this.circle_template.origin.x < width + this.accumulated_radius) {
                this.circle_template.fill(image);
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
    draw_random_color(image, colors, outline, probability) {
        let i;
        let r
        let color_to_apply;
        let old_color;


        clear();
        this.circle_template.origin.x = 0;
        this.circle_template.origin.y = 0;
        i = 0;
        while(this.circle_template.origin.y < height + this.accumulated_radius) {
            while(this.circle_template.origin.x < width + this.accumulated_radius) {
                r = random(1)
                console.log(r);
                if(r <= probability) {
                    color_to_apply = colors[int(random(colors.length))];
                    old_color = []
                    for(let j = 0; j < outline.length; j++) {
                        old_color.push(this.circle_template.outline_props[outline[j]]['fill']);
                        this.circle_template.outline_props[outline[j]]['fill'] = color_to_apply;
                    }
                    this.circle_template.fill(image);

                    for(let j = 0; j < outline.length; j++) {
                        this.circle_template.outline_props[outline[j]]['fill'] = old_color[j];
                    }
                }
                else {
                    this.circle_template.fill(image);
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
