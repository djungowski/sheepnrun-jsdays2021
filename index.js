document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('sheep-and-run');
  const context = canvas.getContext('2d');

  // context.beginPath();
  // context.rect(20, 20, 150, 100);
  // context.stroke();

  const background = new Background(context);
  const backgroundPromise = background.init('assets/background1.png');

  const platforms = [
    new Platform(context),
    new Gap(context),
    new Platform(context),
    new Platform(context),
    new Gap(context),
    new Platform(context),
    new Platform(context),
    new Gap(context),
    new Platform(context)
  ];

  const platformPromises = platforms
    .map((platform, index) => {
      platform.x = index * platform.width;
      platform.y = 282;
      return platform;
    })
    .map((platform) => platform.init());

  Promise.all([backgroundPromise, ...platformPromises]).then(() => {
    background.render(canvas.width, canvas.height);
    platforms.forEach((platform) => platform.render());
  });
    
});