import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
from flask import Flask, request, jsonify
from code_sense import analyze_code

# Initialize Firebase Admin SDK
# Replace 'path/to/your/serviceAccountKey.json' with the actual path to your Firebase service account key
cred = credentials.Certificate('path/to/your/serviceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)

@app.route('/')
def hello_world():
 return 'Hello World!'

@app.route('/analyze', methods=['POST'])
def analyze_code_endpoint():
 # Verify Firebase Authentication token
 id_token = request.headers.get('Authorization').split('Bearer ')[1]
 try:
  decoded_token = auth.verify_id_token(id_token)
  uid = decoded_token['uid']
 except Exception as e:
  return jsonify({'error': 'Unauthorized', 'message': str(e)}), 401

 # Get code file from request
 if 'code_file' not in request.files:
  return jsonify({'error': 'No code_file provided'}), 400

 code_file = request.files['code_file']
 code_content = code_file.read().decode('utf-8')

 # Perform code analysis
 analysis_result = analyze_code(code_content)

 # Store analysis result in Firestore
 db.collection('analysis_results').add({'user_id': uid, 'result': analysis_result})

 return jsonify({'analysis_result': analysis_result}), 200

if __name__ == '__main__':
 app.run(debug=True)

