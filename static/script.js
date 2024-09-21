// Fetch the list of media files from the server
fetch('/media-list')
    .then(response => response.json())
    .then(directories => {
        const mediaDirs = document.getElementById('media-dirs');
        directories.forEach(dir => {
            
            const mediaDir = document.createElement('div');
            mediaDir.className = 'media-dir';

            // Create an H1 element for each directory
            const h1 = document.createElement('h1');
            h1.textContent = dir.path === '.' ? '/' : `${dir.path}`;
            mediaDir.appendChild(h1);

            // Create media items for each file in the directory
            dir.files.forEach(file => {
                const mediaFile = document.createElement('div');
                mediaFile.className = 'media-file';

                // Create image or video element based on file type
                if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif')) {
                    const img = document.createElement('img');
                    img.src = `/media/${dir.path === '.' ? '' : dir.path + '/'}${file}`;
                    mediaFile.appendChild(img);
                } else if (file.endsWith('.mp4') || file.endsWith('.mov') || file.endsWith('.avi')) {
                    const video = document.createElement('video');
                    video.src = `/media/${dir.path === '.' ? '' : dir.path + '/'}${file}`;
                    video.controls = true;
                    mediaFile.appendChild(video);
                }

                mediaDir.appendChild(mediaFile);
            });
            mediaDirs.append(mediaDir);
        });
    })
    .catch(error => console.error('Error fetching media list:', error));