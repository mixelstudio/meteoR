
/** 
 * Title Screen
 */

game.TitleScreen = me.ScreenObject.extend({

	onResetEvent: function() {

		// add the background color (#0)
		me.game.world.addChild(new me.ColorLayer('background','#5E3F66'), 0);
		
		// add the earth ! (#1)
		me.game.world.addChild(me.pool.pull("earth", -120, me.game.viewport.height-296, true), 1);
		
		// add a big meteor in the center
		var meteor = me.pool.pull("meteor", 0, 0, true);
		meteor.alive = false;
		meteor.renderable.scale(3.0);
		meteor.shield.scale(3.0);
		meteor.pos.set(
				(me.game.viewport.width / 2) - (meteor.width / 2),
				(me.game.viewport.height / 2) - (meteor.height / 2),
				2
		);
		me.game.world.addChild(meteor);
		
		// renderable to display the game title
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
				this.tfont = new me.BitmapFont("font", {x:32});
				this.tfont.set('center', 0.5);
				this.sfont = new me.BitmapFont("font", {x:32});
				this.sfont.set('center', 1.0);
				this.mfont = new me.BitmapFont("font", {x:32});
				this.mfont.set('center', 1.5);
				this.bfont = new me.BitmapFont("font", {x:32});
				this.bfont.set('center', 2.5);
            },
            update: function() {
                return true;
            },
            draw: function(renderer) {
				this.bfont.draw (renderer, "METEOR", (me.game.viewport.width/2), 320);
				this.sfont.draw (renderer, "TAP TO PLAY", me.game.viewport.width/2, 500);

				this.tfont.draw (renderer, "CREDITS:", me.game.viewport.width/2, 700);
				this.tfont.draw (renderer, "MELONJS.ORG", me.game.viewport.width/2, 716);
				this.tfont.draw (renderer, "KENNEY.NL", me.game.viewport.width/2, 732);
            }
        })), 3);
		
		// tap to play
		me.input.registerPointerEvent('pointerdown', me.game.viewport, function() {
			 //switch to PLAY state
			me.state.change(me.state.PLAY);
		});

	},

	
	onDestroyEvent : function() {
		me.input.releasePointerEvent('pointerdown', me.game.viewport);

	}

});
