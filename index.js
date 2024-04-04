const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const clearButton = document.getElementById("clear-btn");
let fill = document.getElementById('fill');
let fillV = false;
let startX, startY;
let isMouseDown = false;
let snapshot = null;

const getMouseX = (event) => {
    return event.clientX - canvas.getBoundingClientRect().left;
}

const getMouseY = (event) => {
    return event.clientY - canvas.getBoundingClientRect().top;
}

const drawRect = (x, y, x1, y1) => {
    if(fillV == false) {
        context.strokeStyle = "green";
        context.strokeRect(x, y, x1, y1);
    }
    else {
        context.fillStyle = "green";
        context.fillRect(x, y, x1, y1);
    }
}

const fillColor = (x, y, x1, y1) => {
    context.fillRect(x, y, x1, y1);
}

canvas.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    startX = getMouseX(event);
    startY = getMouseY(event);
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousemove", (event) => {
    if(isMouseDown) {
        let endX = getMouseX(event);
        let endY = getMouseY(event);
        let fX = endX - startX;
        let fY = endY - startY;
        context.putImageData(snapshot, 0, 0);
        drawRect(startX, startY, fX, fY);
    }
});

canvas.addEventListener("mouseup", (event) => {
    if(isMouseDown) {
        isMouseDown = false;
        snapshot = null;
    }
});

clearButton.addEventListener("mousedown", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

fill.addEventListener("change", () => {
    if(fillV == false)
        fillV = true;
    else    
        fillV = false;
});

//todo
//add color picker
//add pick color tool