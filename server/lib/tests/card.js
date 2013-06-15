var Card = require('../models/card');

module.exports = {
	Card: {
		setUp: function(cb)
		{
			this.card = new Card();

			cb();
		},
		tearDown: function(cb)
		{
			this.card.destroy();
			delete this.card;

			cb();
		},

		testAction: function(test)
		{
			this.card.set('action', Card.ACTION_MOVE_3);
			test.equals(
				Card.ACTION_MOVE_3,
				this.card.get('action')
			);

			this.card.set('action', 123);
			test.equals(
				Card.ACTION_MOVE_3,
				this.card.get('action')
			);

			this.card.set('action', 'foobar');
			test.equals(
				Card.ACTION_MOVE_3,
				this.card.get('action')
			);

			this.card.set('action', Card.ACTION_BACKUP);
			test.equals(
				Card.ACTION_BACKUP,
				this.card.get('action')
			);

			test.done();
		},

		testPriority: function(test)
		{
			this.card.set('priority', 1);
			test.equals(
				1,
				this.card.get('priority')
			);

			this.card.set('priority', 999);
			test.equals(
				999,
				this.card.get('priority')
			);

			this.card.set('priority', 500);
			test.equals(
				500,
				this.card.get('priority')
			);

			this.card.set('priority', 1000);
			test.equals(
				999,
				this.card.get('priority')
			);

			this.card.set('priority', -30);
			test.equals(
				1,
				this.card.get('priority')
			);

			test.done();
		}
	}
}