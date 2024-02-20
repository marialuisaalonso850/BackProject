const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { jsonResponse } = require('./jsonResponse');
const { SECRET } = require('../config');

exports.authenticateUser = async (req, res) => {
    try {
        const { gmail, password } = req.body;

        const user = await User.findOne({ gmail }).populate('rol');
        if (!user) {
            return res.status(404).json(jsonResponse(404, { error: 'Usuario no encontrado.' }));
        }
       
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json(jsonResponse(401, { error: 'Contraseña incorrecta.' }));
        }

        const token = jwt.sign({ id: user._id }, SECRET, {
            expiresIn: 86400,
        });

        return res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json(jsonResponse(500, { error: 'Error al intentar iniciar sesión.' }));
    }
};
