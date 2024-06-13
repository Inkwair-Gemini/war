<style>
  .video-container {
     max-width: 100%;
     margin: 0 auto;
  }

  video {
     width: 100%;
     height: auto;
     border: 1px solid #ccc;
     border-radius: 8px;
  }
</style>

<div class="video-container">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video controls>
     <source src='/video.mp4' type="video/mp4" />
     Your browser does not support the video tag.
  </video>
</div>
