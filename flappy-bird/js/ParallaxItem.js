function ParallaxItem(sprite, width, height, scroll, offset) {
  var texture = PIXI.Texture.fromFrame(sprite);

  PIXI.extras.TilingSprite.call(this, texture, width, height);

  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
  this.scroll = scroll;
  this.offset = offset;

  this.viewportX = 0;
}

ParallaxItem.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

ParallaxItem.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * this.scroll);
  this.position.y = this.offset;
  // this.tilePosition.y = -1000;
};
