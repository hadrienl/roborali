var Base = require('../core/base'),
	Model = require('../core/model');

module.exports = {
	events: {
		setUp: function (cb)
		{
			var Test = Base.create('Test', Model, {}, {
				ATTRS: {
					foo: {},
					bar: {}
				}
			});

			this.model = new Test();

			cb();
		},

		tearDown: function(cb)
		{
			this.model.destroy();

			cb();
		},

		testChange: function(test)
		{
			var fooval = null;

			this.model.on(
				'fooChange',
				function(e)
				{
					fooval = e.newVal;
				}
			);

			this.model.set('foo', 'yeah');

			test.equals(
				'yeah',
				fooval
			);

			test.equals(
				'yeah',
				this.model.get('foo')
			);

			test.done();
		}
	}
};