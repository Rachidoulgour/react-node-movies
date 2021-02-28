
const app = require('./app');
const startConnection = require('./database');




async function main(){
    startConnection(),

    app.listen(app.get('port'))
    console.log('Server on port', app.get('port'))
}
main ();