document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('sheep-and-run');
  const context = canvas.getContext('2d');

  // context.beginPath();
  // context.rect(20, 20, 150, 100);
  // context.stroke();

  const background = new Background(context);
  await background.init('assets/background1.png');
  background.render(canvas.width, canvas.height);
    
});