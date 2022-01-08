from google.cloud import storage
from PIL import Image
from google.cloud import storage
import requests
import json
import pandas as pd
from google.cloud import vision


def hello_world(request):
    bucket_name = "serverlessautoml"
    metadata= request.files['metadata']
    imageFileName= request.form['imageFileName']
    destination_blob_name = imageFileName
    img = Image.open(metadata)  # load with Pillow
    img.save('/tmp/'+imageFileName)
    source_file_name = '/tmp/' + imageFileName
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)
    input_fn = destination_blob_name
    input_labels = calculatescore(destination_blob_name)
    blobs = storage_client.list_blobs(bucket_name)
    input = set(input_labels)
    print('wwwww')
    for blob in blobs:
        file_name = bucket.blob(blob.name)
        fn = blob.name
        if fn[0]==imageFileName[0]:
            if(fn!=input_fn):
                labels_each = calculatescore(fn)
                intersection = input.intersection(labels_each)
                common = list(intersection)
                if(len(common)>5):
                    print("yes")
                    print(fn)
                    blob.delete()
                    print("deleted")
                    return "True"
                else:
                    print("no")    
    return "False"
def calculatescore(fn):
    bucket_name = "serverlessautoml"
    image_uri = f"gs://{bucket_name}/{fn}"
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = image_uri
    response = client.label_detection(image=image)
    labels = response.label_annotations
    items = []
    for label in labels:
        items.append(label.description)
    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    return items