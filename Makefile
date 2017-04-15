.PHONY: up down migrate

MAKEPATH := $(abspath $(lastword $(MAKEFILE_LIST)))
PWD := $(dir $MAKEPATH)

up:
	cd $(PWD)api/ && composer install && cd $(PWD)
	cd $(PWD)frontend/ && npm install && npm run build && cd $(PWD)
	docker-compose up -d

down:
	docker-compose down

migrate:
	docker-compose exec api \
		php artisan migrate