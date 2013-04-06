/**
 * main 
 */
var game = {

	// game assets
	assets : [	
		{name: "meteorbig",			type:"image",	src: "media/meteorbig.png"},
		{name: "meteorsmall",		type:"image",	src: "media/meteorsmall.png"},
		{name: "shieldbig",			type:"image",	src: "media/shieldbig.png"},
		{name: "shieldsmall",		type:"image",	src: "media/shieldsmall.png"},
		{name: "plasma",			type:"image",	src: "media/plasma.png"},
		{name: "earth",				type:"image",	src: "media/earth.png"},
		{name: "planet_glass",		type:"image",	src: "media/planet_glass.png"},
		{name: "ship",				type:"image",	src: "media/ship.png"},
		{name: "laser",				type:"image",	src: "media/laser.png"},
		{name: "font",				type:"image",	src: "media/font.png"}
	],
	
	earthCenter : null,
	
	score : 0,
	
	/**
	 * Initialize the application
	 */
	onload: function() {
	
		// init the video (with auto-scaling on)
		if (!me.video.init('canvas', 1024, 768)) {
			alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
			return;
		}
		
		//me.plugin.register(debugPanel, "debug");
		
		// disable interpolation when scaling
		//me.video.setImageSmoothing(false);
		
		// enable dirty region draw mechanism
		me.sys.dirtyRegion = true;
		
		// disable gravity globally
		me.sys.gravity = 0;
		
		// initialize the "sound engine"
		me.audio.init("mp3,ogg");
		
		// some additional fine-tuning to make it "nice" on mobile devices
		if (me.sys.touch) {
			/* This code prevents the webview from moving on a swipe */
			preventDefaultScroll = function(e) {
				e.preventDefault();
				window.scroll(0,0);
				return false;
			};
			window.document.addEventListener('touchmove', preventDefaultScroll, false);
			/* Hide the address bar */
			window.addEventListener("load", function() {
				setTimeout(function() {
					window.scrollTo(0, 1);
				}, 0);
			});
		}
		
		// set the loader callback
		me.loader.onload = this.loaded.bind(this);
		
		// set all ressources to be loaded
		me.loader.preload(game.assets);
		
		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	
	},
	
	/**
	 * callback when everything is loaded
	 */	
	loaded: function ()	{
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.MENU, new TitleScreen());
		me.state.set(me.state.PLAY, new PlayScreen());
		me.state.set(me.state.GAMEOVER, new GameOverScreen());
		
		// add some fadeIn/fadeOut effect for transition 
		me.state.transition("fade","#000000", 100);
		
		// add our user-defined entities in the entity pool
		// and enable the object pooling mechanism
		me.entityPool.add("meteor", EntityMeteor, true);
		me.entityPool.add("earth", EntityEarth, true);
		me.entityPool.add("shield", me.SpriteObject, true);
		me.entityPool.add("ship", EntityShip, true);
		me.entityPool.add("laser", EntityLaser, true);
		me.entityPool.add("plasma", EntityPlasma, true);
		
		// add a fn callback that displays "pause" on pause :)
		me.state.onPause = function () {
			var _font = new me.Font('Arial', 32, 'white', 'center');
			_font.bold();
			_font.draw(me.video.getSystemContext(), 'Paused !', me.game.viewport.width/2, me.game.viewport.height/2);
			me.video.blitSurface();
		};
	
		// switch to MENU state
		me.state.change(me.state.MENU);
	}
};

/* Bootstrap */
window.onReady(function onReady() {
	game.onload();
});