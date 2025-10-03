# Color Generator

A simple web application that generates solid color images in various board sizes.

## Features

- Set a color using a color picker or hex input
- Generate images in predefined board sizes:
  - 2184x600
  - 1920x1080
  - 9120x112
  - 4800x72
- Color persists across requests using Flask sessions
- Clean, responsive web interface

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Run the application:
```bash
python app.py
```

2. Open your browser and go to `http://localhost:8000`

3. Set your desired color using the color picker or by typing a hex code

4. Click on any board size to generate and view the color image

## API Endpoints

- `GET /` - Main page with color input form
- `POST /set_color` - Set the current color
- `GET /<size>` - Generate color image for specific board size (e.g., `/1920x1080`)

## Example URLs

- `http://localhost:8000/1920x1080` - Generate 1920x1080 image
- `http://localhost:8000/2184x600` - Generate 2184x600 image
- `http://localhost:8000/9120x112` - Generate 9120x112 image
- `http://localhost:8000/4800x72` - Generate 4800x72 image

The color will be maintained across all requests until changed on the main page.
