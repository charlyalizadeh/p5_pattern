let drawer;

function setup() {
    let canvas = createCanvas(1080, 1080);
    background('#B99B6B');
    let graphics = createGraphics(1080, 1080);
    drawer = new NoeJacket(
        graphics,
        [
            {'color': '#B99B6B', 'width': 5, 'length': 50},
            {'color': '#698269', 'width': 8},
            {'color': '#AA5656', 'width': 8},
            {'color': '#698269', 'width': 16},
            {'color': 'white', 'width': 2},
        ],
        20,
        null
    );
    canvas.position(0, 0);
    stroke(0);
    drawer.draw();
}

function draw() {
}
