const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock} = require('../utils/mocks/movies');
const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

describe('services - movies', function () { 
    const MoviesService = proxyquire('../services/movies.js', {
        '../lib/mongo.js' : MongoLibMock
    });

    const moviesService = new MoviesService();

    describe('When getMovies method is called', async function() {
      it('should call the getall MongoLib method', async function() {
          await moviesService.getMovies({}); 
          assert.strictEqual(getAllStub.called, true);
       })

       it('should return an array of movies', async function() { 
            const result = await moviesService.getMovies({});
            const expect = moviesMock;
            assert.deepEqual(result, expect);        
        })
    })
 })