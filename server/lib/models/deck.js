var YUI = require('yui').YUI,
	Y = YUI({ useSync: true }).use('model', 'model-list'),
	Card = require('./card');

var Deck = Y.Base.create('Deck', Y.ModelList, [], {

	/**
	 * Pick a random card
	 * @method pick
	 * @public
	 */
	pick: function()
	{
		var action, priority, random, card;

		random = parseInt(Math.random()*1000%7);

		switch (random)
		{
			case 0:
				action = Card.ACTION_MOVE_3;
				break;
			case 1:
				action = Card.ACTION_MOVE_2;
				break;
			case 2:
				action = Card.ACTION_MOVE_1;
				break;
			case 3:
				action = Card.ACTION_BACKUP;
				break;
			case 4:
				action = Card.ACTION_TURN_LEFT;
				break;
			case 5:
				action = Card.ACTION_TURN_RIGHT;
				break;
			case 6:
				action = Card.ACTION_HALF_TURN;
		}

		priority = parseInt(Math.random()*1000);

		card = new Card({
			action: action,
			priority: priority
		});

		this.add(card);

		return card;
	}
},{
	
});

module.exports = Deck;
