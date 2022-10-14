module.exports = (mongoose) => {
    const Person = mongoose.model(
        'Person',
        mongoose.Schema({
            username: {
                type: String,
            },
            password: {
                type: String,
            },
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            email: {
                type: String,
            },
            phoneNumber: {
                type: String,
            },
            profile: {
                degree: {
                    type: [mongoose.SchemaTypes.Mixed]
                },
                career: {
                    type: [mongoose.SchemaTypes.Mixed]
                },
                location: {
                    type: [mongoose.SchemaTypes.Mixed]
                }
            }
        })
    );

    return Person;
};