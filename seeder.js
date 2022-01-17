require("dotenv").config({});
const connectDB = require("./db-connection");
const Product = require("./models/Product");

// Self Invoke Function to Handle Async Requests
(async () => {
    try {

        // Connect The Database.
        connectDB();

        // Clear All Data From Product Collection
        await Product.deleteMany({});

        await Product.create({
            name: "Qing Porcelain Set",
            price: 100.60,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
            images: [{
                public_id: "Just a Public ID",
                url: "https://www.worldhistory.org/img/c/p/1200x627/9996.jpg"
            }],
            category: "Qing",
            provider: "Ali.com",
            stock: 3,
            createdBy: "Seeder File",
            lastUpdatedBy: "Seeder Also",
            units: 8
        },
            {
                name: "Qing Porcelain Set Copy",
                price: 150.20,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://skn-wp-assets.s3-us-west-2.amazonaws.com/news/wp-content/uploads/2014/03/2719b-rosenberg-collection-blue-white-porcelain.jpg"
                }],
                category: "Qing",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            },
            {
                name: "Qing Porcelain Set Copy",
                price: 165.60,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://pbs.twimg.com/media/EY3RlTpWAAAIq4w.jpg"
                }],
                category: "Tang",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            },
            {
                name: "Qing Porcelain Set Copy",
                price: 50.00,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://www.christies.com/media-library/images/features/articles/2018/03/15/shades-of-blue-subtle-differences-in-chinese-blue-and-white-porcelain/twoblueandwhitehundredantiquesvaseskangxiperiod16621722.jpg?w=780"
                }],
                category: "White",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            },
            {
                name: "Qing Porcelain Set Copy",
                price: 190.00,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://ae01.alicdn.com/kf/HTB1hRdkPNYaK1RjSZFnq6y80pXaR/Jingdezhen-Porcelain-vase-chinese-ceramic-vase-China-flower-pot-vase-modern-Chinese-crafts-blue-and-white.jpg_Q90.jpg_.webp"
                }],
                category: "White",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            },
            {
                name: "Qing Porcelain Set Copy",
                price: 300.60,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://cdn0.rubylane.com/_pod/item/760156/Por-1737/Chinese-porcelain-celadon-glazed-drum-vase-full-1A-700%3A10.10-33-f.png"
                }],
                category: "Celadon",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            },
            {
                name: "Qing Porcelain Set Copy",
                price: 250.40,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://i.pinimg.com/originals/03/de/68/03de68adebff45071f8b81334fc61f35.jpg"
                }],
                category: "Celadon",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            },
            {
                name: "Qing Porcelain Set Copy",
                price: 180.99,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://p7.storage.canalblog.com/75/51/119589/89183315_p.jpg"
                }],
                category: "Black",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            },
            {
                name: "Qing Porcelain Set Copy",
                price: 100.60,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://p1.storage.canalblog.com/20/21/119589/89183255_p.jpg"
                }],
                category: "Black",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            },
            {
                name: "Qing Porcelain Set Copy",
                price: 250.60,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://cdn0.rubylane.com/_pod/item/712421/781/Chinese-Ceramic-Black-Glazed-vase-Green-full-1A-700%3A10.10-84-f.png"
                }],
                category: "Black",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            },
            {
                name: "Qing Porcelain Set Copy",
                price: 250.60,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, eum!",
                images: [{
                    public_id: "Just a Public ID",
                    url: "https://assets.catawiki.nl/assets/2020/1/1/3/6/d/36dc2719-f1d8-49eb-bc37-f6655757a14e.jpg"
                }],
                category: "Qing",
                provider: "Ali.com",
                stock: 3,
                createdBy: "Seeder File",
                lastUpdatedBy: "Seeder Also",
                units: 8
            }
        );
        console.log("Products Seeded Successfully");

        console.log("Data Seeding Successfully Done");
        process.exit();

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
})();
