.PHONY: up down migrate setup artisan

setup:
	if test ! -f api/.env; then cp api/.env.example api/.env && sed -i 's/DB_HOST=.*/DB_HOST=apidb/g' api/.env; fi
	docker-compose run --rm api composer install
	docker-compose run --rm web npm install

up:
	docker-compose up -d

down:
	docker-compose down

ART=""
artisan:
	@docker-compose run --rm api \
		php artisan $(ART)

migrate:
	@echo `docker-compose exec api php artisan migrate`

ps:
	docker-compose ps

logs:
	docker-compose logs -f

api-tests:
	docker-compose run --rm api ./vendor/bin/phpunit

web-tests:
	docker-compose run --rm web npm run test