let drawer;

function setup() {
    let canvas = createCanvas(1080, 1080);
    background(220);
    drawer = new InfiniteRainbowDrawer(
        [
            {'fill': 'white', 'radius': 12},
            {'fill': 'black', 'radius': 4},
            {'fill': 'white', 'radius': 12},
            {'fill': 'black', 'radius': 4},
            {'fill': 'white', 'radius': 12},
            {'fill': 'black', 'radius': 4},
            {'fill': 'white', 'radius': 12},
            {'fill': 'black', 'radius': 4},
            {'fill': 'white', 'radius': 12},
            {'fill': 'black', 'radius': 6},
        ]
    );
    drawer.draw_random_color_line(['#EAB2A0', '#A76F6F', '#435B66', '#2D4356'], [0, 2, 4, 6, 8], 2);
    //drawer.draw();
}

function draw() {
}
