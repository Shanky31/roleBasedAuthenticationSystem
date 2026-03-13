const {ImageKit} = require('@imagekit/nodejs')
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(file){
const response = await client.files.upload({
  file: file,
  fileName: 'music_'+Date.now(),
  folder:'backend-revision/music'
});
return response;
}


module.exports={uploadFile}