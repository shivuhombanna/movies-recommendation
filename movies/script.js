const movies = {
  action: [
    { title: "K.G.F: Chapter 1 (2018)", description: "An epic tale of Rocky, a rebellious gangster..." },
    { title: "K.G.F: Chapter 2 (2022)", description: "Rocky's dominance over the Kolar Gold Fields..." },
    { title: "Ugramm (2014)", description: "Post-apocalyptic action and adventure." },
    { title: "John Wick", description: "A retired hitman seeks revenge." }
  ],
  comedy: [
    { title: "The Hangover", description: "Three friends lose their buddy in Las Vegas." },
    { title: "Superbad", description: "Teen misadventures with lots of laughs." }
  ],
  drama: [
    { title: "The Shawshank Redemption", description: "Hope and friendship in prison." },
    { title: "Forrest Gump", description: "Life journey of a kind-hearted man." }
  ],
  "sci-fi": [
    { title: "Inception", description: "A mind-bending dream invasion." },
    { title: "Interstellar", description: "A journey through space and time." }
  ],
  romance: [
    { title: "The Notebook", description: "A timeless love story." },
    { title: "La La Land", description: "Romance meets music and dreams." }
  ]
};

const actors = {
  Puneeth: [
    { title: "Appu (2002)", description: "Puneeth's breakout in this romantic-action film." },
    { title: "Raajakumara (2017)", description: "A patriotic family drama." }
  ],
  Darshan: [
    { title: "Kurukshetra (2019)", description: "Mythological war drama." }
  ],
  Sudeep: [
    { title: "Eega (2012)", description: "A man reincarnates as a fly to avenge his death." },
    { title: "Vikrant Rona (2022)", description: "A mysterious tale in a fantasy world." }
  ],
  Yash: [
    { title: "K.G.F: Chapter 1", description: "Yash's breakthrough role as Rocky Bhai." },
    { title: "K.G.F: Chapter 2", description: "Powerful sequel packed with action." }
  ],
  ShivaRajkumar: [
    { title: "Om (1995)", description: "A cult classic gangster film." },
    { title: "Mufti (2017)", description: "An undercover cop tries to nab a crime lord." }
  ],
  RishabShetty: [
    { title: "Kantara (2022)", description: "A man's conflict with nature and tradition." }
  ],
  RakshitShetty: [
    { title: "Ulidavaru Kandanthe (2014)", description: "A non-linear narrative crime drama." }
  ],
  Dhananjaya: [
    { title: "Tagaru (2018)", description: "A gritty action thriller." }
  ],
  Ganesh: [
    { title: "Mungaru Male (2006)", description: "A romantic drama set in the rainy season." }
  ],
  Upendra: [
    { title: "Upendra (1999)", description: "A psychological thriller with unique narrative." }
  ],
  DrRajkumar: [
    { title: "Bangarada Manushya (1972)", description: "A classic family drama about agriculture." }
  ],
  Vishnuvardhan: [
    { title: "Naagarahaavu (1972)", description: "A landmark film in Kannada cinema." }
  ],
  Ambareesh: [
    { title: "Chakravyuha (1983)", description: "An action film with a strong social message." }
  ],
  ShankerNag: [
    { title: "Minchina Ota (1980)", description: "A thrilling action-adventure film." }
  ],
  AnantNag: [
    { title: "Ganeshana Maduve (1990)", description: "A popular comedy film." }
  ],
  TigerPrabakar: [
    { title: "Huli Hejje (1984)", description: "A classic action film." }
  ],
  Lokesh: [
    { title: "Bhootayyana Maga Ayyu (1974)", description: "A critically acclaimed drama." }
  ]
};

let scene, camera, renderer, particles;
const canvas = document.getElementById('bg-canvas');
function initThreeJS() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5; 
  // Renderer: Renders the scene using WebGL.
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // For sharper rendering on high-DPI screens

  // Create a particle system
  const particleCount = 1000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3); // 3 components (x, y, z) per particle

  for (let i = 0; i < particleCount; i++) {
    // Random positions for particles within a cube
    positions[i * 3] = (Math.random() - 0.5) * 100; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Material for particles (white color, small size)
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    opacity: 0.7
  });

  // Create the particle system (Points)
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Add a simple light for better visibility if other objects were added
  const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  // Initial resize to set canvas size correctly
  onWindowResize();
}

