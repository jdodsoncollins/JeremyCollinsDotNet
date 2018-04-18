include ../docker-makefile

build: package

build-latest: package

latest: build-latest push-latest

package:
	cd ../site && bundle exec jekyll build
	tar -cz -f app.tgz -C ../site/_site .
