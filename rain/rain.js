
const canvas = document.getElementById("rain");
const ctx = canvas.getContext('2d');
let drops = [];
const maxDrops = 100;
let lightningMode = false;

const configOptions = {
    lightning: canvas.getAttribute('lightning')
}

const colors = {
    background: "rgba(30,29,39)",
    rainColors: ["rgba(16,161,167)", "rgba(228,75,109)", "rgba(228,97,4)"]
}

if(configOptions.lightning=="false" || configOptions.lightning==false){
    lightningMode = true;
}

function raindrop() {
    this.width = 4;
    this.height = 10+parseInt(Math.random()*100000)%30;
    this.x = parseInt(Math.random()*100000)%canvas.width;
    this.y = -1*this.height;
    this.vy = 1+this.height/10;
    this.alpha = 0.3+Math.random();
    this.color = colors.rainColors[parseInt(Math.random()*100000)%colors.rainColors.length].split(')')[0]+','+this.alpha+")"
}

function update(){
    for(let i=0;i<drops.length;i++){
        let currentDrop = drops[i];
        currentDrop.y = currentDrop.y + currentDrop.vy;
        if(currentDrop.x<0||currentDrop.x>canvas.width||currentDrop.y>canvas.height){
            drops.splice(i,1);
        }
    }
    redraw();
}

function lightning(){
    colors.background = "rgba(78,76,99)";
    setTimeout(()=>{
        lightningMode = false;
        colors.background = "rgba(30,29,39)";
    },10);
}

function redraw(){
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if(!lightningMode) {
        if (parseInt(Math.random()*100000)%100 === 50) {
            lightningMode = true;
            lightning();
        }
    }
    for(let i=0;i<drops.length;i++){
        let currentDrop = drops[i];
        ctx.fillStyle = currentDrop.color;
        ctx.fillRect(currentDrop.x, currentDrop.y, currentDrop.width, currentDrop.height);
    }
}

canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
ctx.fillStyle = colors.background;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function createDrops() {
    if(drops.length<maxDrops) {
        let drop = new raindrop();
        drops.push(drop);
    }
}

setInterval(createDrops,10);
setInterval(update,0);