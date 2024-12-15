const mysql = require('mysql')
const config = require('./dbConfig')

const { connectionData } = config

const setConnection = (connection) => new Promise((resolve, reject) => {
    connection = mysql.createConnection(connectionData)

    connection.connect(err => {
        if (err) {
            console.log(err, 'CONNECTION ERROR')
            reject(err)
        } else console.log('EVERYTHING FINE, CONNECTED ------> OK')

    })

    resolve(connection)
})

module.exports = setConnection