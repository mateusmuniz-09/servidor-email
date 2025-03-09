const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json()); // Para permitir JSON no body das requisições
app.use(cors()); // Para permitir requisições do front-end

// Configuração do Nodemailer
const transporte = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mateus.muniz1310@gmail.com", // Seu email
    pass: "suyn vrgx otxg qwte", // Senha de app gerada pelo Google
  },
});

// Rota para receber os dados do formulário e enviar email
app.post("/send", async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  console.log("Recebido:", nome, email, telefone, mensagem); // Verifique se está vindo corretamente

  if (!nome || !email || !mensagem || !telefone) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    await transporte.sendMail({
      from: `"${nome}" <${email}>`,
      to: "mateus09muniz@gmail.com",
      subject: "Novo contato para consultoria!",
      text: `
             Nome: ${nome}
             Email: ${email}
             Telefone: ${telefone}
             Mensagem: ${mensagem}`,
    });

    res.json({ message: "Email enviado com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    res.status(500).json({ message: "Erro ao enviar email" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
