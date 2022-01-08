import json
import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    json_data = json.loads(event['body'])
    print(json_data)
    email = json_data['email']
    box=""
    
    tableUser = dynamodb.Table('SafeDeposit')
    response = tableUser.scan()
    for i in response['Items']:
        if(i['email']==email):
            box= i['box_id']
    
    return {
        'statusCode': 200,
        'body': json.dumps({'box_id':box})
    }
