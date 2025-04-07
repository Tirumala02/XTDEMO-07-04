
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"
import mongoose from "mongoose";
// function for add product
// const addProduct = async (req, res) => {
//     try {

//         const { name, description, price, category, subcategory, bestseller } = req.body

//         const image1 = req.files.image1 && req.files.image1[0]
//         const image2 = req.files.image2 && req.files.image2[0]
//         const image3 = req.files.image3 && req.files.image3[0]
//         const image4 = req.files.image4 && req.files.image4[0]

//         const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

//         let imagesUrl = await Promise.all(
//             images.map(async (item) => {
//                 let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
//                 return result.secure_url
//             })
//         )

//         const productData = {
//             name,
//             description,
//             category,
//             subcategory, // Add subcategory here
//             price: Number(price),
//             bestseller: bestseller === "true",
//             image: imagesUrl,
//             date: Date.now()
//         };

//         console.log(productData);

//         const product = new productModel(productData);
//         await product.save()

//         res.json({ success: true, message: "Product Added" })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

const addProduct = async (req, res) => {
    try {
      const { id, name, description, price, category, subcategory, bestseller } = req.body;
  
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
  
      const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
  
      let imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
          return result.secure_url;
        })
      );
  
      // Prepare product data
      const productData = {
        name,
        description,
        category,
        subcategory,
        price: Number(price),
        bestseller: bestseller === "true",
        image: imagesUrl,
        date: Date.now(),
      };
  
      // If a custom ID is provided
      if (id) {
        // Validate if it's a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.json({ success: false, message: "Invalid ID format. Must be a valid MongoDB ObjectId." });
        }
  
        // Check if the ID already exists in the database
        const existingProduct = await productModel.findById(id);
        if (existingProduct) {
          return res.json({
            success: false,
            message: `Product with ID ${id} already exists. Please use a different ID or leave it blank to auto-generate.`,
          });
        }
  
        // Assign the custom ID to the product
        productData._id = id;
      }
  
      // Create and save the product (MongoDB will generate an ID if _id is not provided)
      const product = new productModel(productData);
      await product.save();
  
      res.json({ success: true, message: "Product Added", productId: product._id });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subcategory, bestseller } = req.body;

        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const updatedData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(category && { category }),
            ...(subcategory && { subcategory }), // Add subcategory here
            ...(price && { price: Number(price) }),
            ...(bestseller && { bestseller: bestseller === "true" }),
        };

        if (imagesUrl.length) {
            updatedData.image = imagesUrl;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.json({ success: true, message: "Product Updated", product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export { listProducts, addProduct, updateProduct, removeProduct, singleProduct }