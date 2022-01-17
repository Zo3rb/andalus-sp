const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Every Product Should Have a Name"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Every Product Should Have a Price"],
            maxLength: 5,
            default: 0.0
        },
        description: {
            type: String,
            required: [true, "Every Product Should Have a Description"]
        },
        ratings: {
            type: Number,
            default: 0
        },
        images: [{
            public_id: {
                type: String,
                required: [true, 'Every Image Should Have a Public ID']
            },
            url: {
                type: String,
                required: [true, 'Every Image Should Have a URL Link']
            }
        }],
        category: {
            type: String,
            required: [true, "Every Product Should Have a Category"],
            enum: ["Tang", "White", "Blue-White", "Celadon", "Black", "Qing"]
        },
        provider: {
            type: String,
            required: [true, "Every Product Should Have a Provider"]
        },
        stock: {
            type: Number,
            required: [true, "Every Product Should Has a Number of Stock in The Store"],
            maxLength: 5,
            default: 0
        },
        numOfReviews: [{
            name: {
                type: String,
                required: [true, "Every Review Should Have a Person that Reviewed The Product"]
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }],
        createdBy: {
            type: String,
            required: [true, "Every Product Should Have a Record of Admin who add it"]
        },
        lastUpdatedBy: {
            type: String,
        },
        units: {
            type: Number,
            required: [true, "Every Product Should Have a Number of Units"]
        }
    },
    {
        timestamps: true,
    }
);



const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
