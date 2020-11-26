const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
    const Cookie = sequelize.define("Cookie", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 2,
            validate: {
                min: 0,
                max: 10,
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
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
