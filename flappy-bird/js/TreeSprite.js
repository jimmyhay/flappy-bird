function TreeSprite(sprite, width, height, scroll, offsetX, offsetY) {
  var texture = PIXI.Texture.fromFrame(sprite);

  PIXI.Sprite.call(this, texture, width, height);

  this.position.x = offsetX;
  this.position.y = offsetY;
  this.scroll = scroll;

  this.viewportX = 0;
}

TreeSprite.prototype = Object.create(PIXI.Sprite.prototype);

TreeSprite.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.position.x -= (distanceTravelled * this.scroll);

  if (this.position.x < -this.width) this.position.x = 480;
};
