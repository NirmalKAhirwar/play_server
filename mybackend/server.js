import app from "./src/app.js";
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Welcome to the portal");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and http://localhost:${PORT}`);
});
