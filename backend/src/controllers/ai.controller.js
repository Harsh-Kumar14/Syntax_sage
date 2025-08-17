import main from '../services/ai.service.js';

export const getReview = async (req, res) => {       
    const code = req.body.code;
    if (!code) {
        return res.status(400).send("Code is required");
    }
    try {
        const response = await main(code);
        res.send(response);
    } catch (error) {
        res.status(500).send("Error generating response: " + error.message);
    }
};


