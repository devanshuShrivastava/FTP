
var fs = require('fs');
var formidable = require('formidable'),
    http = require('http');
    

exports.ftpTransfer = function() {

	http.createServer(function (req, res) {
		// This will create the call to the node local server that will in return do its job of FTP.
		  if (req.url == '/fileupload') {
			var form1 = new formidable.IncomingForm();
			form1.parse(req, function (err, fields, files) {
			  var oldpath = files.fileToUpload.path;
			  var newpath = fields.info +"/"+ files.fileToUpload.name;
			fs.readFile(oldpath, function(err, data) {
				// fs will be used to creating new file on the destination directories.
				  fs.writeFile(newpath, data,function(err){
					if(err) throw err;
					res.end('File uploaded and moved!');
				  });  
			  });
		 });
		  } 
		  // First the else block will work, this will create the DOM.
		  else { 
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
			res.write('Source: <input type="file" name="fileToUpload"><br>');
			res.write('Destination: <input type="fields" name="info"><br>');
			res.write('<input type="submit">');
			res.write('</form>');
			return res.end();
		  }
		}).listen(3000);
		
  console.log("Server initiated!");
}
	