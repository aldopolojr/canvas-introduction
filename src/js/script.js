// DECLARATION
const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let circles = [];
let colors = ['#292F36', '#4ECDC4', '#E0DDCF', '#FF6B6B', '#F3E8EE'];
let maxR = 50;
// let minR = 1;
let mouse = {
    'x': undefined,
    'y': undefined
}

// CODE PROCESS
canvas.width = innerWidth;
canvas.height = innerHeight;

init();
animate();

// EVENTS
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// FUNCTION
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < circles.length; i++){
        circles[i].update();
    }
}

function init(){
    circles = [];
    for (let i = 0; i < 1500; i++){
        let r = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - r * 2) + r;
        let y = Math.random() * (innerHeight - r * 2) + r;
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;
        let c = colors[Math.floor(Math.random() * colors.length)];
        circles.push(new Circle(x, y, dx, dy, r, c));
    }
}

// OBJECTS
function Circle(x ,y, dx, dy, r, c){

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minR = r;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = c;
        ctx.fill();
    }
    this.update = function(){
        if (this.x + this.r > innerWidth || this.x - this.r < 0){
            this.dx = -this.dx;
        }
    
        if (this.y + this.r > innerHeight || this.y - this.r < 0){
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if (this.r <= maxR){
                this.r += 1;
            }
        } else if (this.r >= this.minR){
            this.r -= 1;
        }

        this.draw();
    }
}