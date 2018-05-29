
console.log("hey")
// document.addEventListener('DOMContentLoaded', function () {

//     // References to all the element we will need.
//     var video1 = document.querySelector('#camera-stream1'),
//         image1 = document.querySelector('#snap1'),
//         take_photo_btn1 = document.querySelector('#take-photo1'),
//         delete_photo_btn1 = document.querySelector('#delete-photo1');
//     var video2 = document.querySelector('#camera-stream2'),
//         image2 = document.querySelector('#snap2'),
//         take_photo_btn2 = document.querySelector('#take-photo2'),
//         delete_photo_btn2 = document.querySelector('#delete-photo2');
//     var video3 = document.querySelector('#camera-stream3'),
//         image3 = document.querySelector('#snap3'),
//         take_photo_btn3 = document.querySelector('#take-photo3'),
//         delete_photo_btn3 = document.querySelector('#delete-photo3');
            
//     console.log('hey')
//     var start_camera = document.querySelector('#start-camera');
//     var controls = document.querySelector('.controls');
//     console.log("lol" +controls);
    
//     var error_message = document.querySelector('#error-message');


//         //we will need 


//     // The getUserMedia interface is used for handling camera input.
//     // Some browsers need a prefix so here we're covering all the options
//     navigator.getMedia = ( navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia ||
//     navigator.msGetUserMedia);


//     if(!navigator.getMedia){
//         displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
//     }
//     else{

//         // Request the camera.
//         navigator.getMedia(
//             {
//                 video: true
//             },
//             // Success Callback
//             function(stream){

//                 // Create an object URL for the video stream and
//                 // set it as src of our HTLM video element.
//                 video1.src = window.URL.createObjectURL(stream);
//                 video2.src = window.URL.createObjectURL(stream);
//                 video3.src = window.URL.createObjectURL(stream);

//                 // Play the video element to start the stream.
//                 video1.play();
//                 video2.play();
//                 video3.play();
//                 video1.onplay = function() {
//                     showVideo();
//                 };
//                 video2.onplay = function() {
//                     showVideo();
//                 };
//                 video3.onplay = function() {
//                     showVideo();
//                 };
         
//             },
//             // Error Callback
//             function(err){
//                 displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
//             }
//         );

//     }



//     // Mobile browsers cannot play video without user input,
//     // so here we're using a button to start it manually.
//     start_camera.addEventListener("click", function(e){

//         e.preventDefault();

//         // Start video playback manually.
//         video1.play();
//         video2.play();
//         video3.play();
//         showVideo();

//     });


//     take_photo_btn1.addEventListener("click", function(e){

//         e.preventDefault();

//         var snap1 = takeSnapshot();

//         // Show image. 
//         image1.setAttribute('src', snap1);
//         image1.classList.add("visible");

//         // Enable delete and save buttons
//         delete_photo_btn1.classList.remove("disabled");

//         // Pause video playback of stream.
//         video1.pause();

//     });

//     take_photo_btn2.addEventListener("click", function(e){

//         e.preventDefault();

//         var snap2 = takeSnapshot();

//         // Show image. 
//         image2.setAttribute('src', snap2);
//         image2.classList.add("visible");

//         // Enable delete and save buttons
//         delete_photo_btn2.classList.remove("disabled");

//         // Pause video playback of stream.
//         video2.pause();

//     });

//     take_photo_btn3.addEventListener("click", function(e){

//         e.preventDefault();

//         var snap3 = takeSnapshot();

//         // Show image. 
//         image3.setAttribute('src', snap3);
//         image3.classList.add("visible");

//         // Enable delete and save buttons
//         delete_photo_btn3.classList.remove("disabled");

//         // Pause video playback of stream.
//         video3.pause();

//     });


//     delete_photo_btn1.addEventListener("click", function(e){

//         e.preventDefault();

//         // Hide image.
//         image1.setAttribute('src', "");
//         image1.classList.remove("visible");

//         // Disable delete and save buttons
//         delete_photo_btn1.classList.add("disabled");
        
//         // Resume playback of stream.
//         video1.play();

//     });

//     delete_photo_btn2.addEventListener("click", function(e){

//         e.preventDefault();

//         // Hide image.
//         image2.setAttribute('src', "");
//         image2.classList.remove("visible");

//         // Disable delete and save buttons
//         delete_photo_btn2.classList.add("disabled");
        
//         // Resume playback of stream.
//         video2.play();

//     });

//     delete_photo_btn3.addEventListener("click", function(e){

//         e.preventDefault();

//         // Hide image.
//         image3.setAttribute('src', "");
//         image3.classList.remove("visible");

//         // Disable delete and save buttons
//         delete_photo_btn3.classList.add("disabled");
        
//         // Resume playback of stream.
//         video3.play();

//     });


  
//     function showVideo(){
//         // Display the video stream and the controls.

//         hideUI();
//         video1.classList.add("visible");
//         video2.classList.add("visible");
//         video3.classList.add("visible");
//         controls.classList.add("visible");
        
//     }


//     function takeSnapshot(){
//         // Here we're using a trick that involves a hidden canvas element.  

//         var hidden_canvas = document.querySelector('canvas'),
//             context = hidden_canvas.getContext('2d');

//         var width = video1.videoWidth,
//             height = video1.videoHeight;

//         if (width && height) {

//             // Setup a canvas with the same dimensions as the video.
//             hidden_canvas.width = width;
//             hidden_canvas.height = height;

//             // Make a copy of the current frame in the video on the canvas.
//             context.drawImage(video1, 0, 0, width, height);

//             // Turn the canvas image into a dataURL that can be used as a src for our photo.
//             return hidden_canvas.toDataURL('image/png');
//         }
//     }


//     function displayErrorMessage(error_msg, error){
//         error = error || "";
//         if(error){
//             console.error(error);
//         }

//         error_message.innerText = error_msg;

//         hideUI();
//         error_message.classList.add("visible");
//     }

   
//     function hideUI(){
//         // Helper function for clearing the app UI.

//         controls.classList.remove("visible");
//         start_camera.classList.remove("visible");
//         video1.classList.remove("visible");
//         snap1.classList.remove("visible");
//         error_message.classList.remove("visible");
//     }

// });
document.wrtite("hey")