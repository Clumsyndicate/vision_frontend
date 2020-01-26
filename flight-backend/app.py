from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache


# __name__ = "Vision Backend"
__secret_key__ = "secret key :)"

# app config
app = Flask(__name__)
app.debug = True
app.config['SECRET'] = __secret_key__

db = SQLAlchemy()
db.init_app(app)

config = {
    'CACHE_TYPE': 'simple',
    'DEBUG': True,
    'CACHE_DEFAULT_TIMEOUT': 300
}

cache = Cache(config= config)
cache.init_app(app)


@app.route("/")
def return_index():
    return 'Index' #render_template('index.html')

if __name__ == "__main__":
    app.run()


