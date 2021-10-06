class Loop {
  constructor(context, player, background, plattformCollection) {
    this.context = context;
    this.player = player;
    this.background = background;
    this.plattformCollection = plattformCollection;
  }

  // Welt aktualisieren
  update(timestamp) {
    this.player.update(timestamp);
    this.plattformCollection.update(timestamp);
  }

  // Welt zeichnen
  render() {
    this.background.render(
      this.context.canvas.width,
      this.context.canvas.height,
    );
    this.plattformCollection.render();
    this.player.render();
  }

  // nächster Schritt
  step(timestamp) {
    this.update(timestamp);
    this.render();
    requestAnimationFrame(this.step.bind(this));
  }
}
