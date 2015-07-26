/**
 * a score entity
 */
game.EntityScore  = me.Entity.extend({
	init: function(x, y) {

		// call the constructor
        this._super(me.Entity, 'init', [x, y, {width : 0, height : 0 }]);

		this.font = new me.BitmapFont("font", 32);
		this.inViewport = this.visible = true
	},
	
	
	draw : function (renderer) {
		this.font.draw(renderer, ""+game.score, 200, 10);
	},
	
	onDestroyEvent : function () {
		this.font = null
	}

});

