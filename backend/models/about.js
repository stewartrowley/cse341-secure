module.exports = (mongoose) => {
    const About = mongoose.model(
        'about',
        mongoose.Schema({
            _id: {
                type: String,
            },
            skills: {
                type: [mongoose.SchemaTypes.Mixed]
            },
            hobbies: {
                type: [mongoose.SchemaTypes.Mixed]
            }
        })
    );

    return About;
};