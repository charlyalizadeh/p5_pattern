let drawer;
let graphics;
let capturer;
let record = true;
let iteration;
let current;
let elapsed;
let WIDTH = 1920 * 2;
let HEIGHT = 1080 * 2;
let bg_circle = [];
let circle_limit = 5;


function setup() {
    let canvas = createCanvas(WIDTH, HEIGHT);

    graphics = createGraphics(WIDTH, HEIGHT);

    let main_colors = [
        ["#3A6D8C", "#001F3F", "#6A9AB0", "black"],
        ["#344955", "#35374B", "#50727B", "black"],
        ["#443C68", "#393053", "#635985", "black"],
        ["#265A5C", "#113C4A", "#3F7B70", "black"],
        ["#3C3D37", "#181C14", "#697565", "black"],
        ["#557C56", "#16423C", "#6A9C89", "black"],
        ["#3A6D8C", "#001F3F", "#6A9AB0", "black"],
        ["#344955", "#35374B", "#50727B", "black"],
        ["#443C68", "#393053", "#635985", "black"],
        ["#265A5C", "#113C4A", "#3F7B70", "black"],
        ["#3C3D37", "#181C14", "#697565", "black"],
        ["#557C56", "#16423C", "#6A9C89", "black"],
        ["black", "black", "black", "white"],
    ];
    let sphere_props = {
        "nb": 200,
        "width_limits": [[50, 200], [300, 1000]],
        "big_ratio": 0.10,
        "height_var": [0.75, 0.8],
        "length_ratio": 0.1,
        "offset_ratio": 0.15,
        "start": [-400, -4000],
        "end": [WIDTH + 200, HEIGHT + 5000],
        "offset_var": [[-20, 50], [-20, 100]],
        "offset_animation_limits": [[0.01, 0.1], [0.2, 0.35]],
        "colors": main_colors,
        "width_speed_ratio": 0.005,
        "y_limit": 2500
    };
    let star_props = {
        "nb": 3500,
        "start": [0, 0],
        "end": [WIDTH, HEIGHT + 5000],
        "colors": ["white", "#FFEB55", "#FFEB00"],
        "size_max": 6,
        "size_var": 0.3,
        "y_shift": -0.5,
    };
    let ratio = 0.1;
    drawer = new SpaceEggsDrawer(sphere_props, star_props, ratio, "black");
    image(graphics, 0, 0, WIDTH, HEIGHT);
    capturer = new CCapture( { format: 'webm' } );
    iteration = 0
    current = millis();
}

function draw() {
    elapsed = millis() / 10 - current;
    current = millis() / 10;
    if(record && iteration == 0)
        capturer.start();
    drawer.draw(graphics);
    drawer.update(graphics, elapsed);
    image(graphics, 0, 0, WIDTH, HEIGHT);
    if(record) {
        iteration += 1;
        console.log(iteration);
        capturer.capture(canvas);
    }
    if(iteration == 3000) {
        capturer.stop();
        capturer.save();
    }
}
