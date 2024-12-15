const config = {
    connectionData: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'fastcoffee'
    },
    port: 3306,
    db_name: 'fastcoffee',
    tables: {
        coffee_groups: 'coffeegroups',
        coffee: 'allcoffee',
        flavors: 'flavors',
        sizes: 'sizes'
    }
}


module.exports = config