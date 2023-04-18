const gameArea = document.getElementById('gameArea')
const messageElement = document.getElementById('message')
const instructionsElement = document.getElementById('instructions')
gameStatus = 'PAUSE'
let ball;

class Paddle{
  element;
  y=0;
  velocity= 10;
  movement;
  height = 200;
  width = 20

  constructor(){
    this.element = document.createElement('div')
    this.element.classList = 'paddle'
    gameArea.children[0].appendChild(this.element)
    this.resetPosition()
  }

  goUp(){
    if(!this.movement){
      this.movement = setInterval(()=> {
        this.y -= this.velocity
        if(this.y < 0) {
          this.y = 0
          this.freeze()
        }
        this.element.style.top = this.y+'px'
      }, 20)
    }
  }

  goDown(){
    if(!this.movement){
      this.movement = setInterval(()=> {
        this.y += this.velocity
        const limit = document.body.clientHeight - this.height
        if(this.y > limit) {
          this.y = limit
          this.freeze()
        }
        this.element.style.top = this.y+'px'
      }, 20)
    }
  }

  freeze(){
    clearInterval(this.movement)
    this.movement = undefined
  }

  resetPosition(){
    this.y = document.body.clientHeight/2 - this.height/2
    this.element.style.top = this.y+'px'
  }
}

class Ball{
  x;
  y;
  dx = -20;
  dy = 0 ;
  width = 30;
  movement;

  constructor(){
    this.element = document.createElement('div')
    this.element.classList = 'ball'
    gameArea.appendChild(this.element)
    this.resetPosition()
    this.move()
    messageElement.classList='hidden'
    instructionsElement.classList.toggle('hidden',true)
  }

  resetPosition(){
    this.x = document.body.clientWidth/2-this.width/2
    this.element.style.left = this.x+'px'
    this.y = document.body.clientHeight/2 - this.width/2
    this.element.style.top = this.y+'px'
  }

  move(){
    if(!this.movement){
      this.movement = setInterval(()=>{
        this.x += this.dx

        if(this.x < 0+p1.width &&
          this.y + this.width/2 > p1.y &&
          this.y + this.width/2 < p1.y + p1.height){
          this.dy += this.getYVariation(p1)
          this.dx = this.dx *-1
        }

        if(this.x + this.width > document.body.clientWidth-p2.width &&
          this.y + this.width/2 > p2.y &&
          this.y + this.width/2 < p2.y + p2.height){
          this.dy += this.getYVariation(p2)
          this.dx = this.dx *-1
        }

        if(this.x < 0 || this.x > document.body.clientWidth - this.width){
          board.add(this.x < 100 ? 2 : 1);
        }
        this.element.style.left = this.x+'px'


        this.y += this.dy
        if(this.y < 0 || this.y > document.body.clientHeight - this.width){
          this.dy = this.dy *-1
        }
        this.element.style.top = this.y+'px'
      },20)
    }
  }

  delete(){
    clearInterval(this.movement)
    gameArea.removeChild(this.element)
    ball = undefined
  }

  getYVariation(p){
    const difference = ((this.y + this.width/2) - (p.y+ p.height/2))
    return difference/10
  }
}

class Board{
  p1Score = 0
  p2Score = 0
  maxScore = 2;

  constructor(){
    this.element = document.createElement('p')
    this.element.id = 'board'
    gameArea.appendChild(this.element)
    this.updateText()
  }

  updateText(){
    this.element.textContent= this.p1Score+" - "+this.p2Score
  }

  add(player){
    if(player === 1) this.p1Score++
    else this.p2Score++
    this.updateText()
    ball.delete()
    p1.resetPosition()
    p2.resetPosition()
    messageElement.textContent = 'Press "spacebar" to continue'
    messageElement.classList.toggle('hidden',false)
    this.gameStatus = 'PAUSE'
    if(this.p1Score >= this.maxScore){
      this.win(1)
    } else if(this.p2Score >= this.maxScore){
      this.win(2)
    }
  }

  win(p){
    messageElement.textContent = 'Player '+p+' wins!'
    messageElement.classList.toggle('twinkle',true)
    gameStatus = 'END'
  }

  reset(){
    this.p1Score = 0;
    this.p2Score = 0;
    this.updateText();
    messageElement.classList.toggle('twinkle',false)
  }
}

document.addEventListener('keydown', (e) => {
  switch(e.key){
    case 'w':
      p1.goUp();
      break
    case 's':
      p1.goDown();
      break
    case 'ArrowUp':
      p2.goUp();
      break
    case 'ArrowDown':
      p2.goDown();
      break
    case " ":
      if(gameStatus==='END'){
        board.reset()
      }
      if(!ball) ball = new Ball()
      gameStatus = 'PLAY'
      break
  }
})

document.addEventListener('keyup', (e) => {
  switch(e.key){
    case 'w':
    case 's':
      p1.freeze();
      break;
    case 'ArrowUp':
    case 'ArrowDown':
      p2.freeze();
      break;
  }
})


const p1 = new Paddle()
const p2 = new Paddle()
const board = new Board()