const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64d4af2299494460c0a855f0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ipsam facilis voluptatibus dicta asperiores, inventore soluta non deleniti quaerat nisi tenetur',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dbzrcfb5j/image/upload/v1691751759/YelpCamp/fjn4n0r18fxg5loq7vkb.jpg',
                    filename: 'YelpCamp/fjn4n0r18fxg5loq7vkb',

                },
                {
                    url: 'https://res.cloudinary.com/dbzrcfb5j/image/upload/v1691751765/YelpCamp/ibqnxmfde2yfowaujwvf.jpg',
                    filename: 'YelpCamp/ibqnxmfde2yfowaujwvf',

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})