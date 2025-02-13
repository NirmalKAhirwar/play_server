import { useState, useEffect } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false); // To manage overlay visibility
  const [newWallpaper, setNewWallpaper] = useState({
    title: "",
    tags: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch wallpapers from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/wallpapers")
      .then((response) => {
        setWallpapers(response.data.wallpapers);
      })
      .catch((error) => {
        console.error("Error fetching wallpapers:", error);
      });
  }, []); // Empty dependency array to fetch only once when the component mounts

  // Handle file input change
  const handleFileChange = (e) => {
    setNewWallpaper({
      ...newWallpaper,
      image: e.target.files[0],
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewWallpaper({
      ...newWallpaper,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the form submission (Uploading wallpaper)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newWallpaper.image) {
      setError("Image file is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", newWallpaper.title);
    formData.append("tags", newWallpaper.tags);
    formData.append("image", newWallpaper.image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/wallpapers", // Your upload API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if using authentication
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Wallpaper uploaded successfully!");
        setWallpapers([...wallpapers, response.data.wallpaper]); // Append new wallpaper
        setIsOverlayVisible(false); // Hide overlay after successful upload
        setNewWallpaper({ title: "", tags: "", image: null });
        setError("");
      }
    } catch (error) {
      console.error("Error uploading wallpaper:", error);
      setError("Error uploading wallpaper. Please try again.");
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>

      {/* Button to toggle the visibility of the upload overlay */}
      <button onClick={() => setIsOverlayVisible(true)}>
        Upload Wallpaper
      </button>

      {/* Overlay Modal for Wallpaper Upload */}
      {isOverlayVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              textAlign: "center",
            }}>
            <h3>Upload Wallpaper</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={newWallpaper.title}
                  onChange={handleInputChange}
                  placeholder="Enter wallpaper title"
                />
              </div>
              <div>
                <label>Tags:</label>
                <input
                  type="text"
                  name="tags"
                  value={newWallpaper.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div>
                <label>Image:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit">Upload</button>
              <button
                type="button"
                onClick={() => setIsOverlayVisible(false)} // Close the modal
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginTop: "10px",
                }}>
                Cancel
              </button>
            </form>

            {/* Display error or success messages */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </div>
        </div>
      )}

      {/* Render the wallpapers */}
      <div>
        {wallpapers.length > 0 ? (
          wallpapers.map((wallpaper, index) => (
            <div key={index}>
              <img
                src={"http://localhost:5000" + wallpaper.imageURL}
                alt={`Wallpaper ${index}`}
                height={250}
                width={250}
              />
              <a href={"http://localhost:5000" + wallpaper.imageURL}>
                {"http://localhost:5000" + wallpaper.imageURL}
              </a>
              <p>{wallpaper.title}</p>
            </div>
          ))
        ) : (
          <p>No wallpapers available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
