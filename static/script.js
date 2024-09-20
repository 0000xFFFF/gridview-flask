// Fetch the list of media files from the server
fetch('/media-list')
    .then(response => response.json())
    .then(directories => {
        const mediaContainer = document.getElementById('media-container');
        directories.forEach(dir => {
            // Create an H1 element for each directory
            const dirHeader = document.createElement('h1');
            dirHeader.textContent = dir.path === '.' ? '/' : `${dir.path}`;
            mediaContainer.appendChild(dirHeader);

            // Create media items for each file in the directory
            dir.files.forEach(file => {
                const mediaItem = document.createElement('div');
                mediaItem.className = 'media-item';

                // Create image or video element based on file type
                if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif')) {
                    const img = document.createElement('img');
                    img.src = `/media/${dir.path === '.' ? '' : dir.path + '/'}${file}`;
                    mediaItem.appendChild(img);
                } else if (file.endsWith('.mp4') || file.endsWith('.mov') || file.endsWith('.avi')) {
                    const video = document.createElement('video');
                    video.src = `/media/${dir.path === '.' ? '' : dir.path + '/'}${file}`;
                    video.controls = true;
                    mediaItem.appendChild(video);
                }

                mediaContainer.appendChild(mediaItem);
            });
        });
    })
    .catch(error => console.error('Error fetching media list:', error));