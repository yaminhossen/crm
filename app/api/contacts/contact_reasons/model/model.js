module.exports = (sequelize, DataTypes) => {
    
    const Contact_reason = sequelize.define("contact_reasons", {
        title: {
            type: DataTypes.STRING(150),
            
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Contact_reason

}