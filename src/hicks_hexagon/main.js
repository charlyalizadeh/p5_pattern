let drawer;
let drawer_canvas;
let s = 400;
let graphics;
var capturer = new CCapture( { format: 'webm' } );

function setup() {
    let canvas = createCanvas(1080, 1080);
    background("#2D506C");
    graphics = createGraphics(1080, 1080);
    background_canvas = createGraphics(1080, 1080);
    drawer = get_pattern('shining');
    drawer_canvas = new HicksHexagonDrawer(
        {
            "dim": [26 * 3, 14 * 3, 8 * 3],
            "color": "#2D506C"
        },
        {
            "size": [14 * 3, 7 * 3],
            "color": ["#284861", "#244057"]
        }
    );
    canvas.position(0, 0);
    drawer.draw(graphics);
    drawer_canvas.draw(background_canvas);
    background_canvas.stroke("black");
    background_canvas.strokeWeight(20)
    background_canvas.quad(200, 200,
         200, 880,
         880, 880,
         880, 200);
    image(background_canvas, 0, 0, 1080, 1080);
}

function draw() {
    if(s == 400)
        capturer.start();
    image(graphics, 200, 200, 680, 680, s, s, 680, 680);
    s -= 0.5;
    console.log(`${s}`);
    if(s <= 0) {
        console.log("STOPPED");
        s = 400;
        capturer.stop();
        capturer.save();
        return;
    }
    capturer.capture(canvas);
}
