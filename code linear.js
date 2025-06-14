let mSlider, cSlider;
let mValueSpan, cValueSpan;
const range = 10;

function setup() {
    let canvasContainer = document.getElementById('linear-canvas');
    let canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth);
    canvas.parent('linear-canvas');
    
    mSlider = select('#m-slider');
    cSlider = select('#c-slider');
    mValueSpan = select('#m-value');
    cValueSpan = select('#c-value');
}

function draw() {
    background(getComputedStyle(document.documentElement).getPropertyValue('--header-bg'));
    drawGrid();

    let m = mSlider.value();
    let c = cSlider.value();
    
    mValueSpan.html(m);
    cValueSpan.html(c);
    select('#equation-display').html(`y = ${parseFloat(m).toFixed(1)}x + ${parseFloat(c).toFixed(1)}`);

    stroke(getComputedStyle(document.documentElement).getPropertyValue('--primary-color'));
    strokeWeight(3);
    
    let x1 = -range;
    let y1 = m * x1 + c;
    let x2 = range;
    let y2 = m * x2 + c;
    
    line(mapX(x1), mapY(y1), mapX(x2), mapY(y2));
}

function drawGrid() {
    stroke(getComputedStyle(document.documentElement).getPropertyValue('--border-color'));
    strokeWeight(1);
    
    for (let x = -range; x <= range; x++) {
        line(mapX(x), 0, mapX(x), height);
    }
    for (let y = -range; y <= range; y++) {
        line(0, mapY(y), width, mapY(y));
    }
    
    stroke(getComputedStyle(document.documentElement).getPropertyValue('--text-color'));
    strokeWeight(2);
    line(0, height / 2, width, height / 2);
    line(width / 2, 0, width / 2, height);
}

function mapX(x) {
    return map(x, -range, range, 0, width);
}

function mapY(y) {
    return map(y, -range, range, height, 0);
}

function windowResized() {
    let canvasContainer = document.getElementById('linear-canvas');
     if (canvasContainer) {
        resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth);
    }
}