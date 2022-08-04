module.exports = (mongoose) => {
    const curencySchema = new mongoose.Schema({
        code: String,
        desc: String,
        symbol: String,
        country: String,
        rate: Number,
        default: {
            type: Boolean,
            default: 0
        },
    })

    curencySchema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    const paymentSchema = new mongoose.Schema({
        desc: String,
        type: String,
        duedate: {
            type: Number,
            default: 0,
        },
        default: {
            type: Boolean,
            default: 0
        },
    })

    paymentSchema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    const productSchema = new mongoose.Schema({
        keyname: String,
        desc: String,
        uoms: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "uoms",
        },
        categories: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "categories",
        },
        purchase_price: Number,
        sales_price: Number,
        stock : {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: () => Date.now()
        },
        updatedAt: {
            type: Date,
            default: () => Date.now()
        },
    })

    productSchema.pre('save', function (next){
        this.updateAt = Date.now()
        next()
    })

    productSchema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    const uomSchema = new mongoose.Schema({
        code: String,
        desc: String,
    });

    uomSchema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })
    
    const categorySchema = new mongoose.Schema({
        code: String,
        desc: String,
    });

    categorySchema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })
    
    const addressSchema = new mongoose.Schema({
        street: String,
        city: String,
    })
    
    const partnerSchema = new mongoose.Schema({
        first_name: {
            type:String,
            required: true,
        },
        last_name: String,
        email : String,
        phone: String,
        type: {
            type: String,
            default: "Customer"
        },
        createdAt: {
            type: Date,
            default: () => Date.now()
        },
        updatedAt: {
            type: Date,
            default: () => Date.now()
        },
        address: addressSchema,
    })

    partnerSchema.pre('save', function (next){
        this.updateAt = Date.now()
        next()
    })

    partnerSchema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    partnerSchema.statics.getByType = function(type){
        return this.find({type: new RegExp(type, 'i')})
    }

    const orderDetailSchema = new mongoose.Schema({
        orders: {type: mongoose.SchemaTypes.ObjectId, ref: 'orders'},
        products: {type: mongoose.SchemaTypes.ObjectId, ref: 'products'},
        shortDesc: String,
        qtyOrdered: {
            type: Number,
            default: 0,
        },
        qtyOutStanding: {
            type: Number,
            default: 0,
        },
        qtyReceived: {
            type: Number,
            default: 0,
        },
        cogs: {
            type: Number,
            default: 0,
        },
        unitPrice: {
            type: Number,
            default: 0,
        },
        cogsTotal:{
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: () => Date.now()
        },
        updatedAt: {
            type: Date,
            default: () => Date.now()
        },
    })

    orderDetailSchema.pre('save', function (next){
        this.updateAt = Date.now()
        next()
    })

    orderDetailSchema.post('remove', function(next){
        console.log(this._id);
        this.model('orders').update(
            {orderdetails: this._id}, 
            {$pull: {orderdetails: this._id}}, 
            {multi: true},
            next
        );
    });



    orderDetailSchema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })
    
    
    const orderSchema = new mongoose.Schema({
        orderType: String,
        orderNo: String,
        dateIssued: Date,
        partners: {type: mongoose.SchemaTypes.ObjectId, ref: 'partners'},
        deliverTo: String,
        deliveryFee: {
            type: Number,
            default: 0,
        },
        discount:{
            type: Number,
            default: 0,
        },
        note: String,
        payments: {type: mongoose.SchemaTypes.ObjectId, ref: 'payments'},
        docStatus:String,
        total:{
            type: Number,
            default: 0,
        },
        orderdetails: [{type: mongoose.SchemaTypes.ObjectId, ref: 'orderdetails'}],
        createdAt: {
            type: Date,
            default: () => Date.now()
        },
        updatedAt: {
            type: Date,
            default: () => Date.now()
        },
    })

    orderSchema.pre('save', function (next){
        this.updateAt = Date.now()
        next()
    })

    orderSchema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    const Payment = mongoose.model("payments", paymentSchema)
    const Currency = mongoose.model("currencies", curencySchema)
    const Uom = mongoose.model('uoms', uomSchema)
    const Category = mongoose.model('categories', categorySchema)
    const Product = mongoose.model("products", productSchema)
    const Partner = mongoose.model("partners", partnerSchema)
    const OrderDetail = mongoose.model('orderdetails', orderDetailSchema);
    const Order = mongoose.model('orders', orderSchema);
    const dbSchema = {Currency,Uom,Category,Product,Partner,Payment,Order,OrderDetail}

    return dbSchema
}