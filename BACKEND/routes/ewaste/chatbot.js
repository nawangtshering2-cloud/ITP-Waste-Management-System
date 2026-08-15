const router = require('express').Router();

const fallbackReplies = [
  {
    keywords: ['pickup', 'request', 'schedule'],
    reply: 'To request an e-waste pickup, open the pickup form, select a category, enter your device details, and submit your preferred date and time.',
  },
  {
    keywords: ['recycler', 'centre', 'location', 'map'],
    reply: 'Use the recycler locator to find verified and active collection centres near you. You can sort by distance when your location is available.',
  },
  {
    keywords: ['harmful', 'impact', 'danger', 'pollution'],
    reply: 'E-waste can release lead, mercury, and other toxins. Proper recycling prevents soil, water, and air pollution and protects human health.',
  },
  {
    keywords: ['password', 'login', 'register', 'account'],
    reply: 'Register with your contact details, log in securely, and use the dashboard to manage your pickup requests and notifications.',
  },
];

const buildFallbackReply = (message) => {
  const normalizedMessage = String(message || '').toLowerCase();
  const match = fallbackReplies.find((item) => item.keywords.some((keyword) => normalizedMessage.includes(keyword)));

  if (match) {
    return match.reply;
  }

  return 'I can help with e-waste pickup requests, recycler locations, recycling safety, and disposal guidance. Ask me anything about the system or electronic waste.';
};

router.post('/respond', async (req, res) => {
  try {
    const { message } = req.body;
    const apiUrl = process.env.LLM_API_URL;
    const apiKey = process.env.LLM_API_KEY;

    if (apiUrl && apiKey) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ message, system: 'You are EcoBot, an assistant for an e-waste management system.' }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.reply || data.message || buildFallbackReply(message);
          return res.json({ success: true, reply, source: 'llm' });
        }
      } catch (llmError) {
        console.warn('EcoBot LLM fallback triggered:', llmError.message);
      }
    }

    return res.json({ success: true, reply: buildFallbackReply(message), source: 'fallback' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, reply: buildFallbackReply(req.body && req.body.message) });
  }
});

module.exports = router;