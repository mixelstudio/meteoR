
/** 
 * Title Screen
 */

game.TitleScreen = me.ScreenObject.extend({

	onResetEvent: function() {
		
		// add the background color (#0)
		me.game.add(new me.ColorLayer('background','#5E3F66',0));
		
		// add the earth ! (#1)
		var height = me.game.viewport.height;
		me.game.add(me.entityPool.newInstanceOf("earth", -120, height-296, 1, true));
		
		// add a big meteor in the center
		var x = (me.game.viewport.width/2)-(136/2);
		var y = (me.game.viewport.height/3)-(111/2);
		var meteor = me.entityPool.newInstanceOf("meteor", x, y, 1, true);
		meteor.alive = false;
		meteor.angle = 0;
		meteor.resize(3.0);
		meteor.shield.resize(3.0);
		me.game.add(meteor);		
		
		// sort all objects
		me.game.sort();
		
		
		this.tfont = new me.BitmapFont("font", 32);
		this.tfont.set('center', 0.5);
		this.sfont = new me.BitmapFont("font", 32);
		this.sfont.set('center', 1.0);
		this.mfont = new me.BitmapFont("font", 32);
		this.mfont.set('center', 1.5);
		this.bfont = new me.BitmapFont("font", 32);
		this.bfont.set('center', 2.5);
		
		// tap to play
		me.input.registerMouseEvent('mousedown', me.game.viewport, function() {
			 //switch to PLAY state
			me.state.change(me.state.PLAY);
		});

	},
	
	update : function () {
	},
	
	draw : function (context) {
		this.mfont.draw (context, "METEO ", me.game.viewport.width/2, 250);
		this.bfont.draw (context, "    R", (me.game.viewport.width/2)-24, 230);
		this.sfont.draw (context, "TAP TO PLAY", me.game.viewport.width/2, 500);

		this.tfont.draw (context, "CREDITS:", me.game.viewport.width/2, 700);
		this.tfont.draw (context, "MELONJS.ORG", me.game.viewport.width/2, 716);
		this.tfont.draw (context, "KENNEY.NL", me.game.viewport.width/2, 732)
	},

	
	onDestroyEvent : function() {
		this.tfont = this.sfont = this.mfont = this.bfont = null;
		me.input.releaseMouseEvent('mousedown', me.game.viewport);

	}

});
