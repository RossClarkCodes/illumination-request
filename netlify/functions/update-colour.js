// Netlify serverless function to update global colour
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { colour } = JSON.parse(event.body);
    
    if (!colour || !colour.startsWith('#')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid colour format' })
      };
    }

    // Update all HTML files with the new colour
    const fs = require('fs');
    const path = require('path');
    
    const files = ['2184x600.html', '1920x1080.html', '9120x112.html', '4800x72.html'];
    
    files.forEach(filename => {
      const filePath = path.join(__dirname, '..', '..', filename);
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace the colour variable
        content = content.replace(
          /window\.ILLUMINATION_COLOUR = '[^']*'/g,
          `window.ILLUMINATION_COLOUR = '${colour}'`
        );
        fs.writeFileSync(filePath, content);
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        message: `Colour updated to ${colour}`,
        colour: colour
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
