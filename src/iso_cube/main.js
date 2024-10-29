let drawer;

function setup() {
    let canvas = createCanvas(1080, 1080);
    background('#B99B6B');
    let graphics = createGraphics(1080, 1080);
    drawer = new IsoCubePattern(graphics, [50, 22, 14], 0);
    canvas.position(0, 0);
    //stroke(0);
    drawer.draw(["#E8DBC8", "#C84741", "#A9C3BD", "#000000"]);
    image(graphics, 0, 0, 1080, 1080);
}

function draw() {
}
