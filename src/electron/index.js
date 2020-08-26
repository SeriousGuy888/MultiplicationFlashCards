const { app, BrowserWindow } = require("electron")

app.on("ready", () => {
  const window = new BrowserWindow({ width: 1280, height: 720, show: false })

  window.setMenuBarVisibility(null)
  window.maximize()
  window.show()

  window.loadURL(`file://${__dirname}/../page/index.html`)
})