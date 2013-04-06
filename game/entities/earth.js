/**
 * a earth entity
 */
EntityEarth = me.ObjectEntity.extend({
	init: function(x, y, z, big) {

		settings = {
			image : "earth",
			spritewidth : 416,
			spriteheight : 416
		};
		
		this.parent(x, y, settings);

		this.z = z || 1;
		
		// set a reference under our namespace
		game.earth = this;
		this.center = new me.Vector2d(this.pos.x+(this.widht/2), this.pos.y+(this.height/2));
		
		// the white stuff in front of the meteor
		// (did not find the right way to name it, but it's not a shield)
		this.athmosphere = new me.SpriteObject(this.pos.x, this.pos.y, me.loader.getImage("planet_glass"));
		// force this since it won' be updated by the engine
		this.athmosphere.inViewport = true;
		// set the shield initial position 
		// update the shield position and angle
		this.athmosphere.pos.x = this.pos.x + this.hWidth - this.athmosphere.hWidth;
		this.athmosphere.pos.y = this.pos.y + this.hHeight - this.athmosphere.hHeight;
		// make the shield mostly transparent
		this.athmosphere.setOpacity(0.5);
		
		// planet initial life
		this.life = 100;

	},
	
	onTouch : function (big) {
		this.athmosphere.flicker(60);
		this.life -= big?5:3;
		if (this.life <=0) {
			//switch to game over state
			me.state.change(me.state.GAMEOVER);
		}
	},

	update: function() {
		this.parent();
		return this.athmosphere.update();
	},
	
	draw : function (context) {
		this.parent(context);
		this.athmosphere.draw(context);
	}

});

