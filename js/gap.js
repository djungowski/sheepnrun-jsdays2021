class Gap {
  constructor(context) {
    this.context = context;

    this.x = 0;
    this.y = 0;
    this.height = 130;
    this.width = 200;
  }

  init() {
    return Promise.resolve();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  render() {
    // Für Debugging
    // this.context.beginPath();
    // this.context.rect(this.x, this.y, this.width, this.height);
    // this.context.stroke();
  }
}
