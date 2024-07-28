# Project API Documentation

## Table of Contents

1. [User Routes](#user-routes)
2. [Product Routes](#product-routes)
3. [Blog Routes](#blog-routes)
4. [Payment Routes](#payment-routes)

---

## User Routes

Base URL: `/api/user`

| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| POST   | `/register`               | Register a new user               |
| POST   | `/login`                  | Login a user                      |
| POST   | `/updateAddress/:id`      | Update user's address             |
| POST   | `/Addwishlist/:id`        | Add an item to user's wishlist    |
| POST   | `/Removewishlist/:id`     | Remove an item from wishlist      |
| POST   | `/AddToCart/:id`          | Add an item to user's cart        |
| POST   | `/RemoveFromCart/:id`     | Remove an item from user's cart   |
| GET    | `/ViewCart/:id`           | View items in user's cart         |

## Product Routes

Base URL: `/api/product`

| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| POST   | `/addProduct`             | Add a new product (requires auth) |
| GET    | `/allProducts`            | Get all products (requires auth)  |
| GET    | `/allProducts/:sort`      | Get sorted products (requires auth) |
| GET    | `/Products/:pages`        | Get paginated products (requires auth) |

## Blog Routes

Base URL: `/api/blogs`

| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| POST   | `/create`                 | Create a new blog post            |
| GET    | `/getAllBlogs`            | Get all blog posts                |
| POST   | `/likeBlog`               | Like a blog post                  |
| POST   | `/comment`                | Comment on a blog post            |

## Payment Routes

Base URL: `/api/payment`

| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| POST   | `/createOrder`            | Create a new payment order        |
| POST   | `/verifyPayment`          | Verify a payment                  |

---

Feel free to expand this documentation with additional details, such as request and response examples, authentication requirements, and any other relevant information specific to your project.
