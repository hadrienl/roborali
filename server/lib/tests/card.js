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

		testProperty: function(test)
		{
			this.card.set('property', 1);
			test.equals(
				1,
				this.card.get('property')
			);

			this.card.set('property', 999);
			test.equals(
				999,
				this.card.get('property')
			);

			this.card.set('property', 500);
			test.equals(
				500,
				this.card.get('property')
			);

			this.card.set('property', 1000);
			test.equals(
				999,
				this.card.get('property')
			);

			this.card.set('property', -30);
			test.equals(
				1,
				this.card.get('property')
			);

			test.done();
		}
	}
}