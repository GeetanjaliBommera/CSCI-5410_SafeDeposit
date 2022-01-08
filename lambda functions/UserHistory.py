import json
import boto3
import datetime
import random

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    json_data = json.loads(event['body'])
    email = json_data['email']
    ud_id = "ud_id"+str(random.randint(0, 50))
    current = datetime.datetime.now()
    
    tableUserHistory = dynamodb.Table('UserHistory')
    tableUserHistory.put_item(Item={'ud_id': ud_id, 'email': email, 'timeDate': current.strftime("%Y-%m-%d %H:%M:%S")})
    
    return {
        'statusCode': 200,
        'body': json.dumps('done')
    }
