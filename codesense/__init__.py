import os

# Create the directories
os.makedirs("codesense", exist_ok=True)
os.makedirs("website", exist_ok=True)
os.makedirs("tests", exist_ok=True)

# Create the files
open("app.py", "w").close()
open("requirements.txt", "w").close()
open("codesense/__init__.py", "w").close()
open("website/__init__.py", "w").close()
open("tests/__init__.py", "w").close()
open("codesense/parser.py", "w").close()
open("codesense/mapper.py", "w").close()

print("Files and directories created successfully.")