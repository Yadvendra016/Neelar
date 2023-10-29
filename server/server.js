import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();

//create server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
  connectDB();
});
