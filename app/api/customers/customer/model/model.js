module.exports = (sequelize, DataTypes) => {
    
    const Customer = sequelize.define("customer", {
        uuid: {
            type: DataTypes.STRING(150)
        },
        full_name: {
            type: DataTypes.STRING(50)
        },
        email: {
            type: DataTypes.STRING(30)
        },
        contact_number: {
            type: DataTypes.STRING(20)
        },
        address: {
            type: DataTypes.STRING(250)
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        is_admitted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        admission_date: {
            type: DataTypes.DATE,
        },
        department: {
            type: DataTypes.STRING(40),
        },
    })

    return Customer

}