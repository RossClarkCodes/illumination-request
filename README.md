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

## Deployment

### Railway (Recommended - Free)

1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `illumination-request` repository
4. Railway will automatically detect the Flask app and deploy it
5. Your app will be available at a Railway-provided URL (e.g., `https://your-app-name.railway.app`)

### Render (Alternative - Free)

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `python app.py`
6. Deploy!

### Local Development

```bash
git clone https://github.com/RossClarkCodes/illumination-request.git
cd illumination-request
pip install -r requirements.txt
python app.py
```

Then open `http://localhost:8000` in your browser.
