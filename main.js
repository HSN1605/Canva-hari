const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const circlesArray = [];
//const textContent = ['H','A','R','I'];
let hue = 0;
canvas.width = window.innerWidth
canvas.height = window.innerHeight

canvas.addEventListener('resize', function(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  ctx.beginPath();
  ctx.arc(185, 100, 25, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
})

const mouse =  {
  x:undefined,
  y:undefined
}

canvas.addEventListener('click', function(event){
  mouse.x = event.x
  mouse.y = event.y
 for (let i = 0; i < 50; i++) {
    circlesArray.push(new Particle);
  }

})

canvas.addEventListener('mousemove', function(event){
 
})



class Particle{
  constructor(){
 //  this.x = Math.random() * canvas.width;
 //  this.y = Math.random() * canvas.height;
   this.x = mouse.x;
   this.y = mouse.y;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.size = Math.random() * 15 + 1; 
    this.color = 'hsl('+hue+', 100%, 50%)'
    this.red = Math.floor(Math.random()* 255)+1
    this.green = Math.floor(Math.random()* 255)+1
    this.blue = Math.floor(Math.random()* 255)+1
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size>0.2) {
      this.size -= 0.1;
    }
  }
  draw(){
  let degree = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = this.color;
  ctx.lineWidth = 2;
  hue+=0.5;
  }
}

//function init(){
  
//init()

function handleParticle(){
  for(let i = 0; i < circlesArray.length; i++){
    circlesArray[i].update();
    circlesArray[i].draw();
     for (let j = i; j < circlesArray.length; j++) {
       let dx = circlesArray[i].x - circlesArray[j].x;
       let dy = circlesArray[i].y - circlesArray[j].y
       let distance = Math.sqrt(dx * dx + dy * dy);
       if (distance > 100) {
         ctx.beginPath();
         ctx.strokeStyle = circlesArray[i].color;
         ctx.lineWidth = circlesArray[i].size/5
         ctx.moveTo(circlesArray[i].x, circlesArray[i].y);
         ctx.lineTo(circlesArray[j].x, circlesArray[j].y)
         ctx.stroke()
       }
     }
    
    if(circlesArray[i].size <= 0.3){
      circlesArray.splice(i,1);
       i--
    }
  } 
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = 'rgba(0,0,0,.2)'
  ctx.fillRect(0,0,canvas.width,canvas.height)
  requestAnimationFrame(animate)
  handleParticle();
}
animate()
console.log(ctx);
