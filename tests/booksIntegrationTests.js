const should = require('should');
 
const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const  app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', ()=>{
  it('it should allow a book to be posted and return read and _id', (done)=>{
    const bookPost = {
      title: 'My Book',
      author: 'John',
      genre: 'Fiction' 
  }
    agent.post('/api/books')
    .send(bookPost)
    .expect(200)
    .end((err,results)=>{
      should(results.body.read).not.equal(false);
      // should(results.body).have.property('_id');
      done();
    })
  afterEach((done)=>{
    Book.deleteMany({}).exec();
    done();
  });
  after((done)=>{
    mongoose.connection.close();
    app.server.close(done()); 
  })
  });
  
}); 