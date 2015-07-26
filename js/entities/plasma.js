/**
 * a plasma explosion effect
 */
game.EntityPlasma = me.Sprite.extend({
	init: function(x, y, big, callback) {

		 // call the constructor
        this._super(me.Sprite, 'init', [x, y, {image : me.loader.getImage("plasma")}]);
		
		// adjust size to the give center point
		this.pos.x -= this.width / 2;
		this.pos.y -= this.height / 2;
		
		// ensure the 'name' property is defined
		// since added manually
		this.name = 'plasma';
		
		// half transparent and flickering
		this.alpha = 0.5;
		this.flickering = true;
		
		//maximum explosion size
		this.maxSize = big ? 1.0 : 0.5;
		// make it small
		this.currentSize = 0.1;
		
		// make it small
		this.scale(this.currentSize);
		
		// a call back called when the explosion is over
		this.onFinish = callback;
		
		
	},
	
	update: function(dt) {
		// scale it first
		while (this.currentSize < this.maxSize) {
			this.currentSize += 0.1;
			this.scale(this.currentSize);
			return true;
		}
		// fade out
		while (this.alpha > 0.0) {
			this.alpha -= 0.1;
			return true;
		}
		if (this.onFinish) {
			this.onFinish();
		}
		// remove it
		this.visible = false;
		me.game.world.removeChild(this);
		return false;
	}
});

