const router = require('express').Router();

const AwarenessContent = require('../../Models/EWaste/AwarenessContent');

const fallbackContent = [
  {
    title: 'What is e-waste?',
    slug: 'what-is-e-waste',
    summary: 'Discarded electrical and electronic equipment that no longer serves its original purpose.',
    content:
      'E-waste includes old phones, laptops, televisions, printers, batteries, chargers, and other electronics. When handled properly, valuable materials can be recovered and harmful substances can be controlled.',
    category: 'Basics',
  },
  {
    title: 'Why e-waste is harmful',
    slug: 'why-e-waste-is-harmful',
    summary: 'Improper disposal can pollute soil, water, and air.',
    content:
      'Electronics can contain lead, mercury, cadmium, and flame retardants. Unsafe dumping or burning releases toxins that affect human health and the environment.',
    category: 'Impact',
  },
  {
    title: 'How to dispose responsibly',
    slug: 'responsible-disposal',
    summary: 'Reuse, repair, donate, and recycle through verified centres.',
    content:
      'Before discarding devices, back up data, remove personal information, and choose a verified recycler or collection centre. Reuse and repair should always be considered first.',
    category: 'Action',
  },
];

router.get('/', async (_req, res) => {
  try {
    const contents = await AwarenessContent.find({ published: true }).sort({ createdAt: -1 });
    if (!contents.length) {
      return res.json({ success: true, contents: fallbackContent });
    }

    res.json({ success: true, contents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, contents: fallbackContent });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const content = await AwarenessContent.findOne({ slug: req.params.slug, published: true });
    if (content) {
      return res.json({ success: true, content });
    }

    const fallback = fallbackContent.find((item) => item.slug === req.params.slug);
    if (!fallback) {
      return res.status(404).json({ success: false, message: 'Awareness content not found.' });
    }

    res.json({ success: true, content: fallback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;