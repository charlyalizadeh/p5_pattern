function get_pattern(name) {
    let hexagon_props, outline_props;
    switch(name) {
        case 'shining':
            hexagon_props = {
                'dim': [26, 14, 8],
                'color': '#981F24'
            }
            outline_props = {
                'size': [14, 7],
                'color': ['black', '#DF5F18']
            }
    }
    return new HicksHexagonDrawer(hexagon_props, outline_props);
}

class LayerGui {
    constructor(id, color, size) {
        this.id = id;
        this.color_picker = createColorPicker(color)
        this.size_slider = createSlider(1, 100, size);
        this.text = createP(`Layer ${this.id}:`);
        this.text.style('font-size', '32px');
    }
    draw(x, y) {
        this.text.position(x, y - 64);
        this.color_picker.position(x + 110, y - 25);
        this.size_slider.position(x + 180, y - 25);
    }
}
class MainHexagonGui {
    constructor(width, height, triangle_height, color) {

        console.log(width);
        console.log(height);
        console.log(triangle_height);
        console.log(color);
        this.text = createP('Main hexagon');
        this.text.style('font-size', '64px');

        this.color_picker = createColorPicker(color);
        this.label_color_picker = createP('Color: ');
        this.label_color_picker.style('font-size', '32px');

        this.width_slider = createSlider(1, 100, width);
        this.label_width_slider = createP('Width: ');
        this.label_width_slider.style('font-size', '32px');

        this.height_slider = createSlider(1, 100, height);
        this.label_height_slider = createP('Height: ');
        this.label_height_slider.style('font-size', '32px');

        this.triangle_height_slider = createSlider(1, 100, triangle_height);
        this.label_triangle_height_slider = createP('Triangle height: ');
        this.label_triangle_height_slider.style('font-size', '32px');
    }
    draw(x, y) {
        this.text.position(x, y - 128);

        this.color_picker.position(x + 100, y + 20);
        this.label_color_picker.position(x, y - 20);

        this.width_slider.position(x + 100, y + 80);
        this.label_width_slider.position(x, y + 40);

        this.height_slider.position(x + 100, y + 130);
        this.label_height_slider.position(x, y + 90);

        this.triangle_height_slider.position(x + 210, y + 180);
        this.label_triangle_height_slider.position(x, y + 140);

    }
}

class HicksHexagonGui {
    constructor() {
        this.canvas_pattern = createGraphics(1000, 1000);
        this.drawer = get_pattern(this.canvas_pattern, 'shining');
        this.main_hexagon = new MainHexagonGui(
            this.drawer.hexagon_props['dim'][0],
            this.drawer.hexagon_props['dim'][1],
            this.drawer.hexagon_props['dim'][2],
            this.drawer.hexagon_props['color']
        );
        this.layers = [];
        this.btn_add_layer = createButton('Add layer')
        this.btn_add_layer.style('font-size', '32px');
        this.btn_add_layer.mousePressed(() => {
            this.drawer.add_layer(5, 'black');
            this.update_layers();

        })
        this.update_layers();
    }
    update_layers() {
        for(let i = 0; i < this.drawer.outline_props['color'].length / 2; i++) {
            if(i > this.layers.length - 1) {
                this.layers.push(new LayerGui(
                    i,
                    this.drawer.outline_props['color'][i],
                    this.drawer.outline_props['size'][i]
                ));
            }
        }
    }

    draw() {
        this.drawer.draw()
        image(this.canvas_pattern, 0, 0, 1000, 1000);
        this.main_hexagon.draw(1000, 64);
        this.drawer.hexagon_props['color'] = this.main_hexagon.color_picker.color();
        this.drawer.hexagon_props['dim'][0] = this.main_hexagon.width_slider.value();
        this.drawer.hexagon_props['dim'][1] = this.main_hexagon.height_slider.value();
        this.drawer.hexagon_props['dim'][2] = this.main_hexagon.triangle_height_slider.value();


        for(let i = 0; i < this.layers.length; i++) {
            this.layers[i].draw(1000, 364 + (i + 1) * 32);
            this.drawer.outline_props['color'][i] = this.layers[i].color_picker.color();
            this.drawer.outline_props['size'][i] = this.layers[i].size_slider.value();
        }
        this.btn_add_layer.position(1000, 364 + (this.layers.length + 1) * 32)
        this.drawer.update_props();
    }
}
