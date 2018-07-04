function LivesAndScore(stage, endCallBack, levelUpCallBack) {
  PIXI.Container.call(this);

  this.endCallBack = endCallBack;
  this.levelUpCallBack = levelUpCallBack;

  this.score = new PIXI.Container();
  this.lives = new PIXI.Container();

  this.scoreVal = 0;
  this.levelCounter = 0;
  this.livesVal = 3;

  var style =
	{
		fontFamily    : 'Fredoka One',
		fontSize      : '20px',
		fill          : '#ffffff',
		padding       : 0, // some fonts may require additional space around themselves to render correctly
		wordWrap      : true,
		wordWrapWidth : 480
	};

	// create text
	this.scoreText = new PIXI.Text('Score: '+this.scoreVal, style);
  this.livesText = new PIXI.Text('Lives: '+this.livesVal, style);

	// position text to screen center
	// this.scoreText.anchor.set(0.5);
	this.scoreText.x = 10;
	this.scoreText.y = 5;

  this.livesText.x = 480-this.livesText.width-10;
	this.livesText.y = 5;

  this.addChild(this.scoreText);
  this.addChild(this.livesText);

  stage.addChild(this);
}

LivesAndScore.prototype = Object.create(PIXI.Container.prototype);

LivesAndScore.prototype.reset = function() {
  this.scoreVal = 0;
  this.levelCounter = 0;
  this.livesVal = 3;

  this.scoreText.text = 'Score: '+this.scoreVal;
  this.livesText.text = 'Lives: '+this.livesVal;
}

LivesAndScore.prototype.updateScore = function() {
  // console.log('updateScore');

  this.scoreVal += 100;
  this.levelCounter += 100;

  this.scoreText.text = 'Score: '+this.scoreVal;

  if (this.levelCounter >= 600) {
    this.levelCounter = 0;

    this.levelUpCallBack();
  }
}

LivesAndScore.prototype.updateLives = function() {
  // console.log('updateScore');

  this.livesVal --;

  this.livesText.text = 'Lives: '+this.livesVal;

  this.endCallBack(this.livesVal == 0);
}
