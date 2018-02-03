var mysql = require('mysql');

exports.view = function(req,res){            // VIEW TICKET

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'temp',
    password: '1234',
    database: '395project'
  });
  
  connection.connect(function(err) {
    
    var ticketData;
    if (err) throw err

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
    user: 'temp',
    password: '1234',
    database: '395project'
  });
  
  connection.connect(function(err) {
    
    var ticketData;
    if (err) throw err

    
    if (err) throw err
      //getting the ticket for the user
      connection.query('SELECT CallID, Category,CustID, CallStatus, Symptoms, TempDate FROM 395project.calllog WHERE CallID="' + req.params.ticketid + '";', function(err, result) {
        if (err) throw err

            ticketData = JSON.stringify(result);

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
    user: 'temp',
    password: '1234',
    database: '395project'
  });
  
  connection.connect(function(err) {
    
    var ticketData;

    
    if (err) throw err
      //getting the ticket that the user clicked on
      connection.query('SELECT CallID, Category,CustID, CallStatus, Symptoms, TempDate FROM 395project.calllog WHERE CallID="' + req.params.ticketid + '";', function(err, result) {
        if (err) throw err

            ticketData = JSON.stringify(result);

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
    user: 'temp',
    password: '1234',
    database: '395project'
  });
  
  connection.connect(function(err) {
    
    var allTickets, openTickets, closedTickets;
    if (err) throw err

      //getting all of the closed tickets, except for hr
      connection.query('SELECT CallID, Category, CallStatus, Symptoms, TempDate, Resolve FROM 395project.calllog WHERE CustID="' + req.user.id + '" and CallStatus="Closed" and Category!="HRS" or ( CustID="' + req.user.id + '" and Resolve="1" and Category!="HRS");', function(err, result) {
        if (err) throw err
            closedTickets = JSON.stringify(result);

    });

    if (err) throw err
      //Getting the open tickets and non resolved tickets
      connection.query('SELECT CallID, Category, CallStatus, Symptoms, TempDate FROM 395project.calllog WHERE CustID="' + req.user.id + '" and CallStatus="Open" and Resolve is null and Category!="HRS"', function(err, result) {
        if (err) throw err
            openTickets = JSON.stringify(result);

    });

    
    if (err) throw err
      //getting all of them
      connection.query('SELECT CallID, Category, CallStatus, Symptoms, TempDate, Resolve FROM 395project.calllog WHERE CustID="' + req.user.id + '" and Category!="HRS";', function(err, result) {
        if (err) throw err
            allTickets = JSON.stringify(result);

            res.render((__dirname + '/../../public/views/mytickets.ejs'), {
            allTickets:allTickets,
            openTickets:openTickets,
            closedTickets:closedTickets,
            username:req.user.username,
            
            });
    });

    connection.end();
  });
}
