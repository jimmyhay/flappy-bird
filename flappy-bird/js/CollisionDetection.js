function CollisionDetection(pixie, columns, callBack) {
  this.pixie = pixie;
  this.columns = columns.allColumns;
  this.callBack = callBack;
}

CollisionDetection.prototype.check = function () {
  // console.log('checking for collisions');

  if (this.pixie.position.y > 250 || this.pixie.position.y < 0) {
    // this.pixie.position.y = 0;
    // this.pixie.velocity = 0;
    // this.dispatchEvent('collisionCheck');
    // console.log(this.callBack);
    this.callBack(false);
    // this.callBack(false);
  }

  for (var i=0; i < this.columns.length; i++) {
    var column = this.columns[i];

    if (column.position.x < 480) {
      // console.log(this.pixie.position.x, column.position.x);
      if (((this.pixie.position.x+this.pixie.width) > column.position.x) && ((this.pixie.position.x) < column.position.x+column.width)) {
        // console.log("HIT X")
        if (this.pixie.position.y < column.topColumn.y+column.topColumn.height || this.pixie.position.y+this.pixie.height > column.bottomColumn.y) {
          // console.log('HIT Y');
          // FIX Y VALUE COLLISSION DETECTION ISSUE
          this.callBack(false);
        }
      }
    }
  }
  // if ((this.pixie.position.x+this.pixie.width > this.scroller.columnOne.position.x &&
  //     this.pixie.position.y < this.scroller.columnOne.height+this.scroller.columnOne.position.y) ||
  //     (this.pixie.position.x+this.pixie.width > this.scroller.columnOne.position.x &&
  //       this.pixie.position.y+this.pixie.height > this.scroller.columnTwo.position.y)) {
  //   // console.log("HERE");
  //   this.callBack(false);
  // }
}
