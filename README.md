# Setup

You can use _make_ to manage your development environment.

You will need locally:

* Docker 17.03.1-ce+
* docker-compose 1.11.2+

First, run:


```bash
make setup
```

This will make sure you have every dependency for the API and for the frontend. After that, go ahead and run:

```bash
make up
```

This will make sure you have all the services up and running. You will have:

* The webapp running on port 80
* The API running on port 8080
* The MySQL database on port 3306