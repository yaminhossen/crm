module.exports = (sequelize, DataTypes) => {
    
    const Crm_contact_number = sequelize.define("crm_contact_number", {
        operator: {
            type: DataTypes.STRING(50)
        },
        details: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Crm_contact_number

}