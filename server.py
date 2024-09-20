#!/usr/bin/env python

from flask import Flask, request, send_from_directory, jsonify
import os

app = Flask(__name__)

# Folder to serve media files from
MEDIA_FOLDER = 'media'

# Ensure the media folder exists
if not os.path.exists(MEDIA_FOLDER):
    os.makedirs(MEDIA_FOLDER)

# Helper function to get all media files recursively
def get_media_files(directory):
    media_files = []
    for root, dirs, files in os.walk(directory):
        relative_path = os.path.relpath(root, MEDIA_FOLDER)
        media_files.append({
            'path': relative_path,
            'files': [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.mp4', '.mov', '.avi'))]
        })
    return media_files

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')

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
    app.run(debug=True)

