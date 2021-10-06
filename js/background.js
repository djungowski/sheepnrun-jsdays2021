class Background {
  constructor(context) {
    this.context = context;

    this.image = new Image();
  }

  init(source) {
    return new Promise((resolve) => {
      this.image.addEventListener('load', resolve);
      this.image.src = source;
    });
  }

  render(width, height) {
    this.context.drawImage(this.image, 0, 0, width, height);
  }
}