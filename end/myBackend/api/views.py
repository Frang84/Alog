from rest_framework.response import Response
from rest_framework.decorators import api_view 


@api_view(['GET'])
def getData(request): 
    person = {'name': 'Test', 'age': 12345}
    return Response(person)