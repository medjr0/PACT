var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../Interface Web/app')

chai.request(app)
  .put('/user/me')
  .set('X-API-Key', 'foobar')
  .send({ password: '123', confirmPassword: '123' })