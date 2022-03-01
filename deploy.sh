cd _dist

git init
git remote add origin git@github.com:ooley42/ooley.git 
git add . --force
git commit -m 'deploy'

git push -f origin HEAD:gh-pages

cd -