
from flask import Flask, render_template

from database.db import (
    initialize_database,
    get_dashboard_stats
)

app = Flask(__name__)

initialize_database()


@app.route("/")
def dashboard():

    stats = get_dashboard_stats()

    return render_template(
        "dashboard.html",
        stats=stats
    )


if __name__ == "__main__":
    app.run(debug=True)
