
const electron = require('electron')

const app = electron.app

const gameMenu = [
	{
		label: 'Խաղ',
		submenu: [
			{
				label: 'Նոր',
				click: () => { window.webContents.send('new-game') }
			},
			{
				type: 'separator'
			},
			{
				label: 'Ելք',
				click: () => { app.quit() }
			}
		]
	},
	{
		label: 'Յուշում',
		submenu: [
			{
				label:'Ա'
			}
		]
	}
]


let window = null

app.on('window-all-closed', () => { app.quit() })

app.on('ready', () => {
	window = new electron.BrowserWindow({
		width: 306,
		height: 350,
		resizable: false
	})
	window.loadURL('file://' + __dirname + '/index.html')

	const mainMenu = electron.Menu.buildFromTemplate(gameMenu)
	electron.Menu.setApplicationMenu(mainMenu)
	
	window.on('closed', () => { window = null })
})

