
  const verifyToken = require('../middleware/auth')
  const Idea = require('../models/Idea')
  const File = require('../models/File')
  const router = require('./auth');
  const Academic = require('../models/Academic')
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;

  const now = new Date()
  const currentYear = now.getFullYear();
  
  
  const csvWriter = createCsvWriter({
    path: 'ideas.csv',
    header: [
      { id: 'Title', title: 'Title' },
      { id: 'Description', title: 'Description' },
      { id: 'LastEdition', title: 'LastEdition' },
      { id: 'UserId', title: 'User' },
      { id: 'CategoryId', title: 'Category' }
    ]
  });
  
  router.get('/download', async(req, res) => {
    const year = await Academic.find({AcademicYear : currentYear})
    if(year[0].FirstClosureDate <= now)
    {
      await Idea.find({AcademicYear: currentYear})
      .populate('UserId', 'Name') 
      .populate('CategoryId', 'Title')
      .exec((err, ideas) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal server error');
          return;
        }
  
        csvWriter.writeRecords(ideas.map(idea => {
          return {
            Title: idea.Title,
            Description: idea.Description,
            LastEdition: idea.LastEdition,
            UserId: idea.UserId?.Name,
            CategoryId: idea.CategoryId?.Title
          };
        })).then(() => {
          res.download('ideas.csv');
        });
      });
    }
    else{
      res.json({'success':false,'message':'Not finish fist closure date'})
    }
  });
  


  
  module.exports = router