from flask import Flask

app = Flask(__name__)


@app.route("/member")
def member():
    return {"member": ["1", "2", "3"]}


if __name__ == " __main__":
    app.run(debug=True)
