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

    constructor(duration, text) {
        super(duration, 0);
        this.text = text;
    }

    // init() {
    //     super();
    // }

    draw() {
        let progress = (new Date().getTime() - this.startTime.getTime()) / this.duration;
        textAlign(CENTER, CENTER);
        textFont('Courier New');
        textSize(12);
        fill(10, 185, 10);
        noStroke();

        if (progress > 1) {
            text(this.text, windowWidth/2, windowHeight/2.2);
        } else {
            text(this.text.slice(0, Math.ceil(this.text.length * progress)), windowWidth/2, windowHeight/2.2);
        }
    }
}

class Fader extends Effect {

    constructor(duration, delay, lines) {
        super(duration, delay);

        this.lines = lines;
    }

    draw(x, y) {
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






const screens = [
    [
        new MouseTracker()
    ]
];

let titleText;
let subtitleText = [
    "PAY NO ATTENTION TO THAT MAN BEHIND THE CURTAIN.",
    "YOU ARE BEING PROFILED, STAY CALM.",
    "PLEASE DISABLE ADBLOCKER.",
    "I CAN'T BELIEVE IT'S NOT ELECTION FRAUD!",
    "DO YOU HAVE TWO-FACTOR AUTHENTICATION?",
    "THOSE WHO PLAY WITH THE DEVIL'S TOYS",
    "PLEASE RATE THIS EXPERIENCE ON A SCALE FROM 1-5.",
    "AND FOR MY NEXT TRICK...",
    "VEGAN, AND CRUELTY-FREE."
];



window.preload = function() {

    titleText = loadStrings('title.txt');

}


window.setup = function() {
    // canvas takes up 99% of the window space
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');

    // Set the background to black
    background(0);

    frameRate(144);


    screens[0].push(new Title(3000, titleText.join("\n")));
    screens[0].push(new Fader(subtitleText.length * 5000, 3100, subtitleText));
}



window.draw = function() {
    // Reset the canvas
    resizeCanvas(windowWidth, windowHeight);
    background(0);

    screens[0].forEach(x => x.draw());


}


window.keyPressed = function(keyEvent) {
    
}




