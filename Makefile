.PHONY: data app

# to get secrets for local dev:
# eval `cat ./data/.env | op inject`

build:
	cd app && npm run build

deploy:
	rm -rf docs
	cd app && npm run build
	cp -r app/out docs
	touch docs/.nojekyll
	echo "gravy.lilleswing.com" > docs/CNAME

