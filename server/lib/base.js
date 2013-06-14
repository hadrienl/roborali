var Base = function(config)
{
	config = config || {};

	this.ATTRS = this.ATTRS || {};
	this._data = {};

	/**
	 * Init attributes
	 */
	for (var attr in this.ATTRS)
	{
		/**
		 * Create the data container for each attribute
		 */
		this._data[attr] = {
			value: undefined
		};

		/**
		 * If an initial value has been set in the constructor, set it
		 */
		if (config[attr])
		{
			this.set(attr, config[attr]);
		}
		else
		/**
		 * Else, if the ATTRS defintions specify a valueFn, set the returned value
		 */
		if (undefined !== this.ATTRS[attr].valueFn)
		{
			this.set(attr, this.ATTRS[attr].valueFn.apply(this));
		}
		else
		/**
		 * Finally, if the ATTRS definition specify a default value, go for it
		 */
		if (undefined !== this.ATTRS[attr].value)
		{
			this.set(attr, this.ATTRS[attr].value);
		}
	}
}
Base.prototype = {
	/**
	 * Attributes definitions
	 * @property ATTRS
	 * @public
	 */
	ATTRS: null,

	/**
	 * Storage of attributes data
	 * @property _data
	 * @protected
	 */
	_data: null,


	/**
	 * Set an attribute with a value.
	 * @method set
	 * @param {string} key Attribute name
	 * @param {mixed} value The attribute new value
	 * @public
	 */
	set: function(key, value)
	{
		if (this.ATTRS[key] &&
			this.ATTRS[key].setter)
		{
			this._data[key].value = this.ATTRS[key].setter.apply(this, [value]);
		}
		else
		{
			this._data[key].value = value;
		}
	},

	/**
	 * Get the value of an attribute
	 * @method get
	 * @param {string} key Attribute name
	 * @public
	 */
	get: function(key)
	{
		if (!this._data[key])
		{
			return null;
		}
		if (this.ATTRS[key] &&
			this.ATTRS[key].getter)
		{
			return this.ATTRS[key].getter.apply(this);
		}
		else
		{
			return this._data[key].value;
		}
	},

	destroy: function()
	{
		delete this._data;
	}
};

module.exports = Base;