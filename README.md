# Illumination Request Colour Generator

A web application for generating solid color images in specific board sizes for illumination requests.

## Features

- Choose any color using a color picker or hex input
- Generate images in four predefined board sizes:
  - 2184x600 pixels
  - 1920x1080 pixels  
  - 9120x112 pixels
  - 4800x72 pixels
- Preview images before downloading
- Download images as PNG files

## How to Deploy on GitHub Pages

1. **Create a GitHub repository** for your project
2. **Upload all files** to your repository (just the `index.html` file is needed)
3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
4. **Access your site** at `https://yourusername.github.io/your-repository-name`

## Usage

1. Open the web page
2. Use the color picker or type a hex color code (e.g., #FF0000)
3. Click "Apply Colour" to set your color
4. Click on any board size to generate a preview
5. Click "Download Image" to save the full-size image

## Technical Details

- Pure HTML, CSS, and JavaScript (no server required)
- Uses HTML5 Canvas for image generation
- Client-side image processing and download
- Responsive design that works on desktop and mobile

## File Structure

```
├── index.html          # Main application file
└── README.md          # This file
```

The application is now completely static and ready for GitHub Pages deployment!