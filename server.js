const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let productlist = [
    { "pid": 101, "pname": "Laptop", "price": 25000 },
    { "pid": 102, "pname": "Mobile", "price": 15000 },
    { "pid": 103, "pname": "Watch", "price": 5000 }
];

app.get("/products/:pid", (req, res) => {
    let proid = Number(req.params.pid);
    let product = productlist.find(prodObj => prodObj.pid == proid);
    if (product == undefined) {
        res.status(404).json({ message: "Product not found" });
    } else {
        res.status(200).send({ message: "Product found", payload: product });
    }
});

app.get("/products", (req, res) => {
    res.status(200).send({ message: "All products are fetched", payload: productlist });
});

app.post("/products", (req, res) => {
    let newp = req.body;
    productlist.push(newp);
    res.status(201).send({ message: "Product added" });
});

app.delete("/products/:pid", (req, res) => {
    let proid = Number(req.params.pid);
    let productIndex = productlist.findIndex(prodObj => prodObj.pid == proid);
    if (productIndex === -1) {
        res.status(404).send({ message: "Product cannot be deleted" });
    } else {
        productlist.splice(productIndex, 1);
        res.status(200).send({ message: "Deleted product" });
    }
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000.....");
});
