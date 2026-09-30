# Vrota Poja v24 — map direct tiles fix

The v23 map loaded MapLibre controls/marker but rendered only the blank background.
The implementation has been changed to a local MapLibre style object that requests OpenFreeMap vector tiles directly from `/planet/latest/{z}/{x}/{y}.pbf`, bypassing the `/planet` TileJSON endpoint. The style contains only the layers needed for a clean location map and does not depend on remote sprite assets.
