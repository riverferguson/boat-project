# Phase-4 E commerce website
## getting set up
There a quite a few things you'll need to install in order to get this project up and running, but first fork and clone the project into your local environment. 

## installations
Here I've included a list of everything you'll need to install and the relevant commands. First make sure to run:
```console
$pipenv install
$pipenv shell
```
1. install Flask DotEnv
2. install Flask
3. install Flask_restful
4. install Werkzeug
```console
$pip install Flask-DotEnv
$pip install Flask-RESTful
$pip install Flask
$pip install werkzeug
```
## lastly you'll need a secret key to get everything running properly:
1. First make sure you have Flask-DotEnv installed and create a .env file in the server folder.
2. add the file to your .gitignore in the server folder
> _NOTE:_  This will prevent github from tracking the .env file which will contain your secret_key
3. Lastly create a secret key and add it to the .env file syntax should be SECRET_KEY=your_secret_key you can generate a good secret key through the following command
```console
$ python -c 'import os; print(os.urandom(16))'
```
if you want to learn more about using .env files to store secret keys. Check out [this repo](https://github.com/grauwoelfchen/flask-dotenv/)