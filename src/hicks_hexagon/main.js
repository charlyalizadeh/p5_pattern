let drawer;

function setup() {
    let canvas = createCanvas(1920, 1080);
    let graphics = createGraphics(1920, 1080);
    drawer = get_pattern(graphics, 'shining');
    canvas.position(0, 0);
    drawer.draw();
    image(graphics, 0, 0, 1920, 1080);
}

function draw() {
}
