from flask import Flask, render_template, request, session, send_file
from PIL import Image
import io
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this'

# Board sizes as requested
BOARD_SIZES = {
    '2184x600': (2184, 600),
    '1920x1080': (1920, 1080),
    '9120x112': (9120, 112),
    '4800x72': (4800, 72)
}

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_color_image(width, height, color):
    """Create a solid color image with specified dimensions"""
    rgb_color = hex_to_rgb(color)
    image = Image.new('RGB', (width, height), rgb_color)
    return image

@app.route('/')
def index():
    """Main page with color input form"""
    current_color = session.get('current_color', '#FF0000')
    return render_template('index.html', current_color=current_color, board_sizes=BOARD_SIZES.keys())

@app.route('/set_color', methods=['POST'])
def set_color():
    """Set the current color in session"""
    color = request.form.get('color', '#FF0000')
    session['current_color'] = color
    return render_template('index.html', current_color=color, board_sizes=BOARD_SIZES.keys())

@app.route('/<size>')
def generate_image(size):
    """Generate color image for specific board size"""
    if size not in BOARD_SIZES:
        return "Invalid board size", 404
    
    current_color = session.get('current_color', '#FF0000')
    width, height = BOARD_SIZES[size]
    
    # Create the image
    image = create_color_image(width, height, current_color)
    
    # Save to bytes
    img_io = io.BytesIO()
    image.save(img_io, format='PNG')
    img_io.seek(0)
    
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
