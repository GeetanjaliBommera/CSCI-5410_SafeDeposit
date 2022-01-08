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


def fetch_user(request):
    request_json = request.get_json()
    answer1= str(request_json['answer1'])
    answer2=  str(request_json['answer2'])
    doc_ref = db.collection('Safebox')
    docs = doc_ref.stream()
    
    for doc in docs:
      if answer1 in doc.to_dict().values() and answer2 in doc.to_dict().values():
        return "found"

    return "not found"
