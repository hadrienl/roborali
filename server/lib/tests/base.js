var Base = require('../base'),
	util = require('util');

module.exports = {
    setUp: function (callback) {
        var Test = function()
        {
        	Base.apply(this, arguments);
        };
        util.inherits(Test, Base);
        Test.prototype.ATTRS = {
        	foo: {
        		value: 'FOO',
        		setter: function(v)
        		{
        			return v.toUpperCase();
        		}
        	},
        	bar: {
        		valueFn: function()
        		{
        			return this.get('foo') + 'BAR';
        		}
        	},
        	foobar: {
        		value: 'foobar'
        	}
        };

        this.test = new Test({
        	foobar: 'barfoo'
        });

        callback();
    },
    tearDown: function (callback) {
        // clean up
        this.test.destroy();
        delete this.test;

        callback();
    },
    testDefaultValues: function (test) {
        test.equals(
        	'barfoo',
        	this.test.get('foobar')
        );

        test.equals(
        	'FOO',
        	this.test.get('foo')
        );

        test.equals(
        	'FOOBAR',
        	this.test.get('bar')
        );

        test.done();
    }
};