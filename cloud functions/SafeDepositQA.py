import flask
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

PROJECT_ID = 'serverless-project-grp-4'

cred = credentials.ApplicationDefault()
default_app = firebase_admin.initialize_app(cred, {
  'projectId': PROJECT_ID,
})
db = firestore.client()

def hello_world(request):
    request_json = request.get_json()
    doc_ref = db.collection('Safebox').document(request_json['email'])
    doc_ref.set({
    'email':  request_json['email'],
    'answer1': request_json['answer1'],
    'answer2':  request_json['answer2']
    })
    return 'update'
    