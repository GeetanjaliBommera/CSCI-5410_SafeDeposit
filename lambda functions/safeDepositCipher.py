import json

def lambda_handler(event, context):
    word = json.loads(event['body'])['word']
    key = json.loads(event['body'])['key']
    
    cipher = ''
    for letter in word:
        cipher += chr((ord(letter) + int(key) - 97) % 26 + 97)
    
    return {
        'statusCode': 200,
        'body': json.dumps({'cipher_text':cipher})
    }
