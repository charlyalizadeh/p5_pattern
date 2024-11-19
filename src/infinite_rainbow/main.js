let drawer_fg, drawer_bg;
let s_fg, s_bg;
let graphics_fg, graphics_bg;
let capturer;
let record = false;


function setup() {
    let canvas = createCanvas(1080, 1080);
    s_fg = 400;
    s_bg = 0;

    graphics_fg = createGraphics(1080, 1080);
    graphics_bg = createGraphics(1080 * 5, 1080 * 5);

    drawer_fg = new InfiniteRainbowDrawer(
        [
            {'fill': '#133E87', 'radius': 12},
            {'fill': '#CBDCEB', 'radius': 12},
            {'fill': '#608BC1', 'radius': 12},
            {'fill': '#133E87', 'radius': 12},
            {'fill': '#CBDCEB', 'radius': 12},
            {'fill': '#608BC1', 'radius': 12},
            {'fill': '#133E87', 'radius': 12},
            {'fill': 'white', 'radius': 3},
            {'fill': '#133E87', 'radius': 5},
            {'fill': 'white', 'radius': 3},
        ]
    );
    drawer_bg = new InfiniteRainbowDrawer(
        [
            {'fill': '#740938', 'radius': 3 *12},
            {'fill': 'black', 'radius': 3 *4},
            {'fill': '#CC2B52', 'radius': 3 *12},
            {'fill': 'black', 'radius': 3 *4},
            {'fill': '#AF1740', 'radius': 3 *12},
            {'fill': 'black', 'radius': 3 *4},
            {'fill': '#740938', 'radius': 3 *12},
            {'fill': 'black', 'radius': 3 *4},
        ]
    );

    graphics_fg.background("black");
    graphics_bg.background("#344955");

    canvas.position(0, 0);
    drawer_fg.draw(graphics_fg);
    drawer_bg.draw(graphics_bg);
    capturer = new CCapture( { format: 'webm' } );
    image(graphics_bg, 0, 0, 1080, 1080);
}

function draw() {
    if(record && s_fg == 400)
        capturer.start();
    image(graphics_bg, 0, 0, 1080, 1080, s_bg, 0, 1080, 1080);
    stroke("black");
    strokeWeight(20)
    quad(200, 200,
        200, 880,
        880, 880,
        880, 200);
    image(graphics_fg, 200, 200, 680, 680, s_fg, 0, 680, 680);
    s_fg -= 1;
    s_bg += 0.5;

    console.log(`${s_fg}`);
    if(s_fg <= 0) {
        console.log("STOPPED");
        s_fg = 400;
        s_bg = 0;
        if(record) {
            capturer.stop();
            capturer.save();
        }
        return;
    }
    if(record)
        capturer.capture(canvas);
}
