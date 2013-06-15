var Deck = require('../models/deck'),
	Card = require('../models/card');

module.exports = {
	Deck: {
		setUp: function(cb)
		{
			this.deck = new Deck();

			cb();
		},
		tearDown: function(cb)
		{
			this.deck.destroy();
			delete this.deck;

			cb();
		},

		testPick: function(test)
		{
			var card = this.deck.pick();

			test.equals(
				'Card',
				card.name
			);

			test.ok(
				[Card.ACTION_MOVE_3,
				Card.ACTION_MOVE_2,
				Card.ACTION_MOVE_1,
				Card.ACTION_BACKUP,
				Card.ACTION_TURN_LEFT, 
				Card.ACTION_TURN_RIGHT,
				Card.ACTION_HALF_TURN].indexOf(card.get('action')) > -1
			);

			test.ok(
				card.get('priority') > 0 && card.get('priority') < 1000
			);

			test.done();
		}
	}
}