/**
 * Animation loop for Three.js.
 * Updates particle positions and renders the scene.
 */
function animate() {
  requestAnimationFrame(animate); // Request the next frame

  // Rotate the particle system
  if (particles) {
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0008;
  }

  renderer.render(scene, camera); // Render the scene with the camera
}

/**
 * Handles window resizing to keep the Three.js canvas responsive.
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // Update camera's projection matrix
  renderer.setSize(window.innerWidth, window.innerHeight); // Resize renderer
}

// Attach resize listener
window.addEventListener('resize', onWindowResize);

// Initialize Three.js and start animation when the window loads
window.onload = function() {
  initThreeJS();
  animate();
};

/**
 * Generates a more detailed movie description using the Gemini API.
 * @param {string} movieTitle - The title of the movie.
 * @param {string} baseDescription - The initial, brief description of the movie.
 * @param {string} genre - The selected genre.
 * @param {string} actor - The selected actor.
 * @returns {Promise<string>} A promise that resolves with the AI-generated description.
 */
async function generateMovieDescription(movieTitle, baseDescription, genre, actor) {
  const prompt = `Elaborate on the movie "${movieTitle}" which is described as "${baseDescription}". 
                  It's a ${genre} movie, and ${actor ? 'stars ' + actor : 'is a general recommendation'}. 
                  Provide a compelling and slightly longer description (around 50-70 words) that highlights its appeal.`;

  let chatHistory = [];
  chatHistory.push({ role: "user", parts: [{ text: prompt }] });

  const payload = { contents: chatHistory };
  const apiKey = ""; // Canvas will automatically provide the API key at runtime
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini API response structure unexpected:", result);
      return `Failed to generate AI description. Original: ${baseDescription}`;
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `Failed to generate AI description due to network error. Original: ${baseDescription}`;
  }
}

// Debounce function to limit how often getRecommendations can be called
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

/**
 * Fetches and displays movie recommendations based on selected genre or actor.
 * Uses AI to generate enhanced descriptions.
 */
async function getRecommendations() {
  const genre = document.getElementById("genre-select").value;
  const actor = document.getElementById("actor-select").value;
  const output = document.getElementById("recommendations");

  output.innerHTML = ""; // Clear previous results

  let recommendations = [];

  if (actor && actors[actor]) {
    recommendations = actors[actor];
  } else if (genre && movies[genre]) {
    recommendations = movies[genre];
  } else {
    output.innerHTML = "<p class='text-gray-600 text-center'>Please select a genre or an actor to get recommendations.</p>";
    return;
  }

  if (recommendations.length === 0) {
    output.innerHTML = "<p class='text-gray-600 text-center'>No recommendations found for your selection.</p>";
    return;
  }

  // Display a loading spinner while AI descriptions are being generated
  output.innerHTML = `
    <div class="flex justify-center items-center py-4">
      <div class="spinner"></div>
      <p class="ml-2 text-gray-700">Generating AI descriptions...</p>
    </div>
  `;

  const recommendationPromises = recommendations.map(async movie => {
    const aiDescription = await generateMovieDescription(movie.title, movie.description, genre, actor);
    return { ...movie, aiDescription };
  });

  try {
    const detailedRecommendations = await Promise.all(recommendationPromises);

    output.innerHTML = ""; // Clear loading spinner

    detailedRecommendations.forEach(movie => {
      const div = document.createElement("div");
      div.className = "movie bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200";
      div.innerHTML = `
        <h3 class="text-xl font-semibold text-blue-700 mb-2">${movie.title}</h3>
        <p class="text-gray-700">${movie.aiDescription || movie.description}</p>
      `;
      output.appendChild(div);
    });
  } catch (error) {
    console.error("Error processing recommendations:", error);
    output.innerHTML = `<p class='text-red-500 text-center'>An error occurred while fetching recommendations. Please try again.</p>`;
  }
}

// Attach debounced event listeners to the select elements
document.getElementById("genre-select").addEventListener("change", debounce(getRecommendations, 500));
document.getElementById("actor-select").addEventListener("change", debounce(getRecommendations, 500));
