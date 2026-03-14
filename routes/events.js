const express = require('express');
const router = express.Router();
const { Event } = require('../models');
const auth = require('../middleware/auth');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll({ order: [['date', 'ASC']] });
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Create event (Admin only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    const { title, description, date, location, category, price, image, totalCapacity } = req.body;
    try {
        const event = await Event.create({
            title, description, date, location, category, price, image,
            totalCapacity, remainingCapacity: totalCapacity,
            organizerId: req.user.id
        });
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get single event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ msg: 'Event not found' });
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update event (Admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ msg: 'Event not found' });

        await event.update(req.body);
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete event (Admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ msg: 'Event not found' });

        await event.destroy();
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
