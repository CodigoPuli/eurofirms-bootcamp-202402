// usando el filter, crea un nuevo array, que contenga los numeros impares

var numbers2 = [0, 12, 5, 40, 6, 7, 24, 13, 21]

var numbers2Impar = numbers2.filter(function(numberImpar){
    return numberImpar % 2 !== 0 
})
console.log('CASE 1 usando el filter, crea un nuevo array, que contenga los numeros impares')
console.log(numbers2Impar)

// --------------------------------------------------

// crea un nuevo array con los elementos que tienen 2 palabras

var strings = ['hola mundo', 'pepito', 'hello world to the people', 'todos']

var twoWordsStrings = strings.filter(function (string) {
    return string.split(' ').length === 2
})
console.log('CASE 2 crea un nuevo array con los elementos que tienen 2 palabras')
console.log(twoWordsStrings)

// --------------------------------------------------

// crea un nuevo array que contenga los numeros con dos digitos

var numbers = [100, -20, 3, -200, 50, 8, -5];

var numbersArray = numbers.filter(function(number) {
    return Math.abs(number) >= 10 && Math.abs(number) < 100;
});
console.log('CASE 3 crea un nuevo array que contenga los numeros con dos digitos')
console.log(numbersArray);
// --------------------------------------------------

// crea un nuevo array, con los usuarios cuyo nombre empiece con p

var users = [
    { name: 'pepito', email: 'pepito@grillo.com' },
    { name: 'wendy', email: 'wendy@darling.com' },
    { name: 'topa', email: 'to@pa.com' },
    { name: 'peter', email: 'peter@pan.com' },
    { name: 'pinocho', email: 'pin@ocho.com' },
]

var usersBeginP = users.filter(function(userBegin){
    return userBegin.name.startsWith('p')
})
console.log('CASE 4 crea un nuevo array, con los usuarios cuyo nombre empiece con p')
console.log(usersBeginP)
// --------------------------------------------------

// crea un nuevo array, que contenga los usuarios que viven en Barcelona

var users2 = [
    {
        name: 'pepito',
        information: {
            address: {
                city: 'Madrid',
                street: 'Gran via'
            },
            number: '65787959'
        }
    },
    {
        name: 'wendy',
        information: {
            address: {
                city: 'Barcelona',
                street: 'Diagonal'
            },
            number: '66575846'
        }
    },
    {
        name: 'peter',
        information: {
            address: {
                city: 'Sevilla',
                street: 'bakeer street'
            },
            number: '78795040'
        }
    },
    {
        name: 'topa',
        information: {
            address: {
                city: 'Barcelona',
                street: 'Reina Amalia'
            },
            number: '565768564'
        }
    },
    {
        name: 'pinocho',
        information: {
            address: {
                city: 'Valencia',
                street: 'siempre viva'
            },
            number: '57694068'
        }
    }
]

var users2Barc = users2.filter(function(userbarc){
    return userbarc.information.address.city === 'Barcelona'
})

console.log('CASE 5 crea un nuevo array, que contenga los usuarios que viven en Barcelona')
console.log(users2Barc)