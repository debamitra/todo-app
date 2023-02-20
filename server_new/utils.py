import jwt
import datetime

def jwt_encode(user_id):
    try:
        payload = {
            "exp":datetime.datetime.utcnow() + datetime.timedelta(hours=2),
            "iat":datetime.datetime.utcnow(),
            "sub":user_id
        }
        return jwt.encode(payload,"secret",'HS256')
    except Exception as e:
        return e
    

def jwt_decode(auth_token):
    try:
        payload = jwt.decode(auth_token,"secret")
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return "Token Expired, Please login again!"
    except jwt.InvalidTokenError:
        return "Invalid Token Error, Please login again!"
    

    
