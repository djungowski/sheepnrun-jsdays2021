class Loop {
  constructor(context, player, background, platforms) {
    this.context = context;
    this.player = player;
    this.background = background;
    this.platforms = platforms;
  }

  // Welt aktualisieren
  update(timestamp) {
    this.player.update(timestamp);
  }

  // Welt zeichnen
  render() {
    this.background.render(
      this.context.canvas.width,
      this.context.canvas.height,
    );
    this.platforms.forEach((platform) => platform.render());
    this.player.render();
  }

  // nächster Schritt
  step(timestamp) {
    this.update(timestamp);
    this.render();
    requestAnimationFrame(this.step.bind(this));
  }
}
