const mongoose = require("mongoose")
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const verifyToken = require('../middleware/auth')
const Idea = require('../models/Idea')
const Category = require('../models/Category')
const File = require('../models/File')
const router = require('./auth')
const ObjectId = mongoose.Types.ObjectId

const now = new Date()
const currentYear = now.getFullYear();
const options = { timeZone: 'Asia/Ho_Chi_Minh' }
const localTime = now.toLocaleString('en-US', options)


const uploadPath = path.join(__dirname, '../Public/uploads/');

// Tạo folder uploads nếu chưa có
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Thiết lập multer storage để lưu trữ file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

// Thiết lập multer upload để tải lên file
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Chỉ cho phép tải lên file với định dạng hợp lệ
    const filetypes = /doc|docs|pdf|csv|rar|xlsx|xls|ppt/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Invalid format of file');
    }
  }
});


// @route POST api/ideas
// @desc Create idea
// @access Private
router.post('/', upload.array('documents', 10), async (req, res) => {
  const files = req.files;
  const { Title, Description, UserId, CategoryId } = req.body

  if (!Title)
    return res.status(400).json({ success: false, message: 'Title is required!' })

  try {
    const newIdea = new Idea({
      Title,
      Description,
      LastEdition: now,
      UserId: UserId,
      CategoryId: CategoryId,
      AcademicYear: currentYear
    })

    const IdeaId = await newIdea.save()

    if (files) {
      const newFiles = files.map(file => new File({
        IdeaId: IdeaId,
        DateUpload: now,
        Link: `Public/uploads/${file.filename}`
      }));

      await File.insertMany(newFiles);
    }
    res.json({ success: true, message: 'Successfully', idea: newIdea })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route GET api/idea
// @desc Get owner ideas
// @access Private
router.get('/profile/:id', async (req, res) => {
  try {
    const ideas = await Idea.aggregate([
      {
        $match: {
          'UserId': ObjectId(req.params.id),
        }
      },
      {
        $lookup: {
          from: "commentideas",
          localField: "_id",
          foreignField: "IdeaId",
          as: "comments"
        }
      },
      {
        $lookup: {
          from: "files",
          localField: "_id",
          foreignField: "IdeaId",
          as: "files"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "UserId",
          foreignField: "_id",
          as: "users"
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "CategoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $project: {
          _id: 1,
          Title: 1,
          Description: 1,
          LastEdition: 1,
          userPost: {
            $map: {
              input: "$users",
              as: "user",
              in: {
                _id: "$$user._id",
                Name: "$$user.Name",
                Avatar: "$$user.Avatar",
              }
            }
          },
          category: {
            $map: {
              input: "$category",
              as: "category",
              in: {
                _id: "$$category._id",
                Name: "$$category.Title"
              }
            }
          },
          files: {
            $map: {
              input: "$files",
              as: "file",
              in: {
                Url: "$$file.Link"
              }
            }
          }
          ,
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                _id: "$$comment._id",
                Content: "$$comment.Content",
                LastEdition: "$$comment.LastEdition",
                usercomment: {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: {
                          $filter: {
                            input: "$users",
                            as: "u",
                            cond: { $eq: ["$$u._id", "$$comment.UserId"] }
                          }
                        },
                        as: "u",
                        in: {
                          _id: "$$u._id",
                          Name: "$$u.Name",
                          Avatar: "$$u.Avatar"
                        }
                      }
                    },
                    0
                  ]
                },
              }
            }
          }
        }
      },
      {
        $sort: { LastEdition: -1 }
      }]);
    res.json({ success: true, ideas })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route PUT api/idea
// @desc Update idea
// @access Private
router.put('/:id', async (req, res) => {
  const { Title, Description } = req.body

  if (!Title) {
    return res.status(400).json({ success: false, message: 'Title is required!', Title, Description })
  }
  try {
    let updatedIdea = {
      Title,
      Description,
      LastEdition: now,
      AcademicYear: currentYear
    }

    const ideaUpdateCondition = { _id: req.params.id }

    updatedIdea = await Idea.findOneAndUpdate(
      ideaUpdateCondition,
      updatedIdea,
      { new: true }
    )

    // User not authorised to update post or post not found
    if (!updatedIdea)
      return res.status(401).json({
        success: false,
        message: 'Post not found or user not authorised'
      })

    res.json({
      success: true,
      message: 'Excellent progress!',
      idea: updatedIdea
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internla server error' })
  }
})

// @route DELETE api/idea
// @desc Delete idea
// @access Private
router.delete('/delete/:id', async (req, res) => {
  try {
    const ideaDeleteCondition = { _id: req.params.id }
    const deletedIdea = await Idea.findOneAndDelete(ideaDeleteCondition)

    // User not authorised or post not found
    if (!deletedIdea) return res.status(401).json({ success: false, message: 'abcd'})

    res.json({ success: true, deletedIdea: deletedIdea })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route GET api/idea/home
// @desc Get all ideas
// @access Private
router.get('/home', async (req, res) => {
  try {
    const ideas = await Idea.aggregate([
      {
        $match: {

        }
      },
      {
        $lookup: {
          from: "commentideas",
          localField: "_id",
          foreignField: "IdeaId",
          as: "comments"
        }
      },
      {
        $lookup: {
          from: "files",
          localField: "_id",
          foreignField: "IdeaId",
          as: "files"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "UserId",
          foreignField: "_id",
          as: "users"
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "CategoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $project: {
          _id: 1,
          Title: 1,
          Description: 1,
          LastEdition: 1,
          userPost: {
            $map: {
              input: "$users",
              as: "user",
              in: {
                _id: "$$user._id",
                Name: "$$user.Name",
                Avatar: "$$user.Avatar",
              }
            }
          },
          category: {
            $map: {
              input: "$category",
              as: "category",
              in: {
                _id: "$$category._id",
                Name: "$$category.Title"
              }
            }
          },
          files: {
            $map: {
              input: "$files",
              as: "file",
              in: {
                Url: "$$file.Link"
              }
            }
          }
          ,
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                _id: "$$comment._id",
                Content: "$$comment.Content",
                LastEdition: "$$comment.LastEdition",
                usercomment: {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: {
                          $filter: {
                            input: "$users",
                            as: "u",
                            cond: { $eq: ["$$u._id", "$$comment.UserId"] }
                          }
                        },
                        as: "u",
                        in: {
                          _id: "$$u._id",
                          Name: "$$u.Name",
                          Avatar: "$$u.Avatar"
                        }
                      }
                    },
                    0
                  ]
                },
              }
            }
          }
        }
      },
      {
        $sort: { LastEdition: -1 }
      }]);
    const categories = await Category.find()
    res.json({ success: true, ideas, categories })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})




module.exports = router

