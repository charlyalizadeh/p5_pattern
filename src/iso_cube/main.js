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

    graphics_fg.background("black");
    graphics_bg.background("#344955");

    drawer_fg = new IsoCubePattern([50, 22, 14], 0, ["#E8DBC8", "#C84741", "#A9C3BD", "#000000"])
    drawer_bg = new IsoCubePattern([50 * 2, 22 * 2, 14 * 2], 0, ["#D8D9DA", "#61677A", "#272829", "#000000"])

    canvas.position(0, 0);
    drawer_fg.draw(graphics_fg);
    drawer_bg.draw(graphics_bg);
    capturer = new CCapture( { format: 'webm' } );
    image(graphics_bg, 0, 0, 1080, 1080);
}

function draw() {
    if(record && s_fg == 400)
        capturer.start();
    image(graphics_bg, 0, 0, 1080, 1080, s_bg, s_bg, 1080, 1080);
    stroke("black");
    strokeWeight(20)
    quad(200, 200,
         200, 880,
         880, 880,
         880, 200);
    image(graphics_fg, 200, 200, 680, 680, s_fg, s_fg, 680, 680);
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
