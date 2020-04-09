include ../docker-makefile

build: package

build-latest: package

latest: build-latest push-latest

package:
	cd ../site && gatsby clean && gatsby build
	tar -cz -f app.tgz -C ../site/public .
