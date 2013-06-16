var Map = require('../models/map');

module.exports = {
	Map: {
		setUp: function(cb)
		{
			this.map = new Map();

			cb();
		},
		tearDown: function(cb)
		{
			this.map.destroy();
			delete this.map;

			cb();
		},

		testLoad: function(test)
		{
			this.map.set('id', 1);

			this.map.load();

			setTimeout(
				function()
				{
					test.equals(
						2,
						this.map.get('width')
					);
					test.equals(
						10,
						this.map.get('height')
					);

					test.equals(
						'spin-l',
						this.map.get('matrix')[0][0][0]
					);

					test.done();
				}.bind(this),
				10
			);
		}
	}
}
