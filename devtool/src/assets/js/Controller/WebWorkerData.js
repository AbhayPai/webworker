(function getOpenSourceData() {
    let Xhr = new XMLHttpRequest();

    function sendData(data) {
        setTimeout(function() {
            postMessage(data);
        }, 25);
    }

    Xhr.open(
        'GET',
        'https://jsonplaceholder.typicode.com/posts',
    );

    Xhr.send();

    Xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            sendData({
                action: 'POSTS',
                posts: JSON.parse(Xhr.responseText)
            });
        }
    };
})();
