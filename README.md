# DCRAZY
/*Explicación de todo lo referente a la idea detrás de la API*/

# The API
This are the public endpoint and what you need to manipulate the votation system.

## POST /register
This endpoint is the first step, don't register the user, send the mail of authorization to the user.
### Parameters
 - (lng): You can put your language in this parameter.
### Body
``` json
{
	"mail":"xxxxxxxxx@protonmail.com",
	"pass":"12345678"
}
```
### Succesful response

``` json
{
    "status": "OK",
    "code": 0,
    "msg": "Undefined OK"
}
```
*IMPORTANT:* The successful response had to include a mail in the user inbox. 

### Error response
``` json
{
    "status": "KO",
    "code": 111,
    "msg": "Problem with internal mail system. Please notify us."
}
```

## GET /register
This endpoint is the first step, don't register the user, send the mail of authorization to the user.
### Parameters
 - regtoken: You must send the token that you receive in your mail. This is going to be decrypted to insert the data to DB.
 - (lng): You can put your language in this parameter.

### Succesful response

``` json
{
    "status": "OK",
    "code": 0,
    "msg": "Undefined OK"
}
```
*IMPORTANT:* The successful response had to include a mail in the user inbox. 

### Error response
``` json
{
    "status": "KO",
    "code": 111,
    "msg": "Problem with internal mail system. Please notify us."
}
```

## POST /login
This endpoint allows to you to get the updated token fopr your user to make the actions inside of the API. You can trust and vote, know your trustchain.
### Parameters
 - (lng): You can put your language in this parameter.
### Body
``` json
{
	"mail":"albertgrandes@protonmail.com",
	"pass":"12345678"
}
```
### Succesful response

``` json
{
    "status": "OK",
    "code": 0,
    "msg": "Undefined OK",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmkiOiJGWEpUb0tyUWN5OHNGSG1KUmN1TGQuS1JDT1ZtVG04VlBQSXFCNUpPNC44YlZKSHBwMDVRcSIsIm1haWwiOiJiNjAzODQyMmYxYzE2NzI5NTA2N2M2YWFjODQzNzU2OThmMzZlOWNjMWJjMjA3OTA1NWFhZjgxMmE3ODEwYTlkIiwiaWQiOiIyMiIsImlhdCI6MTYyOTYzMTQ3OH0.puDyrVUnbgUGm9ony1NefCo849vslZxKVa_TGBu4XnE"
    }
}
```


### Error response
``` json
{
    "status": "KO",
    "code": 5
}
```


# TAREAS
Mejorar el tema de la authorization, crear una Tool o mejorar el auth.
Habrá que pensar algo o mejorar la estructura de carpetas.
 - Estudiar la posibilidad de routes a src
 - El nombre services no me gusta, sería interesante pasar a otro nombre "routines" o algo parecido...
 - Estudiar la caducidad de los tokens de usuario!!! Es bastante importante!!!
  - Hay que evitar que mande correo si de registro si el usuario ya está registrado

# EXTRA
DEBUG=dcrazy:* npm start
