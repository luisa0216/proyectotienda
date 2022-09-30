const express = require("express")
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const products =[
    {
        id:1,
        name:"Cuaderno Sirena",
        price: 15.000,
        Image: "img/cuaderno1.jpg",
        stock: 2
    },
    {
        id:2,
        name:"Carchera Pastel",
        price: 25.000,
        Image: "img/cartu2.webp",
        stock: 2
    },
    {
        id:3,
        name:"Cartuchera Unicornio",
        price: 23.000,
        Image: "img/cartu3",
        stock: 2
    },
    {
        id:4,
        name:"Cartuchera Rosa",
        price: 22.000,
        Image: "img/cartu4.jpg",
        stock: 2
    },
    {
        id:5,
        name:"Cartuchera Negra",
        price: 35.000,
        Image: "img/cartu5.jfif",
        stock: 2
    },
    {
        id:6,
        name:"Cuaderno Sirena",
        price: 12.000,
        Image: "img/cuaderno.jpg",
        stock: 2
    },
];

app.get("/api/products", (req, res)=>{
    res.send(products);
});
app.post("/api/pay", (req, res)=>{
    const ids=req.body;
    const procutsCopy = products.map(p => ({...p}));
    ids.forEach(id => {
        const product=procutsCopy.find(p=> p.id === id);
        if(product.stock > 0){
            product.stock--;
        }
        else{
            throw("Sin Stock");
        }
        
    });
    products = procutsCopy;
    res.send(products);
});

app.use("/", express.static("fe"));

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});