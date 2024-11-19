class SpaceEggsDrawer {
    constructor(sphere_props, star_props, ratio, bg_color) {
        this.nsphere = sphere_props["nb"];
        this.sphere_width_limits = sphere_props["width_limits"];
        this.sphere_big_ratio = sphere_props["big_ratio"];
        this.sphere_height_var = sphere_props["height_var"];
        this.sphere_length_ratio = sphere_props["length_ratio"];
        this.sphere_offset_ratio = sphere_props["offset_ratio"];
        this.sphere_origin_start = sphere_props["start"];
        this.sphere_origin_end = sphere_props["end"];
        this.sphere_colors = sphere_props["colors"];
        this.sphere_offset_var = sphere_props["offset_var"];
        this.sphere_offset_animation_limits = sphere_props["offset_animation_limits"];
        this.sphere_width_speed_ratio = sphere_props["width_speed_ratio"];
        this.sphere_y_limit = sphere_props["y_limit"];

        this.nstar = star_props["nb"];
        this.star_origin_start = star_props["start"];
        this.star_origin_end = star_props["end"];
        this.star_colors = star_props["colors"];
        this.star_size_max = star_props["size_max"];
        this.star_size_var = star_props["size_var"];
        this.star_y_shift = star_props["y_shift"];

        this.ratio = ratio;
        this.bg_color = bg_color;

        this.setup_spheres();
        this.setup_stars();
    }
    setup_spheres() {
        let is_big;
        let width, height;
        let length, offset;
        let offset_var;
        let offset_animation;


        this.spheres = [];
        for(let i = 0; i < this.nsphere; i++) {
            is_big = random(1) < this.sphere_big_ratio;
            width = is_big ? random(this.sphere_width_limits[1][0], this.sphere_width_limits[1][1]) :
                                 random(this.sphere_width_limits[0][0], this.sphere_width_limits[0][1]);
            height = width * random(this.sphere_height_var[0], this.sphere_height_var[1]);
            length = width * this.sphere_length_ratio;
            offset = width * this.sphere_offset_ratio;
            if(is_big) {
                offset_var = [offset + random(-1, this.sphere_offset_var[1][0]), offset + random(1, this.sphere_offset_var[1][1])]
                offset_animation = random(this.sphere_offset_animation_limits[1][0], this.sphere_offset_animation_limits[1][1]);
            }
            else {
                offset_var = [offset + random(-1, this.sphere_offset_var[0][0]), offset + random(1, this.sphere_offset_var[0][1])]
                offset_animation = random(this.sphere_offset_animation_limits[0][0], this.sphere_offset_animation_limits[0][1]);
            }
            this.spheres.push(new PillarSphere(
                createVector(random(this.sphere_origin_start[0], this.sphere_origin_end[0]),
                             random(this.sphere_origin_start[1], this.sphere_origin_end[1])),
                width,
                height,
                length,
                offset,
                this.ratio,
                this.sphere_colors[random([...Array(this.sphere_colors.length).keys()])],
                offset_var,
                offset_animation
            ))
            while(this.spheres[i].offset_animation == 0)
                this.spheres[i] = random(this.sphere_offset_animation_limits[0], this.sphere_offset_animation_limits[0])
            while(this.spheres[i].offset_limits[0] <= this.spheres[i].length) {
                if(is_big)
                    this.spheres[i].offset_limits[0] = offset + random(-1, this.sphere_offset_var[1][0])
                else
                    this.spheres[i].offset_limits[0] = offset + random(-1, this.sphere_offset_var[0][0])
            }
            this.spheres[i].fall_speed = width * this.sphere_width_speed_ratio;
        }
        this.spheres.sort(function(a, b) {return a.diameter + a.height > b.diameter + b.height; })
    }
    setup_stars() {
        this.stars = []

        for(let i = 0; i < this.nstar; i++)
            this.stars.push([
                random(this.star_origin_start[0], this.star_origin_end[0]),           // x
                random(this.star_origin_start[1], this.star_origin_end[1]),           // y
                random(this.star_size_max),                                           // radius
                this.star_colors[random([...Array(this.star_colors.length).keys()])]  // color
            ]);
    }
    update(image, elapsed) {
        for(let i = 0; i < this.spheres.length; i++) {
            this.spheres[i].update(elapsed);
            this.spheres[i].origin.y -= this.spheres[i].fall_speed * elapsed;
            if(this.spheres[i].origin.y + this.spheres[i].total_height < -this.sphere_y_limit)
                this.spheres[i].origin.y = this.spheres[i].total_height + this.sphere_y_limit;
        }
        for(let i = 0; i < this.stars.length; i++) {
            this.stars[i][1] += this.star_y_shift;
            let variation = random(-this.star_size_var, this.star_size_var);
            if(this.stars[i][2] > this.star_size_max) {
                variation = -this.star_size_var;
            }
            else if (this.stars[i][2] < -this.star_size_max) {
                variation = this.star_size_var;
            }
            this.stars[i][2] += variation;
        }
    }
    draw(image) {
        image.background(this.bg_color)
        for(let i = 0; i< this.stars.length; i++) {
            image.noStroke();
            image.fill(this.stars[i][3]);
            image.circle(...this.stars[i]);
        }
        for(let i = 0; i < this.spheres.length; i++)
            this.spheres[i].draw(image);
    }
}
