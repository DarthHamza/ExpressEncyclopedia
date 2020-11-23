const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
    const Cookie = sequelize.define("Cookie", {
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    SequelizeSlugify.slugifyModel(Cookie, {
        source: ['name',]
    });
 
    return Cookie;
};
