class Circle {
    constructor(origin, outline_props) {
        this.origin = origin;
        this.outline_props = outline_props;
    }
    fill(image) {
        for(let i = this.outline_props.length - 1; i >= 0; i--) {
            image.strokeWeight(0);
            image.fill(this.outline_props[i]['fill']);
            image.circle(this.origin.x, this.origin.y,  this.outline_props[i]['accumulated_radius']);
        }
    }
}

