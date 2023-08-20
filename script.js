const playerOverlay = document.getElementById('player-overlay');
const moviePlayer = document.getElementById('movie-player');
const playerTitle = document.getElementById('player-title');
const movieDetails = document.querySelector('.movie-details');
const playerContainer = document.querySelector('.player-container');

function showPlayer(videoSrc, title) {
  if (videoSrc.includes('iframe')) {
    playerContainer.innerHTML = videoSrc;
  } else {
    moviePlayer.src = videoSrc;
    moviePlayer.load();
    playerTitle.textContent = title;
  }

  // Hide the movie details initially
  movieDetails.style.display = 'none';

  fetchMovieDetails(videoSrc)
    .then(details => {
      updateMovieDetails(details);
      moviePlayer.play();
      playerOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
      // If an error occurs, proceed with showing the player
      moviePlayer.play();
      playerOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
}

function fetchMovieDetails(videoSrc) {
  return fetch('get_metadata.php?video=' + encodeURIComponent(videoSrc))
    .then(response => response.json());
}

function updateMovieDetails(details) {
  // Update movie details using fetched metadata
  const { releaseDate, genre, casts, duration, country, production } = details;

  movieDetails.querySelector('.movie-released').textContent = `Released: ${releaseDate}`;
  movieDetails.querySelector('.movie-genre').textContent = `Genre: ${genre.join(', ')}`;
  movieDetails.querySelector('.movie-casts').textContent = `Casts: ${casts.join(', ')}`;
  movieDetails.querySelector('.movie-duration').textContent = `Duration: ${duration}`;
  movieDetails.querySelector('.movie-country').textContent = `Country: ${country}`;
  movieDetails.querySelector('.movie-production').textContent = `Production: ${production}`;

  // Show the movie details
  movieDetails.style.display = 'block';
}

function closePlayer() {
  moviePlayer.pause();
  moviePlayer.currentTime = 0;
  playerContainer.innerHTML = ''; // Clear the player container content
  playerOverlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}

playerOverlay.addEventListener('click', function (event) {
  if (event.target === playerOverlay) {
    closePlayer();
  }
});
