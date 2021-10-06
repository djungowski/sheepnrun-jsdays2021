class Loop {
  constructor(context, player, background, plattformCollection) {
    this.context = context;
    this.player = player;
    this.background = background;
    this.plattformCollection = plattformCollection;
    this.isMoving = false;
  }

  toggleMoving() {
    if (this.isMoving && this.player.currentState === Player.jump) {
      return;
    }
    this.isMoving = !this.isMoving;
    this.player.setIsMoving(this.isMoving);
  }

  // Welt aktualisieren
  update(timestamp) {
    this.player.update(timestamp);
    if (this.isMoving) {
      this.plattformCollection.update(timestamp);
    }
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
