// settings here
let setting_hoverZoom = false;

function topright_controls_setup() {
    
    let topbar = document.getElementById('topbar');
    let prevScrollPos = window.scrollY;

    window.onscroll = function() {
        const currentScrollPos = window.scrollY;
        topbar.style.top = prevScrollPos > currentScrollPos ?  "0" : "-60px";
        prevScrollPos = currentScrollPos;
    };

    let setting_cb_hoverZoom = document.getElementById('setting_cb_hoverZoom')
	setting_cb_hoverZoom.checked = setting_hoverZoom;
	setting_cb_hoverZoom.addEventListener("change", function() { setting_hoverZoom = !setting_hoverZoom; });
}

topright_controls_setup();

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
                const name = file['name'];
                const div_file = document.createElement('div');
                div_file.className = 'media-file';

                // info
                const div_file_info = document.createElement('p');
                div_file_info.className = 'media-file-info';
                div_file_info.textContent = `${file.width}x${file.height}  ${file.name}`;
                div_file.addEventListener('mouseover', function() {
                    div_file_info.style.display = 'block';
                    div_file_info.style.opacity = '1'; // Make it visible
                });
                div_file.addEventListener('mouseleave', function() {
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

                    // image popup on hover
                    const img_popup = document.createElement('img');
                    img_popup.className = 'media-file-popup';
                    document.body.appendChild(img_popup);
                    div_file.addEventListener('mouseenter', function () {
                        if (!setting_hoverZoom) { return; }
                        img_popup.src = img.src;
                        img_popup.style.display = 'block';
                    });
                    div_file.addEventListener('mouseleave', function () {
                        img_popup.src = '';
                        img_popup.style.display = 'none';
                    })
                }
                else if (name.endsWith('.mp4') || name.endsWith('.webm') || name.endsWith('.mov') || name.endsWith('.avi')) {
                    const video = document.createElement('video');
                    video.src = `/media/${dir_path}${name}`;
                    video.controls = true;
                    div_file.appendChild(video);
                    
                    // TODO: make thumbnail instead -- when clicked turn it into video
                }
                else {
                    // TODO: handle other file types maybe?
                }

                div_dir_files.appendChild(div_file);
            });
            div_dir.append(div_dir_files);
            div_dirs.append(div_dir);
        });
    })
    .catch(error => console.error('Error fetching media list:', error));
