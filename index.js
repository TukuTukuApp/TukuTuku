const app = require("./src/config/express");
const { port } = require("./src/config/vars");

app.listen(port, () => {
  console.log(`Listening in Port:${port}`);
});
