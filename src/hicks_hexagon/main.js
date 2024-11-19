let drawer;
let graphics;
let WIDTH = 1080;
let HEIGHT = 1080;

function setup() {
    let canvas = createCanvas(WIDTH, HEIGHT);
    graphics = createGraphics(WIDTH, HEIGHT);
    graphics.background("black");
    drawer = new HicksHexagonDrawer(
        {
            'dim': [2 * 26, 2 * 14, 2 * 8],
            'color': '#981F24'
        },
        {
            'size': [2 * 14, 2 * 7],
            'color': [['black'], '#DF5F18']
        }
    )
    drawer.draw(graphics);
    image(graphics, 0, 0, WIDTH, HEIGHT);
}

function draw() {
}
