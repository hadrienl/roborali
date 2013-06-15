var Base = require('../core/base');

module.exports = {
    constructor: {
        setUp: function(cb)
        {
            var Test = Base.create('Test', Base, {

            });
            Test.ATTRS = {
                foo: 'bar'
            };

            this.test = new Test();

            cb();
        },
        tearDown: function(cb)
        {
            //this.test.destroy();
            cb();
        },
        testConstructWithProperties: function(test)
        {
            test.done();
        }
    },
    attributes: {
        setUp: function (callback) {
            var Test = Base.create('Test', Base, {}, {
                ATTRS: {
                    foo: {
                        value: 'FOO',
                        setter: function(v)
                        {
                            return (''+v).toUpperCase();
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
                    },
                    sortofconstant: {
                        getter: function()
                        {
                            return 'neverchange';
                        }
                    },
                    withgetter: {
                        getter: function(v)
                        {
                            return v+'-changed';
                        }
                    },
                    withvalidator: {
                        validator: function(v)
                        {
                            return 'number' === typeof v;
                        }
                    }
                }
            });

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
        },

        testSetters: function(test)
        {
            this.test.set('foo', 'abcd');

            test.equals(
                'ABCD',
                this.test.get('foo')
            );

            this.test.set('foo', 1);

            test.equals(
                1,
                this.test.get('foo')
            );

            this.test.set('foo', null);

            test.equals(
                'NULL',
                this.test.get('foo')
            );

            this.test.set('foo', undefined);

            test.equals(
                'UNDEFINED',
                this.test.get('foo')
            );

            this.test.set('bar', 'abcde');

            test.equals(
                'abcde',
                this.test.get('bar')
            );

            test.done();
        },

        testGetters: function(test)
        {
            test.equals(
                'neverchange',
                this.test.get('sortofconstant')
            );

            this.test.set('sortofconstant', 'graaaa');

            test.equals(
                'neverchange',
                this.test.get('sortofconstant')
            );

            this.test.set('sortofconstant', 1);

            test.equals(
                'neverchange',
                this.test.get('sortofconstant')
            );

            this.test.set('withgetter', 'a');

            test.equals(
                'a-changed',
                this.test.get('withgetter')
            );

            this.test.set('withgetter', 1);

            test.equals(
                '1-changed',
                this.test.get('withgetter')
            );

            this.test.set('withgetter', null);

            test.equals(
                'null-changed',
                this.test.get('withgetter')
            );

            test.done();
        },
        testValidator: function(test)
        {
            this.test.set('withvalidator', 1);
            test.equals(
                1,
                this.test.get('withvalidator')
            );

            this.test.set('withvalidator', '2');
            test.equals(
                1,
                this.test.get('withvalidator')
            );

            this.test.set('withvalidator', parseInt('3'));
            test.equals(
                3,
                this.test.get('withvalidator')
            );

            this.test.set('withvalidator', null);
            test.equals(
                3,
                this.test.get('withvalidator')
            );

            this.test.set('withvalidator', undefined);
            test.equals(
                3,
                this.test.get('withvalidator')
            );

            test.done();
        }
    },
    lifetime: {
        setUp: function (callback) {
            var Test = Base.create('Test', Base, {
                init: function()
                {
                    this.property1 = 1;
                    this.property2 = 2;
                    this.setProperty3();
                },

                destructor: function()
                {
                    delete this.property1;
                    delete this.property2;
                    delete this.property3;
                },

                setProperty3: function()
                {
                    this.property3 = 3;
                }
            }, {
                ATTRS: {
                    foo: {
                        value: 'FOO'
                    }
                }
            });

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
        testInit: function (test) {
            test.equals(
                1,
                this.test.property1
            );
            test.equals(
                2,
                this.test.property2
            );
            test.equals(
                3,
                this.test.property3
            );

            test.done();
        },
        testDestruct: function(test)
        {
            this.test.destroy();

            test.equals(
                undefined,
                this.test.property1
            );
            test.equals(
                undefined,
                this.test.property2
            );
            test.equals(
                undefined,
                this.test.property3
            );

            test.done();
        }
    }
};