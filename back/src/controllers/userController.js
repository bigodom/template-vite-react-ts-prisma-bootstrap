import prisma from "../services/databaseClient.js";

export const getAllUsers = async (req, res) => {
    /*  #swagger.tags = ['User']
    #swagger.description = 'Endpoint to get all users.' */
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req, res) => {
    /*  #swagger.tags = ['User']
    #swagger.description = 'Endpoint to create user.' */
    const { name, email, login, password, role } = req.body;

    console.log(req.body);

    // Verificação de senha
    if (password.length < 6) {
        return res.status(400).json({ error: 'A senha precisa ter pelo menos 6 dígitos' });
    }

    try {
        // Verificação se o email ou login já existe
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUserByEmail) {
            return res.status(400).json({ error: 'Já existe um usuário com este email' });
        }

        const existingUserByLogin = await prisma.user.findUnique({
            where: { login },
        });

        if (existingUserByLogin) {
            return res.status(400).json({ error: 'Já existe um usuário com este login' });
        }

        // Criação do usuário
        const user = await prisma.user.create({
            data: { name, email, login, password, role },
        });

        res.status(201).json(user);
    } catch (error) {
        // Tratamento de outros erros
        res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const getUserById = async (req, res) => {
    /*  #swagger.tags = ['User']
    #swagger.description = 'Endpoint to get user by id.' */
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateUser = async (req, res) => {
    /*  #swagger.tags = ['User']
    #swagger.description = 'Endpoint to update user.' */
    const { id } = req.params;
    const { name, email, login, password, role } = req.body;

    // Verificação de senha
    if (password.length < 6) {
        return res.status(400).json({ error: 'A senha precisa ter pelo menos 6 dígitos' });
    }

    try {
        // Verificação se o email ou login já existe
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUserByEmail) {
            return res.status(400).json({ error: 'Já existe um usuário com este email' });
        }

        const existingUserByLogin = await prisma.user.findUnique({
            where: { login },
        });

        if (existingUserByLogin) {
            return res.status(400).json({ error: 'Já existe um usuário com este login' });
        }

        // Atualização do usuário
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, login, password, role },
        });

        res.status(201).json(user);
    } catch (error) {
        // Tratamento de outros erros
        res.status(500).json({ error: 'Erro no servidor' });
    }
};

export const deleteUser = async (req, res) => {
    /*  #swagger.tags = ['User']
    #swagger.description = 'Endpoint to delete user.' */
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
