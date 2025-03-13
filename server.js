const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080; // O Vercel vai definir process.env.PORT

app.use(express.json()); // Para permitir JSON no body das requisições
app.use(cors()); // Para permitir requisições do front-end

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mateus.muniz1310@gmail.com", // Seu email
    pass: "suyn vrgx otxg qwte", // Senha de app gerada pelo Google
  },
});

// Rota para receber os dados do formulário e enviar email
app.post("/send", async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  // Verificar se todos os campos foram preenchidos corretamente
  console.log("Recebido:", nome, email, telefone, mensagem); // Verifique se os dados estão sendo recebidos

  if (!nome || !email || !mensagem || !telefone) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    // Envio do email usando Nodemailer
    await transporter.sendMail({
      from: `"${nome}" <${email}>`, // De quem está enviando
      to: "mateus09muniz@gmail.com", // Para onde vai o email
      subject: "Novo contato para consultoria!", // Assunto do email
      text: `
        Nome: ${nome}
        Email: ${email}
        Telefone: ${telefone}
        Mensagem: ${mensagem}`, // Corpo do email em texto
    });

    // Resposta de sucesso
    res.json({ message: "Email enviado com sucesso!" });
  } catch (err) {
    // Caso ocorra algum erro
    console.error("Erro ao enviar email:", err);
    res.status(500).json({ message: "Erro ao enviar email" });
  }
});

// Iniciar o servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log("Servidor iniciado corretamente!");
});
