git branch -D gh-pages
git checkout -b gh-pages
yarn run build:prod
shopt -s extglob  # enables extglob
rm -rf !(deploy|public)
cp public $PWD
git commit -am 'update deploy build'
git push origin gh-pages
git checkout master
shopt -u extglob  # disables extglob
