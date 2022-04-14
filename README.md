# tumo_coach

An administrative panel for Tumo coaches

### installation

- install nodemon
```
npm install -g nodemon
#or
npm install --save-dev nodemon
```

- install dependencies

```
npm install
cd frontend && npm install
```

- create .env file and add your variables

```
MONGO_URI=<YOUR MONGODB URI>
JWT_SECRET=<YOUR JWT SECRET KEY>
NODE_ENV = development
```

- run server `npm run server`
- run client `cd frontend && npm run start`
