module.exports = (mongoose) => {
    const subItemSchema = new mongoose.Schema({
        to: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    })
    
    const menuSchema = new mongoose.Schema({
        to: String,
        label: String,
        icon: String,
        active: {
            type: Boolean,
            default: false
        },
        subItems: {
            type: [subItemSchema],
            default: undefined,
        },
    })
    
    menuSchema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    const Menu = mongoose.model("menus", menuSchema)
    return Menu
}