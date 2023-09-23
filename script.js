document.addEventListener("DOMContentLoaded", function() {
  const uploadedImg = document.getElementById("imageInput");
  const showUpload = document.getElementById("uploadedImage");
  const resultImage = document.getElementById("resultImage");
  const previewBtn = document.getElementById("preview");
  const removeBg = document.getElementById("btnRmbg");
  const downloadButton = document.getElementById('downLoad');

  uploadedImg.onchange = function() {
    showUpload.src = URL.createObjectURL(uploadedImg.files[0]);
  };

  previewBtn.addEventListener('click', function() {
    window.open(showUpload.src);
  });

  removeBg.addEventListener('click', function(event) {
    event.preventDefault();

    var apiEndpoint = 'https://api.remove.bg/v1.0/removebg';
    var apiKey = 'pGgpGuhT8mxBo8bg4Xj23HMc';
    var formData = new FormData();
    formData.append('image_file', uploadedImg.files[0]);
    formData.append('size', 'auto');

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey
      },
      body: formData
    })
    .then(function(response) {
      // Check if the response was successful
      if (response.ok) {
        console.log(response);
        // Convert the response to blob
        return response.blob();
      } else {
        throw new Error('API request failed.');
      }
    })
    .then(function(imageBlob) {
      // Create a temporary URL for the image blob
      var imageUrl = URL.createObjectURL(imageBlob);

      // Set the source of the result image
      resultImage.src = imageUrl;
      
      // Create a temporary anchor element for download
      var downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.setAttribute('download', 'background_removed_image.png');
      downloadLink.style.display = 'none';

      // Append the anchor element to the document body
      document.body.appendChild(downloadLink);

      // Simulate a click event to trigger the download
      downloadButton.onclick= ()=>{
        downloadLink.click();
      }

      // Clean up by removing the temporary anchor element
      document.body.removeChild(downloadLink);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  });
});