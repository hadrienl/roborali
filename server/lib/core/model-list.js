var Base = require('../core/base'),
	Model = require('../core/model');

var ModelList = Base.create('ModelList', Base, {

	_items: null,

	init: function()
	{
		this._items = [];
	},

	add: function(model)
	{
		if (model.ATTRS)
		{

		}
		this.emit('add', {model: model});
	},

	remove: function(model)
	{
		this.emit('remove', {model: model});
	},

	reset: function()
	{
		this.emit('reset');
	},

	getById: function(id)
	{
		var found = null;

		this._items.forEach(
			function(i)
			{
				if (i.get('id') === id)
				{
					found = i;
					return true;
				}
			}
		);

		return found;
	}
}, {

})

module.exports = ModelList;
