class Triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    get vectorp1p2() {
        let vect = createVector(this.p2.x - this.p1.x, this.p2.y - this.p1.y)
        if(vect.x < 0) {
            vect.mult(-1);
        }
        return vect;
    }
    get vectorp1p3() {
        let vect = createVector(this.p3.x - this.p1.x, this.p3.y - this.p1.y)
        if(vect.x < 0) {
            vect.mult(-1);
        }
        return vect;
    }
    get vectorp2p3() {
        let vect = createVector(this.p3.x - this.p2.x, this.p3.y - this.p2.y)
        if(vect.x < 0) {
            vect.mult(-1);
        }
        return vect;
    }
    get upper_bound_y() {
        return max([p1.y, p2.y, p3.y])
    }
    get lower_bound_y() {
        return min([p1.y, p2.y, p3.y])
    }
    limit_y_up(limit) {
        if(limit < this.upper_bound_y) { return; }
        let temp_array = [this.p1, this.p2, this.p3]


    }
}
