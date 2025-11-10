import uploadOnCloudinary from "./../utils/cloudinary.js";
import Shop from "./../models/shop.models.js";

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

export const editShop = async (req, res) => {
  try {
    // 1. Extract updatable fields
    const { name, city, state, address } = req.body;

    // 2. Find existing shop owned by current user
    let shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "No shop found for this user.",
      });
    }

    // 3. Initialize updatedData object dynamically
    const updatedData = {};
    if (name) updatedData.name = name;
    if (city) updatedData.city = city;
    if (state) updatedData.state = state;
    if (address) updatedData.address = address;

    // 4. If a new file (image) is uploaded, update it on Cloudinary
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      updatedData.image = cloudinaryResponse?.url || cloudinaryResponse;
    }

    // 5. Update the shop document
    shop = await Shop.findByIdAndUpdate(shop._id, updatedData, {
      new: true, // return updated document
    }).populate("owner");

    // 6. Return success response
    return res.status(200).json({
      success: true,
      message: "Shop updated successfully.",
      shop,
    });
  } catch (error) {
    console.error("Error editing shop:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating shop.",
      error: error.message,
    });
  }
};

export const deleteShop = async (req, res) => {
  try {
    //  Find the shop owned by the current user
    const shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "No shop found for this user.",
      });
    }

    //  Delete the shop from the database
    await Shop.findByIdAndDelete(shop._id);

    //  Return success response
    return res.status(200).json({
      success: true,
      message: "Shop deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting shop:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting shop.",
      error: error.message,
    });
  }
};


export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ onwer: req.userId }).populate("owner items")
    if (!shop) {
      return null;
    }
    return res
      .status(200)
      .json({ success: true, message: "shop fetched suceessfullly", shop });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, message: "shop fetched error", error:error.message });
  }
};
