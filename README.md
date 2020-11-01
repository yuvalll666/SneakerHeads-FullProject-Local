# Online-Shop (SneakerHeads)

This project is a representation of the abilities I acquired during a 7 months Full-Stack Web Development course.
Throughout this project i will demostrate my knowledge using **React.js**, **Node.Js** and **MongoDB**.

# Start Up

_Make sure none of the ports 3900 and 3000 in your localhost are being used._  
_dependencies: node.js need to be installed on the computer to run this application._

1. Open CMD in wanted directory and paste the following:  
   `git clone git@bitbucket.org:YuvalAzaria/my-app.git`  
   Optionaly you can download the zip file and install it instead.
2. Open my-app directory with you code editor.
3. Split CMD into two windows both at my-app directory, in the first one stay at my-app and type:
   ` npm i`
   wait until it's finish installing then type
   `npm start`  
   in the second window go to server directory by typing `cd server` and type `npm i` wait for installation then type `npm run start`.

# Description

The system includes the following:

- **Three levels of users Admin, Editor and Normal**.  
  Each user have diffrent authorizations in the application:

  ADMIN - an Admin user can delete existing users completely (have an option to restore the user in the page after deleting), promote and demote users to Editor or Normal.  
  the same goes for products, an Admin can create delete and update products.

  EDITOR - an Editor user can create delete and update products but he can not handle users in anyway.

  NORMAL - a Normal user have no authorizations regarding the application, he can only preform simple actions.

- **Users handling (crud)**

  1. Signup - any user can signup as a new user to the application with the 3 steps signup system, after filling all the inputs and submiting the form a confirmation email will be sent to the user's email adress to confirm it.

  2. Signin - Only a confirmed user can login to the application, after loging in a jwt token with the user details will be added to the user's local storage and will be added to the headers of each request from the clinet to the server.

  3. A user can logout of the system, edit his name, email and password or delete his user completely.

- **Products handling (crud)**

1. Products rendering - both Home, HandleProducts , Browse and Product (single) pages render products from the database.

   each one is a bit different:  
   | Home page render products with the most views, each product increment by 1 view each time the single product page load.  
   | HandleProducts page render all the products in the prodcuts collection as default but can be filtered by a single brand each time.  
   | Browse page render all the products in the products collection but limits to 8, user can press the _load more_ button to load 8 more products. in addition a user can filter the result by multiple or single brands and price range.  
   | Product page render a single product with an image carousel, description, price and add to cart button.

2. Cart - any user can add as many products as he likes to his cart from the Product page, each user have a unique cart that only he can access. In the cart a user can view his products delete each individual product and pay for the total cart via paypal.
