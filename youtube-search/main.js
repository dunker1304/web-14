{/* <a class="result col-md-12" href="https://www.youtube.com/watch?v=${videoId}?autoplay=true" target="_blank">
    <img src="${thumbnailsUrl}" alt="">
    <div class="video_info">
        <h2 class="title">${title}</h2>
        <p class="description">${description}</p>
        <span>View >></span>
    </div>
</a> */}

let pageToken = '';
let isLoadingMore = false;

$(document).ready(function() {
    $('#search').on('submit', function(event) {
        event.preventDefault();
        
        const keyword = $('#keyword').val();

        $('#result-list').empty();

        getVideoItem(keyword);
    });

    $(window).on('scroll', function() {
        if($(document).height() - ($(window).height() + $(window).scrollTop()) < 1000) {
            const keyword = $('#keyword').val();
            if(!isLoadingMore && pageToken !== '') {
                isLoadingMore = true;
                getVideoItem(keyword);
            }
        }
    });
});

function getVideoItem(keyword) {
    console.log(pageToken);
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=${keyword}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${pageToken}`,
        type: 'GET',
        success: function(data) {
            if(data.items && data.items.length > 0) {
                // for(let i = 0; i < data.items.length; i++) {
                //     let videoItem = data.items[i];
                    // $('#result-list').append(`
                    //     <a class="result col-md-12" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true" target="_blank">
                    //         <img src="${data.items[i].snippet.thumbnails.high.url}" alt="">
                    //         <div class="video_info">
                    //             <h2 class="title">${data.items[i].snippet.title}</h2>
                    //             <p class="description">${data.items[i].snippet.description}</p>
                    //             <span>View >></span>
                    //         </div>
                    //     </a>
                    // `);
                // }

                //[2,3,4,5,6,7].filter(item => { return item % 2 !== 0; }) => Lọc array

                let videoListItem = data.items.map(function(videoItem) {
                    return `
                        <a class="result col-md-12" href="https://www.youtube.com/watch?v=${videoItem.id.videoId}?autoplay=true" target="_blank">
                            <img src="${videoItem.snippet.thumbnails.high.url}" alt="">
                            <div class="video_info">
                                <h2 class="title">${videoItem.snippet.title}</h2>
                                <p class="description">${videoItem.snippet.description}</p>
                                <span>View >></span>
                            </div>
                        </a>
                    `;
                });
                $('#result-list').append(videoListItem);

                if(data.nextPageToken) pageToken = data.nextPageToken;

                isLoadingMore = false;
            }
            
            if(data.items.length === 0 || !data.nextPageToken) {
                pageToken = '';

                $('#result-list').append('<h3>No more!</h3>');
            }
        },
        error: function(error) {
            console.log(error);
            isLoadingMore = false;
        }
    });
}