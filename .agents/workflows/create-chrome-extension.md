---
description: Create a new custom Chrome Extension
---

# Create a new custom Chrome Extension

This template scaffolds out a standard Manifest V3 Chrome Extension.

// turbo-all
1. Create the new Chrome Extension directory based on the user's name preference
   ```pwsh
   mkdir "New Extension by Aleksi"
   ```
2. Create the `manifest.json` file inside the new directory with `write_to_file`
3. Generate the required background or content scripts using `write_to_file`
4. Generate an icon using the AI image generation tool `generate_image` (if needed) and copy it into the extension folder
5. Create a `README.md` to document the new extension
