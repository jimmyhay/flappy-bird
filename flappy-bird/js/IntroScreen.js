function IntroScreen(stage, loader, callBack, startGameCallBack) {
  PIXI.Container.call(this);

  this.playButton = new PIXI.Sprite(loader.resources['playButton'].texture);

  this.playButton.scale.x = this.playButton.scale.y = 0.5;

  this.playButton.position.x = (480/2)-(this.playButton.width/2);
  this.playButton.position.y = 125;

  this.playButton.interactive = true;
  this.playButton.buttonMode = true;

  this.playButton.click = this.onPlayClick.bind(this);
  this.playButton.tap = this.onPlayClick.bind(this);

  this.callBack = callBack;
  this.startGameCallBack = startGameCallBack;

  this.currentState = 'opening';

  var style = playAgainStyle =
	{
		fontFamily    : 'Fredoka One',
		fontSize      : '60px',
		fill          : '#ffffff',
		padding       : 0,
		wordWrap      : true,
		wordWrapWidth : 480
	};

  playAgainStyle.fontSize = '48px';

  this.countdownVal = 3;

	// create text
	this.introText = new PIXI.Text('Flappy Bird!!', style);
  this.playAgainText = new PIXI.Text('Try again!', playAgainStyle);
  this.countdownText = new PIXI.Text(this.countdownVal, style);

	// position text to screen center
	this.introText.anchor.set(0.5);
	this.introText.x = 480 / 2;
	this.introText.y = 70;

  this.playAgainText.anchor.set(0.5);
	this.playAgainText.x = 480 / 2;
	this.playAgainText.y = 70;

  this.countdownText.anchor.set(0.5);
	this.countdownText.x = 480 / 2;
	this.countdownText.y = 70;

  this.playAgainText.alpha = this.countdownText.alpha = 0;

  this.buttonText = new PIXI.Container();

  this.buttonText.addChild(this.introText);
  this.buttonText.addChild(this.playButton);
  this.buttonText.addChild(this.playAgainText);

  this.addChild(this.buttonText);
  this.addChild(this.countdownText);

  this.stage = stage;

  // console.log('introscreen init');

	// add this to stage
  stage.addChildAt(this, stage.children.length - 1)
}

IntroScreen.prototype = Object.create(PIXI.Container.prototype);

IntroScreen.prototype.onPlayClick = function(bind, reset=false) {
  this.playButton.click = null;
  this.playButton.tap = null;

  TweenLite.to(this.buttonText, 0.5, {alpha:"0"});
  TweenLite.to(this.countdownText, 0.5, {alpha:"1"});

  this.startCountDown();

  this.callBack(reset);
}

IntroScreen.prototype.reorderZIndex = function () {
  this.stage.removeChild(this);
  this.stage.addChild(this);
}

IntroScreen.prototype.startCountDown = function() {
  this.countdown = setInterval(this.updateCountdown.bind(this), 1000);
}

IntroScreen.prototype.updateCountdown = function() {
  this.countdownVal--;

  if (this.countdownVal == 0) {
    TweenLite.to(this.countdownText, 0.9, {alpha:"0"});

    this.countdownText.text = 'GO!';

    clearInterval(this.countdown);

    this.countdownVal = 3;

    this.startGameCallBack();
  } else {
    this.countdownText.text = this.countdownVal;
  }
}

IntroScreen.prototype.showPlayAgain = function() {
  // console.log('showPlayAgain');

  this.zIndex = this.stage.children.length - 1;

  this.countdownVal = 3;

  this.countdownText.text = this.countdownVal;

  this.introText.alpha = 0;
  this.playAgainText.alpha = 1;

  this.playAgainText.text = 'Try again?';

  TweenLite.to(this.buttonText, 0.5, {alpha:"1", delay: 1});

  this.playButton.click = this.onPlayClick.bind(this);
  this.playButton.tap = this.onPlayClick.bind(this);

  this.playAgainText.y = 70;
  this.playButton.position.y = 130;
}

IntroScreen.prototype.showGameOver = function() {
  // console.log('showGameOver');

  this.zIndex = this.stage.children.length - 1;

  this.countdownVal = 3;

  this.countdownText.text = this.countdownVal;

  this.playAgainText.position.y = 80;
  this.playButton.position.y = 150;

  this.playAgainText.text = 'Game Over!\nPlay again?';

  this.introText.alpha = 0;
  this.playAgainText.alpha = 1;

  TweenLite.to(this.buttonText, 0.5, {alpha:"1", delay: 1});

  this.playButton.click = this.onPlayClick.bind(this, true);
  this.playButton.tap = this.onPlayClick.bind(this, true);
}
