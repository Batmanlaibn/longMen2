import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = []; // Жишээ зориулалттай in-memory хадгалалт. Үнэндээ MongoDB ашиглах нь зөв

// User бүртгэх
app.post('/api/register', async (req, res) => {
  const { ner, email, utas, nas, nuutsugs } = req.body;

  if (!ner || !email || !utas || !nas || !nuutsugs) {
    return res.status(400).json({ message: 'Бүх талбаруудыг бөглөнө үү' });
  }

  if (nas < 18) {
    return res.status(400).json({ message: 'Танд бүртгүүлэх нас хүрээгүй байна' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'И-мэйл аль хэдийн бүртгэлтэй байна' });
  }

  const hashedPassword = await bcrypt.hash(nuutsugs, 10);

  const newUser = { ner, email, utas, nas, nuutsugs: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'Бүртгэл амжилттай боллоо' });
});

// Login хийх
app.post('/api/login', async (req, res) => {
  const { email, nuutsugs } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'И-мэйл эсвэл нууц үг буруу байна' });
  }

  const isMatch = await bcrypt.compare(nuutsugs, user.nuutsugs);
  if (!isMatch) {
    return res.status(400).json({ message: 'И-мэйл эсвэл нууц үг буруу байна' });
  }

  res.json({ message: 'Амжилттай нэвтэрлээ', user: { ner: user.ner, email: user.email } });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
