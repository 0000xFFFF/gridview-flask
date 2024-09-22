// Fetch the list of media files from the server
fetch('/media-list')
    .then(response => response.json())
    .then(directories => {
        const div_dirs = document.getElementById('media-dirs');
        directories.forEach(dir => {
            
            let dir_path = dir.path === '.' ? '' : dir.path + '/';
            
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
                let name = file['name'];
                const div_file = document.createElement('div');
                div_file.className = 'media-file';

                // info
                let div_file_info = document.createElement('p');
                div_file_info.className = 'media-file-info';
                div_file_info.textContent = `${file.width}x${file.height}  ${file.name}`;
                div_file.addEventListener('mouseover', function(event) {
                    div_file_info.style.display = 'block';
                    div_file_info.style.opacity = '1'; // Make it visible
                });
                div_file.addEventListener('mouseleave', function(event) {
                    div_file_info.style.opacity = '0'; // Hide with transition
                    setTimeout(() => {
                        div_file_info.style.display = 'none'; // Hide after transition
                    }, 300); // Match this to the duration of the CSS transition
                })
                div_file.append(div_file_info);

                // content
                if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.gif')) {
                    const img = document.createElement('img');
                    img.src = `/media/${dir_path}${name}`;
                    img.onerror = () => {
                        img.alt = "Image failed to load";
                        //img.src = "/path/to/placeholder/image.png"; // maybe add placeholder
                    };
                    div_file.appendChild(img);
                }
                else if (name.endsWith('.mp4') || name.endsWith('.webm') || name.endsWith('.mov') || name.endsWith('.avi')) {
                    const video = document.createElement('video');
                    video.src = `/media/${dir_path}${name}`;
                    video.controls = true;
                    div_file.appendChild(video);
                }
                else {
                    // todo: handle other file types maybe?
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
