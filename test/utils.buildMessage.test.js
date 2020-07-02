const assert = require('assert');
const buildMessage = require('../utils/buildMessage');
const proxyquire = require('proxyquire');

describe.only('utils - buildMessage', function () { 
    describe('When receives an entity and an action', function() {
        it('should return the respective message', function() { 
            const result = buildMessage('movie', 'create')
            const expect = 'movie created';
            assert.deepEqual(result, expect);        
        })
    })
 })