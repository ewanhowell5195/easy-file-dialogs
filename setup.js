import { exec } from "node:child_process"
import os from "node:os"

const platform = os.platform()

if (platform === "darwin") {
  exec("chmod +x ./python/dist/dialogMac", (error) => {
    if (error) {
      console.error("Error setting executable permissions:", error);
    } else {
      console.log("Executable permissions set for macOS.");
    }
  });
} else if (platform === "win32") {
  console.log("No executable permissions to set on Windows.")
} else {
  console.log("Unsupported platform:", platform)
}