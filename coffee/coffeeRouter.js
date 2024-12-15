const Router = require('express')
const coffeeService = require('./coffeeService')
const router = new Router()

let connection = undefined

const startCoffeeRouter = (con) => {
    connection = con
    return router
}

const defaultBadRes = (res) => res.status(400).send('Something went wrong')

const returnResponse = (response, res, text) => {
    const responseText = !!text ? text : "Something went wrong"
    if (!response) return res.status(400).send(responseText)
    return res.status(200).json(response)
}

router.get('/groups', async(req, res) => {
    try {
        console.log('GROUPS REQUSET STARTED')
        const result = await coffeeService.getAllCoffee(connection, { isGroups: true })
        console.log(result, 'GROUPS')
        return res.status(200).json(result)
    } catch (e) {
        console.log({ e }, 'In coffee router -> /groups')
        return defaultBadRes(res)
    }
})

router.get('/groups/:groupName', async(req, res) => {
    try {
        if (!req.params || !req.params.groupName) return res.status(400).send('Bad request')
        let response = undefined

        console.log(req.params)

        !isNaN(Number(req.name)) ? response = await coffeeService.getCoffeeByGroupId(connection, req.params) : response = await coffeeService.getCoffeeByGroupName(connection, req.params)
        console.log({ response })
        if (!response) return res.status(400).send('Bad creds')

        return returnResponse(response, res)
    } catch (e) {
        console.log({ e }, 'In coffee router -> /groups/:name')
        return defaultBadRes(res)
    }
})

router.get('/', async(req, res) => {
    try {
        const result = await coffeeService.getAllCoffee(connection, { isGroups: false })
        if (!result) return res.status(400).send('Something went wrong')
        return res.status(200).json(result)
    } catch (e) {
        console.log({ e }, 'coffee router -> /')
        return defaultBadRes(res)
    }
})

router.get('/coffeeList/:product', async(req, res) => {
    try {
        if (!req.params.product) return defaultBadRes(res)
        const response = await coffeeService.getCoffeeByUrl(connection, req.params.product)
        if (!response) return defaultBadRes(res)
        return returnResponse(response, res)
    } catch (e) {
        console.log({ e }, 'In coffee router -> /coffeeList/:product')
        return defaultBadRes(res)
    }
})

router.get('/customization/:coffeeUrl', async(req, res) => {
    if (!req.params.coffeeUrl) return defaultBadRes(res)

    const response = await coffeeService.getCoffeeCustomization(connection, req.params.coffeeUrl)
    if (!response) return res.status(400).send('ERR')

    return res.status(200).json(response)
})

router.get('/random', async(req, res) => {
    try {
        const response = await coffeeService.getRandomCoffee(connection)
        console.log({ response })
        return returnResponse(response, res)
    } catch (e) {
        console.log({ e }, 'coffeRouter -> /random')
        return res.status(400).send('Something went wrong')
    }
})

module.exports = startCoffeeRouter