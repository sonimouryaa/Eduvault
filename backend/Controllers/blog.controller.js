import BlogTagModel from "../Models/Blog.tag.model";
import blogModel from "../Models/blog.model";
import blogCategoryModel from "../Models/blogCategory.model";
import fs from "fs";
import path from "path";
import multer from "multer";

export const AddBlogCat = async (req, res) => {
  try {
    const { name } = req.body;
    const BlogCat = await blogCategoryModel.create({
      name: name,
    });
    if (BlogCat) {
      return res.status(200).json({
        message: "Blog Category Added Successfully",
        data: BlogCat,
        success: true,
      });
    }
    return res.status(409).json({
      message: "Unable to add Category",
      success: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const GetBlogcates = async (req, res) => {
  try {
    const getCat = await blogCategoryModel.find();
    if (getCat) {
      return res.status(200).json({
        count: getCat.length,
        data: getCat,
        success: true,
        message: "fetching all category",
      });
    }

    return res.status(500).json({
      message: "bad req",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads/blog")) {
      cb(null, "./uploads/blog");
    } else {
      fs.mkdirSync("./uploads/blog");
      cb(null, "./uploads/blog");
    }
  },
  filename: function (req, file, cb) {
    const orgName = file.originalname;
    const ext = path.parse(orgName).ext;
    const name = path.parse(orgName).name;
    const fullname =
      name + "-" + Date.now() + "" + Math.round(Math.random() * 9) + ext;
    cb(null, fullname);
  },
});

const upload = multer({ storage: storage });

export const AddBlogTag = async (req, res) => {
  try {
    const { name, name2 } = req.body;
    const addtag = await BlogTagModel.create({
      name: name,
      name2: name2,
    });
    if (addtag) {
      return res.status(200).json({
        message: "tag added successfully",
        success: true,
        data: addtag,
      });
    }
    return res.status(409).json({
      message: "Unable to add tag",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const GetBlogTags = async (req, res) => {
  try {
    const gettag = await BlogTagModel.find();
    if (gettag) {
      return res.status(200).json({
        message: "fetching all tags",
        success: true,
        count: gettag.length,
        data: gettag,
      });
    }
    return res.status(500).json({
      message: "bad req",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const deleteBlogtag = async (req, res) => {
  try {
    const tag_id = req.params.tag_id;
    const delTag = await BlogTagModel.deleteOne({ _id: tag_id });
    if (delTag) {
      return res.status(200).json({
        message: "tag deleted successfully",
        data: delTag,
      });
    }
    return res.status(404).json({
      message: "tag Not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const getblogCatid = async (req, res) => {
  try {
    let categoryID = req.params.category_id;
    let product = await blogModel
      .find({ category: categoryID })
      .populate("category");
    if (product) {
      return res.status(201).json({
        count: product.length,
        data: product,
        message: " blog category fetched successfully",
        filepath: "http://localhost:8001/uploads/blog",
      });
    }
    return res.status(500).json({
      message: "bad req",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

export const getblogTagid = async (req, res) => {
  try {
    let TagID = req.params.tag_id;
    let product = await blogModel.find({ Tag: TagID }).populate("Tag");
    if (product) {
      return res.status(201).json({
        count: product.length,

        data: product,
        message: " blog Tag fetched successfully",
        filepath: "http://localhost:8001/uploads/blog",
      });
    }
    return res.status(500).json({
      message: "bad req",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

export const AddBlog = async (req, res) => {
  try {
    const dataWithFile = upload.single("avatar");
    dataWithFile(req, res, async function (err) {
      if (err)
        return res.status(400).json({ message: err.message, success: false });
      // console.log(req.body);
      // console.log(req.file);

      let img = null;
      if (req.file) {
        img = req.file.filename;
      }

      const { title, category, Tag } = req.body;
      const newBlog = await blogModel.create({
        title: title,
        category: category,
        Tag: Tag,
        thumbnail: img,
        filepath: "http://localhost:8001/uploads/blog",
      });
      if (newBlog) {
        return res.status(200).json({
          message: "blog added successfully",

          data: newBlog,
          success: true,
        });
      }
      return res.status(409).json({
        message: "Unable to add blog",
        success: false,
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const GetAllBlogs = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const skipno = limit * (page - 1);

    const rgx = (pattern) => {
      return new RegExp(`.*${pattern}*.`);
    };

    let filter = {};

    if (search) {
      const searchRgx = rgx(search);

      filter = {
        $or: [
          { title: { $regex: searchRgx, $options: "i" } },
          { "category.name": { $regex: searchRgx, $options: "i" } },

          { category: { $regex: searchRgx, $options: "i" } },
        ],
      };
    }

    const Allblog = await blogModel
      .find(filter)
      .populate("category")
      .populate("Tag")
      .limit(limit)
      .skip(skipno);
    if (Allblog) {
      return res.status(200).json({
        message: "blogs fetched successfully",
        data: Allblog,
        success: true,
        filepath: "http://localhost:8001/uploads/blog",
      });
    }
    return res.status(404).json({
      message: "No blog found",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const DeleteBlog = async (req, res) => {
  try {
    const blog_id = req.params.blog_id;
    const existingblog = await blogModel.findOne({ _id: blog_id });

    const blog = await blogModel.deleteOne({ _id: blog_id });
    if (blog) {
      if (blog.acknowledged) {
        if (fs.existsSync("./uploads/blog/" + existingblog.image)) {
          fs.unlinkSync("./uploads/blog/" + existingblog.image);
        }
        return res.status(200).json({
          message: "blog deleted successfully",
          success: true,
        });
      } else {
        return res.status(404).json({
          message: "No blog found",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const GetBlog = async (req, res) => {
  try {
    const blog_id = req.params.blog_id;
    const totalblogs= await blogModel.countDocuments()

    const blog = await blogModel
      .findOne({ _id: blog_id })
      .populate("category")
      .populate("Tag");
    if (blog) {
      return res.status(200).json({
        message: "blog found",
        data: blog,
        totalblogs:totalblogs,
        success: true,
        filepath: "http://localhost:8001/uploads/blog",
      });
    }
    blog.Save();
    return res.status(404).json({
      message: "No Data Found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const UpdateBlog = async (req, res) => {
  try {
    const dataWithFile = upload.single("avatar");
    dataWithFile(req, res, async function (err) {
      if (err)
        return res.status(400).json({ message: err.message, success: false });
    });

    const blog_id = req.params.blog_id;
    const existingblog = await blogModel.findOne({ _id: blog_id });
    let img = existingblog.image;
    if (req.file) {
      img = req.file.filename;
      if (fs.existsSync("./uploads/blog" + existingUser.image)) {
        fs.unlinkSync("./uploads/blog" + existingUser.image);
      }
    }
    const { title, category, Tag } = req.body;
    const blogdata = await blogModel.updateOne(
      { _id: blog_id },
      {
        $set: {
          title: title,
          category: category,
          Tag: Tag,
          thumbnail: img,
        },
      }
    );
    if (blogdata.acknowledged) {
      return res.status(200).json({
        message: "blog updated",
        success: true,
        data: blogdata,
        filepath: "http://localhost:8001/uploads/blog",
      });
    }
    return res.status(404).json({
      message: "No Such User Found",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
