<?php
$videoPath = $_GET['video'];
$command = "ffprobe -v quiet -print_format json -show_format -show_streams \"$videoPath\"";
$metadataJson = shell_exec($command);

$metadata = json_decode($metadataJson, true);

$response = array(
  'releaseDate' => '2023-08-19', // Replace with actual data
  'genre' => array('Animation', 'Fantasy', 'Adventure'), // Replace with actual data
  'casts' => array('Actor 1', 'Actor 2', 'Actor 3'), // Replace with actual data
  'duration' => '2h 15m', // Replace with actual data
  'country' => 'USA', // Replace with actual data
  'production' => 'Studio XYZ' // Replace with actual data
);

if ($metadata) {
  // Update response with actual extracted metadata
  if (isset($metadata['format']['tags']['release_date'])) {
    $response['releaseDate'] = $metadata['format']['tags']['release_date'];
  }
  // You can similarly update other metadata fields
}

header('Content-Type: application/json');
echo json_encode($response);
?>
