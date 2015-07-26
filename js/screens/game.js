
/** 
 * Main Game Screen
 */

game.PlayScreen = me.ScreenObject.extend( {
	onResetEvent: function() {
	
		// reset the score
		game.data.score = 0;
		
		// add the background color (#0)
		me.game.world.addChild(new me.ColorLayer('background','#5E3F66', 0));
		
		// add the earth ! (#1)
		me.game.world.addChild(me.pool.pull("earth", -120, me.game.viewport.height-296, true), 1);
		
		// add the meteor generator (#2)
		me.game.world.addChild(new game.EntityGenerator(), 2);
			
		// add the ship ! (#4)
		me.game.world.addChild(me.pool.pull("ship", 100,100), 4);
		
		// add the score object (#5)
		me.game.world.addChild(new game.EntityScore(5,5), 5);
	}
});
