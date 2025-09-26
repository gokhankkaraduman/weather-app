// navigator.geolocation callback'ini Promise ile sarmaladık
export default function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Position ve coords kontrolü
        if (position && position.coords) {
          resolve(position);
        } else {
          reject(new Error('Invalid position data received'));
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 dakika cache
      }
    );
  });
}
