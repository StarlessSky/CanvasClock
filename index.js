/*Create circle by using getContext -> return drawing to Canvas element
//Canvas element cannot use $ (jQuery)*/

const canvas = document.getElementById("canvas");
const clock = canvas.getContext("2d");

//let -> declares re-assignable, block-scoped local variables, optionally initializing each to a value.
let rad = canvas.height / 2;
/*translate is repositions an element in the horizontal and/or vertical directions.
translate(x,y)*/
clock.translate(rad, rad);
rad = rad * 0.9;

setInterval(drawClock,1000);

function drawClock() {
    drawClockFace(clock, rad);
    drawText(clock, rad);
    drawTime(clock, rad);
    drawAmPm(clock,rad);
}

function drawClockFace(clock, rad) {
    //creates a radial gradient using the size and coordinates of two circles.
    //Circle1 = (x,y) = (0,0) rad = 95%*rad
    //Circle2 = (x,y) = (0,0) rad = 105%*rad
    const grad = clock.createRadialGradient(0, 0, rad * 0.95, 0, 0, rad * 1.05);

    //add gradient color
    grad.addColorStop(0, "rgba(58, 214, 241, 0.5)");
    grad.addColorStop(0.5, "rgba(151, 12, 93, 0.5)");
    grad.addColorStop(1, "rgba(58, 214, 241, 0.5)");

    //CanvasRenderingContext2D.beginPath() method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
    //Create white circle
    clock.beginPath();
    clock.arc(0, 0, rad, 0, 2 * Math.PI);
    clock.fillStyle = "white";
    clock.fill();

    //Define stroke style and line thick -> Declare after created main circle, if declare after center circle, gradient radius will appear at center 
    clock.strokeStyle = grad;
    clock.lineWidth = rad * 0.1;
    //Draw the line
    clock.stroke();

    //Create center circle
    clock.beginPath();
    clock.arc(0, 0, rad * 0.05, 0, 2 * Math.PI);
    clock.fillStyle = "rgb(9, 9, 49)";
    clock.fill();
}

function drawText(clock, rad) {
    clock.beginPath();
    clock.font = "30px serif";
    clock.fillStyle = "rgba(27, 4, 92, 0.5)"
    clock.textBaseLine = "middle";
    clock.textAlign = "center";
    clock.fillText("No time", 0, -120);
    clock.fillText("To work", 0, 120);
    angle = Math.PI / 6;
    for (var number = 1; number < 13; number++) {
        angle = (number * Math.PI / 6) - (Math.PI / 2);
        clock.fillText(number, rad * 0.85 * Math.cos(angle), rad * 0.85 * Math.sin(angle));
    }
}

function drawTime(clock, rad) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawAmPm(clock,rad);
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (6 * 60 * 60));
    hourHand = drawHandClock(clock, hour, rad * 0.5, rad * 0.05);

    minute = (minute * Math.PI / 30) + (second * Math.PI / (30*60));
    minuteHand = drawHandClock(clock, minute, rad * 0.75, rad * 0.03);

    second = second * Math.PI / 30;
    secondHand = drawHandClock(clock, second, rad * 0.8, rad * 0.02);
}

function drawHandClock(clock, pos, length, width) {
    clock.beginPath();
    clock.strokeStyle = "rgba(21, 3, 70, 0.9)";

    clock.lineWidth = width;
    clock.lineCap = "round";
    clock.moveTo(0, 0);
    clock.rotate(pos);
    clock.lineTo(0, -length);
    clock.stroke();
    clock.rotate(-pos);
}

function drawAmPm(clock,rad){
    var now = new Date();
    var hour = now.getHours();
    if (0<= hour && hour <=11){
        clock.fillText("am",rad*0.6,0)
        clock.fillStyle = "#F4B227";
        clock.textBaseLine = "middle";
        clock.textAlign = "center";
    }
    else if (12<= hour && hour <= 23){
        clock.fillText("pm",rad*0.6,0)
        clock.textBaseLine = "middle";
        clock.fillStyle = "#0E175C";
        clock.textAlign = "center";
    }
}