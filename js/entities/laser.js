/**
 * a laser entity
 */
EntityLaser = me.ObjectEntity.extend({
	init: function(x, y, z, target) {
		settings = {
			image : "laser",
			spritewidth : 33,
			spriteheight : 9
		};
		this.parent(x, y, settings);
		this.z = z || 3;
		
		// laser speed (6000!!!)
		this.speed = Math.round(6000 / me.sys.fps);
		
		// our target !
		this.target = target;
		// make the laser face the meteor
		this.angle = this.angleTo(target);
		// default angular velocity
		this.vel.set(
			Math.cos(this.angle) * this.speed * me.timer.tick,
			Math.sin(this.angle) * this.speed * me.timer.tick
		)
		
		this.inViewport = true;
	},
	
	update: function() {
		if (this.alive) {
			if (this.inViewport) {
				// move towards the target initial center !
				this.pos.x += this.vel.x;
				this.pos.y += this.vel.y;
				// check if we reach target
				if (this.target.collisionBox.containsPoint(this.pos)) {
					// add the plama explosion effect
					me.game.add(me.entityPool.newInstanceOf(
						"plasma", 
						this.target.pos.x + this.target.hWidth,
						this.target.pos.y + this.target.hHeight, 
						this.target.z, 
						this.target.big)
					);	
					// add some score
					game.score += (this.target.big?300:150);
					// remove the meteor && laser beam
					this.target.alive = false;
					me.game.remove(this.target);
					this.alive = false;
					me.game.remove(this);
					// sort all objects
					me.game.sort();
				}
			} else {
				// miss the target
				this.alive = false;
				me.game.remove(this);	
			}
		}	
		return true;
	},
	
	onDestroyEvent: function() {
		// make sure we remove any cross reference
		this.target = null;
	}

});

