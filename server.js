var express = require('express')
var multer  = require('multer')
var bodyParser = require('body-parser')
var html = require('html');
var cons = require('consolidate');
var app = express()
var path = require('path');
var SHA256 = require('crypto-js/sha256');
var mkdirp = require('mkdirp');
const fs = require('fs');
const pendingFolder = './app/uploads/pending';
const acceptedFolder = './app/uploads/accepted';

const Sequelize = require('sequelize')
app.use(bodyParser.json());         
var rimraf = require('rimraf');

const Web3 = require('web3')
var web3
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	console.log("hey");
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	console.log("done");
}
web3.eth.defaultAccounts = "0x88191e992c2bf983753f10f36283493ba35e3844";
console.log("hello there")
var usercrudContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_userCIN","type":"uint256"}],"name":"isUser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id_question","type":"uint256"},{"name":"id_option","type":"uint256"}],"name":"getVotesPerQuestion","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getNbOptionsPerQuestion","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userCIN","type":"uint256"},{"name":"_fName","type":"bytes16"},{"name":"_lName","type":"bytes16"},{"name":"_dateBirth","type":"bytes16"},{"name":"_street","type":"bytes32"},{"name":"_province","type":"bytes16"},{"name":"_code","type":"uint256"},{"name":"hash","type":"bytes32"}],"name":"insertUser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"},{"name":"id_option","type":"uint256"}],"name":"getQuestionOption","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id_question","type":"uint256"},{"name":"option","type":"bytes32"}],"name":"addOption","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userCIN","type":"uint256"}],"name":"getUser","outputs":[{"name":"_fName","type":"bytes16"},{"name":"_lName","type":"bytes16"},{"name":"_dateBirth","type":"bytes16"},{"name":"_street","type":"bytes32"},{"name":"_province","type":"bytes16"},{"name":"_code","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id_question","type":"uint256"},{"name":"id_option","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getUserCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"question","type":"bytes32"}],"name":"addQuestion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNbQuestions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allQuestions","outputs":[{"name":"question","type":"bytes32"},{"name":"nbOptions","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getQuestion","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"getCinUserByHash","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"verifyHash","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"getUserByHash","outputs":[{"name":"_fName","type":"bytes16"},{"name":"_lName","type":"bytes16"},{"name":"_dateBirth","type":"bytes16"},{"name":"_street","type":"bytes32"},{"name":"_province","type":"bytes16"},{"name":"_code","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"userCIN","type":"uint256"},{"indexed":false,"name":"fName","type":"bytes16"},{"indexed":false,"name":"lName","type":"bytes16"}],"name":"LogNewUser","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"useruint","type":"uint256"},{"indexed":false,"name":"index","type":"uint256"},{"indexed":false,"name":"userEmail","type":"bytes32"},{"indexed":false,"name":"userAge","type":"uint256"}],"name":"LogUpdateUser","type":"event"}])
var usercrud = usercrudContract.at('0x37e55174d647d2a0b0382db39fdf6fd88ada65a2')


const sequelize = new Sequelize('client', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    cinnp: {
      type: Sequelize.STRING
    }
  });
  var users = []
  // force: true will drop the table if it already exists
  User.findAll({
    attributes: ['firstName', 'lastName' ,'cin']
  }).then(user => {
      users = user
    for(let i = 0; i < users.length ; i++)
        console.log(users[i].dataValues)
  })


app.engine('html', cons.swig)
app.set('views', path.join(__dirname, './app'));
app.use('/static',express.static(path.join(__dirname, './app')));

app.set('view engine', 'html');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));




app.get('/api/getUsers',function(req,res){
  res.json(users);
})

  app.post('/api/uploadPhotos', function (req, res, next) {
      console.log("hey");
    var pic1 = req.body.image1.replace(/^data:image\/png;base64,/, "");
    var pic2 = req.body.image2.replace(/^data:image\/png;base64,/, "");
    var pic3 = req.body.image3.replace(/^data:image\/png;base64,/, "");
   
    
    var hashDir = SHA256(pic1+pic2+pic3);
    console.log(__dirname+'/app/uploads/pending/'+hashDir);
    mkdirp(__dirname +'/app/uploads/pending/'+hashDir, function (err) {
      if (err)
      {
        res.json({"code":-1,"message":err})
      }
      else 
      {
        console.log('dir created!')
        require("fs").writeFile(pendingFolder+'/'+hashDir+"/1.png", pic1, 'base64', function(err) {
          console.log(err);
          });
          require("fs").writeFile(pendingFolder+'/'+hashDir+"/2.png", pic2, 'base64', function(err) {
            console.log(err);
          });
          require("fs").writeFile(pendingFolder+'/'+hashDir+"/3.png", pic3, 'base64', function(err) {
            console.log(err);
          });
          res.json({"code":0,"hash":hashDir.toString(),"message":"Pictures are uploaded successfully! they will be verified by admin"})
      }
    
  });
  })
  app.listen(2721, () => {
    console.log('Example app listening on port 2720!')
  })
  app.get('/',function(req,res){
    res.render('index')
})
app.get('/pics',function(req,res){
  res.render('pics')
})
app.get('/admin',function(req,res){
 
  res.render('admin');
})

