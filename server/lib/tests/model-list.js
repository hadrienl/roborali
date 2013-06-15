var Base = require('../core/base'),
	ModelList = require('../core/model-list');

module.exports = {
	items: {
		setUp: function (cb)
		{
			var TestsList = Base.create('TestsList', ModelList, {},{});

			this.list = new TestsList();

			cb();
		},

		tearDown: function(cb)
		{
			//this.list.destroy();

			cb();
		},

		testItems: function(test)
		{
			test.ok(
				Array.isArray(this.list._items)
			);

			test.done();
		}
	}
};