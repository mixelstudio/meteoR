
/* Game namespace */
var game = {

    // an object where to store game information
    data : {

        earth : null,

        earthCenter : null,
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        
        // Initialize the video.
        if (!me.video.init(1024, 768, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // disable gravity globally
        me.sys.gravity = 0;

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.MENU, new game.TitleScreen());
        //me.state.set(me.state.PLAY, new game.PlayScreen());
        //me.state.set(me.state.GAMEOVER, new game.GameOverScreen());

        // add some fadeIn/fadeOut effect for transition 
        me.state.transition("fade","#000000", 100);
        
        // add our user-defined entities in the entity pool
        // and enable the object pooling mechanism
        me.pool.register("earth", game.EntityEarth, true);
        me.pool.register("meteor", game.EntityMeteor, true);
        me.pool.register("shield", me.Sprite, true);
        //me.pool.register("ship", game.EntityShip, true);
        //me.pool.register("laser", game.EntityLaser, true);
        //me.pool.register("plasma", game.EntityPlasma, true);
        
        // add a fn callback that displays "pause" on pause :)
        me.state.onPause = function () {
            /*
            var _font = new me.Font('Arial', 32, 'white', 'center');
            _font.bold();
            _font.draw(me.video.getSystemContext(), 'Paused !', me.game.viewport.width/2, me.game.viewport.height/2);
            me.video.blitSurface();
            */
        };

        // Start the game.
        me.state.change(me.state.MENU);
    }
};
