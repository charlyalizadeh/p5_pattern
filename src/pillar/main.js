let drawer;

function setup() {
    let canvas = createCanvas(1080, 1080);
    background("#9DB2BF")

    let graphics = createGraphics(1080, 1080);
    drawer = new PillarDrawer([200, 100, 50], 1, ["#C4DAD2", "#6A9C89", "#16423C", "black"]);
    drawer.draw(graphics);
    image(graphics, 0, 0, 1080, 1080);
}

function draw() {

}
