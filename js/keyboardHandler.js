class KeyboardHandler {
  init(loop, player) {
    document.addEventListener('keydown', (e) => {
      if(e.code === 'Enter') {
        loop.toggleMoving();
      } else if (e.code === 'Space') {
        player.jump();
      }
    });
  }
}