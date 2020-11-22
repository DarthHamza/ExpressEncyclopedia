module.exports = (sequelize, DataTypes) => sequelize.define("Cookie", {
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
});
