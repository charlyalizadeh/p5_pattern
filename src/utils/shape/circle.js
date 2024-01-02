class Circle {
    constructor(origin, outline_props) {
        this.image = image;
        this.origin = origin;
        this.outline_props = outline_props;
    }

    draw() {
        for(let i = this.outline_props.length - 1; i >= 0; i--) {
            strokeWeight(0);
            fill(this.outline_props[i]['fill']);
            circle(this.origin.x, this.origin.y,  this.outline_props[i]['accumulated_radius']);
        }
    }
}

