include ../docker-makefile

build: package

build-latest: package

latest: build-latest push-latest

package:
	cd ../site && npx gatsby clean && npx gatsby build
	tar -cz -f app.tgz -C ../site/public .
