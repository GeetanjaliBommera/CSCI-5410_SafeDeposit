import json
import boto3
import random

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    json_data = json.loads(event['body'])
    username = json_data['username']
    email = json_data['email']
    box_name=""
    box_id= str(random.randint(0, 9))
    user_count="1"
    
    tableUser = dynamodb.Table('SafeDeposit')
    tablebox = dynamodb.Table('Box')
    response = tablebox.scan()
    if(len(response['Items'])==0):
        tablebox.put_item(Item={'Box_id': box_id, 'User_count': user_count})
        tableUser.put_item(Item={'username': username,'email': email,'box_id':box_id})
    elif(len(response['Items'])>0):
        for i in response['Items']:
            if(int(i['User_count'])<3):
                user_count = int(i['User_count']) + 1
                box_id= i['Box_id']
        tablebox.update_item(
                    Key={
                        'Box_id': box_id
                        },
                        UpdateExpression="set User_count = :uc",
                        ExpressionAttributeValues={
                            ':uc':user_count,
                        },
                    )
        tableUser.put_item(Item={'username': username,'email': email,'box_id':box_id})
    
    
    return {
        'statusCode': 200,
        'body': json.dumps({'box_id':box_id})
    }
