# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

__Table of Contents___

- [API and Database Requirements]
  - [API Endpoints](#api-endpoints)
    - [Users](#users)
    - [Products](#products)
    - [Orders](#orders)
    - [Order Products](#order-products)
  - [Data Shape](#data-shapes)
    - [Products](#products-1)
    - [Users](#users-1)
    - [Orders](#orders-1)
    - [order_products](#order_products)


## API Endpoints

#### Users
- Index - **`token requires`**
  - HTTP verb `GET`
  - Endpoint:- `/users`
  - Request Body

    ```json
       N/A
    ```

  - Response Body -- `Array of user object`

    ```json
     {
    "statusCode": 200,
    "data": {
        "users": [
                {
                "id": 3,
                "username": "mo",
                "first_name": "mohamed",
                "last_name": "crespo"
                },
                {
                "id": 4,
                "username": "mo2",
                "first_name": "mohamed",
                "last_name": "crespo"
                }   
            ]
        }
      }

    ```  

- Show - **`token requires`**
  - HTTP verb `GET`
  - Endpoint:- `/users/:id`
  - Request Body

    ```json
       N/A
    ```

  - Response Body -- `user object by id`

    ```json
     {
        {
        "statusCode": 200,
        "data": {
            "user": {
                "id": 3,
                "username": "mo",
                "first_name": "mohamed",
                "last_name": "crespo"
            }
        }
    }
    }
      
    ```  
- Create - 
  - HTTP verb `POST`
  - Endpoint:- `/users/`
  - Request Body

    ```json
       { 
            "username":"mo2",
            "first_name": "mohamed",
            "last_name":"crespo",
            "password":12345
        }
    ```

  - Response Body -- `created user object`

    ```json
    {
    "statusCode": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJ1c2VybmFtZSI6Im1vMyIsImZpcnN0X25hbWUiOiJtb2hhbWVkIiwibGFzdF9uYW1lIjoiY3Jlc3BvIn0sImlhdCI6MTY3MDk2ODc1Mn0.HDD8trgzSBn11uwvFNS8s-ussUY6SAIPm2dJ8lR2OUA",
        "newUser": {
            "id": 5,
            "username": "mo3",
            "first_name": "mohamed",
            "last_name": "crespo"
        }
    }
    }  
      
    ```  

- Update - **`token requires`**
  - HTTP verb `PATCH`
  - Endpoint:- `/users/:id`
  - Request Body

    ```json
       {

        "first_name": "mohamed",
        "last_name":"crespo"

        }
    ```

  - Response Body -- `Updated user object`

    ```json
    {
        "statusCode": 202,
        "data": {
            "user": {
                "id": 5,
                "username": "mo3",
                "first_name": "mohamed",
                "last_name": "crespo"
            }
        }
    }  
      
    ```    

- destroy - **`token requires`**
  - HTTP verb `DELETE`
  - Endpoint:- `/users/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted user object`

    ```json
        {
            "statusCode": 200,
            "data": {
                "user": {
                    "id": 5,
                    "username": "mo3"
                }
            }
        }   
      
    ```      

#### Products
- Index - 
  - HTTP verb `GET`
  - Endpoint:- `/products`
  - Request Body

    ```json
       N/A
    ```

  - Response Body -- `Array of product object`

    ```json
    {
        "statusCode": 200,
        "data": {
            "products": [
                {
                    "id": 3,
                    "name": "book",
                    "price": 25
                },
                {
                    "id": 4,
                    "name": "book",
                    "price": 25
                }
            ]
        }
    }

    ```  

- Show - 
  - HTTP verb `GET`
  - Endpoint:- `/products/:id`
  - Request Body

    ```json
       N/A
    ```

  - Response Body -- `product object by id`

    ```json
    {
        "statusCode": 200,
        "data": {
            "product": {
                "id": 4,
                "name": "book",
                "price": 25
            }
        }
    }   
      
    ```  
- Create - **`token requires`**
  - HTTP verb `POST`
  - Endpoint:- `/products/`
  - Request Body

    ```json
       { 

        "name":"book",
        "price":25

        }
    ```

  - Response Body -- `created product object`

    ```json
        {
            "statusCode": 200,
            "data": {
                "product": {
                    "id": 5,
                    "name": "book",
                    "price": 25
                }
            }
        }
    ```  

- Update - **`token requires`**
  - HTTP verb `PATCH`
  - Endpoint:- `/products/:id`
  - Request Body

    ```json
       { 

    "name":"book2",
    "price":20

    }
    ```

  - Response Body -- `Updated product object`

    ```json
        {
            "statusCode": 202,
            "data": {
                "product": {
                    "id": 5,
                    "name": "book2",
                    "price": 20
                }
            }
        }
    ```    


- destroy - **`token requires`**
  - HTTP verb `DELETE`
  - Endpoint:- `/products/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted product object`

    ```json
      {
        "statusCode": 200,
        "data": {
            "product": {
                "id": 5,
                "name": "book2",
                "price": 20
            }
        }
    }   
      
    ``` 

#### Orders
- Index - 
  - HTTP verb `GET`
  - Endpoint:- `/orders`
  - Request Body

    ```json
       N/A
    ```

  - Response Body -- `Array of orders object`

    ```json
        {
        "statusCode": 200,
        "data": {
            "orders": [
                {
                    "id": 18,
                    "status": "active",
                    "user_id": 3
                },
                {
                    "id": 19,
                    "status": "active",
                    "user_id": 3
                },
                {
                    "id": 20,
                    "status": "active",
                    "user_id": 3
                }
            ]
        }
        }         

    ```  

- Show - **`token requires`**
  - HTTP verb `GET`
  - Endpoint:- `/orders/:id`
  - Request Body

    ```json
       N/A
    ```

  - Response Body -- `order object by id`

    ```json
    {
        "statusCode": 200,
        "data": {
            "order": {
                "id": 18,
                "status": "active",
                "user_id": 3
            }
        }
    } 
      
    ```  
- Create - **`token requires`**
  - HTTP verb `POST`
  - Endpoint:- `/orders/`
  - Request Body

    ```json
      { 

    "user_id":3

    }
    ```

  - Response Body -- `created order object`

    ```json
        {
        "statusCode": 200,
        "data": {
            "order": {
                "id": 18,
                "status": "active",
                "user_id": 3
            }
        }
    }   
    ```  

- Update - **`token requires`**
  - HTTP verb `PATCH`
  - Endpoint:- `/orders/:id`
  - Request Body

    ```json
    { 

    "status":"complete"

    }
    ```

  - Response Body -- `Updated order object`

    ```json
    {
        "statusCode": 202,
        "data": {
            "order": {
                "id": 18,
                "status": "complete",
                "user_id": 3
            }
        }
    }
    ```    


- destroy - **`token requires`**
  - HTTP verb `DELETE`
  - Endpoint:- `/orders/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted order object`

    ```json
        {
        "statusCode": 200,
        "data": {
            "order": {
                "id": 18,
                "status": "complete",
                "user_id": 3
            }
        }
    }
      
    ``` 
#### Order Products

- addProduct - **`token requires`**
  - HTTP verb `POST`
  - Endpoint:- `/orders/:id/products`
  - Request Body

    ```json
    {
        "quantity": 2,
        "order_id": 19,
        "product_id":3
        }
    ```

  - Response Body -- `created order product`

    ```json
    {
        "statusCode": 200,
        "data": {
            "id": 8,
            "quantity": 2,
            "order_id": 19,
            "product_id": 3
        }
    }   
    ```  



## Data Shapes
#### Products
```sql
  CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price INT NOT NULL
);
```

#### Users
```sql
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) UNIQUE NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_on TIMESTAMP DEFAULT now() NOT NULL
)
```
#### Orders
```sql
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64) NOT NULL DEFAULT 'active',
    user_id INT REFERENCES users(id) NOT NULL
);
```

#### order_products
```sql
CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id)
);
```