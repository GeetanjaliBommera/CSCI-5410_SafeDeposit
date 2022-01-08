import json
import urllib.parse
import boto3


dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    
    slots = event['currentIntent']['slots']
    print()
    email = slots['email']
    box_id= ""
    balance = ""
    
    tableUser = dynamodb.Table('SafeDeposit')
    tablebox = dynamodb.Table('Box')
    response = tableUser.scan()
    response1 = tablebox.scan()
    if(len(response['Items'])>0):
        for i in response['Items']:
            if((i['email'])==email):
                box_id= i['box_id']
                break
    
    if(box_id!=""):
        for i in response1['Items']:
            if((i['Box_id'])==box_id):
                balance= i['Balance']
                break
        
    
    if(balance==""):
        return {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "You are not registered user please register first"
                    
                }
                
            }
            
        }
    else:
        return {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "The balance for box is "+str(balance)
                }
            }
        }
    
    
