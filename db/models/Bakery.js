const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
    const Bakery = sequelize.define("Bakery", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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

    SequelizeSlugify.slugifyModel(Bakery, {
        source: ['name',]
    });
 
    return Bakery;
};
