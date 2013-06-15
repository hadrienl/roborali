var util = require('util'),
	events = require('events');

var Base = function(config)
{
	events.EventEmitter.call(this);

	config = config || {};

	this._attrs = this.constructor.ATTRS || {};
	this._data = {};

	for (var i in this.constructor)
	{
		this[i] = this.constructor[i];
	}

	/**
	 * Init attributes
	 */
	for (var attr in this._attrs)
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
		 * Else, if the _attrs defintions specify a valueFn, set the returned value
		 */
		if (undefined !== this._attrs[attr].valueFn)
		{
			this.set(attr, this._attrs[attr].valueFn.apply(this));
		}
		else
		/**
		 * Finally, if the _attrs definition specify a default value, go for it
		 */
		if (undefined !== this._attrs[attr].value)
		{
			this.set(attr, this._attrs[attr].value);
		}
	}

	this.init.apply(this, config);
}

util.inherits(Base, events.EventEmitter);


/**
 * Attributes definitions
 * @property _attrs
 * @private
 */
Base.prototype._attrs = null;

/**
 * Storage of attributes data
 * @property _data
 * @protected
 */
Base.prototype._data = null;

/**
 * Initializer, called by the constructor
 * @method init
 * @public
 */
Base.prototype.init = function()
{

};

/**
 * Set an attribute with a value.
 * @method set
 * @param {string} key Attribute name
 * @param {mixed} value The attribute new value
 * @public
 */
Base.prototype.set = function(key, value)
{
	if (!this._attrs[key]) return;

	if (this._attrs[key].validator)
	{
		if (!this._attrs[key].validator.apply(this, [value])) return;
	}
	if (this._attrs[key].setter)
	{
		this._data[key].value = this._attrs[key].setter.apply(this, [value]);
	}
	else
	{
		this._data[key].value = value;
	}
};

/**
 * Get the value of an attribute
 * @method get
 * @param {string} key Attribute name
 * @public
 */
Base.prototype.get = function(key)
{
	if (!this._data[key])
	{
		return null;
	}
	if (this._attrs[key] &&
		this._attrs[key].getter)
	{
		return this._attrs[key].getter.apply(this, [this._data[key].value]);
	}
	else
	{
		return this._data[key].value;
	}
};

/**
 * Destroy the object
 * @method destroy
 * @public
 */
Base.prototype.destroy = function()
{
	delete this._data;

	this.destructor();
};

/**
 * Method called when destroying the object. Fill it with your cleaning code.
 * @method destructor
 * @public
 */
Base.prototype.destructor = function()
{

};

/**
 * Bind an event listener 1ms after it's fired
 * @method after
 * @param {string} event Event name to bind
 * @param {function} callback Callback called when event is fired
 */
Base.prototype.after = function(event, callback)
{
	this.on(
		event,
		function()
		{
			setTimeout(
				function(callback)
				{
					callback();
				},
				1,
				callback
			)
		}
	);
}
Base.create = function(name, parent, prototype, properties)
{
	var newclass = function()
	{
		parent.apply(this, arguments)
	};
	util.inherits(newclass, parent);
	for (var i in prototype)
	{
		newclass.prototype[i] = prototype[i];
	}

	for (var i in properties)
	{
		newclass[i] = properties[i];
	}

	return newclass;
}

module.exports = Base;