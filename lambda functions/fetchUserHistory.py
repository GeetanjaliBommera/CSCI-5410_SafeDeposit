import json
import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    json_data = json.loads(event['body'])
    email = json_data['email']
    mydict= []
    
    tableUser = dynamodb.Table('UserHistory')
    response = tableUser.scan()
    for i in response['Items']:
        if(i['email']==email):
            mydict.append(i)
    print(mydict)
    return {
        'statusCode': 200,
        'body': json.dumps(mydict)
    }
