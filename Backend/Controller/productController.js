import productModel from "../Models/productModel.js";

class productController{
    constructor(){}

    async createProduct(req,res){
        const {name,description, rating, price, category, stock, images, createdAt, updatedAt} = req.body;
        const data = {name,description, rating, price, category, stock, images, createdAt, updatedAt};
        const newProduct = new productModel(data);
        try{
            const createdProduct = await newProduct.save();
            return res.status(201).json({message : "Product added successfully", data : createdProduct, success : true});
        }
        catch (err){
            return res.status(403).json({message : "Failed to add new product", success : false});
        }
    }
    async getAll(req,res){
        try{
            const allProducts = await productModel.find();  
            return res.status(200).json({"data" : allProducts, success : true});
        }
        catch (err) {
            return res.status(404).json({"message" : "Unexpected error occured", success : false });
        }
    }
    async sortingProducts (req,res){
        try{
            const {sort} = req.query;
            console.log(sort);
            if(sort === "ascending"){
                const products = await productModel.find();
                const filteredProducts = products.sort((a,b) => a.price - b.price);
                return res.status(200).json({message : "Sorted", data : filteredProducts, success : true});
            }
            else if(sort === "descending") {
                const products = await productModel.find();
                const filteredProducts = products.sort((a,b) => b.price - a.price);
                return res.status(200).json({message : "Sorted", data : filteredProducts, success : true});
            }
            return res.status(400).json({message : "Unexpected error occured", success: false});
        }
        catch (err){
            return res.status(404).json({message : "Unexpected error occured", success : false, errorMessage : err});
        }
    }
    async pagination(req, res) {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * limitNumber;
    
        try {
            const totalProducts = await productModel.countDocuments();
            const totalPages = Math.ceil(totalProducts / limitNumber);
    
            const allProducts = await productModel.find()
                .skip(skip)
                .limit(limitNumber);
    
            return res.status(200).json({
                message: "Pagination performed",
                data: allProducts,
                page: pageNumber,
                limit: limitNumber,
                totalPages: totalPages,
                totalProducts: totalProducts,
                success: true
            });
        } catch (err) {
            return res.status(404).json({ message: "Unexpected error occurred", success: false });
        }
    }    
}
export  default productController;