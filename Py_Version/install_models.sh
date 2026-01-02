
#!/bin/bash

python3 -m venv env
source env/bin/activate

pip install --upgrade pip
pip install -r requeriments.txt

cd argos-translate
pip install -e .
cd ..

echo "dependencias instaladas"