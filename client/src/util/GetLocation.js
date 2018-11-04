// Gets basic user location using 
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

// Fetches geolocation data (maybe) and timestamp (definitely)
function maybeGetLocation () {
    let result = { enabled: false, timestamp: new Date().getTime() };
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (pos) => { result.coords = pos.coords; result.timestamp = pos.timestamp  },
            (err) => { result.enabled = false; result.err = err; },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }
    window.alert(JSON.stringify(result));
    return result;;
}
export default maybeGetLocation;
