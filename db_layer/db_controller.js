const mysql = require('mysql')
const { tables } = require('./dbConfig')

const { coffee, coffee_groups, flavors, sizes } = tables

class db_promise {
    constructor(connection, query) {
        this.connection = connection
        this.queryString = query
    }

    query = (otherQuery) => new Promise((resolve, reject) => {

        console.log(this.queryString)

        let currentQuery = this.query
        if (otherQuery)
            currentQuery = otherQuery

        this
            .connection
            .query(this.queryString, function(err, results, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }

                if (!results) {
                    resolve(null);
                    return false;
                }

                let res = Object.values(JSON.parse(JSON.stringify(results)));

                resolve(res)
            })
    })
}

class Db_controller {
    coffee = {
        get_all_coffee_groups: (connection) => {
            if (!connection) return false
            return new db_promise(connection, `SELECT * FROM ${coffee_groups}`).query()
        },

        get_all_coffee: (connection, data) => {
            if (!connection) return false
            if (!data) return new db_promise(connection, `SELECT * FROM ${coffee}`).query()

            if ('id' in data) return new db_promise(connection, `SELECT * FROM ${coffee} WHERE group_id = ${data.id}`).query()

            return false
        },

        get_coffee_by_group_id: (connection, { groupId }) => {
            if (!connection || !groupId) return false
            return new db_promise(connection, `SELECT * FROM ${coffee} WHERE group_id = ${groupId}`).query()
        },

        get_group_id_by_name: (connection, { groupName }) => {
            if (!connection || !groupName) return false
            return new db_promise(connection, `SELECT group_id FROM ${coffee_groups} WHERE name="${groupName}"`).query()
        },

        get_random_coffee: (connection) => {
            if (!connection) return false
            return new db_promise(connection, `SELECT * FROM ${coffee} ORDER BY RAND() LIMIT 1`).query()
        },

        get_coffee_by_url: (connection, { url }) => {
            if (!connection) return false
            return new db_promise(connection, `SELECT * FROM ${coffee} WHERE coffee_url="${url}"`).query()
        },

        get_coffee_customization: (connection, { coffee_id }) => {
            if (!connection || !coffee_id || typeof coffee_id !== 'number') return false
            return new db_promise(connection, `SELECT * FROM ${sizes} WHERE coffee_id='${coffee_id}'`).query()
        }
    }
}

module.exports = new Db_controller()