/**
 * a ball entity
 */
EntityMeteor = me.ObjectEntity.extend({
	init: function(x, y, z, big) {

		settings = {
			image : big?"meteorbig":"meteorsmall",
			spritewidth : big?136:44,
			spriteheight : big?111:42
		};
		// call parent constructor
		this.parent(x, y, settings);

		// default z index
		this.z = z || 2;
		this.big = big;
		
		// ensure the 'name' property is defined
		// since added manually
		this.name = 'meteor';
		this.type = 'meteor';
		
		this.collidable = true;
		
		// default speed
		this.speed = Math.round((big?180:240) / me.sys.fps);
		
		// spinning angle and speed
		this.angleDeg = 0;
		this.spinSpeed = big?1:2;

		// angle towards earth
		this.angleToEarth = this.angleToPoint(game.earth.center);
		
		// default angular velocity
		this.vel.set(
			Math.cos(this.angleToEarth) * this.speed * me.timer.tick,
			Math.sin(this.angleToEarth) * this.speed * me.timer.tick
		)
		
		// the white stuff in front of the meteor
		// (did not find the right way to name it, but it's not a shield)
		this.shield = me.entityPool.newInstanceOf("shield", this.pos.x, this.pos.y, me.loader.getImage(big?"shieldbig":"shieldsmall"));
		// force this since it won' be updated by the engine
		this.shield.inViewport = true;
		// adjust the shield to face earth
		this.shield.angle = ((this.angleToEarth.radToDeg())+90).degToRad();
		// set the shield initial position 
		// update the shield position and angle
		this.shield.pos.x = this.pos.x + this.hWidth - this.shield.hWidth;
		this.shield.pos.y = this.pos.y + this.hHeight - this.shield.hHeight;
		// make the shield mostly transparent
		this.shield.setOpacity(0.2);
		
		// if the small meteor, make the collision box a big bigger
		if (!this.big) {
			this.updateColRect(-4, this.width+8, -4, this.height+8);
		}
		
					
		//register on mouse/touch event
		me.input.registerMouseEvent('mousedown', this.collisionBox, this.onTouch.bind(this));
		
	},
	
	onTouch : function () {
		// make the ship fire towards us
		game.ship.fire(this);
		// don't propagate the event furthermore
		return false;
	},
	
	onReachEarth : function () {
		this.alive = false;
		game.earth.onTouch.call(game.earth, this.big);
		me.game.remove(this);
	},
	
	update: function() {
		if (this.alive) {
			// spinning angle
			this.angleDeg = (this.angleDeg-this.spinSpeed) % 360;
			this.angle = this.angleDeg.degToRad();
			
			// move towards the earth center !
			this.pos.add(this.vel);

			// we don't use any collision detection stuff here, since all
			// we need is to calculate remaining distance to earth
			if (this.distanceToPoint(game.earth.center) - this.hWidth < game.earth.hWidth) {
				this.onReachEarth.call(this);
				return true;
			}
			
			// update the shield position and angle
			this.shield.pos.add(this.vel);
			
			// update sprite animation
			this.shield.update();
			this.parent();
		}
		return true;
	},
	
	draw: function(context) {
		this.parent(context);
		this.shield.draw(context);
	},
	
	onDestroyEvent : function() {
		// unregister mouse/touch event
		me.input.releaseMouseEvent('mousedown', this.collisionBox);
		// free the shield sprite
		this.shield = null;
	}
});

