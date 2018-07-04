function Main() {
    var rendererOptions = {
    view:document.getElementById("game-canvas"),
    antialiasing: false,
    transparent: false,
    resolution: window.devicePixelRatio,
    autoResize: true,
  }

  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(Main.GAME_WIDTH, Main.GAME_HEIGHT, rendererOptions);

  this.renderer.view.style.position = "absolute";
  this.renderer.view.style.top = "0px";
  this.renderer.view.style.left = "0px";

  this.loader = new PIXI.loaders.Loader("../assets/");

  this.loader.add('WorldAssets', './WorldAssets.json');
  this.loader.add('column', './column.png');
  this.loader.add('pixie', './flyingPixie.png');
  this.loader.add('playButton', './playButton.png');
  this.loader.once('complete', this.onAssetLoad.bind(this));
  this.loader.load();

  this.run = false;
  this.gameStarted = false;
  this.reset = false;

  this.reverseX = 0;

  this.currentLevel = 1;

  this.resize();

  window.addEventListener("resize", this.resize.bind(this));
}

Main.GAME_WIDTH = 480;
Main.GAME_HEIGHT = 250;
Main.SCROLL_SPEED = 1;
Main.REVERSE_SCROLL_SPEED = -2;
Main.REVERSE_DISTANCE = 150;

Main.prototype.resize = function() {

  // Determine which screen dimension is most constrained
  ratio = Math.min(window.innerWidth/Main.GAME_WIDTH,
                   window.innerHeight/Main.GAME_HEIGHT);

  console.log('resize');
  // Scale the view appropriately to fill that dimension
  this.stage.scale.x = this.stage.scale.y = ratio;

  // Update the renderer dimensions
  this.renderer.resize(Math.floor(Main.GAME_WIDTH * ratio),
                  Math.floor(Main.GAME_HEIGHT * ratio));
}

Main.prototype.update = function() {
  // console.log(this.run, "asasas");
  if (this.run) {
    this.scroller.moveViewportXBy(Main.SCROLL_SPEED * this.currentLevel);
    this.columns.updatePos(Main.SCROLL_SPEED * this.currentLevel);
    this.collisionDectection.check();
  }

  if (this.gameStarted) this.pixie.updatePos();

  if (this.reset) {
    this.scroller.moveViewportXBy(Main.REVERSE_SCROLL_SPEED);
    this.columns.updatePos(Main.REVERSE_SCROLL_SPEED);

    this.reverseX += Main.REVERSE_SCROLL_SPEED;

    if (this.reverseX == 0) this.reset = false;
  }

  this.renderer.render(this.stage);
  // console.log(this.run);
  // this.setRun();
  requestAnimationFrame(this.update.bind(this));
};

Main.prototype.onAssetLoad = function(){
  this.scroller = new Scroller(this.stage, this.loader);
  this.pixie = new FlyingPixie(this.stage, this.loader, this.pixieDead.bind(this));
  this.columns = new Columns(this.stage, this.loader, this.updateScore.bind(this));
  this.collisionDectection = new CollisionDetection(this.pixie, this.columns, this.setRun.bind(this));
  this.introScreen = new IntroScreen(this.stage, this.loader, this.readyToPlay.bind(this), this.startGame.bind(this));
  this.livesAndScore = new LivesAndScore(this.stage, this.showEndScreen.bind(this), this.levelUp.bind(this));

  requestAnimationFrame(this.update.bind(this));

  this.introScreen.reorderZIndex();
}

Main.prototype.setRun = function() {
  this.run = false;

  this.pixie.setAllowSpring(false);
};

Main.prototype.pixieDead = function() {
  this.run = this.gameStarted = false;

  this.updateLives();
}

Main.prototype.readyToPlay = function(reset) {
  if (reset) {
    this.resetGame();
  }

  this.scroller.show();
  this.pixie.show();
}

Main.prototype.startGame = function() {
  this.pixie.setAllowSpring(true);
  this.gameStarted = this.run = true;
}

Main.prototype.updateScore = function() {
  this.livesAndScore.updateScore();
}

Main.prototype.updateLives = function() {
  this.livesAndScore.updateLives();

  this.reverseX = Main.REVERSE_DISTANCE;
  this.reset = true;

  // console.log('reset scroller');
}

Main.prototype.resetGame = function() {
  this.currentLevel = 1;

  this.livesAndScore.reset();
  this.columns.resetAllColumns();
}

Main.prototype.showEndScreen = function(outOfLives) {
  if (outOfLives) {
    this.introScreen.showGameOver();
  } else {
    this.introScreen.showPlayAgain();
  }
}

Main.prototype.levelUp = function() {
  this.currentLevel += 0.4;

  if (this.currentLevel >= 3.8) this.currentLevel = 3.8;

  this.columns.levelUp(this.currentLevel);
}
