// Netlify serverless function to store/get global colour
const fs = require('fs');
const path = require('path');

// File path for storing the colour
const COLOUR_FILE = path.join(__dirname, '..', '..', 'current-colour.json');

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Read current colour from file
      let colour = '#FF0000'; // default
      
      try {
        if (fs.existsSync(COLOUR_FILE)) {
          const data = fs.readFileSync(COLOUR_FILE, 'utf8');
          const parsed = JSON.parse(data);
          colour = parsed.colour || '#FF0000';
        }
      } catch (err) {
        console.log('Error reading colour file:', err);
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ colour: colour })
      };
    }

    if (event.httpMethod === 'POST') {
      const { colour } = JSON.parse(event.body);
      
      if (!colour || !colour.startsWith('#')) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ error: 'Invalid colour format' })
        };
      }

      // Write colour to file
      try {
        const colourData = { colour: colour, timestamp: new Date().toISOString() };
        fs.writeFileSync(COLOUR_FILE, JSON.stringify(colourData));
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ 
            success: true, 
            message: `Colour updated to ${colour}`,
            colour: colour
          })
        };
      } catch (err) {
        console.error('Error writing colour file:', err);
        return {
          statusCode: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ error: 'Failed to save colour' })
        };
      }
    }

    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
