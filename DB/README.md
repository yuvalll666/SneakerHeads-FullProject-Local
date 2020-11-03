# MongoDB atlas online

_This is the default settings of the app! if you didn't canged anything no need to read this_

### Connect

- Go to server folder in my-app and open `app.js` file
- Replace mongoose.connect (line 10-12) string (first arg) to the following string

```
"mongodb+srv://yuval:315569533@onlineshop.abqhu.mongodb.net/online-shop?retryWrites=true&w=majority"
```

### Use compass

- Open comapss app
- Copy this to input and press connect

```
 mongodb+srv://yuval:315569533@onlineshop.abqhu.mongodb.net/test
```

# MongoDB Local

_Please read this if you would like to use local mongo DB_

### Change app.js

- Go to server folder in my-app and open `app.js` file
- Replace mongoose.connect (line 10-12) string (first arg) to the following string
  ```
  "mongodb://localhost/online-shop"
  ```

### DB

- Go to MongoDB platform (your choice)
- Insert all the collections in the Collections folder to the DB

### Use search feature

_To user search feature in browse page you will need a text index_

- Open mongo shall and connect to online-shop DB
- To add text index type

```
db.products.createIndex({title: "text"})
```

This will allow to search products by title
