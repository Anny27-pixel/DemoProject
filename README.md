# Carousel with Auto-Rotation and Dynamic Pagination

## Overview
This project is a responsive carousel application that dynamically loads images and descriptions from a JSON file and displays them in a visually appealing way. 
The carousel supports manual navigation, pagination, and auto-rotation. The server uses Node.js and Express to serve the client-side assets and provide the carousel data 
via an API endpoint.

## Code Structure

### Server Side (Node.js + Express)
- **`index.js`**: 
  - Serves static files from the `public` directory.
  - Provides an API endpoint `/api/carousel-data` to fetch carousel data from a JSON file.
  - Listens for incoming HTTP requests on port 3000.

### Client Side
- **`index.html`**: 
  - The main HTML file containing the structure for the carousel and pagination.
  - Links to the CSS file for styling and the JavaScript file for dynamic functionality.

- **`my-styles.css`**: 
  - Contains styles for the carousel, buttons, pagination, and responsive design for different screen sizes.

- **`my-script.js`**: 
  - Handles fetching carousel data from the server, rendering it, and managing user interactions (manual navigation, pagination, and auto-rotation).

- **`book-description.json`**: 
  - A JSON file containing an array of carousel items.

## Configuration Parameters
### n (Number of Visible Cards)
- The number of cards visible at a time in the carousel is determined by CSS `flex` properties.
- Modify the `.card` CSS rules for different breakpoints in `my-styles.css` to adjust the number of visible cards for various screen sizes:
  ```css
  @media screen and (max-width: 992px) {
      .card {
          flex: 0 0 calc(50% - 20px); 
      }
  }
  ```
- You can adjust the `width` of `.card` to configure the number of visible cards.

### x (Auto-Rotation Interval)
Auto-rotation functionality
- The auto-rotation interval (in milliseconds) is defined in `my-script.js`:
  ```javascript
   const startAutoRotation = (interval = 5000) =>{
  }
  ```
- Adjust this value to change the auto-rotation speed.

## Additional Features
1. **Auto-Rotation**:
   - The carousel automatically moves to the next set of cards after a specified interval.
   - Implemented using `setInterval` in `my-script.js`:
     ```javascript
            // Auto-rotation functionality
        const startAutoRotation = (interval = 5000) => { // Default interval is 5 seconds
          autoRotationInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % numCards;
            updateCarousel();
          }, interval);
        };
  
        const stopAutoRotation = () => {
          clearInterval(autoRotationInterval);
          autoRotationInterval = null;
        };
  
        // Start auto-rotation by default
        startAutoRotation();
     ```
   - Auto-rotation pauses on hover and resumes on mouse leave.

2. **Dynamic Pagination**:
   - Pagination dots or numbers are generated dynamically based on the number of carousel items in `my-script.js`:
     ```javascript
    for (let i = 0; i < numCards; i++) {
          const pageNumber = document.createElement('span');
          pageNumber.classList.add('page-number');
          pageNumber.dataset.index = i;
          pageNumber.textContent = i + 1;
          pagination.appendChild(pageNumber);
        }
     ```
   - Pagination dots highlight the active card and allow direct navigation.

3. **Responsive Design**:
   - Adapts the number of visible cards based on screen size using media queries in `my-styles.css`.

## How to Run the Application
1. Clone the repository and navigate to the project directory.
2. Install Node.js and npm if not already installed.
3. Install dependencies:
   ```bash
   npm install express
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. Open a browser and navigate to `http://localhost:3000`.
