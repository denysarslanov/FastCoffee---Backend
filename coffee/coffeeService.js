const db_controller = require('../db_layer/db_controller')
const { coffee } = require('../db_layer/db_controller')

const coffeeController = coffee

class CoffeeService {
    getAllCoffee = async(connection, { isGroups }) => {

        try {
            let response = undefined

            if (isGroups) {

                response = await coffeeController.get_all_coffee_groups(connection)
                console.log(110000)
            } else response = await coffeeController.get_all_coffee(connection)


            console.log({ response })

            console.log('SERVICE LAYER')

            return response
        } catch (e) {
            console.log({ e }, 'In coffee service -> getAllCoffee')
            return false
        }
    }

    getCoffeeByGroupId = async(connection, { id }) => {
        try {
            if (!id) return false
            let response = await coffeeController.get_all_coffee(connection, { id })
            return response
        } catch (e) {
            console.log({ e }, 'In coffee service -> getCoffeeByGroupId')
            return false
        }
    }

    getCoffeeByGroupName = async(connection, { groupName }) => {
        try {
            if (!groupName) return false

            const groupIdArr = await coffeeController.get_group_id_by_name(connection, { groupName })
            if (!Array.isArray(groupIdArr) || !groupIdArr[0].group_id) return false

            const response = await coffeeController.get_coffee_by_group_id(connection, { groupId: groupIdArr[0].group_id })
            return response

        } catch (e) {
            console.log({ e }, 'In coffee service -> getCoffeeByGroupName')
            return false
        }
    }

    getRandomCoffee = async(connection) => {
        try {
            if (!connection) return false

            const response = await coffeeController.get_random_coffee(connection)

            if (!response) return false

            return response
        } catch (e) {
            console.log({ e }, 'In coffee service -> getRandomCoffee')
        }
    }

    getCoffeeByUrl = async(connection, url) => {
        try {
            if (!connection || !url || typeof url !== 'string') return false

            const response = await coffeeController.get_coffee_by_url(connection, { url })
            if (!response) return false

            return response
        } catch (e) {
            console.log({ e }, 'In coffee service -> getCoffeeByName')
            return false
        }
    }

    getCoffeeCustomization = async(connection, url) => {
        try {
            if (!connection || !url || typeof url !== 'string') return false

            const foundCoffeeArray = await this.getCoffeeByUrl(connection, url)
            if (!foundCoffeeArray) return false

            console.log(foundCoffeeArray, true)

            const foundCoffee = foundCoffeeArray[0]

            const response = await coffeeController.get_coffee_customization(connection, { coffee_id: foundCoffee.coffee_id })
            if (!response) return false

            return response
        } catch (e) {
            console.log({ e }, 'In coffee service -> getCoffeeCustomization')
            return false
        }
    }

    getRandomCoffeeFromGroup = async(connection, groupId) => {
        try {
            //const response = await coffeeController.
        } catch (e) {
            console.log({ e }, 'In CoffeeService -> getRandomCoffeeFromGroup')
            return false
        }
    }
}

module.exports = new CoffeeService()