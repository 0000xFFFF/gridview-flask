// Fetch the list of media files from the server
fetch('/media-list')
    .then(response => response.json())
    .then(directories => {
        const div_dirs = document.getElementById('media-dirs');
        directories.forEach(dir => {
            
            const div_dir = document.createElement('div');
            div_dir.className = 'media-dir';
            
            const div_dir_head = document.createElement('div');
            div_dir_head.className = 'media-dir-head';
            const h1 = document.createElement('h1');
            h1.textContent = dir.path === '.' ? '/' : `${dir.path}`;
            div_dir_head.appendChild(h1);
            div_dir.appendChild(div_dir_head)

            const div_dir_files = document.createElement('div');
            div_dir_files.className = 'media-dir-files';

            dir.files.forEach(file => {
                const div_file = document.createElement('div');
                div_file.className = 'media-file';

                if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif')) {
                    const img = document.createElement('img');
                    img.src = `/media/${dir.path === '.' ? '' : dir.path + '/'}${file}`;
                    div_file.appendChild(img);
                } else if (file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.mov') || file.endsWith('.avi')) {
                    const video = document.createElement('video');
                    video.src = `/media/${dir.path === '.' ? '' : dir.path + '/'}${file}`;
                    video.controls = true;
                    div_file.appendChild(video);
                }

                div_dir_files.appendChild(div_file);
            });
            div_dir.append(div_dir_files);
            div_dirs.append(div_dir);
        });
    })
    .catch(error => console.error('Error fetching media list:', error));


// // might need in the future idk
// document.addEventListener("DOMContentLoaded", function () {
//     const mediaDirFiles = document.querySelector('.media-dir-files');
//     const mediaFiles = document.querySelectorAll('.media-file');
//     function adjustMasonry() {
//         let columnHeights = [];
//         mediaFiles.forEach(file => {
//             const media = file.querySelector('img, video');
//             if (media.complete) {
//                 const height = media.clientHeight;
//                 file.style.gridRowEnd = `span ${Math.ceil(height / 10)}`;
//             } else {
//                 media.onload = () => {
//                     const height = media.clientHeight;
//                     file.style.gridRowEnd = `span ${Math.ceil(height / 10)}`;
//                 };
//             }
//         });
//     }
//     // Adjust on load and on window resize
//     window.addEventListener('load', adjustMasonry);
//     window.addEventListener('resize', adjustMasonry);
// });
