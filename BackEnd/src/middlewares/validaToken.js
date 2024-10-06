const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function validaToken(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ mensagem: 'Acesso negado. Nenhum token fornecido.' });
    }

    try {
        const tokenSemBearer = token.split(' ')[1]; // Remove o 'Bearer'
        const decoded = jwt.verify(tokenSemBearer, JWT_SECRET);
        req.usuarioId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }
}

module.exports = validaToken;
