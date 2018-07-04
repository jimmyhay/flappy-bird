function Columns(stage, loader, callBackUpdateScore) {
  this.counter = 0;
  this.stage = stage;
  this.loader = loader;
  this.callBackUpdateScore = callBackUpdateScore;

  this.totalColumns = 4;

  this.allColumns = [];

  for (var i=0; i < this.totalColumns; i++) {
    this.allColumns[i] = new Column(stage, loader, this.allColumns[i-1], 50, 0.5, this.callBackReset.bind(this), i);
  }
}

Columns.prototype.updatePos = function(scrollSpeed) {
  this.counter++;

  for (var i = 0; i < this.allColumns.length; i++) {
    this.allColumns[i].updatePos(scrollSpeed, this.counter);
  }
}

Columns.prototype.callBackReset = function() {
  var ele = this.allColumns.shift();

  this.allColumns.push(ele);

  ele.setDistance(this.allColumns[this.allColumns.length-2]);

  this.callBackUpdateScore();
}

Columns.prototype.resetAllColumns = function() {
  for (var i=0; i < this.totalColumns; i++) {
    this.allColumns[i].resetColumn(this.allColumns[i-1], i);
  }
}

Columns.prototype.levelUp = function(level) {
  for (var i=0; i < this.totalColumns; i++) {
    this.allColumns[i].levelUp(level);
  }
}
