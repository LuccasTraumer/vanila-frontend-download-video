const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');


const app = express();
app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});
app.use(cors());
app.use(express.json());

app.post('/download', (req,res) => {
    var URL = req.body.url;
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');

    ytdl(URL, {
        format: req.body.typeFile
    }).pipe(res);
})
