let drawer_fg, drawer_bg;
let s_fg, s_bg;
let graphics_fg, graphics_bg;
let capturer;
let record = false;

function setup() {
    let canvas = createCanvas(1080, 1080);
    s_fg = 400;
    s_bg = 0;

    graphics_fg = createGraphics(1080 * 5, 1080 * 5);
    graphics_bg = createGraphics(1080 * 5, 1080 * 5);

    //graphics_fg.background("black");
    //graphics_bg.background("#344955");

    drawer_fg = new NoeJacket(
        [
            {"color": "#000B58", "width": 2, "length": 40 },
            {"color": "#FFF4B7", "width": 5 },
            {"color": "#003161", "width": 5 },
            {"color": "#006A67", "width": 5 },
            {"color": "#FFF4B7", "width": 4 },
            {"color": "#003161", "width": 4 },
            {"color": "#006A67", "width": 4 },
            {"color": "#FFF4B7", "width": 2 },
            {"color": "#003161", "width": 2 },
            {"color": "#006A67", "width": 2 },
        ],
        20,
        null
    );
    drawer_bg = new IsoCubePattern([50, 22, 14], 1, ["#800000", "#982B1C", "#DAD4B5", "#F2E8C6"]);
    canvas.position(0, 0);
    drawer_fg.draw(graphics_fg);
    drawer_bg.draw(graphics_bg);
    stroke("black");
    strokeWeight(20)
    quad(200, 200,
         200, 880,
         880, 880,
         880, 200);
    capturer = new CCapture( { format: 'webm' } );
    image(graphics_bg, 0, 0, 1080, 1080);
}


function draw() {
    clear();
    if(record && s_fg == 400)
        capturer.start();
    image(graphics_bg, 0, 0, 1080, 1080, s_bg, s_bg, 1080, 1080);
    image(graphics_fg, 200, 200, 680, 680, s_fg, s_fg, 680, 680);
    stroke("#FFF4B7");
    strokeWeight(20)
    fill(0, 0, 0, 0)
    quad(200, 200, 200, 880, 880, 880, 880, 200);
    stroke("#006A67");
    strokeWeight(10)
    fill(0, 0, 0, 0)
    quad(200, 200, 200, 880, 880, 880, 880, 200);
    stroke("#FFF4B7");
    strokeWeight(5)
    fill(0, 0, 0, 0)
    quad(200, 200, 200, 880, 880, 880, 880, 200);

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
