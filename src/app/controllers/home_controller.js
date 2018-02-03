var mysql = require('mysql');

exports.view = function(req,res){
  res.send("You entered " + req.params.ticketid + " right? if it isnt please tell Jack and he can fix it and then things will work and he wont be sad.");
};

exports.edit = function(req,res){
  res.send("Congrats, you've found the secret page where ticket editing will go. " + req.params.ticketid + " That was your number right?");
};

exports.resolve = function(req,res){
  res.send("Congrats, you've found the secret page where ticket resolving will go." + req.params.ticketid + " Sick number bro.");
};

exports.home = function(req, res){
  
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'temp',
    password: '1234',
    database: '395project'
  });
  
  connection.connect(function(err) {
    var branch;
    var announ;
    var openTickets;
    if (err) throw err
      //Get the announcements
    connection.query('SELECT AID, Title, Announcement, SubmittedDate from 395project.announcements Order by AID Desc Limit 3;', function(err, announcementsRes){
    
    if (err) throw err
      //Get the open tickets for the user
      connection.query('SELECT CallID, Category, CallStatus, Symptoms, TempDate FROM 395project.calllog WHERE CallStatus= "Open" and CustID="' + req.user.id + '" and resolve is null Order By TempDate Desc LIMIT 5;', function(err, result) {
        
        if (err) throw err

          //Get the branch tickets
          var connectionString = changeBranchString(req.user.Site);
            connection.query(connectionString, function(err, branchResult) {
            announ = JSON.stringify(announcementsRes);
            openTickets = JSON.stringify(result);
            branch = JSON.stringify(branchResult);
            res.render((__dirname + '/../../public/views/home.ejs'), {
            
            openTickets:openTickets,
            branchTickets:branch,
            username:req.user.username,
            announcements:announ,

            });
            });
          connection.end();
    });
  });

  });
}
function changeBranchString(Site){
  var str = "";
  if (Site == "IT"){
    str = 'Select CallID, Category, CallStatus, Symptoms, TempDate From 395project.calllog where CallStatus = "Open" and resolve is null Order By TempDate Desc Limit 5;'
  }
  else{
   str = 'SELECT CallID, Category, CallStatus, Symptoms, TempDate FROM 395project.calllog WHERE CallStatus = "Open" and Site="' + Site + '" and resolve is null Order By TempDate Desc LIMIT 5;';
  }
  return str;
}
