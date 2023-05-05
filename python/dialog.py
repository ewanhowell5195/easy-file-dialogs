from tkinter.filedialog import askdirectory, askopenfilename, asksaveasfilename
from tkinter.messagebox import askyesno
from tkinter import Tk
from json import loads
from sys import argv

try:
  data = loads(argv[1])

  gui = Tk()
  gui.withdraw()
  gui.iconbitmap(data.get("icon") or "python/blank.ico")

  if data["type"] == "directory":
    directory = askdirectory(
      title = data.get("title"),
      initialdir = data.get("initialDir")
    )

  if data["type"] == "open":
    directory = askopenfilename(
      title = data.get("title"),
      initialdir = data.get("initialDir"),
      initialfile = data.get("initialFile"),
      filetypes = data.get("fileTypes"),
      multiple = data.get("multiple")
    )

  if data["type"] == "save":
    directory = asksaveasfilename(
      title = data.get("title"),
      initialdir = data.get("initialDir"),
      initialfile = data.get("initialFile"),
      filetypes = data.get("fileTypes"),
      confirmoverwrite = data.get("confirmOverwrite")
    )

  if data["type"] == "confirm":
    directory = str(askyesno(
      title = data.get("title"),
      message = data.get("message"),
      icon = "warning" if data.get("warning") else None
    ))

  if type(directory) is tuple:
    for item in directory:
      print("".join(map(lambda e: f"\\u{ord(e):04x}", item)))
  else:
    print("".join(map(lambda e: f"\\u{ord(e):04x}", directory)))

except Exception as err:
  print(f"Error: {err}")