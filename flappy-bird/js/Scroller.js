function Scroller(stage, loader) {
  PIXI.Container.call(this);

  this.far = new ParallaxItem("05_far_BG.jpg", 512, 256, 0.1, 0);
  this.rearCanopy = new ParallaxItem("03_rear_canopy.png", 480, 126, 0.2);
  this.treeOne = new TreeSprite("02_tree_1.png", 206, 278, 0.2, 0, 0);
  this.treeTwo = new TreeSprite("02_tree_2.png", 206, 247, 0.2, 250, 0);
  this.flowerOne = new TreeSprite("01_hanging_flower1.png", 7, 217, 0.2, 0, -100);
  this.flowerTwo = new TreeSprite("01_hanging_flower2.png", 7, 217, 0.2, (Math.random() * 480), -50);
  this.flowerThree = new TreeSprite("01_hanging_flower3.png", 7, 217, 0.2, (Math.random() * 480), -20);
  this.flowerFour = new TreeSprite("01_hanging_flower1.png", 7, 217, 0.2, (Math.random() * 480), -40);
  this.flowerFive = new TreeSprite("01_hanging_flower2.png", 7, 217, 0.2, (Math.random() * 480), -60);
  this.flowerSix = new TreeSprite("01_hanging_flower3.png", 7, 217, 0.2, (Math.random() * 480), -100);
  this.flowerSeven = new TreeSprite("01_hanging_flower1.png", 7, 217, 0.2, (Math.random() * 480), -40);
  this.flowerEight = new TreeSprite("01_hanging_flower2.png", 7, 217, 0.2, (Math.random() * 480), -55);
  this.flowerNine = new TreeSprite("01_hanging_flower3.png", 7, 217, 0.2, (Math.random() * 480), -80);
  this.frontCanopy = new ParallaxItem("02_front_canopy.png", 530, 88, 0.35, 0);
  this.leaves = new ParallaxItem("00_roof_leaves.png", 550, 55, 0.5, 0);
  this.rearSilhouette = new ParallaxItem("03_rear_silhouette.png", 643, 96, 0.35, 154);
  this.frontSilhouette = new ParallaxItem("01_front_silhouette.png", 643, 108, 0.5, 142);

  stage.addChild(this.far);
  this.addChild(this.rearCanopy);
  this.addChild(this.treeOne);
  this.addChild(this.treeTwo);
  this.addChild(this.flowerOne);
  this.addChild(this.flowerTwo);
  this.addChild(this.flowerThree);
  this.addChild(this.flowerFour);
  this.addChild(this.flowerFive);
  this.addChild(this.flowerSix);
  this.addChild(this.flowerSeven);
  this.addChild(this.flowerEight);
  this.addChild(this.flowerNine);
  this.addChild(this.frontCanopy);
  this.addChild(this.leaves);
  this.addChild(this.rearSilhouette);
  this.addChild(this.frontSilhouette);

  stage.addChild(this);

  this.alpha = 0;

  // this.rearCanopy.alpha = this.treeOne.alpha = this.treeTwo.alpha = this.flowerOne.alpha =
  // this.flowerTwo.alpha = this.flowerThree.alpha = this.flowerFour.alpha = this.flowerFive.alpha =
  // this.flowerSix.alpha = this.flowerSeven.alpha = this.flowerEight.alpha = this.flowerNine.alpha =
  // this.frontCanopy.alpha = this.leaves.alpha = this.rearSilhouette.alpha = this.frontSilhouette.alpha = 0;

  this.viewportX = 0;
}

Scroller.prototype = Object.create(PIXI.Container.prototype);

Scroller.prototype.setViewportX = function(viewportX) {
  this.viewportX = viewportX;

  this.far.setViewportX(viewportX);
  this.frontCanopy.setViewportX(viewportX);
  this.rearCanopy.setViewportX(viewportX);
  this.treeOne.setViewportX(viewportX);
  this.treeTwo.setViewportX(viewportX);
  this.flowerOne.setViewportX(viewportX);
  this.flowerTwo.setViewportX(viewportX);
  this.flowerThree.setViewportX(viewportX);
  this.flowerFour.setViewportX(viewportX);
  this.flowerFive.setViewportX(viewportX);
  this.flowerSix.setViewportX(viewportX);
  this.flowerSeven.setViewportX(viewportX);
  this.flowerEight.setViewportX(viewportX);
  this.flowerNine.setViewportX(viewportX);
  this.leaves.setViewportX(viewportX);
  this.rearSilhouette.setViewportX(viewportX);
  this.frontSilhouette.setViewportX(viewportX);
  // this.columnOne.setViewportX(viewportX);
  // this.columnTwo.setViewportX(viewportX);
};

Scroller.prototype.getViewportX = function() {
  return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
  var newViewportX = this.viewportX + units;
  this.setViewportX(newViewportX);
};

Scroller.prototype.show = function() {
  this.setViewportX(0);

  TweenLite.to(this, 0.5, {alpha:'1'});
}
