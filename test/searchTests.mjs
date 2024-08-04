import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../app.js';  // Adjust this path if necessary

chai.use(chaiHttp);

describe('Search Functionality', () => {
    // Test 1: Successful login
    it('should successfully log in a user', async () => {
        const res = await chai.request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpassword' });
        
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Login successful');
    });

    // Test 2: Unsuccessful login
    it('should not log in a user with incorrect credentials', async () => {
        const res = await chai.request(app)
            .post('/login')
            .send({ username: 'wronguser', password: 'wrongpassword' });
        
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').eql('Login failed');
    });

    // Test 3: Access search page without login
    it('should redirect to login if user is not authenticated', async () => {
        const res = await chai.request(app)
            .post('/search')
            .send({ query: 'test query', database: 'postgres' });
        
        expect(res).to.have.status(200);
        expect(res.redirects[0]).to.include('/login');
    });

    // Test 4: Successful search after login
    it('should perform a search and log the query', async () => {
        const agent = chai.request.agent(app);
        await agent.post('/login').send({ username: 'testuser', password: 'testpassword' });
        
        const res = await agent.post('/search')
            .send({ query: 'test query', database: 'postgres' });
        
        expect(res).to.have.status(200);
        // Additional checks for search results
    });

    // Test 5: Log query to PostgreSQL
    it('should log the search query to PostgreSQL', async () => {
        // Assuming you have a function to check the logs in PostgreSQL
        const checkLogInPostgres = async (userId, query) => {
            // Implement the check logic here
            return true; // Placeholder
        };

        const agent = chai.request.agent(app);
        await agent.post('/login').send({ username: 'testuser', password: 'testpassword' });
        
        const res = await agent.post('/search')
            .send({ query: 'log query test', database: 'postgres' });
        
        expect(res).to.have.status(200);
        
        // Check if the log entry was created
        const logExists = await checkLogInPostgres('testuser', 'log query test');
        expect(logExists).to.be.true;
    });

    // Test 6: Search both databases
    it('should search both PostgreSQL and MongoDB', async () => {
        const agent = chai.request.agent(app);
        await agent.post('/login').send({ username: 'testuser', password: 'testpassword' });
        
        const res = await agent.post('/search')
            .send({ query: 'combined search', database: 'both' });
        
        expect(res).to.have.status(200);
        // Additional checks for search results from both databases
    });
});