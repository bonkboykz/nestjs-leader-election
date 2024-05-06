eslint=yarn eslint --ext .js,.jsx,.ts,.tsx ./
prettier=yarn prettier "**/*" --ignore-unknown
tsc=yarn tsc -b

.PHONY: commit
commit:
	yarn commit

.PHONY: test
test:
	yarn test

.PHONY: lint
lint:
	${eslint}
	${prettier} --check

.PHONY: fix
fix:
	${eslint} --fix
	${prettier} --write

.PHONY: clean
clean:
	npx tsc --build --clean

.PHONY: build
build:
	npx tsc -b

.PHONY: build.watch
build.watch:
	npx tsc -b -w

.PHONY: setup-ide
setup-ide:
	yarn
	yarn dlx @yarnpkg/pnpify --sdk
	make clean
	make build
	make test
