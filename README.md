# Products-ecommerce

## Description

What you have to do is take that data and get some metrics:
- Name and email of the people (a user may have made purchases in the 2 ecommerce)
- Total billing (the total is the sum of the totals of all orders regardless of origin)
- Average ticket per person (totals of all purchases / number of orders)
- Number of orders per person

### Requirements

- Docker

### Tech Stack

Name | Description | Useful Resources
--- | --- | ---
Docker | Is an open source project that automates the deployment of applications within software containers, providing an additional layer of abstraction and application virtualization automation across multiple operating systems.| [Official site](https://www.docker.com/) resources.
Node.js | Is a JavaScript runtime built on Chrome's V8 JavaScript engine.| [Official site](https://nodejs.org/) resources.
Express | Is a web application framework for Node.js.| [Official site](https://expressjs.com/) resources.
Lodash | Is a JavaScript utility library with a lot of functions.| [Official site](https://lodash.com/) resources.

### How to run?

1. Clone the backend repository
2. In root directory run `docker build -t aument-challenge .`
3. Run `docker run -dp 8080:8080 aument-challenge`

### TODO list

- [x] Name and email of the people (a user may have made purchases in the 2 ecommerce)
- [x] Total billing (the total is the sum of the totals of all orders regardless of origin)
- [x] Average ticket per person (totals of all purchases / number of orders)
- [x] Number of orders per person

### Contributors

- Alex Pinaida

### Notes

#### Main route

{{host}}/api/products -> GET

host: localhost:8080

### License

This project is property of Alex Pinaida