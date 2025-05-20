const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/users");
const expenseRoutes = require("./routes/expenses");

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
