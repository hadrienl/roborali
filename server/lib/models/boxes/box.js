var YUI = require('yui').YUI,
	Y = YUI({ useSync: true }).use('base');

var Box = Y.Base.create('Box', Y.Base, [], {

	/**
	 * Before leaving box. Generally, nothing append.
	 * But a wall could prevent the move and a
	 * hole can kill the player
	 * @method step1
	 * @param {Player} player Player which made his step on the box
	 */
	beforeMoves: function(player)
	{
		// exemples

		// for a wall
		// if (this.hasWall(player.move.direction))
		// {
		//		player.cancelMove();
		// }
	},

	/**
	 * When a player move or make an action. If the player enter a hole,
	 * he dies. If he enter a player position, he push him if the player can
	 * move.
	 */
	onEachStep: function(player)
	{

	}

	/**
	 * After each player did move
	 */
	afterMoves: function(player)
	{
		// exemples

		//player.move(1, south);

		//player.turn(left);
	},

	endOfPhase: function(player)
	{
		// do nothing
	},

	endOfTurn: function(player)
	{
		
	}

}, {
	ATTRS: {
		direction: {

		}
	}
});

module.exports = Box;
