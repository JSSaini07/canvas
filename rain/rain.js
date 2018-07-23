
const canvas = document.getElementById("rain");
const ctx = canvas.getContext('2d');
let drops = [];
let clouds = [];
const maxDrops = 100;
const maxClouds = 4;
let horizontalShift = 0;
let lightningMode = false;

const colors = {
    background: "rgba(30,29,39)",
    rainColors: ["rgba(16,161,167)", "rgba(228,75,109)", "rgba(228,97,4)"],
    cloudColor: "#fff"
}

function raindrop() {
    this.width = 4;
    this.height = 10+parseInt(Math.random()*100)%30;
    this.x = parseInt(Math.random()*100000)%canvas.width;
    this.y = -1*this.height;
    this.vy = 1+this.height/10;
    this.alpha = 0.3+Math.random();
    this.color = colors.rainColors[parseInt(Math.random()*100000)%colors.rainColors.length].split(')')[0]+','+this.alpha+")"
}

function cloudObj() {
    let self = this;
    this.x = parseInt(Math.random()*100000)%canvas.width;
    this.y = 60+parseInt(Math.random()*100000)%(canvas.height/3);
    this.vx = -1+(Math.random()*10)%2;
    this.drawCloud = function() {
        ctx.fillStyle = colors.cloudColor;
            ctx.beginPath();
            ctx.moveTo(170, 80);
            ctx.bezierCurveTo(130, 100, 130, 150, 230, 150);
            ctx.bezierCurveTo(250, 180, 320, 180, 340, 150);
            ctx.bezierCurveTo(420, 150, 420, 120, 390, 100);
            ctx.bezierCurveTo(430, 40, 370, 30, 340, 50);
            ctx.bezierCurveTo(320, 5, 250, 20, 250, 50);
            ctx.bezierCurveTo(200, 5, 150, 20, 170, 80);
            ctx.closePath();
            ctx.lineWidth = 5;
            ctx.fillStyle = colors.cloudColor;
            ctx.fill();
    }
}

function update(){
    for(let i=0;i<drops.length;i++){
        let currentDrop = drops[i];
        currentDrop.x = currentDrop.x + horizontalShift;
        currentDrop.y = currentDrop.y + currentDrop.vy;
        if(currentDrop.x<0||currentDrop.x>canvas.width||currentDrop.y>canvas.height){
            drops.splice(i,1);
        }
    }
    for(let i=0;i<clouds.length;i++){
        let currentCloud = clouds[i];
        currentCloud.x = currentCloud.x + currentCloud.vx;
        if(currentCloud.x<0||currentCloud.x>canvas.width){
            clouds.splice(i,1);
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
        if (parseInt(Math.random()*100)%100 === 50) {
            lightningMode = true;
            lightning();
        }
    }
    for(let i=0;i<drops.length;i++){
        let currentDrop = drops[i];
        const angle = 180 - (Math.atan(horizontalShift/currentDrop.vy) * 180/Math.PI);
        ctx.fillStyle = currentDrop.color;
        ctx.save();
        const newOrigin = [currentDrop.x+(currentDrop.width/2), currentDrop.y+(currentDrop.height)/2];
        ctx.translate(newOrigin[0],newOrigin[1]);
        ctx.rotate(angle*Math.PI/180);
        ctx.fillRect(newOrigin[0]-currentDrop.x, newOrigin[1]-currentDrop.y, currentDrop.width, currentDrop.height);
        ctx.restore();
    }
    for(let i=0;i<clouds.length;i++){
        clouds[i].drawCloud();
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

function createClouds() {
    if(clouds.length<maxClouds){
        let cloud = new cloudObj();
        clouds.push(cloud);
    }
}


setInterval(createDrops,10);
//setInterval(createClouds,0);
setInterval(update,0);

// canvas.addEventListener('mousemove',function(){
//    horizontalShift = -1*(canvas.width/2 - event.clientX)/2000;
// });