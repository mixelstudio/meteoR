/**
 * a earth entity
 */
EntityShip = me.ObjectEntity.extend({
	init: function(x, y, z) {
		settings = {
			image : "ship",
			spritewidth : 80,
			spriteheight : 96
		};
		this.parent(x, y, settings);
		this.z = z || 4;
				
		this.canMove = false;
		
		// to memorize where we grab the ship
		this.grabOffset = new me.Vector2d(0,0);
		
		// to detect the touch id
		this.touchId = -1;
		
		//register on mouse/touch event
		me.input.registerMouseEvent('mousedown', this.collisionBox, this.onSelect.bind(this));
		me.input.registerMouseEvent('mouseup', this.collisionBox, this.onRelease.bind(this));

		// set a reference under our namespace
		game.ship = this;

	},
	
	
	getFingerId : function () {
		for(var i=0, l=me.input.touches.length; i<l; i++) {
			if (this.collisionBox.containsPoint(me.input.touches[i])) {
				return i;
			}
		}
		return -1;
	},
	
	onSelect : function (e) {
		var finger = this.getFingerId();
		if (finger===-1) {
			return true;
		}
		this.grabOffset.setV(me.input.touches[finger]);
		this.grabOffset.sub(this.pos);
		this.canMove = true;
		// don't propagate the event furthermore
		return false;
	},
	
	onRelease : function (e) {
		this.canMove = false;
		// don't propagate the event furthermore
		return false;
	},
	
	fire : function (meteor) {
		// make the ship face the meteor
		this.angle = this.angleTo(meteor);
		// add a new laser beam
		me.game.add(me.entityPool.newInstanceOf("laser", this.pos.x+this.hWidth, this.pos.y+this.hHeight, 3, meteor));
		me.game.sort();
	},

	update: function() {
		
		// check if we touch a meteor
		var res = me.game.collideType(this,'meteor');
		if (res) {
			// destroy the ship !
			// add the plama explosion effect
			me.game.add(me.entityPool.newInstanceOf(
				"plasma", 
				this.pos.x + this.hWidth,
				this.pos.y + this.hHeight, 
				this.z, 
				true));
			// and the meteor !
			// add the plama explosion effect
			me.game.add(me.entityPool.newInstanceOf(
				"plasma", 
				res.obj.pos.x + res.obj.hWidth,
				res.obj.pos.y + res.obj.hHeight, 
				res.obj.z, 
				res.obj.big, 
				function() {
					//switch to game over state
					me.state.change(me.state.GAMEOVER);
				}
			));
			me.game.remove(res.obj);
			me.game.remove(this);
			me.game.sort();
			return true;
		}

		if (this.canMove) {
			var finger = this.getFingerId();
			if (finger!==-1) {
				// follow the mouse/finger
				this.pos.setV(me.input.touches[finger]);
				this.pos.sub(this.grabOffset);
			}
		}
		return this.parent() || this.canMove;
	},
	
	draw : function (context) {
		this.parent(context);
	}

});

