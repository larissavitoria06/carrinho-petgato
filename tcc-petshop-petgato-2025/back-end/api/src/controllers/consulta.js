const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//const express = require('express');
//const cors = require('cors');

  const create = async (req, res) => {
  const { nomePet, especiePet, racaPet, nomeProprietario, nascpet, emailProprietario, dados } = req.body;

  const dataNascPet = new Date(nascpet);
  console.log("Data de nascimento recebida:", nascpet); // Log para depuração

  if (isNaN(dataNascPet.getTime()) || dataNascPet > new Date() || dataNascPet < new Date('1900-01-01')) {
    return res.status(400).json({ message: 'Data de nascimento do pet inválida' });
  }

  try {
    const novaConsulta = await prisma.consulta.create({
      data: {
        nomePet,
        especiePet,
        racaPet,
        nomeProprietario,
        nascpet: dataNascPet,
        emailProprietario,
        dados,
      },
    });

    console.log("Nova consulta criada:", novaConsulta);
    res.status(201).json(novaConsulta);

  } catch (error) {
    console.error("Erro ao criar consulta:", error);
    res.status(500).json({ message: 'Erro ao criar consulta', details: error.message });
  }
};


const read = async (req, res) => {
  try {
    const pets = await prisma.consulta.findMany(); 
    res.status(200).json(pets);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao consultar os pets' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nomePet, especiePet, racaPet, nomeProprietario, nascpet, emailProprietario, dados } = req.body;

  try {
    const petAtualizado = await prisma.consulta.update({
      where: { id: parseInt(id) },
      data: {
        nomePet,
        especiePet,
        racaPet,
        nomeProprietario,
        nascpet: new Date(nascpet),
        emailProprietario,
        dados,
      },
    });

    res.status(200).json(petAtualizado); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o pet' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const petDeletado = await prisma.consulta.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Pet deletado com sucesso', pet: petDeletado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o pet' });
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
};