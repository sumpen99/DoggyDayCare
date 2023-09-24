// An array of callbacks for when the page is Loaded
var onLoadCallbacks = [];

// Listen out for page content loaded event
document.addEventListener("DOMContentLoaded",function(){
    // Process anything that should happen once the page is loaded
    processOnLoad();
});

// Helper function to iterate over arrays
function ForEach(array,callback){
     // Loop each item...
    for(var i = 0;i < array.length;i++){
        // Pass the item back to the function
        callback(array[i]);
    }
}

// Process any on Load events
function processOnLoad(){
    // Call the callback
    ForEach(onLoadCallbacks,function(item){
        // Invoke the callback
        item();
    });
}

// Called to add a function to be invoked once the page loads
function onLoad(callback){
    // Add this callback to the list
    onLoadCallbacks.push(callback);
}

// Universal request animation
window.requestAnimationFrame = 
window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(f){
    setTimeout(f,1000/60)
};

// Get viewport height
function viewportHeight(){
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
    
// Get viewport width
function viewportWidth(){
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

// Generate a random number between the two numbers
function randomNumber(from, to){
    return (Math.random() * (to - from)) + from;
}
