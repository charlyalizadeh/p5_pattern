let drawer_fg, drawer_bg;
let s;
let graphics_fg, graphics_bg;
let capturer;
let record = false;

function setup() {
    let canvas = createCanvas(1080, 1080);
    s = 400;

    graphics_fg = createGraphics(1080, 1080);
    graphics_bg = createGraphics(1080, 1080);

    graphics_fg.background("black");
    graphics_bg.background("#344955");

    drawer_fg = get_pattern('shining');
    drawer_bg = new HicksHexagonDrawer(
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
    drawer_fg.draw(graphics_fg);
    drawer_bg.draw(graphics_bg);
    graphics_bg.stroke("black");
    graphics_bg.strokeWeight(20)
    graphics_bg.quad(200, 200,
         200, 880,
         880, 880,
         880, 200);
    capturer = new CCapture( { format: 'webm' } );
    image(graphics_bg, 0, 0, 1080, 1080);
}

function draw() {
    if(record && s == 400)
        capturer.start();
    image(graphics_fg, 200, 200, 680, 680, s, s, 680, 680);
    s -= 0.5;
    console.log(`${s}`);
    if(s <= 0) {
        console.log("STOPPED");
        s = 400;
        if(record) {
            capturer.stop();
            capturer.save();
        }
        return;
    }
    if(record)
        capturer.capture(canvas);
}
