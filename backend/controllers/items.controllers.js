import Shop from "../models/shop.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import Item from "./../models/items.models.js";

export const addItem = async (req, res) => {
  try {
    //extract field
    const { name, category, foodType, price } = req.body;
    //validate field 
    if (!name || !category || !foodType || !price) {
  return res.status(400).json({
    success: false,
    message: "All fields (name, category, foodType, price) are required.",
  });
}

    let image = null;
    //this file is access by multer
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    //find shop from owner id
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res
        .status(400)
        .json({ success: false, message: "Shop not  found" });
    }

    //create item
    const item = await Item.create({
      name,
      category,
      foodType,
      image,
      price,
      shop: shop._id,
    });

    //return res
    return res
      .status(201)
      .json({ success: true, message: "Item created successfully", item });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Item not created ",
        error: error.message,
      });
  }
};
