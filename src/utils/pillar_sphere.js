class PillarSphere {
    constructor(origin, diameter, height, length, offset, ratio, colors, offset_limits, offset_animation) {
        this.origin = origin;
        this.diameter = diameter;
        this.height = height;
        this.length = length;
        this.offset = offset;
        this.ratio = ratio;
        this.colors = colors;
        this.offset_limits = offset_limits;
        this.offset_animation = offset_animation;

        this.build_pillars()
        this.n_pillar = 1;
    }
    build_pillars() {
        let x;
        let width, height;
        let pillar;


        this.n_pillar = this.height / (2 * this.length);
        this.total_height = this.height + this.n_pillar * 2 * this.offset;
        this.pillars_width = [];
        for(let i = 1; i < this.n_pillar; i++) {
            x = (this.n_pillar - i) / this.n_pillar;
            this.pillars_width.push(sqrt(1 - pow(x, 2)))
        }
        this.pillars_width.push(...this.pillars_width.slice().reverse());
        this.pillars = [];
        this.pillars_width.forEach((width_ratio, index) => {
            let width = width_ratio * this.diameter;
            let height = width_ratio * this.diameter * this.ratio;
            let pillar = new Pillar(
                createVector(
                    this.origin.x + this.diameter / 2 - width / 2,
                    this.origin.y + index * this.offset
                ),
                width,
                height,
                this.length,
                2,
                this.colors
            );
            this.pillars.push(pillar);
        });
    }
    update(elapsed) {
        if((this.offset >= this.offset_limits[1] && this.offset_animation > 0)
            || this.offset <= this.offset_limits[0] && this.offset_animation < 0)
            this.offset_animation = -this.offset_animation;
        this.offset += this.offset_animation * elapsed;
        this.origin.y -= this.offset_animation * elapsed * (this.n_pillar - 1.5);
        this.build_pillars();
    }
    draw(image) {
        for(let i = this.pillars.length - 1; i >= 0; i--)
            this.pillars[i].fill(image);
    }
}
