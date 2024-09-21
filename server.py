#!/usr/bin/env python


# TODO: add display paging
# TODO: video loading is slow -- maybe cache thumbnails
# TODO: add 'view file page' when file is clicked to see it's details

from flask import Flask, send_from_directory, jsonify
import os

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

extensions = [
    '.png', '.jpg', '.jpeg', '.gif',
    '.mp4', ".webm", '.mov', '.avi',
]


# Helper function to get all media files recursively
def get_media_files(directory):
    media_files = []
    for root, dirs, files in os.walk(directory):
        relative_path = os.path.relpath(root, MEDIA_FOLDER)
        media_files.append({
            'path': relative_path,
            'files': [f for f in files if f.lower().endswith(tuple(extensions))]
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
