const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/jwtConfig");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).send({ error: "No token provided" });
  }

  const splitHeader = header.split(" ");

  if (splitHeader.length < 2 || splitHeader.length > 2) {
    return res.status(401).send({ error: "Invalid token" });
  }

  const [type, token] = splitHeader;

  if (!/^Bearer$/i.test(type)) {
    return res.status(401).send({ error: "Token malformatted" });
  }

  jwt.verify(token, SECRET, async (err, { id, name, username }) => {
    if (err) return res.status(401).send({ error: "Invalid token" });
    req.user = { id, name, username };
  });

  next();
};
