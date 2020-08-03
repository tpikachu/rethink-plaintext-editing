# Rethink Plaintext Editing

**Assumption**


[Q1]
1. No Assumption
2. How to check? 
	- `npm run dev` to run the frontend on port 3000
	- Go to http://localhost:3000
	- Click the text and md files to check if this is editable.

[Q2]
1. Assumption
	- The database is NOSQL and paginated
	- On the mock server we are getting the data from https://randomuser.me/api/?results=2000
2. How to check?
	- `npm run dev` to run the frontend on port 3000
	- `npm run server` to run the mock backend on port 5000
	- Go to http://localhost:3000/searchtable
	- Search by firstName and lastName

[Q3]
1. Assumption
	- Frontend is running on port 3000 and Backend is running on port 5000.
	- MongoDB is running locally on port 2701 (by default)
2. How to check?
	- `npm run dev` to run the frontend on port 3000
	- `npm run server` to run the mock backend on port 5000
	- Go to http://localhost:3000/shortUrl
	- Input the original Url on the input box and click the submit button
	- Check the below table and attempt to click the short url
	- Example: https://google.com, https://github.com, https://stackoverflow.com