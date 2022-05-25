class MouseTracker {

    draw() {
        let newX = mouseX + windowHeight / 200;
        let newY = mouseY + windowHeight / 100;
        let sizeFactor = windowHeight / 25;

        strokeWeight(1.5);
        stroke(10, 105, 10);


        fill(0)
        circle(newX, newY, sizeFactor);

        line(0, newY, newX - sizeFactor/3, newY);
        line(windowWidth, newY, newX + sizeFactor/3, newY);
        line(newX, 0, newX, newY - sizeFactor/3);
        line(newX, windowHeight, newX, newY + sizeFactor/3);
    }

    init() {
        
    }

}

class Effect {

    constructor(duration, delay) {
        this.startTime = new Date();
        this.duration = duration;
        this.delay = delay;
    }

    init() {
        this.startTime = new Date();
    }

    draw() {
        
    }


    end() {

    }
}

class Title extends Effect {

    constructor(duration, text, x, y, size) {
        super(duration, 0);
        this.text = text;
        this.x = x;
        this.y = y;
        this.size = size;
    }

    init() {
        super.init();
    }

    draw() {
        let progress = (new Date().getTime() - this.startTime.getTime()) / this.duration;
        textAlign(CENTER, CENTER);
        textFont('Courier New');
        textSize(this.size);
        fill(10, 185, 10);
        noStroke();

        if (progress > 1) {
            text(this.text, this.x, this.y);
        } else {
            text(this.text.slice(0, Math.ceil(this.text.length * progress)), this.x, this.y);
        }
    }
}

class Fader extends Effect {

    constructor(duration, delay, lines) {
        super(duration, delay);

        this.lines = lines;
    }

    init() {
        super.init();
    }

    draw() {
        let progress = ((new Date().getTime() - this.delay) - this.startTime.getTime()) / this.duration;
        textAlign(CENTER, CENTER);
        textSize(19);
        textFont('Courier New');
        noStroke();

        if (progress > 0) {
            fill(10, 185, 10, Math.abs(Math.sin(progress * Math.PI * this.lines.length)) * 255);
            text(this.lines[Math.floor(progress * this.lines.length) % this.lines.length], windowWidth/2, windowHeight/1.6);
        }
    }

}

class GravityObject {

    constructor(x, y) {
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.pos = createVector(x, y);
    }

    init() {
        
    }

    draw() {
        this.acc.add(0, 0.04);

        // acceleration becomes velocity
        this.vel.add(this.acc);
        this.acc = createVector(0, 0);

        // velocity becomes position
        if (this.vel.mag() > 20) {
            this.vel.setMag(20); // Clamp a max velocity
        }
        this.pos.add(this.vel);
    }

}

class Bubble extends GravityObject {

    constructor(r) {
        super(Math.random() * windowWidth, Math.random() * windowHeight);
        this.r = r;
    }

    init() {
        this.pos = createVector(Math.random() * windowWidth, Math.random() * windowHeight);
        this.vel = createVector((Math.random() * 5) - 2.5, -Math.random() * 5);
    }

    draw() {
        super.draw();

        stroke(10, 185, 10);
        noFill();

        // ellipse(this.pos.x, this.pos.y, this.r + (this.r/20 * Math.sin((this.pos.x + this.pos.y)/20)), this.r - (this.r/20 * Math.sin((this.pos.x + this.pos.y)/20)));
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

}

class Paragraph extends Effect {

    constructor(duration, text, x, y) {
        super(duration, 0);
        this.text = text;
        this.x = x;
        this.y = y;
    }

    init() {
        super.init();
    }

    draw() {
        let progress = (new Date().getTime() - this.startTime.getTime()) / this.duration;
        textAlign(LEFT, TOP);
        textFont('Courier New');
        textSize(18);
        fill(10, 185, 10);
        noStroke();

        if (progress > 1) {
            text(this.text, this.x, this.y, windowWidth * 0.9);
        } else {
            text(this.text.slice(0, Math.ceil(this.text.length * progress)), this.x, this.y, windowWidth * 0.9);
        }
    }

}

class References extends Effect {

    constructor(duration, delay, lines) {
        super(duration, delay);

        this.lines = lines;
    }

    init() {
        // Resume
    }

    draw() {
        let progress = ((new Date().getTime() - this.delay) - this.startTime.getTime()) / this.duration;

        if (progress > 0) {
            textAlign(LEFT, CENTER);
            textSize(16);
            fill(10, 185, 10);
            noStroke();

            let offset = Math.PI / this.lines.length;
            this.lines.forEach((t, i) => {
                push();
                translate(windowWidth/10, windowHeight/2);
                rotate(2 * Math.PI * progress + (i * offset * 2));
                text(t, windowWidth/6, 0, windowWidth*0.45);
                pop();
            });
        } else {
            textAlign(LEFT, CENTER);
            textSize(16);
            fill(10, 185, 10);
            noStroke();

            let offset = Math.PI / this.lines.length;
            this.lines.forEach((t, i) => {
                push();
                translate(windowWidth/10, windowHeight/2);
                rotate(i * offset * 2);
                text(t, windowWidth/6, 0, windowWidth*0.45);
                pop();
            });
        }
    }

}





const screens = [
    [
        new MouseTracker()
    ],
    [
        // Paragraph display
    ],
    [
        // Gravity display
    ],
    [
        
    ]
];

let titleText, references, RATText;
let subtitleText = [
    "PAY NO ATTENTION TO THAT MAN BEHIND THE CURTAIN.",
    "YOU ARE BEING PROFILED, STAY CALM.",
    "PLEASE DISABLE ADBLOCKER.",
    "I CAN'T BELIEVE IT'S NOT ELECTION FRAUD!",
    "DO YOU HAVE TWO-FACTOR AUTHENTICATION?",
    "THOSE WHO PLAY WITH THE DEVIL'S TOYS...",
    "PLEASE RATE THIS EXPERIENCE ON A SCALE FROM 1-5.",
    "AND FOR MY NEXT TRICK...",
    "WHAT THEY DON'T KNOW WE KNOW CAN'T HURT THEM.",
    "VEGAN, AND CRUELTY-FREE."
];

let currentScreen = 0;



window.preload = function() {

    titleText = loadStrings('title.txt');
    references = loadStrings('references.txt');
    RATText = loadStrings('RAT.txt');
}


window.setup = function() {
    // canvas takes up 99% of the window space
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');

    // Set the background to black
    background(0);

    frameRate(144);
    angleMode(RADIANS);

    screens[0].push(new Title(2600, titleText.join("\n"), windowWidth/2, windowHeight/2.2, 12.5));
    screens[0].push(new Fader(subtitleText.length * 5000, 2700, subtitleText));

    screens[1].push(new Paragraph(1000, RATText.join("\n"), 100, 100));


    for (let i  = 0; i < 20; i++) {
        screens[2].push(new Bubble(30));
    }

    screens[screens.length - 1].push(new Title(1000, "References:", windowWidth/10, windowHeight/2, 45));
    screens[screens.length - 1].push(new References(300000, 1500, references));
}



window.draw = function() {
    // Reset the canvas
    resizeCanvas(windowWidth, windowHeight);
    background(0);

    screens[currentScreen].forEach(x => x.draw());
}


window.keyPressed = function(keyEvent) {
    if (keyCode === LEFT_ARROW) {
        if (currentScreen > 0) {
            currentScreen--;
            screens[currentScreen].forEach(x => x.init());
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (currentScreen < (screens.length - 1)) {
            currentScreen++;
            screens[currentScreen].forEach(x => x.init());
        }
    }
}





