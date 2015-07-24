/**
 * a ball entity
 */
game.EntityMeteor = me.Entity.extend({
	init: function(x, y, big) {

		settings = {
			height : big?136:44,
			width : big?111:42
		};

		// call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        // add the meteor sprite as renderable
        this.renderable = new me.Sprite(0, 0, {
        	image: me.loader.getImage(big?"meteorbig":"meteorsmall"),			
        	framewidth : big?136:44,
			frameheight : big?111:42
		});

		this.big = big;
		
		// ensure the 'name' property is defined
		// since added manually
		this.name = 'meteor';
		this.type = 'meteor';
		
		// default speed
		this.speed = Math.round((big?180:240) / me.sys.fps);
		
		// spinning angle and speed
		this.angleDeg = 0;
		this.spinSpeed = big?1:2;

		// angle towards earth
		this.angleToEarth = this.angleToPoint(game.data.earth.center);
		
		// default angular velocity
		this.body.vel.set(
			Math.cos(this.angleToEarth) * this.speed * me.timer.tick,
			Math.sin(this.angleToEarth) * this.speed * me.timer.tick
		)
		
		// the white stuff in front of the meteor
		// (did not find the right way to name it, but it's not a shield)
		this.shield = me.pool.pull("shield", this.pos.x, this.pos.y, {image:me.loader.getImage(big?"shieldbig":"shieldsmall")});
		// force this since it won' be updated by the engine
		this.shield.inViewport = true;
		// adjust the shield to face earth
		this.shield.angle = ((this.angleToEarth.radToDeg())+90).degToRad();
		// set the shield initial position 
		// update the shield position and angle
		this.shield.pos.x = this.pos.x + (this.width / 2) - (this.shield.width / 2);
		this.shield.pos.y = this.pos.y + (this.height / 2) - (this.shield.height / 2);
		// make the shield mostly transparent
		this.shield.setOpacity(0.2);
		
		// if the small meteor, make the collision box a big bigger
		/*
		if (!this.big) {
			this.updateColRect(-4, this.width+8, -4, this.height+8);
		}
		TODO : resize the collision shape ? (should be automatic)
		*/
					
		//register on mouse/touch event
		me.input.registerPointerEvent('pointerdown', this, this.onTouch.bind(this));	
	},
	
	onTouch : function () {
		// make the ship fire towards us
		game.data.ship.fire(this);
		// don't propagate the event furthermore
		return false;
	},
	
	onReachEarth : function () {
		this.alive = false;
		game.data.earth.onTouch.call(game.data.earth, this.big);
		me.game.remove(this);
	},
	
	update: function(dt) {
		if (this.alive) {
			// spinning angle
			this.angleDeg = (this.angleDeg-this.spinSpeed) % 360;
			this.angle = this.angleDeg.degToRad();
			
			// move towards the earth center !
			this.pos.add(this.body.vel);

			// we don't use any collision detection stuff here, since all
			// we need is to calculate remaining distance to earth
			if (this.distanceToPoint(game.data.earth.center) - (this.width / 2) < (game.data.earth.width / 2)) {
				this.onReachEarth.call(this);
				return true;
			}
			
			// update the shield position and angle
			this.shield.pos.add(this.body.vel);
			
			// update sprite animation
			this.shield.update(dt);
			this._super(me.Entity, 'update', [dt]);
		}
		return true;
	},
	
	draw: function(renderer) {
		this._super(me.Entity, 'draw', [renderer]);
		this.shield.draw(renderer);
	},
	
	onDestroyEvent : function() {
		// unregister mouse/touch event
		me.input.releasePointerEvent('pointerdown', this);
		// free the shield sprite
		this.shield = null;
	}
});

