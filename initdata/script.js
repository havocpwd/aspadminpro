const mongoose = require ('mongoose')
const mData = require('../initdata/data.js')
const Partner = require ('./bPartners')
const Payment = require ('./payment')
const Menu = require ('./menu')
mongoose.connect("mongodb+srv://asp:six2five@cluster0.3d7mj.mongodb.net/demo")

run()
async function run() {
    try {
        //init menu
        const removeAll = await Menu.remove({})
        console.log(removeAll)
        const menu = await Menu.insertMany(mData.menu)
        console.log(menu)
    } catch (err) {
        console.log(err.message)
    }
}