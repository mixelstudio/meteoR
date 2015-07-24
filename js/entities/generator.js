/**
 * a meteor entity generator
 */
game.EntityGenerator = me.InvisibleEntity.extend({
	init: function(z) {
		settings = {
			width : 0,
			height : 0
		};
		// call parent contructor
		this.parent(0, 0, settings);
		
		this.z = z || 2;
		
		// keep track  of when we started the game
		// so that we can increase difficulty over time
		this.startTime = me.timer.getTime();
		this.lastTime = this.startTime;
		
		// 2 sec default interval
		this.interval = 2000;
	},
	

	update: function() {
		// add new meteor at random position
		if ((me.timer.getTime() - this.lastTime) > this.interval) {
			// generate some random numbers
			var pos = Number.prototype.random (0, 50); 
			var type = Number.prototype.random (1, 2);
			
			// add a new meteor
			if (pos%2===0) {
				// coming from the right
				me.game.add(me.entityPool.newInstanceOf("meteor", me.game.viewport.width+150, pos * 10, this.z, (type===2)));
			} else {
				// coming from upside
				me.game.add(me.entityPool.newInstanceOf("meteor", (pos * 10) + 300, -150, this.z, (type===2)));
			}
			me.game.sort();
			this.lastTime = me.timer.getTime();
			
			// decrease the interval
			if (this.interval >0) {
				// not sure someone will reach 0 !
				this.interval -=10;
			}
			return true;
		}
		return false;
		
	}

});

