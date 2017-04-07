var mysql = require('mysql');

exports.view = function(req,res){            // VIEW TICKET

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: '395project'
  });
  
  connection.connect(function(err) {
    
    var ticketData;
    if (err) throw err
      console.log('You are now connected...')
      //getting the edit log for the ticket
    connection.query('SELECT EditID, Edit, EDate FROM 395project.edits WHERE CallID="' + req.params.ticketid + '";', function(err, result) {
        if (err) throw err
            editVar = JSON.stringify(result);
          
    });
    if (err) throw err
      //Getting the ticket from the database that the user clicked on
      connection.query('SELECT CallID, Category, CallStatus, Symptoms, TempDate, CustID FROM 395project.calllog WHERE CallID="' + req.params.ticketid + '";', function(err, result) {
        if (err) throw err

            ticketData = JSON.stringify(result);
            console.log(result[0].CallID);
            console.log(req.params.ticketid);
            if(req.user.id == result[0].CustID){
            res.render((__dirname + '/../../public/views/viewticket.ejs'), {
            data:ticketData,
            edits:editVar,
            cid:req.params.ticketid,
            username:req.user.username,  
            });
    }
    else{
      res.redirect(('../../logout'));
      console.log("Stop messing with the url cam");
    }
  });
    connection.end();
  });

};



exports.edit = function(req,res){                 // EDIT TICKET
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: '395project'
  });
  
  connection.connect(function(err) {
    
    var ticketData;
    if (err) throw err
      console.log('You are now connected...')
    
    if (err) throw err
      //getting the ticket for the user
      connection.query('SELECT CallID, Category,CustID, CallStatus, Symptoms, TempDate FROM 395project.calllog WHERE CallID="' + req.params.ticketid + '";', function(err, result) {
        if (err) throw err

            ticketData = JSON.stringify(result);
            console.log(req.params.ticketid);
            console.log(ticketData);
            if(req.user.id == result[0].CustID){
            res.render((__dirname + '/../../public/views/editticket.ejs'), {
            data:ticketData,
            username:req.user.username,  
            });
          }
      else{
      res.redirect(('../../logout'));
      console.log("Stop messing with the url cam");
    }
    });
    connection.end();
  });
};

exports.resolve = function(req,res){
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: '395project'
  });
  
  connection.connect(function(err) {
    
    var ticketData;
    if (err) throw err
      console.log('You are now connected...')
    
    if (err) throw err
      //getting the ticket that the user clicked on
      connection.query('SELECT CallID, Category,CustID, CallStatus, Symptoms, TempDate FROM 395project.calllog WHERE CallID="' + req.params.ticketid + '";', function(err, result) {
        if (err) throw err

            ticketData = JSON.stringify(result);
            console.log(req.params.ticketid);
            console.log(ticketData);
            if(req.user.id == result[0].CustID){
            res.render((__dirname + '/../../public/views/resolveticket.ejs'), {
            data:ticketData,
            username:req.user.username,  
            });
          }
            else{
              res.redirect(('../../logout'));
              console.log("Stop messing with the url cam");
            }
    });
    connection.end();
  });
};

exports.mytickets = function(req, res){
  
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: '395project'
  });
  
  connection.connect(function(err) {
    
    var myVar, myVar2, myVar3;
    if (err) throw err
      console.log('You are now connected...')
      //getting all of the closed tickets, except for hr
      connection.query('SELECT CallID, Category, CallStatus, Symptoms, TempDate, Resolve FROM 395project.calllog WHERE CustID="' + req.user.id + '" and CallStatus="Closed" and Category!="HR" or ( CustID="' + req.user.id + '" and Resolve="1" and Category!="HR");', function(err, result) {
        if (err) throw err
            myVar = JSON.stringify(result);
            console.log(myVar);
    });
    console.log('closed');
    if (err) throw err
      //Getting the open tickets and non resolved tickets
      connection.query('SELECT CallID, Category, CallStatus, Symptoms, TempDate FROM 395project.calllog WHERE CustID="' + req.user.id + '" and CallStatus="Open" and Resolve is null and Category!="HR"', function(err, result) {
        if (err) throw err
            myVar2 = JSON.stringify(result);
            console.log(myVar2);
    });
    console.log('open');
    
    if (err) throw err
      //getting all of them
      connection.query('SELECT CallID, Category, CallStatus, Symptoms, TempDate, Resolve FROM 395project.calllog WHERE CustID="' + req.user.id + '" and Category!="HR";', function(err, result) {
        if (err) throw err
            myVar3 = JSON.stringify(result);
            console.log("This is my var\n\n\n" + myVar);
            res.render((__dirname + '/../../public/views/mytickets.ejs'), {
            allTickets:myVar3,
            openTickets:myVar2,
            closedTickets:myVar,
            username:req.user.username,
            
            });
    });
    console.log('all');
    connection.end();
  });
}