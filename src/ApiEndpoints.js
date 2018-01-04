
var baseUrl = 'https://classporch.herokuapp.com/api/v1'

var apiEndpoints = {
    base: baseUrl,
    auth:{
        signIn: baseUrl + '/auth/sign_in',
        signUp: baseUrl + '/auth'
    },
    
}

export {apiEndpoints};