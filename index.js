const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()


app.use(express.json())
// app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin : "https://scoreboard-frontend-delta.vercel.app"
}))

app.get("/event", (req, res) => {
    const headers = {
        'Content-type' : 'text/event-stream',
        'Cache-Control' : 'no-cache',
        'Connection' : 'keep-alive'
    }
    res.writeHead(200, headers)

    let players = [
       {
            player_Id : 1,
            score : 90
        },{
            player_Id : 2,
            score : 70
        },{
            player_Id : 3,
            score : 96
        },{
            player_Id : 4,
            score : 100
        }, {
            player_Id : 5,
            score : 80
        },{
            player_Id : 6,
            score : 90
        },{
            player_Id : 7,
            score : 70
        },{
            player_Id : 8,
            score : 96
        },{
            player_Id : 9,
            score : 100
        }, {
            player_Id : 10,
            score : 80
        },
    ]
    // const data = JSON.stringify({ date: new Date().toISOString() });
    let index = 0;
    const dataSend = setInterval(() => {
        if(index < players.length){
            res.write('event: add\n')
            res.write(`data: ${JSON.stringify(players[index++])}\n\n`);
        }else{
            clearInterval(dataSend);
        }
    }, 1000)

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

    const dataUpdate = setInterval(() => {
        if(index >= players.length){
            let  ind = Math.floor(Math.random() * 10);
            // console.log(ind, "index")
            players[ind].score = `${getRndInteger(50,100)} `
            res.write('event: update\n')
            res.write(`data: ${JSON.stringify(players[ind])}\n\n`)
        }

    }, 2000)

    // const topper = setInterval(() => {
    //     let player_Id = 0
    //     let max= -1
    //     players.map(player => {
    //         if(player.score > max){
    //             max = player.score
    //             player_Id = player.player_Id
    //         } 
    //     })
    //     res.write('event: topper\n')
    //     res.write(`data: ${JSON.stringify({player_Id, max})}\n\n`)
    // }, 900)

    res.on('close', () => {
        clearInterval(dataSend);
        clearInterval(dataUpdate);
        console.log('Client disconnected');
      });
    
})


app.listen(8000, () => {
    console.log("server is up and running on port number 8000")
})