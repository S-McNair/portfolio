const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const expect = chai.expect;

app.listen(4444);

describe('server.js', function() {
  this.timeout(5000);
  beforeEach((done) => {
    
    done();
  });

  afterEach((done) => {
      done();
  })

  it('responds to /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

})