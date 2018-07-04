function FlyingPixie(stage, loader, callBack) {
  PIXI.Sprite.call(this, loader.resources['pixie'].texture, 105, 93);

  this.callBack = callBack;
  // PIXI.Container.call(this);

  // var graphics = new PIXI.Graphics();

  // graphics.beginFill(0xFFFF00);

  // set the line style to have a width of 5 and set the color to red
  // graphics.lineStyle(5, 0xFF0000);

  // draw a rectangle
  // graphics.drawRect(0, 0, 40, 40);

  // this.addChild(graphics);
  stage.addChild(this);

  this.gravity = 0.1;
  this.spring = 3;
  this.velocity = 0;

  this.scale.x = 0.5;
  this.scale.y = 0.5;

  this.position.x = 40;
  this.position.y = 80;

  this.allowSpring = false;

  var that = this;

  document.onkeypress = function (e) {
    e = e || window.event;

    if (e.key == ' ') {
      if (that.allowSpring) that.velocity -= that.spring;
      // console.log(that.velocity);
    }
  };

  document.body.addEventListener("touchstart", this.handleDeviceTouch.bind(this), false);

  this.visible = false;
}

FlyingPixie.prototype = Object.create(PIXI.Sprite.prototype);

FlyingPixie.prototype.handleDeviceTouch = function() {
  if (this.allowSpring) this.velocity -= this.spring;
}

FlyingPixie.prototype.updatePos = function () {
  this.velocity += this.gravity;
  // console.log(this.velocity);

  this.position.y += this.velocity;

  if (this.position.y > 250) {
    this.setDead();
  }
}

FlyingPixie.prototype.show = function () {
  this.visible = true;

  this.position.x = 40;
  this.position.y = 80;
}

FlyingPixie.prototype.setAllowSpring = function(val) {
  // console.log('setAllowSpring', val);
  this.allowSpring = val;
}

FlyingPixie.prototype.setDead = function() {
  // console.log("setDead");
  this.allowSpring = false;

  this.position.y = 250;
  this.velocity = 0;

  this.callBack();
}
