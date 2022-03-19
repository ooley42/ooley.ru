cd _dist

git init
git remote set-url origin git@github.com:ooley42/ooley.ru.git
git add . --force
git commit -m 'deploy now'

git push -f origin HEAD:gh-pages

cd -