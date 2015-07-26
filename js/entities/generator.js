/**
 * a meteor entity generator
 */
game.EntityGenerator = me.Entity.extend({
	init: function() {

		// call the constructor
        this._super(me.Entity, 'init', [0, 0, {width : 0, height : 0 }]);
				
		// 2 sec default interval
		this.interval = 2000;
		this.elapsed = 0;
	},
	
	update: function(dt) {
		this.elapsed += dt;
		// add new meteor at random position
		if (elapsed >= this.interval) {
			// generate some random numbers
			var pos = Number.prototype.random (0, 50); 
			var type = Number.prototype.random (1, 2);
			
			// add a new meteor
			if (pos % 2 === 0) {
				// coming from the right
				me.game.world.addChild(me.pool.pull("meteor", me.game.viewport.width+150, pos * 10, (type===2)), this.z);
			} else {
				// coming from upside
				me.game.world.addChild(me.pool.pull("meteor", (pos * 10) + 300, -150, (type===2)), this.z);
			}
			
			this.elapsed = 0;

			return true;
		}
		return false;
		
	}

});

