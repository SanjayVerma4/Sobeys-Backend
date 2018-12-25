module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: { type: DataTypes.INTEGER,  primaryKey:true },
        name: { type: DataTypes.STRING, allowNull:true },
        email: { type: DataTypes.STRING,  allowNull:true },
        gender: { type: DataTypes.STRING,  allowNull:true },
        status: { type: DataTypes.INTEGER,  allowNull:true },
        
    }, {
        tableName: 'user',
        underscored: true
    });
    User.associate = models => {
        // define association
    };
    return User;
}