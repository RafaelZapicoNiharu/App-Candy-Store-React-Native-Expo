const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(cors());
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
app.use(bodyParser.json());

// Leitura dos dados de usuários do arquivo JSON
const getUserData = () => {
  const data = fs.readFileSync('data_users.json', 'utf8');
  // console.log(data);
  return JSON.parse(data);
};

// Retorna todos os usuários em formato JSON
app.get('/usuarios', (req, res) => {
  const data = getUserData();
  res.json(data.usuarios);
});

// Cadastra usuário no banco que está vindo do JSON
app.post('/usuarios/cadastrar', (req, res) => {
  const data = getUserData();
  const novoUsuario = req.body;
  novoUsuario.id = data.usuarios[data.usuarios.length - 1].id + 1; // Gera um ID incrementando +1 ao ID do último usuário
  data.usuarios.push(novoUsuario);
  fs.writeFileSync('data_users.json', JSON.stringify(data, null, 2));

  res.status(201).json({ message: 'Usuário adicionado com sucesso' });
});

// Atualiza um usuário com base no ID
app.put('/usuarios/alterar', (req, res) => {
  const { id, ...newData } = req.body; // Obtém o ID e os novos dados do corpo da solicitação
  const data = getUserData();
  const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id === id);

  if (usuarioIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  data.usuarios[usuarioIndex] = { ...data.usuarios[usuarioIndex], ...newData };
  fs.writeFileSync('data_users.json', JSON.stringify(data, null, 2));

  res.json({ message: 'Usuário atualizado com sucesso' });
});

// Valida login e password do usuário
app.post('/login/validate', (req, res) => {
  const { email, password } = req.body;
  const data = getUserData();
  const usuario = data.usuarios.find((usuario) => usuario.email === email && usuario.password === password);
  if (!usuario) {
    return res.status(401).json({ message: 'Login ou password incorretos' });
  }

  // Gere um token JWT com base nas informações do usuário e sua função
  const secretKey = process.env.JWT_SECRET; // Obtenha a chave secreta da variável de ambiente
  const token = jwt.sign({ id: usuario.id, nome: usuario.nome, profile: usuario.profile }, secretKey, { expiresIn: '1h' });
  // console.log(token);

  // Retorne o token, informações do usuário e o ID
  res.json({ message: 'Login realizado com sucesso', token, id: usuario.id, nome: usuario.nome, email: usuario.email, login: usuario.login, password: usuario.password, cep: usuario.cep,
  estado: usuario.estado, logradouro: usuario.logradouro, cidade: usuario.cidade, bairro: usuario.bairro, numero: usuario.numero, profile: usuario.profile });
});

// ##################################################################################################################################################################################################
// ENDPOINTS DE DOCES
// Função para obter os dados dos doces do arquivo JSON
const getDocesData = () => {
  const data = fs.readFileSync('data_users.json', 'utf8');
  return JSON.parse(data);
};

// Cadastra doce no banco que está vindo do JSON
app.post('/doces/cadastrar', (req, res) => {
  const data = getDocesData();
  const novoDoce = req.body;
  // Verifica se o array de doces está vazio e adiciona um array vazio se necessário
  if (!data.doces || data.doces.length === 0) {
    data.doces = [];
  }
  novoDoce.id = data.doces.length > 0 ? data.doces[data.doces.length - 1].id + 1 : 1;
  data.doces.push(novoDoce);
  fs.writeFileSync('data_users.json', JSON.stringify(data, null, 2));
  res.status(201).json({ message: 'Doce adicionado com sucesso' });
});

// Retorna todos os doces em formato JSON
app.get('/doces', (req, res) => {
  const data = getDocesData();
  res.json(data.doces);
});

// Rota para excluir um doce com base no ID
app.delete('/doces/excluir', (req, res) => {
  const { id } = req.body; // Recebe o ID do doce a ser excluído a partir do corpo da requisição
  const data = getDocesData();
  const doceIndex = data.doces.findIndex((doce) => doce.id === id);
  if (doceIndex === -1) {
    return res.status(404).json({ message: 'Doce não encontrado' });
  }
  // Remove o doce do array de doces
  data.doces.splice(doceIndex, 1);
  fs.writeFileSync('data_users.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Doce excluído com sucesso' });
});

// Retorna todos os doces ou filtra por nome
app.get('/doces', (req, res) => {
  const pesq = req.query.nome || '';
  const data = getDocesData();
  const lista = data.doces.filter((doce) => pesq === '' || doce.nome.includes(pesq));
  const doceLista = lista.map((doce) => {
    return { id: doce.id, nome: doce.nome, preco: doce.preco, quantidade: doce.quantidade };
  });
  res.json(doceLista);
});

// Rota para obter um usuário por ID
app.get('/doces/:id', (req, res) => {
  const doceId = parseInt(req.params.id);
  const data = getUserData();
  const doce = data.doces.find((doce) => doce.id === doceId);
  if (!doce) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  res.json(doce);
});

// ##################################################################################################################################################################################################
// ENDPOINTS DE ENCOMENDAS
// Função para obter os dados dos encomendas do arquivo JSON
const getEncomendasData = () => {
  const data = fs.readFileSync('data_users.json', 'utf8');
  return JSON.parse(data);
};

// Cadastrar uma nova encomenda
app.post('/encomendas/cadastrar/:id', (req, res) => {
  const data = getEncomendasData();
  let novoEncomenda = {
    idUser: req.body.idUser,
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    dataEntrega: req.body.dataEntrega,
    tipoDoce: req.body.tipoDoce
  };
  // Verifica se o array de encomendas está vazio e adiciona um array vazio se necessário
  if (!data.encomendas || data.encomendas.length === 0) {
    data.encomendas = [];
  }
  novoEncomenda.id = data.encomendas.length > 0 ? data.encomendas[data.encomendas.length - 1].id + 1 : 1;
  data.encomendas.push(novoEncomenda);
  fs.writeFileSync('data_users.json', JSON.stringify(data, null, 2));
  res.status(201).json({ message: 'Encomenda adicionada com sucesso' });
});

// Retorna todos os encomendas em formato JSON
app.get('/encomendas', (req, res) => {
  const data = getEncomendasData();
  res.json(data.encomendas);
});

app.get('/encomendas/:idUser', (req, res) => {
  const idUser = parseInt(req.params.idUser);
  const data = getEncomendasData();
  // Filtra as encomendas do usuário especificado
  const encomendasUsuario = data.encomendas.filter(encomenda => encomenda.idUser === idUser);
  res.json(encomendasUsuario);
});

// Rota para excluir um doce com base no ID
app.delete('/encomendas/excluir', (req, res) => {
  const { id } = req.body;
  const data = getEncomendasData();
  const encomendaIndex = data.encomendas.findIndex((encomenda) => encomenda.id === id);
  if (encomendaIndex === -1) {
    return res.status(404).json({ message: 'Encomenda não encontrado' });
  }
  data.encomendas.splice(encomendaIndex, 1);
  fs.writeFileSync('data_users.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Encomenda excluído com sucesso' });
});

// Retorna todas as encomendas ou filtra por nome - Pesquisa
app.get('/encomendas', (req, res) => {
  const pesq = req.query.nome || '';
  const data = getEncomendasData();
  const lista = data.encomendas.filter((u) => pesq === '' || u.nome.includes(pesq));
  const uLista = lista.map((u) => {
    return { id: u.id, nome: u.nome, doces: u.doces, quantidade: u.quantidade };
  });
  res.json(uLista);
});


app.listen(port, () => {
  console.log(`API está rodando em http://localhost:${port}`);
});
