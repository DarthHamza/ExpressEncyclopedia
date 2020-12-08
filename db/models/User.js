
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                message: "Username already exists"
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return User;
};
