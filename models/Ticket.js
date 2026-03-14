const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    qrData: {
        type: DataTypes.TEXT('long'),
        allowNull: true // Changed to true to allow two-step generation (Ticket ID -> QR Code)
    },
    status: {
        type: DataTypes.ENUM('valid', 'used', 'cancelled'),
        defaultValue: 'valid'
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Ticket;
