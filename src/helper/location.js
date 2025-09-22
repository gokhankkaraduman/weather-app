// navigator.geolocation callback'ini Promise ile sarmaladık
export default function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position); // Position objesi dönüyor
      },
      (error) => {
        reject(error);
      }
    );
  });
}
