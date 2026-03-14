const express = require('express');
const router = express.Router();
const { Ticket, Event, User } = require('../models');
const auth = require('../middleware/auth');
const QRCode = require('qrcode');

// Buy Ticket
router.post('/buy/:eventId', auth, async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.eventId);
        if (!event) return res.status(404).json({ msg: 'Event not found' });
        if (event.remainingCapacity <= 0) return res.status(400).json({ msg: 'Event sold out' });

        // Create ticket first to get the ID
        const { paymentMethod, transactionId } = req.body;
        const ticket = await Ticket.create({
            EventId: event.id,
            UserId: req.user.id,
            paymentMethod,
            transactionId,
            status: 'valid'
        });

        // Generate QR Code containing the actual Ticket ID
        const qrCodeImage = await QRCode.toDataURL(ticket.id.toString());
        
        // Update ticket with the QR data
        ticket.qrData = qrCodeImage;
        await ticket.save();

        // Update remaining capacity
        event.remainingCapacity -= 1;
        await event.save();

        res.json(ticket);
    } catch (err) {

        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get user tickets
router.get('/my-tickets', auth, async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            where: { UserId: req.user.id },
            include: [{ model: Event }]
        });
        res.json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get attendees for an event (Admin only)
router.get('/event/:eventId', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const tickets = await Ticket.findAll({
            where: { EventId: req.params.eventId },
            include: [{ model: User, attributes: ['id', 'name', 'email'] }]
        });
        res.json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Check-in Ticket (Staff/Admin)
router.put('/check-in/:ticketId', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Unauthorized for check-in operations' });
        }

        const ticket = await Ticket.findByPk(req.params.ticketId);
        if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

        if (ticket.status === 'used') {
            return res.status(400).json({ msg: 'Security Alert: This ticket has already been used!' });
        }

        ticket.status = 'used';
        await ticket.save();

        res.json({ msg: 'Access Granted: Check-in Successful', ticket });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
