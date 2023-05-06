import { spawn } from "child_process"
import { fileURLToPath } from "url"
import path from "node:path"
import fs from "node:fs"
import os from "node:os"

async function get(args) {
  let exe
  const platform = os.platform()
  if (platform === "win32") exe = "./python/dist/dialogWindows.exe"
  else if (platform === "darwin") exe = "./python/dist/dialogMac"
  else throw new Error("Unsupported. This library does not currently support this operating system")

  if (args.initialDir) args.initialDir = path.resolve(args.initialDir)

  if (args.icon && !fs.existsSync(args.icon)) throw new Error(`Icon file "${args.icon}" not found`)

  const p = spawn(exe, [JSON.stringify(args)], {
    stdio: ["ignore", "pipe", "ignore"],
    cwd: fileURLToPath(new URL(".", import.meta.url))
  })

  const chunks = []
  for await (const chunk of p.stdout) {
    chunks.push(chunk)
  }
  const paths = Buffer.concat(chunks).toString().split("\n").map(e => JSON.parse(`"${e.replace(/"/g, '\\"').trim()}"`)).filter(e => e)
  if (paths[0]?.startsWith("Error: ")) throw new Error(paths[0].slice(7).trim())
  if (!paths.length) throw new Error("No file/directory selected")
  return paths
}

export async function openDirectory(args) {
  args.type = "directory"
  return (await get(args))[0]
}

export async function openFile(args) {
  args.type = "open"
  const paths = await get(args)
  if (args.multiple) return Promise.all(paths.map(async e => [
    e,
    await fs.promises.readFile(e, args.encoding)
  ]))
  return [
    paths[0],
    await fs.promises.readFile(paths[0], args.encoding)
  ]
}

export async function openFileName(args) {
  args.type = "open"
  const paths = await get(args)
  if (args.multiple) return paths
  return paths[0]
}

export async function saveFile(file, args) {
  args.type = "save"
  const path = (await get(args))[0]
  await fs.promises.writeFile(path, file, args.encoding)
  return path
}

export async function saveFileName(args) {
  args.type = "save"
  return (await get(args))[0]
}

export async function confirm(args) {
  args.type = "confirm"
  return (await get(args))[0] === "True"
}

export default {
  openDirectory,
  openFile,
  openFileName,
  saveFile,
  saveFileName,
  confirm
}