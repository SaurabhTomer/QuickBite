import uploadOnCloudinary from './../utils/cloudinary.js';
import Shop from './../models/shop.models.js';

export const createShop = async (req, res) => {
  try {
    //  Extract required data from request body
    const { name, city, state, address } = req.body;

    //  Check if all required fields are present
    if (!name || !city || !state || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, city, state, address) are required.",
      });
    }

    // Initialize image variable
    let image = null;

    //  If file exists, upload to Cloudinary
    if (req.file) {
      // Always await asynchronous calls
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      image = cloudinaryResponse?.url || cloudinaryResponse; // depending on your util return
    }

    //  Create new shop document
    const shop = await Shop.create({
      name,
      city,
      state,
      address,
      image,
      owner: req.userId, // req.userId must be set by auth middleware
    });

    //  Populate owner details 
    await shop.populate("owner");

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Shop created successfully.",
      shop,
    });
  } catch (error) {
    console.error("Error creating shop:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating shop.",
      error: error.message,
    });
  }
};
