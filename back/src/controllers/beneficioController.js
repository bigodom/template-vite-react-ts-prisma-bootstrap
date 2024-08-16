import prisma from "../services/databaseClient.js";

export const getAllBeneficios = async (req, res) => {
    /*  #swagger.tags = ['Beneficio']
    #swagger.description = 'Endpoint to get all beneficios.' */
    try {
        const beneficios = await prisma.beneficio.findMany();
        res.json(beneficios);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createBeneficio = async (req, res) => {
    /*  #swagger.tags = ['Beneficio']
    #swagger.description = 'Endpoint to create beneficios.' */
    const { nome, descricao, valor, id_comprador, prazo_de_pagamento, situação, tipo_de_baixa, obs } = req.body;

    try {
        const beneficio = await prisma.beneficio.create({
            data: { nome, descricao, valor, id_comprador, prazo_de_pagamento, situação, tipo_de_baixa, obs },
        });

        res.status(201).json(beneficio);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getBeneficioById = async (req, res) => {
    /*  #swagger.tags = ['Beneficio']
    #swagger.description = 'Endpoint to get beneficio by id.' */
    const { id } = req.params;
    try {
        const beneficio = await prisma.beneficio.findUnique({
            where: { id: Number(id) },
        });
        if (beneficio) {
            res.json(beneficio);
        } else {
            res.status(404).json({ error: 'Beneficio not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateBeneficio = async (req, res) => {
    /*  #swagger.tags = ['Beneficio']
    #swagger.description = 'Endpoint to update beneficio.' */
    const { id } = req.params;
    const { nome, descricao, valor, id_comprador, prazo_de_pagamento, situação, tipo_de_baixa, obs } = req.body;

    try {
        const beneficio = await prisma.beneficio.update({
            where: { id: Number(id) },
            data: { nome, descricao, valor, id_comprador, prazo_de_pagamento, situação, tipo_de_baixa, obs },
        });

        res.json(beneficio);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteBeneficio = async (req, res) => {
    /*  #swagger.tags = ['Beneficio']
    #swagger.description = 'Endpoint to delete beneficio by id.' */
    const { id } = req.params;
    try {
        await prisma.beneficio.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Beneficio deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}