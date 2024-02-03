module.exports = (sequelize, DataTypes) => {
    
    const Customer_relevent_document = sequelize.define("customer_relevent_document", {
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            
        },
        document_path: {
            type: DataTypes.STRING(50)
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Customer_relevent_document

}