  const archiver = require('archiver');
  const fs = require('fs');
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

  router.get('/downloadzip', (req, res) => {
    const output = fs.createWriteStream('uploads.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 } // Set the compression level
    });
  
    // Add all uploaded files to the archive
    archive.directory('./Public/uploads/', false);
  
    // Send the ZIP archive to the client for download
    archive.pipe(output);
    output.on('close', () => {
      res.download('uploads.zip', 'uploads.zip');
      console.log('ZIP archive created and sent for download');
    });
    archive.finalize();
  });
  
  router.get('/downloadzip', (req, res) => {
    const output = fs.createWriteStream('uploads.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 } // Set the compression level
    });
  
    // Add all uploaded files to the archive
    archive.directory('./Public/uploads/', false);
  
    // Send the ZIP archive to the client for download
    archive.pipe(output);
    output.on('close', () => {
      res.download('uploads.zip', 'uploads.zip');
      console.log('ZIP archive created and sent for download');
    });
    archive.finalize();
  });


  
  module.exports = router