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
		matrix: {
			valueFn: function()
			{
				return [];
			}
		}
	}
});

Map.GROUND_NORMAL = 10;
Map.GROUND_TRAVELATOR = 11;

Map.SPIN_LEFT = 20;
Map.SPIN_RIGHT = 21;

Map.WALL_NORTH = 30;
Map.WALL_EAST = 31;
Map.WALL_SOUTH = 32;
Map.WALL_NORTH = 33;

module.exports = Map;
