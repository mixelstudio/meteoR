/**
 * a earth entity
 */
game.EntityEarth = me.Entity.extend({
	init: function(x, y, big) {
		
		// call the constructor
        this._super(me.Entity, 'init', [x, y, {
			height : 416,
			width : 416,
		}]);

        // add the earth sprite as renderable
        this.renderable = new me.Sprite(0, 0, {
        	image: me.loader.getImage("earth"),			
        	framewidth : 416,
			frameheight : 416
		});
		
		// set a reference under our namespace
		game.data.earth = this;

		this.center = new me.Vector2d(this.pos.x+(this.width / 2), this.pos.y+(this.height / 2));
		
		// the white stuff in front of the meteor
		// (did not find the right way to name it, but it's not a shield)
		this.athmosphere = new me.Sprite(this.pos.x, this.pos.y, {image: me.loader.getImage("planet_glass")});
		// force this since it won' be updated by the engine
		this.athmosphere.inViewport = true;
		// set the shield initial position 
		// update the shield position and angle
		this.athmosphere.pos.x = this.pos.x + (this.width / 2) - (this.athmosphere.width / 2);
		this.athmosphere.pos.y = this.pos.y + (this.height / 2) - (this.athmosphere.height / 2);
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

	update: function(dt) {
		this._super(me.Entity, 'update', [dt]);
		return this.athmosphere.update(dt);
	},
	
	draw : function (renderer) {
		this._super(me.Entity, 'draw', [renderer]); 
		this.athmosphere.draw(renderer);
	}

});

