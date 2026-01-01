# Importamos las librerias necesarias

# from flask import Flask, jsonify, request, render_template
# from bs4 import BeautifulSoup
# import requests
# import plotly.express as px
from argostranslate import package, translate
import argostranslate.package
import argostranslate.translate

#Comenzamos por el sistema de traducción de la página, respetando la estructura del proyecto original

package.install_from_path("models/en_es.argosmodel")
package.install_from_path("models/en_fr.argosmodel")
package.install_from_path("models/translate-en_da-1_9.argosmodel")

#traducción de prueba
text = "Hello World!"
text_translated = argostranslate.translate.translate(text, "en", "es")
text_translated = argostranslate.translate.translate(text, "en", "fr")
text_translated = argostranslate.translate.translate(text, "en", "da")

print(text_translated)