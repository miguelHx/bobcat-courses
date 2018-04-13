
git branch -D gh-pages
git checkout -b gh-pages
yarn install
yarn run build:prod
shopt -s extglob  # enables extglob
rm -rf !(deploy|public)
cp -r public/* $PWD
rm -r public/
git add .
git commit -m 'update deploy build'
git push origin gh-pages
git checkout master
shopt -u extglob  # disables extglob
