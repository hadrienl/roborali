var util = require("util"),
	Base = require('../base');

var Card = function(config)
{
	Base.apply(this, arguments);
};

util.inherits(Card, Base);

Card.prototype.ATTRS = {
	action: {
		value: null,
		setter: function(v)
		{
			return v;
		}
	},
	property: {
		value: null,
		setter: function(v)
		{
			return v;
		}
	}
};

console.log(new Card().get('action'));
module.exports = Card;