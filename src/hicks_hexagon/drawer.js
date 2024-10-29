class HicksHexagonDrawer {
    constructor(image, hexagon_props, layer_props) {
        super(image);
        this.hexagon_props = hexagon_props;
        this.layer_props = layer_props;

        this.setup_add_layer_mirror()
        this.n_layer = this.layer_props['size'].length;
        this.setup_add_layer_width()
        this.setup_save_template_hexagons()
        this.n_hexagon = this.hexagons_template.length;
        this.setup_compute_offset_x()
        this.setup_compute_offset_y()
        this.setup_compute_offset_row()
        this.setup_add_line_height()

        let last_hexagon = this.hexagons_template[this.n_hexagon - 1];
        this.padding_x = 2 * last_hexagon.width;
        this.padding_y = 2 * (last_hexagon.height + last_hexagon.triangle_height * 2);
    }
    setup_add_layer_mirror() {
        let temp_size_reversed = this.layer_props['size'].slice();
        temp_size_reversed.reverse();
        let temp_color_reversed = this.layer_props['color'].slice();
        temp_color_reversed.reverse();
        this.layer_props['size'] = this.layer_props['size'].concat(temp_size_reversed);
        this.layer_props['color'] = this.layer_props['color'].concat(temp_color_reversed);
    }
    setup_add_layer_width() {
        this.layer_props['width'] = [];
        for(let i = 0; i < this.layer_props['size'].length; i++) {
            if(i == 0) {
                this.layer_props['width'].push(this.layer_props['size'][i]);
            }
            else {
                this.layer_props['width'].push(this.layer_props['size'][i] * 2 + this.layer_props['width'][i - 1]);
            }
        }
    }
    setup_save_template_hexagons() {
        this.hexagons_template = [new Hexagon(
            createVector(0, 0),
            this.hexagon_props['dim'][0],
            this.hexagon_props['dim'][1],
            this.hexagon_props['dim'][2],
        )];
        for(let i = 0; i < this.layer_props['size'].length; i++) {
            let hexagon = this.hexagons_template[i].outline_edge(this.layer_props['size'][i]);
            this.hexagons_template.push(hexagon);
        }
    }
    setup_add_line_height() {
        this.layer_props['line_height'] = [];
        this.layer_props['line_reverse_height'] = [];
        for(let i = 0; i <= this.layer_props['size'].length - 1; i++) {
            let offset_vector = this.hexagons_template[this.n_hexagon - i - 1].outline_line_up_right(1).vector;
            offset_vector.mult((this.hexagons_template[this.n_hexagon - i - 1].width / 2) / offset_vector.x);

            let upper_point = this.hexagons_template[this.n_hexagon - i - 1].up.copy()
            upper_point.add(-this.offset_x, -this.offset_y)
            upper_point.add(offset_vector)
            let line_reverse_height = -(this.hexagons_template[0].up.y - upper_point.y);

            this.layer_props['line_reverse_height'].push(
                line_reverse_height
            )

            if(i == 0) {
                let temp_hexagon = this.hexagons_template[this.n_hexagon - 2];
                // TODO: Easier way to compute this but I'm tired
                let height = (temp_hexagon.up.y) - (temp_hexagon.up.y - this.offset_row + temp_hexagon.triangle_height + temp_hexagon.height / 2 + this.hexagons_template[0].height / 2 + this.hexagons_template[0].triangle_height)
                this.layer_props['line_height'].push(height);
            }
            else {
                this.layer_props['line_height'].push(0);
            }
        }
    }
    setup_compute_offset_x() {
        this.offset_x = this.hexagon_props['dim'][0] / 2 - this.layer_props['size'][0] / 2;
        for(let i = 0; i < this.layer_props['size'].length; i++) {
            this.offset_x += this.layer_props['size'][i];
        }
    }
    setup_compute_offset_y() {
        let offset_vector = this.hexagons_template[2].outline_line_down_right(1).vector;
        offset_vector.mult(this.offset_x / offset_vector.x);
        let last_hexagon = this.hexagons_template[this.n_hexagon - 1];
        this.temp_jsp = this.hexagons_template[0].down.y - last_hexagon.up.y;
        this.offset_y = this.temp_jsp + offset_vector.y;
    }
    setup_compute_offset_row() {
        let last_hexagon = this.hexagons_template[this.n_hexagon - 1];
        let before_last_hexagon = this.hexagons_template[this.n_hexagon - 2];
        let offset_vector = last_hexagon.outline_line_up_right(1).vector;
        offset_vector.mult((last_hexagon.width / 2 - this.layer_props['size'][0] / 2) / offset_vector.x)
        this.temp_offset_vector = offset_vector;
        this.offset_row = (before_last_hexagon.down.y + this.offset_y) - (last_hexagon.up.y + offset_vector.y) - 0.2
    }
    update_props() {
        this.layer_props['size'] = this.layer_props['size'].splice(0, Math.ceil(this.n_layer / 2))
        this.layer_props['color'] = this.layer_props['color'].splice(0, Math.ceil(this.n_layer / 2))
        this.setup_add_layer_mirror()
        this.n_layer = this.layer_props['size'].length;
        this.setup_add_layer_width()
        this.setup_save_template_hexagons()
        this.n_hexagon = this.hexagons_template.length;
        this.setup_compute_offset_x()
        this.setup_compute_offset_y()
        this.setup_compute_offset_row()
        this.setup_add_line_height()

        let last_hexagon = this.hexagons_template[this.n_hexagon - 1];
        this.padding_x = 2 * last_hexagon.width;
        this.padding_y = 2 * (last_hexagon.height + last_hexagon.triangle_height * 2);
    }
    add_layer(size, color) {
        this.layer_props['size'] = this.layer_props['size'].splice(0, Math.ceil(this.n_layer / 2))
        this.layer_props['color'] = this.layer_props['color'].splice(0, Math.ceil(this.n_layer / 2))
        this.layer_props['size'].push(size);
        this.layer_props['color'].push(color);
        this.setup_add_layer_mirror()
        this.n_layer = this.layer_props['size'].length;
        this.setup_add_layer_width()
        this.setup_save_template_hexagons()
        this.n_hexagon = this.hexagons_template.length;
        this.setup_compute_offset_x()
        this.setup_compute_offset_y()
        this.setup_compute_offset_row()
        this.setup_add_line_height()

        let last_hexagon = this.hexagons_template[this.n_hexagon - 1];
        this.padding_x = 2 * last_hexagon.width;
        this.padding_y = 2 * (last_hexagon.height + last_hexagon.triangle_height * 2);
    }


    draw_hexagon(x, y, add_outer_layer=true, reverse=false) {
        // Main hexagon
        let hexagon = new Hexagon(
            createVector(x, y),
            this.hexagon_props['dim'][0],
            this.hexagon_props['dim'][1],
            this.hexagon_props['dim'][2],
        )
        let hexagons = [];

        // Build the layers
        let current_hexagon = hexagon;
        let offset_layer = add_outer_layer ? 0 : 1;
        for(let i = 0; i < this.layer_props['size'].length - offset_layer; i++) {
            current_hexagon = current_hexagon.outline_edge(this.layer_props['size'][i])
            hexagons.push(current_hexagon);
        }

        // Draw the layer
        let line_y = hexagon.down.y;
        let line_height = this.layer_props['line_height'];
        if(reverse) {
            line_y = hexagon.up.y;
            line_height = this.layer_props['line_reverse_height'];;
        }
        for(let i = hexagons.length - 1; i >= 0; i--) {
            let temp_x = x + hexagon.width / 2 - this.layer_props['width'][i] / 2;
            this.image.fill(this.layer_props['color'][i]);
            hexagons[i].fill(this.layer_props['color'][i], this.image);
            this.image.rect(temp_x, line_y, this.layer_props['width'][i], line_height[i]);
        }


        this.image.fill(this.hexagon_props['color']);
        hexagon.fill(this.hexagon_props['color'], this.image);
    }
    draw_up_down_hexagons() {
        let x = -this.padding_x;
        let y = -this.padding_y;
        while(y < this.image.height + this.padding_y) {
            x = -this.padding_x;
            while(x < this.image.width + this.padding_x) {
                this.draw_hexagon(x, y);
                x += 2 * this.offset_x;
            }
            y += this.offset_row;
        }
    }
    draw_down_up_hexagons() {
        let x = -this.padding_x;
        let y = -this.padding_y + this.offset_y;

        while(y < this.image.height + this.padding_y) {
            x = -this.padding_x + this.offset_x;
            while(x < this.image.width + this.padding_x) {
                this.draw_hexagon(x, y, false, true);
                x += 2 * this.offset_x;
            }
            y += this.offset_row;
        }
    }
    draw() {
        this.draw_up_down_hexagons();
        this.draw_down_up_hexagons();
    }
}
