class Pillar {
    constructor(origin, width, height, length, outline, colors) {
        this.origin = origin;
        this.width = width;
        this.height = height;
        this.length = length;
        this.outline = outline;
        this.colors = colors;
    }
    fill(image) {
        let x, y;
        let pillar_length;

        if(this.length == -1)
            pillar_length = image.height + 10;
        else
            pillar_length = this.length;

        x = this.origin.x;
        y = this.origin.y;
        image.strokeWeight(this.outline);
        image.stroke(this.colors[3]);
        image.fill(this.colors[0]);
        image.quad(
            x, y + this.height / 2,
            x + this.width / 2, y,
            x + this.width, y + this.height / 2,
            x + this.width / 2, y + this.height
        );
        image.fill(this.colors[1]);
        image.quad(
            x, y + this.height / 2,
            x + this.width / 2, y + this.height,
            x + this.width / 2, y + this.height + pillar_length,
            x, y + this.height / 2 + pillar_length,
        )
        image.fill(this.colors[2]);
        image.quad(
            x + this.width, y + this.height / 2,
            x + this.width / 2, y + this.height,
            x + this.width / 2, y + this.height + pillar_length,
            x + this.width, y + this.height / 2 + pillar_length,
        )
    }
}
