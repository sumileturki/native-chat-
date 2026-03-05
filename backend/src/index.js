import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { friendRouter } from "./modules/friend/friend.route.js";

import "dotenv/config";

const app = express();

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

// mount router
app.use("/api/friend", friendRouter);

app.get("/", (req, res) => {
  res.send("Health OKKK");
});

app.listen(3000, () => {
  console.log("Server is running at 3000");
});