const User = require('./User');
const Event = require('./Event');
const Ticket = require('./Ticket');

// Relationships
User.hasMany(Event, { foreignKey: 'organizerId' });
Event.belongsTo(User, { foreignKey: 'organizerId', as: 'organizer' });

User.hasMany(Ticket);
Ticket.belongsTo(User);

Event.hasMany(Ticket);
Ticket.belongsTo(Event);

module.exports = { User, Event, Ticket };
