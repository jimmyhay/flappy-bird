function Column(stage, loader, prevColumn, offsetX, scroll, callBackReset, index) {
  PIXI.Container.call(this);

  this.onScreen = true;

  this.topColumn = new PIXI.Sprite(loader.resources['column'].texture);
  this.bottomColumn = new PIXI.Sprite(loader.resources['column'].texture);

  this.level = 0;

  this.position.x = 480;

  if (index != 0) this.position.x = prevColumn.position.x + Math.random() * (250 - 170) + 170;

  this.position.y = 0;

  this.prevColumn = prevColumn;

  this.index = index;

  this.callBackReset = callBackReset;

  this.setGapSize();

  this.addChild(this.topColumn);
  this.addChild(this.bottomColumn);

  stage.addChild(this);
}

Column.prototype = Object.create(PIXI.Container.prototype);

Column.prototype.resetColumn = function(prevColumn, index) {
  this.position.x = 480;

  if (index != 0) this.position.x = prevColumn.position.x + Math.random() * (250 - 170) + 170;
}

Column.prototype.updatePos = function(scrollSpeed) {
  // console.log((counter - this.startCount));
  this.position.x -= scrollSpeed;

  if (this.position.x+this.topColumn.width < 0) {
    this.setGapSize();
    this.callBackReset();
  }
}

Column.prototype.setGapSize = function() {
  // console.log(this.level);
  var gapSize = Math.random() * (180 - ((80 - (80 * this.level) + 80))) + ((80 - (80 * this.level) + 80));

  // console.log(gapSize);

  var topPercent = Math.random() * (1 - 0.5) + 0.5;

  this.topColumn.width = this.bottomColumn.width = 40;
  this.topColumn.height = this.bottomColumn.height = 250;

  // this.topColumn.y = -this.topColumn.height+((250-gapSize)/2);
  this.topColumn.y = -this.topColumn.height*topPercent;
  // this.bottomColumn.y = 250-((250-gapSize)/2);
  this.bottomColumn.y = this.topColumn.y+this.topColumn.height+gapSize;
}

Column.prototype.setDistance = function(prevColumn) {
  this.position.x = prevColumn.position.x + Math.random() * (250 - 170) + 170;
}

Column.prototype.levelUp = function (level) {
  this.level = (level - 1) / 2;
}
