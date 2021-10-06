document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('sheep-and-run');
  const context = canvas.getContext('2d');

  // context.beginPath();
  // context.rect(20, 20, 150, 100);
  // context.stroke();

  const background = new Background(context);
  const backgroundPromise = background.init('assets/background1.png');

  const platformCollection = new PlatformCollection(context);
  const platformCollectionPromise = platformCollection.init();

  const player = new Player(context);
  const playerPromise = player.init();
  player.y = 202;

  const musicPlayer = new MusicPlayer();
  const musicPlayerPromise = musicPlayer.init();

  const loop = new Loop(
    context,
    player,
    background,
    platformCollection,
    musicPlayer
  );
  const keyboardHandler = new KeyboardHandler();
  
  const gameObjectsPromises = [
    backgroundPromise,
    platformCollectionPromise,
    playerPromise,
    musicPlayerPromise
  ];
  
  Promise.all(gameObjectsPromises).then(() => {
    requestAnimationFrame(loop.step.bind(loop));
    keyboardHandler.init(loop, player);
  });

});