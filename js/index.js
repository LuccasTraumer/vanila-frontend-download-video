var isResolutionHidden = true;

var resolutionVideo = null;

var optionsHeaders = {
    method: 'POST',
    headers: {"Content-type": "application/json;charset=UTF-8"}
}

function downloadVideo() {
    const url = document.querySelector('.content__input-link').value;

    const dataDownload = {
        url,
        typeFile: isResolutionHidden ? 'mp3' : 'mp4',
        resolutionVideo: resolutionVideo
    };

    optionsHeaders = {...optionsHeaders, body: JSON.stringify(dataDownload)};
    fetch(`http://localhost:4000/download`, optionsHeaders)
        .then(resp => resp.status === 200 ? resp.blob() : Promise.reject('Something wrong!'))
      .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;

          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);

          window.alert('File Downloaded');
          // window.location.href = ``;
    }).catch(error => {
        console.error(error);
        alert('Error to download!');
    }).finally(() => {

    });
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
