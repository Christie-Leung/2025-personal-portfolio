
# Starts the db
start: stop
	docker-compose up -d mysql

# Stops the db
stop: 
	docker-compose down -v

# Log into Mysql
mysql:
	mysql --host=localhost --port=3306 --protocol=tcp --user=root --password=admin --database=murphyshome --default-character-set=utf8mb4

# Drops schema and recreates everything
clean-win: drop-win apply-win

# Applies all the files in the db
apply-win: apply-db-win apply-seed

# Applies the db schemas
apply-db-win:
	echo "Applying schema changes"
	for file in ./db/* ; do \
		cat $${file} | mysql --host=localhost --port=3306 --protocol=tcp --user=root --password=admin --database=murphyshome ; \
	done