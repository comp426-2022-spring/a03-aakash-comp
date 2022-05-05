
const express = require('express')
const app = express()

//read the port number here through CLI

const args = require('minimist')(process.argv.slice(2))

args['port']

const port = args.port || process.env.PORT || 5000


//start server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});




app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

app.get('/app/flip/', (req, res) => {
    result = coinFlip()
   
    res.status(200).json({"flip": result})

});

app.get('/app/flips/:number', (req, res) => {
    
    result = coinFlips(req.params.number)

    res.status(200).json({"raw": result, "summary" : countFlips(result)})

});


app.get('/app/flip/call/heads', (req, res) => {
	
    result = flipACoin("heads")

    res.status(200).json(result)
});

app.get('/app/flip/call/tails', (req, res) => {
	
    result = flipACoin("tails")
    res.status(200).json(result)
});

//default endpoint
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
}); 


//functions
function coinFlip() {
    var num = Math.floor(Math.random() * 2)
    if(num == 0){
      return "heads"
    }
    else{
      return "tails"
    }
  }
  
function coinFlips(flips) {
    var flip = flips
    const list = []
    var index = 0;
  
    while(flip != 0){
      list[index] = coinFlip();
      flip--
      index++
    }
    return list
  
  }

function countFlips(array) {
    var num_heads = 0;
    var num_tails = 0;
  
    for(const results of array){
      if(results == "heads"){
        num_heads++
      }
      else{
        num_tails++
      }
    }
    return {"heads": num_heads, "tails" : num_tails}
  
  }
  
function flipACoin(call) {
    var result = coinFlip()
    if(result == call){
      return {"call": call, "flip": result, "result": 'win'}
    }
    else{
      return {"call": call, "flip": result, "result": 'lose'}
    }
  
  }