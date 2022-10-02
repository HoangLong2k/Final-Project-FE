from flask import Flask

app = Flask(__name__)


@app.route("/member")
def member():
    return {"Ngu": ["1", "2", "3"]}


@app.route("/")
def home():
    return {'hello'}


if __name__ == " __main__":
    app.run(debug=True, port=5001)
