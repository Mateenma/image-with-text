const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

try {
  // Create a canvas with a specified width and height
  const canvas = createCanvas(640, 480);
  const context = canvas.getContext('2d');

  // Load an image onto the canvas
  loadImage('images/bg_img3.jpg').then((image) => {
    // Draw the image on the canvas
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  
   // Load the white frame PNG
   loadImage('images/black_frame.png').then((frameImage) => {
    // Draw the frame image on the canvas
    context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

  
    // Set font properties
    context.font = '29px "Times New Roman"';

    // Determine text color based on the presence of the white frame image
    // const isWhiteFrame = frameImage.width > 0 && frameImage.height > 0;
    // context.fillStyle = isWhiteFrame ?  'black': 'white';

    context.fillStyle = 'white';
    context.textAlign = 'left';
    context.textBaseline = 'top';

    // Your text content
    const text = "This is a long text that needs line breaks. This is a long text that needs line breaks. This is a long text that needs line breaks.";

    // Set the maximum width for each line
    const maxWidth = 500;

    // Maximum number of lines to show
    const maxLines = 3;

    // Truncate text indicator
    const truncationIndicator = '...';

    // Function to add line breaks to text
    function addLineBreaks(text, maxWidth, maxLines) {
      let words = text.split(' ');
      let currentLine = '';
      let lines = [];

      words.forEach((word) => {
        const testLine = currentLine + word + ' ';
        const testWidth = context.measureText(testLine).width;
        // console.log(testWidth);
        // console.log(testLine);
        // if (testWidth > maxWidth || lines.length === maxLines) {
        //   return;
        // }

        if (testWidth > maxWidth) {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      });

      lines.push(currentLine.trim());

      // Truncate text if it exceeds the specified number of lines
      if (lines.length > maxLines) {
        const lastLineIndex = maxLines - 3;
        const truncatedLine = lines[lastLineIndex].slice(0, -truncationIndicator.length) + truncationIndicator;
        lines = lines.slice(0, maxLines - 3).concat([truncatedLine]);
      }

      return lines.join('\n');
    }

    // Add text with line breaks to the canvas
    const wrappedText = addLineBreaks(text, maxWidth, maxLines);
    context.fillText(wrappedText, 90, 130);

    // Save the canvas as an image
    const buffer = canvas.toBuffer();
    fs.writeFileSync('images/output.jpg', buffer);

    console.log('Image successfully created!');

  });
  });
} catch (error) {
  console.error('An error occurred:', error);
}
