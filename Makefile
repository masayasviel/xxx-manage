up:
	docker-compose up -d

down:
	docker-compose down

down_v:
	docker-compose down -v

migrate:
	npx prisma migrate dev --name init
	npx prisma generate