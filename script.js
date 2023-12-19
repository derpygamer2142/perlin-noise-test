import Noise from "./noise.js";
import Input from "./input.js";

const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

canv.width = window.innerWidth;
canv.height = window.innerHeight;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;


let a = 2;
let amount = 6000;
let noise = new Noise();
let input = new Input();
let noiseLevels = noise.generateNoise(amount,a)

let camX = 0;
let camY = 0;
let camZ = 1;


let lastTime = Date.now()
let elapsedTime = 0
let fps = []; // gotta average it out because annoying

function fpsManager(dt) {
    fps.push(1/dt)
    if (fps.length > 100) {
        fps.reverse();
        fps.pop();
        fps.reverse();
    }

    let val = 0
    fps.forEach(f => {
        val += f
    })
    return val/fps.length
}




function draw() {
    elapsedTime = (Date.now() - lastTime)/1000
    if (input.ArrowDown || input.ArrowUp) {
        if (input.ArrowUp) {a += 0.04}
        if (input.ArrowDown) {a -= 0.04}
        noiseLevels = noise.generateNoise(amount,a)
    }
    if (input.r) {noiseLevels = noise.generateNoise(amount,a)}

    camX += ((Number(input.d) - Number(input.a))*5)/camZ
    camY += ((Number(input.w) - Number(input.s))*-5)/+camZ

    if (input["="]) {camZ *= 1.1}
    if (input["-"]) {camZ /= 1.1}

    ctx.clearRect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = "rgb(60,60,60)";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.lineWidth = 2*camZ

    for (let x = 0; x < noiseLevels.length-1; x++) {
        if ((x-camX)*camZ + WIDTH/2 < 0) {continue;}
        if ((x-camX)*camZ + WIDTH/2 > WIDTH) {break;}
        
        ctx.strokeStyle = "saddlebrown"
        ctx.beginPath();
        ctx.moveTo((x-camX)*camZ + WIDTH/2,(noiseLevels[x]-camY+15)*camZ + HEIGHT/2)
        ctx.lineTo((x-camX)*camZ + WIDTH/2,(1500-camY)*camZ + HEIGHT/2)
        ctx.stroke();

        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo((x-camX)*camZ + WIDTH/2,(noiseLevels[x]-camY)*camZ + HEIGHT/2)
        ctx.lineTo((x-camX)*camZ + WIDTH/2,(noiseLevels[x]-camY+15)*camZ + HEIGHT/2)
        ctx.stroke();
    }

    ctx.font = "24px Comic Sans MS"
    ctx.fillStyle = "black"
    ctx.fillText(`Amplitude: ${a}`,0,HEIGHT*0.04);
    ctx.fillText(`Pos: ${camX},${camY}`,0,HEIGHT*0.08)
    //ctx.fillText(`FPS: ${fpsManager(elapsedTime)}`,0,HEIGHT*0.12)
    //ctx.fillText(`DeltaTime: ${elapsedTime}`,0,HEIGHT*0.16)
    lastTime = Date.now()
}

setInterval(draw,17);