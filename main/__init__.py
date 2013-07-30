import os, sys

from flask import Flask

from .ctrl.glob.index import mod as index

def create_app():
    app = Flask(__name__)
    app.jinja_env.add_extension('pyjade.ext.jinja.PyJadeExtension')
    app.register_blueprint(index)

    return app
