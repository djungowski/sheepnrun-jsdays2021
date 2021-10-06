class Player {
  static idle = 'idle';
  static run = 'run';

  constructor(context) {
    this.context = context;
    this.images = {
      [Player.idle]: { image: new Image(), steps: 4 },
      [Player.run]: { image: new Image(), steps: 6 },
    };

    this.currentState = Player.idle;
    this.isMoving = false;

    this.x = 0;
    this.y = 0;
    this.sourceHeight = 464;
    this.sourceWidth = 325;
    this.height = this.sourceHeight / 3;
    this.width = this.sourceWidth / 3;
    this.lastUpdate = 0;
    this.updateEvery = 200;
    this.currentAnimationStep = 0;
  }

  init() {
    return Promise.all([
      new Promise((resolve) => {
        this.images[Player.idle].image.addEventListener('load', resolve);
        this.images[Player.idle].image.src = 'assets/Black_Sheep_Idle.png';
      }),
      new Promise((resolve) => {
        this.images[Player.run].image.addEventListener('load', resolve);
        this.images[Player.run].image.src = 'assets/Black_Sheep_Run.png';
      }),
    ]);
  }

  setIsMoving(isMoving) {
    this.currentAnimationStep = 0;
    if (isMoving) {
      this.currentState = Player.run;
      this.updateEvery = 100;
    } else {
      this.currentState = Player.idle;
      this.updateEvery = 200;
    }
  }


  advanceAnimationStep() {
    const maxStep = this.images[this.currentState].steps;
    this.currentAnimationStep =
      this.currentAnimationStep + 1 < maxStep
        ? this.currentAnimationStep + 1
        : 0;
  }

  shouldUpdate(timestamp) {
    return timestamp - this.lastUpdate >= this.updateEvery;
  }

  update(timestamp) {
    if (this.shouldUpdate(timestamp)) {
      this.advanceAnimationStep();
      this.lastUpdate = timestamp;
    }
  }

  render() {
    const image = this.images[this.currentState];
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
