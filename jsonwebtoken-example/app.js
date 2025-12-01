const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const payload = { id: "692c8239abd1262df228d25e" };

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
console.log(token);

const decodeToken = jwt.decode(token);
console.log(decodeToken);

try {
  const { id } = jwt.verify(token, SECRET_KEY);
  console.log(id);
  const invalidToken =
    "XXX.XXX.XXX";
  const result = jwt.verify(invalidToken, SECRET_KEY);
} catch (error) {
  console.log(error.message);
}
