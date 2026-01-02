# Import needed lybraries

from flask import Flask, jsonify, request, render_template
from bs4 import BeautifulSoup
import requests
from argostranslate import package, translate
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

#init flask
app = Flask(__name__)
    
@app.route("/")
def home():
    return render_template("home.html")
#create the contact system | based on: https://github.com/Sachin-crypto/Flask-Contact-Page.git

load_dotenv()
gmail_user = os.getenv("GMAIL_USERNAME")
gmail_pass = os.getenv("GMAIL_PASSWORD")

app.config.update(
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_PORT = '465',
    MAIL_USE_SSL = True,
    MAIL_USERNAME = gmail_user,
    MAIL_PASSWORD = gmail_pass,
)

mail = Mail(app)

#Create the common head with apps by Flask

@app.route("/cv")
def cv():
    return render_template("cv.html")
@app.route("/projects")
def projects():
    return render_template("projects.html")
@app.route("/skills")
def skills():
    return render_template("skills.html")
@app.route("/blog")
def blog():
    return render_template("blog.html")
@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')

        mail.send_message("Message from " + name + " at " + email,
                          sender = email,
                          recipients = [gmail_user],
                          body = subject + "\n\n" + message
                          )
    # Rendering template
    return render_template("contact.html")

if __name__=="__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)