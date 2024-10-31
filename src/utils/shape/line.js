function point_dist(p1, p2) {
    return sqrt(pow(p2.x - p1.x, 2) + pow(p2.y - p1.y, 2));
}

function line_intersection(p1, p2, p3, p4) {
    let x_um, x_den;
    let y_num, y_den;

    x_num = (p1.x*p2.y - p1.y*p2.x) * (p3.x - p4.x) - (p1.x - p2.x) * (p3.x*p4.y - p3.y*p4.x);
    x_den = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
    y_num = (p1.x*p2.y - p1.y*p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x*p4.y - p3.y*p4.x);
    y_den = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
    return createVector(x_num / x_den, y_num / y_den);
}

function line_midpoint(p1, p2) {
    return createVector((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
}

function line_norm(p1, p2) {
    let dx, dy;
    let norm;


    dx = p2.x - p1.x;
    dy = p2.y - p1.y;
    norm = createVector(-dy, dx)
    norm.normalize();
    return norm;
}

class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    get vector() {
        let vect;


        vect = createVector(this.p2.x - this.p1.x, this.p2.y - this.p1.y)
        if(vect.x < 0)
            vect.mult(-1);
        return vect;

    }
    intersect(line) {
        return line_intersection(this.p1, this.p2, line.p1, line.p2)
    }
    draw() {
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
}
