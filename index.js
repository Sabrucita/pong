const gameArea = document.getElementById('gameArea')

class Paddle{
  element;
  y=0;
  velocity= 10;
  movement;
  height = 200;

  constructor(){
    this.element = document.createElement('div')
    this.element.classList = 'paddle'
    gameArea.appendChild(this.element)
  }

  goUp(){
    if(!this.movement){
      this.movement = setInterval(()=> {
        this.y -= this.velocity
        if(this.y < 0) {
          this.y = 0
          this.freeze()
        }
        console.log('1')
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
}

document.addEventListener('keydown', (e) => {
  console.log(e)
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
  }
})

document.addEventListener('keyup', (e) => {
  console.log(e)
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