canvas.height = 800;
canvas.width = 1000;

const ctx = canvas.getContext("2d");

let target = {x: canvas.width / 2, y: canvas.height / 2};

class MyObject {
    constructor(target) {
        this.target = target;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.size = 10 + Math.random() * 10;
        this.acceleration = 200 - this.size;
    }

    get angle() {
        return Math.atan2(this.target.y - this.y, this.target.x - this.x);
    }
    get distance() {
        return Math.pow(Math.pow(this.target.x - this.x, 2), Math.pow(this.target.y - this.y, 2), 0.5);
    }

    get xAcceleration() {
        return Math.cos(this.angle)/Math.pow(this.distance, 2) * this.acceleration;
    }

    get yAcceleration() {
        console.log(("getting yAcc"));
        return Math.sin(this.angle) * this.acceleration;
    }

    update(elapsed) {
        this.xSpeed += this.xAcceleration * elapsed;
        this.ySpeed += this.yAcceleration * elapsed;
        this.x += this.xSpeed * elapsed;
        this.y += this.ySpeed * elapsed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.restore();
    }
    
}

const objects = Array.from({length: 10}, () => {return new MyObject(target)});

function update(elapsed) {
    objects.forEach(o => o.update(elapsed));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach(o => o.draw(ctx));
    ctx.beginPath();
    ctx.arc(target.x, target.y, 5, 0, 2 * Math.PI);
    ctx.fill()
}

let p;
function frame(ts) {
    const elapsed = ts - p || 0;
    p = ts;
    update(elapsed / 1000);
    draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

canvas.addEventListener('mousemove', ev => {
    target.x = ev.offsetX
    target.y = ev.offsetY
});

window.objects = objects
window.target = target
