/**
 * a plasma explosion effect
 */
EntityPlasma = me.SpriteObject.extend({
	init: function(x, y, z, big, callback) {
		// call parent constructor
		this.parent(x, y, me.loader.getImage("plasma"));
		
		// adjust size to the give center point
		this.pos.x -= this.hWidth;
		this.pos.y -= this.hHeight;

		// default z index
		this.z = z || 2;
		
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
		this.resize(this.currentSize);
		
		// a call back called when the explosion is over
		this.onFinish = callback;
		
		
	},
	
	update: function() {
		// scale it first
		while (this.currentSize < this.maxSize) {
			this.currentSize += 0.1;
			this.resize(this.currentSize);
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
		me.game.remove(this);
		return false;
	}
});

