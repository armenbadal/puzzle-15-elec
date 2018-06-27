
const electron = require('electron')

const app = electron.app

const gameMenu = [
	{
		label: 'Game',
		submenu: [
			{
				label: 'New'
			},
			{
				type: 'separator'
			},
			{
				label: 'Exit'
			}
		]
	}
]

const mainMenu = electron.Menu.buildFromTemplate(gameMenu)
//electron.Menu.setApplicationMenu(mainMenu)

let window = null

app.on('window-all-closed', () => { app.quit() })

app.on('ready', () => {
	window = new electron.BrowserWindow()
	window.loadURL('file://' + __dirname + '/index.html')

	window.on('closed', () => { window = null })
})

