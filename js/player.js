class Player {
  static idle = 'idle';
  static run = 'run';
  static jump = 'jump';
  static dead = 'dead';

  constructor(context) {
    this.context = context;
    this.animations = {
      [Player.idle]: { image: new Image(), steps: 4, updateEvery: 200 },
      [Player.run]: { image: new Image(), steps: 6, updateEvery: 100 },
      [Player.jump]: { image: new Image(), steps: 8, updateEvery: 100 },
      [Player.dead]: { image: new Image(), steps: 1, updateEvery: 30 },
    };

    this.audios = {
      [Player.jump]: new Audio(),
      [Player.dead]: new Audio(),
    };


    this.currentState = Player.idle;
    this.isMoving = false;

    this.x = 0;
    this.y = 0;
    this.sourceHeight = 464;
    this.sourceWidth = 325;
    this.height = this.sourceHeight / 3;
    this.width = this.sourceWidth / 3;
    this.jumpOffset = 55;
    this.lastUpdate = 0;
    this.currentAnimationStep = 0;    
  }

  get isDead() {
    return this.currentState === Player.dead;
  }

  die() {
    this.audios[Player.dead].currentTime = 0;
    this.audios[Player.dead].play();
    this.currentState = Player.dead;
  }

  init() {
    return Promise.all([
      new Promise((resolve) => {
        this.animations[Player.idle].image.addEventListener('load', resolve);
        this.animations[Player.idle].image.src = 'assets/Black_Sheep_Idle.png';
      }),
      new Promise((resolve) => {
        this.animations[Player.run].image.addEventListener('load', resolve);
        this.animations[Player.run].image.src = 'assets/Black_Sheep_Run.png';
      }),
      new Promise((resolve) => {
        this.animations[Player.jump].image.addEventListener('load', resolve);
        this.animations[Player.jump].image.src = 'assets/Black_Sheep_Jump.png';
      }),
      new Promise((resolve) => {
        this.animations[Player.dead].image.addEventListener('load', resolve);
        this.animations[Player.dead].image.src = 'assets/Black_Sheep_Dead.png';
      }),
      new Promise((resolve) => {
        this.audios[Player.dead].addEventListener('canplaythrough', resolve);
        this.audios[Player.dead].src = 'audio/drop.wav';
      }),
      new Promise((resolve) => {
        this.audios[Player.jump].addEventListener('canplaythrough', resolve);
        this.audios[Player.jump].src = 'audio/jump3.wav';
      }),
    ]);
  }

  jump() {
    if (this.currentState === Player.run) {
      this.audios[Player.jump].currentTime = 0;
      this.audios[Player.jump].play();
      this.currentState = Player.jump;
      this.y = this.y - this.jumpOffset;
      this.currentAnimationStep = 0;
    }
  }

  setIsMoving(isMoving) {
    this.currentAnimationStep = 0;
    if (isMoving) {
      this.currentState = Player.run;
    } else {
      this.currentState = Player.idle;
    }
  }


  advanceAnimationStep() {
    const maxStep = this.animations[this.currentState].steps;
    this.currentAnimationStep =
      this.currentAnimationStep + 1 < maxStep
        ? this.currentAnimationStep + 1
        : 0;
  }

  shouldUpdate(timestamp) {
    return timestamp - this.lastUpdate >= this.animations[this.currentState].updateEvery;
  }

  update(timestamp) {
    if (this.shouldUpdate(timestamp)) {
      this.advanceAnimationStep();
      if (
        this.currentState === Player.jump &&
        this.currentAnimationStep === 0
      ) {
        this.currentState = Player.run;
        this.y = this.y + this.jumpOffset;
      }
      if (this.isDead) {
        this.y = this.y * 1.0981;
        this.x = this.x + 3;
      }
      this.lastUpdate = timestamp;
    }
  }

  render() {
    const image = this.animations[this.currentState];
    const sourceStartX = this.currentAnimationStep * this.sourceWidth;
    const sourceStartY = 0;

    this.context.drawImage(
      image.image,
      sourceStartX,
      sourceStartY,
      this.sourceWidth,
      this.sourceHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
