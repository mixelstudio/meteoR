
/** 
 * Game Over Screen
 */

game.GameOverScreen = me.ScreenObject.extend({

	onResetEvent: function() {
		
		// add the background color (#0)
		me.game.add(new me.ColorLayer('background','#5E3F66',0));
		
		// add the earth ! (#1)
		var height = me.game.viewport.height;
		me.game.add(me.entityPool.newInstanceOf("earth", -120, height-296, 1, true));
				
		// sort all objects
		me.game.sort();
		
		this.mfont = new me.BitmapFont("font", 32);
		this.mfont.set('right', 1.5);
		this.bfont = new me.BitmapFont("font", 32);
		this.bfont.set('center', 1.5);
		
		me.input.registerMouseEvent('mousedown', me.game.viewport, function() {
			 //switch to the title screen
			me.state.change(me.state.MENU);
		});

	},
	
	update : function () {
	},
	
	draw : function (context) {
		this.bfont.draw (context, "WELL,WE REALLY CANNOT", me.game.viewport.width/2, 250);
		this.bfont.draw (context, "COUNT ON YOU !", me.game.viewport.width/2, 300);
		
		this.mfont.draw (context, "YOUR SCORE :", 900, 550);
		this.mfont.draw (context, ''+game.score, 900, 600);

	},

	
	onDestroyEvent : function() {
		me.game.disableHUD();
		this.font = null;
		me.input.releaseMouseEvent('mousedown', me.game.viewport);

	}

});
