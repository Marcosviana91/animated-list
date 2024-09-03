[Video aula - Reockeseat](https://youtu.be/9kKKxZ7wbvc?si=ewbI4bNxroJqlAjT)


_SharedValue_ é como um useState, porém para thread da UI enquanto o useState é para thread do JS

Para rodar uma função em JS, importe _runOnJS_ de __react-native-reanimated__ e envolva a função que deseja chamar, na chamada do runOnJS e passe o valor que deseja passar para esta função como parametro de segunda chamada.
> runOnJS(setMoving)(true)

