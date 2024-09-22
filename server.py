#!/usr/bin/env python


# TODO: add display paging
# TODO: video loading is slow -- maybe cache thumbnails
# TODO: add 'view file page' when file is clicked to see it's details
# TODO: or add file info on hover with mouse
# TODO: add image resize like RES

import os
from flask import Flask, send_from_directory, jsonify
from PIL import Image

dir_script = os.path.dirname(os.path.realpath(__file__))
dir_templates = os.path.join(dir_script, "templates")
dir_static = os.path.join(dir_script, "static")

app = Flask(
    __name__,
    static_url_path='',
    static_folder=dir_static
    )

# Folder to serve media files from
MEDIA_FOLDER = os.getcwd()

exts_images = [
    '.png', '.jpg', '.jpeg', '.gif',
]
exts_videos = [
    '.mp4', ".webm", '.mov', '.avi',
]

exts_media = exts_images + exts_videos

def list_media_files(root, files):
    
    items = []
    for file in files:
        full_file_path = os.path.join(root, file)

        if file.lower().endswith(tuple(exts_images)):
            im = Image.open(full_file_path)
            width, height = im.size
            #media.append(file)
            items.append([width, height, file, full_file_path])
        if file.lower().endswith(tuple(exts_videos)):
            items.append([0, 0, file, full_file_path])
    
    # show biggest files first by WIDTH x HEIGHT
    items.sort(key=lambda x: (x[0], x[1]), reverse=True)

    return [item[2] for item in items]


# Helper function to get all media files recursively
def get_media_files(directory):
    media_files = []
    for root, dirs, files in os.walk(directory):
        relative_path = os.path.relpath(root, MEDIA_FOLDER)
        media_files.append({
            'path': relative_path,
            'files': list_media_files(root, files)
        })
    return media_files


@app.route('/')
def index():
    return send_from_directory(dir_templates, 'index.html')


# Route to serve media files
@app.route('/media/<path:filepath>')
def media(filepath):
    return send_from_directory(MEDIA_FOLDER, filepath)


# Route to get list of all media files recursively
@app.route('/media-list')
def media_list():
    files = get_media_files(MEDIA_FOLDER)
    return jsonify(files)


if __name__ == '__main__':
    app.run(debug=False)
