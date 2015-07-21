/**
 * a score entity
 */
EntityScore  = me.InvisibleEntity.extend({
	init: function(x, y, z) {
		settings = {
			width : 0,
			height : 0
		};
		// call parent contructor
		this.parent(x, y, settings);
		this.z = z || 2;
		this.font = new me.BitmapFont("font", 32);
		this.inViewport = this.visible = true
	},
	
	
	draw : function (context) {
		this.font.draw(context, ""+game.score, 200, 10);
	},
	
	onDestroyEvent : function () {
		this.font = null
	}

});