app.get('/dashboard',function(req,res){
  res.render('dashboard')
})

app.get('/acceptedUsers',function(req,res){
  res.render('acceptedUsers')
})
app.get('/result',function(req,res){
  res.render('result')
})


app.get('/api/getPics',function(req,res){
  var tab = [];
  fs.readdirSync(pendingFolder).forEach(file => {
        tab.push(file);
    });
  
  res.json({"tableau":tab});

})

//RAYEN

app.get('/api/getAcceptedUsers',function(req,res){
  var tab = [];

	fs.readdirSync(acceptedFolder).forEach(file => {
		tab.push(file);
});

  res.json({"tableau":tab});

})



app.post('/api/insertUser',function(req,res){
  console.log("hello");
  var cin = req.body.cin;
  var hash = req.body.hash;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var street = req.body.street;
  var dateOfBirth = req.body.dateOfBirth;
  var province = req.body.province;
  var postalCode = req.body.postalCode;
  console.log(req.body);

  //INSERTING ....
  test = 	usercrud.insertUser.sendTransaction(cin,fname,lname,dateOfBirth,street,province,postalCode,hash, {from : web3.eth.defaultAccounts, gas: "900000"});
	
  if(test)
  {
		var oldPath = pendingFolder+"/"+hash;
		var newPath = acceptedFolder+"/"+hash;
		fs.rename(oldPath, newPath, function (err) {
			if (err) throw err
			console.log('Successfully renamed - AKA moved!')
		})
    res.json({"code":0,"msg":"User inserted successfully!"});
  }
  else
  {
    res.json({"code":-1,"msg":"Operation failed!"})
  }

});

app.post('/api/checkCin',function(req,res){
  var cin = req.body.cin;
 console.log(cin);

	//CHECKING ....
  test = 	usercrud.isUser(parseInt(cin));

  if(!test)
  {
    console.log(test)
    res.json({"code":0,"msg":"User does not exist!","result":test}); //success
  }
  else
  {
    console.log(test)
    res.json({"code":-1,"msg":"User already exists!","result":test}) //nope exists
  }

});

app.post('/api/saveRejection',function(req,res){
  var hash = req.body.hash;
  var rejectionText = req.body.rejectionText;


  const Rejection = sequelize.define('rejection', {
    hash: {
      type: Sequelize.STRING,
      primaryKey: true


    },
    rejectionText: {
      type: Sequelize.STRING
    }
  }, {
    tableName: 'savedRejections'
 });
 
  // force: true will drop the table if it already exists
  const rejection = Rejection.build({"hash": hash, "rejectionText":rejectionText});
  rejection.save().then(() => {
    var savedRejections = []

    Rejection.findAll({
      attributes: ['hash', 'rejectionText']
    }).then(rejection => {
      savedRejections = rejection
      for(let i = 0; i < savedRejections.length ; i++)
          console.log(savedRejections[i].dataValues)
    })
    
  });

  rimraf("app/uploads/"+hash, function () { console.log('done'); });           

//directory deleted
  test = true; //hot 
  if(test)
  {
    res.json({"code":0,"msg":"Rejection saved!"}); //success
  }
  else
  {
    res.json({"code":-1,"msg":"Error!"}) //nope exists
  }

});


app.post('/api/getSpecifiedUser',function(req,res){
  
  var hash = req.body.hash;
  console.log(hash);
 //var test = 	usercrud.insertUser.sendTransaction(1212,"fname","lname","dateOfBirth","street","province",8100,"hash", {from : web3.eth.defaultAccounts, gas: "900000"});
  usercrud.getCinUserByHash(hash,{from : web3.eth.defaultAccounts, gas: "900000"}, function(err,res2){
    //console.log(web3.toAscii(res1[0]))
    if(err)
    {
      console.log(err)
      res.json({"code":-1,"result":"Operation failed!"})
    }
    else
    {
      var cin = res2.toNumber()

      usercrud.getUser(cin,{from : web3.eth.defaultAccounts, gas: "900000"}, function(err,res1){
      var fname = web3.toAscii(res1[0])
      var lname = web3.toAscii(res1[1])
      var dateOfBirth = web3.toAscii(res1[2])
      var street = web3.toAscii(res1[3])
      var province = web3.toAscii(res1[4])
      var postalCode = (res1[5].toNumber())
      res.json({"code":0,"cin":cin , "fname":fname,"lname":lname, "dateOfBirth": dateOfBirth , "street":street ,"province":province , "postalCode":postalCode})

    });

    }

  });
 /* if(test)
  {
		var oldPath = pendingFolder+"/"+hash;
		var newPath = acceptedFolder+"/"+hash;
		fs.rename(oldPath, newPath, function (err) {
			if (err) throw err
			console.log('Successfully renamed - AKA moved!')
		})
    res.json({"code":0,"msg":"User inserted successfully!"});
  }
  else
  {
    res.json({"code":-1,"msg":"Operation failed!"})
  }*/

});
