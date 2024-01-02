class PatternDrawer {
    constructor(image) {
        this.image = image;
        if(this.constructor == PatternDrawer) {
            throw new TypeError('Abstract class "PatternDrawer" cannot be instantiated directly');
        }
    }
    draw(x, y, width, height) {}
    save_to_png(width, height, path) {
        let image = createGraphics(width, height)
        this.draw(image);
        image.save(path, 'png');
    }
}
