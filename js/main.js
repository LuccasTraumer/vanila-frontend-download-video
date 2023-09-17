const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();
app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/downloadmp3', async (req, res, next) => {
    try {
        var url = req.query.url;
        if(!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }
        let title = 'audio';

        await ytdl.getInfo(url).then(res => {
            title = res.videoDetails.title;
        });

        await ytdl.getBasicInfo(url, {
            format: 'mp4'
        }, (err, info) => {
            if (err) throw err;
            title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
        });

        res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
        ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
        }).pipe(res);

    } catch (err) {
        console.error(err);
    }
});

app.get('/downloadmp4', async (req, res, next) => {
    try {
        let url = req.query.url;
        let resolution = req.query.resolution;
        if(!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }
        let title = 'video';

        await ytdl.getInfo(url).then(res => {
            title = res.videoDetails.title;
        });


        await ytdl.getBasicInfo(url, {
            format: 'mp4'
        }, (err, info) => {
            if (err) throw err;
            title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
        });

        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(url, {
            format: 'mp4',
            filter: 'videoandaudio',
            quality: resolution
        }).pipe(res);

    } catch (err) {
        console.error(err);
    }
});

