var YUI = require('yui').YUI,
	Y = YUI({ useSync: true }).use('model'),
	Card = require('./card'),
	fs = require('fs');

var Map = Y.Base.create('Map', Y.Model, [], {

	sync: function(action, options, callback)
	{
		if ('read' === action)
		{
			fs.readFile(
				__dirname+'/../maps/'+this.get('id')+'.json',
				function(err, data)
				{
					try
					{
						data = JSON.parse(data.toString());
					}
					catch (e)
					{
						err = 'Map is not a valid JSON';
						data = null;
					}

					callback(err, {matrix: data});
				}
			)
		}
	}

}, {
	ATTRS: {
		width: {
			value: 1,
			validator: Y.Lang.isNumber
		},
		height: {
			value: 1,
			validator: Y.Lang.isNumber
		},
		matrix: {
			validator: function(v)
			{
				var ok = true;

				/**
				 * Check if the array have the correct form
				 */
				if (!Y.Lang.isArray(v) ||
					!v[0])
				{
					return false;
				}

				v.forEach(
					function(line)
					{
						if (!Y.Lang.isArray(line) ||
							!line[0])
						{
							ok = false;
						}

						v.forEach(
							function(box)
							{
								if (!Y.Lang.isArray(box))
								{
									ok = false;
									return true;
								}
							}
						);

						if (!ok)
						{
							return true;
						}
					}
				);

				if (!ok)
				{
					return false;
				}

				return true;
			},
			setter: function(v)
			{
				this.set('width', v.length);
				this.set('height', v[0].length);

				return v;
			}
		}
	}
});

Map.NORTH = 'n';
Map.SOUTH = 's';
Map.EAST = 'e';
Map.WEST = 'w';

Map.LEFT = 'l';
Map.RIGHT = 'r';

Map.TRAVELATOR = 'travelator';
Map.SPIN = 'spin';
Map.WALL = 'wall';
Map.LASER = 'laser';
Map.HOLE = 'hole';

module.exports = Map;
