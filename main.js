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

class Strained extends Title {

    constructor(duration, text, x, y, size) {
        super(duration, text, x, y, size);
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
            push();
            scale(1, 1 - Math.abs(Math.sin((progress - 1)/2)/8, 0));
            text(this.text, this.x, this.y + windowHeight/3 * Math.abs(Math.sin((progress - 1)/2)/8, 0));
            pop();
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

    moveTo(target, range) {
        let toTarget = p5.Vector.sub(target, this.pos);
        toTarget.setMag(toTarget.mag() - range);
        this.vel.add(toTarget);
    }

    accTo(target, range) {
        let toTarget = p5.Vector.sub(target, this.pos);
        toTarget.setMag(toTarget.mag() - range);
        this.acc.add(toTarget);
    }

    teleportTo(target, range) {
        let toTarget = p5.Vector.sub(target, this.pos);
        toTarget.setMag(toTarget.mag() - range);
        this.pos.add(toTarget);
    }

    draw() {
        this.acc.add(0, 0.01);

        // acceleration becomes velocity
        this.vel.add(this.acc);
        this.acc = createVector(0, 0);

        // velocity becomes position
        if (this.vel.mag() > 100) {
            this.vel.setMag(100); // Clamp a max velocity
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
        textSize(17);
        fill(10, 185, 10);
        noStroke();

        if (progress > 1) {
            text(this.text, this.x, this.y, windowWidth * 0.8);
        } else {
            text(this.text.slice(0, Math.ceil(this.text.length * progress)), this.x, this.y, windowWidth * 0.8);
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

class ChainLink extends GravityObject {

    constructor(link_length, x, y) {
        super(x, y);
        this.link_length = link_length;
    }

    draw() {
        noFill();
        stroke(10, 185, 10);
        circle(this.pos.x, this.pos.y, this.link_length * 2);
    }

}

class TextChainLink extends GravityObject {

    constructor(text, x, y) {
        super(x, y);
        this.text = text;
        textAlign(CENTER, CENTER);

        this.link_length = textWidth(text.split("\n").sort((o, j) => j.length - o.length)[0]) + (textWidth("W"));
    }

    draw() {
        textAlign(CENTER, CENTER);
        textFont('Courier New');
        textSize(22);
        fill(10, 185, 10);
        noStroke();

        text(this.text, this.pos.x, this.pos.y);

        // noFill();
        // stroke(10, 185, 10);
        // circle(this.pos.x, this.pos.y, this.link_length * 2);
    }
}

class Chain { 

    constructor(link_count, link_length, fixX, fixY, names) {
        this.text = text;
        this.link_length = link_length;
        this.fixture = createVector(fixX, fixY);
        this.links = [];
        names.forEach(name => {
            for (let i = 0; i < link_count; i++) {
                this.links.push(new ChainLink(link_length, fixX + i * link_length * 1000, fixY));            
            }
            this.links.push(new TextChainLink(name, fixX + link_length * 1000, fixY));
        })

    }

    init() {
        
    }

    inverseKinematics() {
        
    }

    draw() {
        // this.links[0].accTo(this.fixture, 0);

        // Reach towards chain end
        // for (let i = (this.links.length - 2); i > -1; i--) {
        //     const link = this.links[i];
            
        //     link.teleportTo(this.links[i + 1].pos, this.link_length * 5);
        // }


        // this.links[this.links.length - 1].teleportTo(createVector(mouseX, mouseY), 0);
        this.links[0].teleportTo(createVector(mouseX, mouseY), 0);
        
        // Maintain Chain-ness
        for (let i = 1; i < this.links.length; i++) {
            const link = this.links[i];
            
            link.teleportTo(this.links[i - 1].pos, this.links[i].link_length + this.links[i - 1].link_length);
        }
        
        this.links.forEach(link => link.draw());
    }



}

class Note {

    constructor(text, width, height, x, y) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.width = width;
        this.height = height;
    }

    init() {

    }

    draw() {
        textAlign(LEFT, TOP);
        textFont('Courier New');
        textSize(16.5);
        fill(10, 185, 10);
        noStroke();

        text(this.text, this.x, this.y, this.width);

        noFill();
        stroke(10, 185, 10);
        strokeWeight(2);
        rect(this.x - this.width * 0.1, this.y - this.width * 0.1, this.width * 1.2, this.height);
    }

}












const screens = [];

let titleText, references, RATText, RATTitle, strainTitle, strainText, cybercrimeText, cybercrimeTitle, introTitle, introText, neutralTitle, neutralText;
let subtitleText = [
    "PAY NO ATTENTION TO THAT MAN BEHIND THE CURTAIN.",
    "YOU ARE BEING PROFILED, STAY CALM.",
    "PLEASE DISABLE ADBLOCKER.",
    "I CAN'T BELIEVE IT'S NOT ELECTION FRAUD!",
    "TRUST US.",
    "ARE YOU BROWSING IN INCOGNITO MODE?",
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
    RATTitle = loadStrings('wehavearat.txt');
    strainTitle = loadStrings('StrainTitle.txt');
    strainText = loadStrings('strain.txt');
    cybercrimeText = loadStrings('cybercrime.txt');
    cybercrimeTitle = loadStrings('crimeTitle.txt');
    introTitle = loadStrings('introTitle.txt');
    introText = loadStrings('intro.txt');
    neutralTitle = loadStrings('neutral.txt');
    neutralText = loadStrings('neutralText.txt');
}


window.setup = function() {
    // canvas takes up 99% of the window space
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');

    // Set the background to black
    background(0);

    frameRate(144);
    angleMode(RADIANS);

    screens.push([]);
    screens[screens.length - 1].push(new MouseTracker());
    screens[screens.length - 1].push(new Title(2600, titleText.join("\n"), windowWidth/2, windowHeight/2.2, 12.5));
    screens[screens.length - 1].push(new Fader(subtitleText.length * 4800, 2700, subtitleText));
    screens[screens.length - 1].push(new Note("NOTE: \nNavigate with the Left and Right arrow keys.", windowWidth * 0.12, windowHeight * 0.11, windowWidth * 0.05, windowWidth * 0.05));

    screens.push([]);
    screens[screens.length - 1].push(new Title(750, introTitle.join("\n"), windowWidth * 0.5, windowWidth * 0.08, 20));
    screens[screens.length - 1].push(new Paragraph(1000, introText.join("\n"), windowWidth * 0.1, windowHeight * 0.3));
    screens[screens.length - 1].push(new Note("NOTE: \nIf the text is incorrectly sized, try zooming in/out and reloading the page (F5).", windowWidth * 0.13, windowHeight * 0.16, windowWidth * 0.05, windowWidth * 0.05));


    screens.push([]);
    screens[screens.length - 1].push(new Title(750, cybercrimeTitle.join("\n"), windowWidth * 0.5, windowWidth * 0.08, 20));
    screens[screens.length - 1].push(new Paragraph(1000, cybercrimeText.join("\n"), windowWidth * 0.1, windowHeight * 0.3));
    
    screens.push([]);
    screens[screens.length - 1].push(new Title(750, RATTitle.join("\n"), windowWidth * 0.5, windowWidth * 0.08, 20));
    screens[screens.length - 1].push(new Paragraph(1000, RATText.join("\n"), windowWidth * 0.1, windowHeight * 0.3));
    
    screens.push([]);
    screens[screens.length - 1].push(new Title(750, neutralTitle.join("\n"), windowWidth * 0.5, windowWidth * 0.08, 20));
    screens[screens.length - 1].push(new Paragraph(1000, neutralText.join("\n"), windowWidth * 0.1, windowHeight * 0.3));

    screens.push([]);
    screens[screens.length - 1].push(new Strained(750, strainTitle.join("\n"), windowWidth * 0.5, windowWidth * 0.08, 20));
    screens[screens.length - 1].push(new Paragraph(1000, strainText.join("\n"), windowWidth * 0.1, windowHeight * 0.3));

    screens.push([]);
    screens[screens.length - 1].push(new Title(750, "Credits:", windowWidth * 0.1, windowHeight * 0.1, 40));
    screens[screens.length - 1].push(new Chain(100, 1, 500, 500, ["Zoey Tan\nWen Xuan", "Selina\nWilkinson", "Sneha\nRoy", "Toby\nNelson", "Wesley\nGriffiths"].sort((o, j) => o.localeCompare(j))));
    screens[screens.length - 1].push(new Note("NOTE: \nTry moving the mouse :)", windowWidth * 0.13, windowHeight * 0.09, windowWidth * 0.8, windowHeight * 0.1));

    screens.push([]);
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





