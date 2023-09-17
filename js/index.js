var isResolutionHidden = true;

var resolutionVideo = null;

let serverURL = 'http://localhost:4000';

function downloadVideo() {
    const url = document.querySelector('.content__input-link').value;

    const dataDownload = {
        url,
        typeFile: isResolutionHidden ? 'mp3' : 'mp4',
        resolutionVideo: resolutionVideo
    };

    if (isResolutionHidden) {
        downloadMp3(url);
        return;
    }

    downloadMp4(url)
    return;
}

function selectedType(event) {
    isResolutionHidden = event.target.value === 'mp3';
    document.querySelector('.content__selected-resolution').hidden = isResolutionHidden;

    resolutionVideo = isResolutionHidden ? null : resolutionVideo;
    resolutionVideo = !resolutionVideo && !isResolutionHidden ? '720p' : resolutionVideo;
}

function selectedResolution(event) {
    resolutionVideo = event.target.value;
}

async function downloadMp3(query) {
    await fetch(`${serverURL}/downloadmp3?url=${query}`)
        .then(res => {
            var a = document.createElement('a');
            a.href = `${serverURL}/downloadmp3?url=${query}`;
            a.setAttribute('download', '');
            a.click();
    }).catch(error => {
        alert("Invalid url", error);
    });
}

async function downloadMp4(query) {
    await fetch(`${serverURL}/downloadmp4?url=${query}`)
        .then(res => {
            var a = document.createElement('a');
            a.href = `${serverURL}/downloadmp4?url=${query}`;
            a.setAttribute('download', '');
            a.click();
    }).catch(error => {
        alert('Invalid url', error);
    });
}
