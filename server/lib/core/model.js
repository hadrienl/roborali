var Base = require('../core/base');

var Model = Base.create('Model', Base, {
	/**
	 * Each attributes fire a `attributenameChange` event when set
	 * @method set
	 * @public
	 */
	set: function(k, v)
	{
		if (!this._attrs[k]) return;

		var prevVal = this._data[k].value,
			newVal;

		Model.super_.prototype.set.apply(this, arguments);

		newVal = this._data[k].value;

		if (prevVal === newVal)
		{
			return;
		}

		this.emit(k+'Change', {
			prevVal: prevVal,
			newVal: newVal
		})
	}
}, {
	
});

module.exports = Model;
