
/** 
 * Main Game Screen
 */

var PlayScreen = me.ScreenObject.extend( {
	onResetEvent: function() {
	
		// reset the score
		game.score = 0;
		
		// add the background color (#0)
		me.game.add(new me.ColorLayer('background','#5E3F66',0));
		
		// add the earth ! (#1)
		var height = me.game.viewport.height;
		me.game.add(me.entityPool.newInstanceOf("earth", -120, height-296, 1, true));
		
		// add the meteor generator (#2)
		me.game.add(new EntityGenerator(2));
			
		// add the ship ! (#4)
		me.game.add(me.entityPool.newInstanceOf("ship", 100,100),4);
		
		// add the score object
		// add the meteor generator (#5)
		me.game.add(new EntityScore(5,5,5));
		
		// sort all objects
		me.game.sort();
	}
});
