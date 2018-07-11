class GameState {
  constructor() {
    this.seconds = 0;
    this.minutes = 0;
    this.point = 0;
    this.life = 3;
    this.die = 0;
    this.win = 0;
    this.dieModal = document.querySelector('.die-modal');
    this.modalOverlay = document.querySelector('.modal-overlay');
    this.scoreStatus = document.querySelector('.score-status');
    this.scoreResult = document.querySelector('.score-result');
    this.endLifeModal = document.querySelector('.end-life-modal');
    this.restart = document.querySelector('#restart-button');
    this.reTry = document.querySelector('#try-again-button');
  };
  openDieModal() {
    this.dieModal.style.display = 'block';
    this.modalOverlay.style.display = 'block';
    this.scoreStatus.innerText =
    `Oh Man! You are almost there!
    You have ${this.life} lifes remaining.
    Your current score is: ${this.point} points.`;
    this.modalOverlay.addEventListener('click', this.closeDieModal);
    this.restart.addEventListener('click', this.closeDieModal);
  };
  openEndLifeModal() {
    this.endLifeModal.style.display = 'block';
    this.modalOverlay.style.display = 'block';
    this.scoreResult.innerText =
    `Oh Man! You run out of lives.
    Your current score is: ${this.point} points.
    You have cross to the water ${this.win} times and ${this.die} times.`;
    this.modalOverlay.addEventListener('click', this.closeEndLifeModal);
    this.reTry.addEventListener('click', this.closeEndLifeModal);
  };
  closeDieModal() {
    document.querySelector('.die-modal').style.display = 'none';
    document.querySelector('.modal-overlay').style.display = 'none';
  }
  closeEndLifeModal() {
    document.querySelector('.end-life-modal').style.display = 'none';
    document.querySelector('.modal-overlay').style.display = 'none';
    this.die = 0;
    this.win = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.point = 0;
    this.life = 3;
    document.querySelector('.timer').innerText = `${this.minutes} m ${this.seconds} s`;
    document.querySelector('.life').innerText = `${this.life} lifes`;
    document.querySelector('.score').innerText = `${this.point} point`;
  }
  setTimer() {
    return setInterval(() => {
      if (this.seconds >= 60) {
        this.minutes ++;
        this.seconds = 0;
      }
      this.seconds ++;
      document.querySelector('.timer').innerText = `${this.minutes} m ${this.seconds} s`;
    }, 1000);
  };
};

// Enemies our player must avoid
class Enemies {
  constructor(y, x) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x
    this.y = y;
    this.v = Math.floor(Math.random() * 130) + 80;
  };
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 505) {
      this.x = Math.floor(Math.random() * (-80 + 250)) - 250;
      this.x += dt*this.v;
    } else {
      this.x += dt*this.v;
    }
  };

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 300;
    this.vx = 0;
    this.vy = 0;
  };
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vx = 0;
    this.vy = 0;
  };
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  handleInput(keyPressed) {
    if (keyPressed === 'left' && this.x >= 50) {
      this.vx = -6000;
    }
    if (keyPressed === 'right' && this.x <= 350) {
      this.vx = 6000;
    }
    if (keyPressed === 'up' && this.y >= 50) {
      this.vy = -4800;
    }
    if (this.y <= 50){
      setTimeout(() => {
        this.x = 200;
        this.y = 300;
        gameState.point += 5;
        document.querySelector('.score').innerText = `${gameState.point} Points`;
        gameState.life += 1;
        document.querySelector('.life').innerText = `${gameState.life} Lifes`;
        gameState.win += 1;
      }, 800);
    }
    if (keyPressed === 'down' && this.y <= 350) {
      this.vy = 4800;
    }// a handleInput() method.
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let gameState = new GameState();
gameState.setTimer();
let player = new Player();

let enemy1 = new Enemies(60, -20);
let enemy2 = new Enemies(145, -20);
let enemy3 = new Enemies(225, -50);
let enemy4 = new Enemies(60, -300);
let enemy5 = new Enemies(145, -500);
let enemy6 = new Enemies(225, -400);

let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
