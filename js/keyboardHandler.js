class KeyboardHandler {
  init(loop) {
    document.addEventListener('keydown', (e) => {
      if(e.code === 'Enter') {
        loop.toggleMoving();
      }
    });
  }
}