var YUI = require('yui').YUI,
	Y = YUI({ useSync: true }).use('model');


var Card = Y.Base.create('Card', Y.Model, [], {

},{
	ATTRS: {
		action: {
			value: null,
			validator: function(v)
			{
				return [Card.ACTION_MOVE_3,
						Card.ACTION_MOVE_2,
						Card.ACTION_MOVE_1,
						Card.ACTION_BACKUP,
						Card.ACTION_TURN_LEFT,
						Card.ACTION_TURN_RIGHT,
						Card.ACTION_HALF_TURN].indexOf(v) > -1;
			}
		},
		priority: {
			value: 0,
			setter: function(v)
			{
				return Math.min(
					Math.max(
						+v,
						1
					),
					999
				);
			}
		}
	}
});

Card.ACTION_MOVE_3 = 'mv3';
Card.ACTION_MOVE_2 = 'mv2';
Card.ACTION_MOVE_1 = 'mv1';
Card.ACTION_BACKUP = 'bu';
Card.ACTION_TURN_LEFT = 'tl';
Card.ACTION_TURN_RIGHT = 'tr';
Card.ACTION_HALF_TURN = 'ht';

module.exports = Card;