# Vrota Poja v25 — location map fix

The previous OpenFreeMap direct-vector implementation still rendered only the MapLibre background/marker in the user's local browser. The location map has therefore been switched to Maptoolkit's OSM-based MapLibre basemap, using the official `https://styles.maptoolkit.org/light.json` style. Maptoolkit states that its community service provides OSM-based vector tiles without an API key and permits small commercial websites under its community license, with visible Maptoolkit + OpenStreetMap attribution required.

The map keeps the existing Vrota Poja marker, coordinates, popup and Google Maps link. A small Maptoolkit logo is now visible in the map as required by the provider.

A `START-LOCAL.bat` helper was also added. Opening the HTML directly as `file://` can cause browser cross-origin restrictions with remote vector tiles; the helper starts a tiny local HTTP server at `http://127.0.0.1:5500/`, which is the correct way to preview the map locally.
