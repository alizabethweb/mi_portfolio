from argostranslate import package, translate

print("Iniciando prueba Argos...")

text = "Hello world"
translated = translate.translate(text, "en", "es")

print("Resultado:", translated)