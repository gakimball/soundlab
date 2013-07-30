from flask import Blueprint, render_template

mod = Blueprint('index',
                __name__,
                template_folder='../../views',
                static_folder='../../public')

@mod.route('/', methods=['GET'])
def response():
    return render_template('index.jade')
