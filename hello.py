from flask import Flask, render_template, url_for, redirect

app = Flask(__name__, static_folder='./dist/topology-generator')

@app.route("/<name>/")
def hello_world(name):
    return redirect(url_for('static', filename='index.html'))

@app.route("/")
def hello():
    return redirect(url_for('static', filename='index.html'))       