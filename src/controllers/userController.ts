import { addUser, User } from '../services/userService';

const signup = async (req, res) => {
    try {
        const user: User = req.body;
        const newUser = await addUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send();
    }
}

export { signup }