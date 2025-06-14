// This script will be loaded dynamically by the main script.js
let angleSlider;
let angleValueSpan;

function setup() {
    let canvasContainer = document.getElementById('trig-canvas');
    let canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth * 0.75);
    canvas.parent('trig-canvas');
    angleMode(DEGREES);

    angleSlider = select('#angle-slider');
    angleValueSpan = select('#angle-value');
}

function draw() {
    background(getComputedStyle(document.documentElement).getPropertyValue('--header-bg'));
    let angle = angleSlider.value();
    angleValueSpan.html(angle);

    let h = 150; // Hypotenuse length
    let originX = width * 0.2;
    let originY = height * 0.8;

    let x = originX + h * cos(angle);
    let y = originY - h * sin(angle);

    translate(originX, originY);

    // Draw Adjacent (on X-axis) - Blue
    stroke('#3498db');
    strokeWeight(4);
    line(0, 0, h * cos(angle), 0);
    fill('#3498db');
    noStroke();
    text('Adjacent', (h * cos(angle)) / 2 - 20, 20);

    // Draw Opposite (Vertical) - Red
    stroke('#e74c3c');
    strokeWeight(4);
    line(h * cos(angle), 0, h * cos(angle), -h * sin(angle));
    fill('#e74c3c');
    noStroke();
    text('Opposite', h * cos(angle) + 5, -h * sin(angle) / 2);

    // Draw Hypotenuse - Green
    stroke('#2ecc71');
    strokeWeight(4);
    line(0, 0, h * cos(angle), -h * sin(angle));
    fill('#2ecc71');
    noStroke();
    text('Hypotenuse', (h * cos(angle)) / 2, -h * sin(angle) / 2 - 5);
    
    // Draw angle arc
    noFill();
    stroke(150);
    strokeWeight(2);
    arc(0, 0, 50, 50, -angle, 0);

    // Update the explanation text
    let sinVal = sin(angle).toFixed(4);
    let cosVal = cos(angle).toFixed(4);
    let tanVal = tan(angle).toFixed(4);

    select('#sin-value').html(`sin(${angle}°) = ${sinVal}`);
    select('#cos-value').html(`cos(${angle}°) = ${cosVal}`);
    select('#tan-value').html(`tan(${angle}°) = ${tanVal}`);
}

function windowResized() {
    let canvasContainer = document.getElementById('trig-canvas');
    if (canvasContainer) {
       resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth * 0.75);
    }
}