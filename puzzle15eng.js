
// խաղի տրամաբանությունը
var Puzzle15Engine = function(mels) {
	// տախտակի կոճակները
	this.labels = mels
	for( let r of [0, 1, 2, 3] ) {
		for( let c of [0, 1, 2, 3] ) {
			this.labels[r][c].addEventListener('click', (ev) => { 
				const [id, r, c] = /r([1-4])c([1-4])/.exec(ev.target.id)
				this.oneStep(parseInt(r), parseInt(c))
			 })
		}
	}

	// խաղատախտակի մոդելը
	this.board = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]]

	// խառնել
	let numbers = Array.from(new Array(15), (e, i) => 1 + i)
	for( let i = 7; i < 15; ++i ) {
		let j = Math.floor(Math.random() * 8)
		let et = numbers[j]
		numbers[j] = numbers[i]
		numbers[i] = et
	}

	// ինվերսինաերի հաշվում 
	let nvs = 0
	for( let i = 0; i < numbers.length - 1; ++i ) {
		for( let j = i + 1; j < numbers.length; ++j ) {
			if( numbers[i] < numbers[j] ) ++nvs
		}
	}

	// զույգության աստուգում
	if( nvs % 2 == 0 ) {
		let et = numbers[0]
		numbers[0] = numbers[1]
		numbers[1] = et
	}

	// դատարկ վանդակի արժեքը
	numbers.push(16)

	// գրանցել տախտակին
	const indices = [1, 2, 3, 4]
	let i = 0
	for( let r of indices ) {
		for( let c of indices ) {
			this.board[r][c] = numbers[i++]
			this.update(r, c)
		}
	}

	// քայլերի քանակը
	this.steps = 0	
}

// թարմացնել կոճակը
Puzzle15Engine.prototype.update = function(r, c) {
	let vl = this.board[r][c]
	this.labels[r-1][c-1].innerText = (vl == 16 ? '' : vl)
	this.labels[r-1][c-1].style.display = (vl == 16 ? 'none' : 'block')
}

// խաղը ավարտվա՞ծ է
Puzzle15Engine.prototype.isGameOver = function() {
	const indices = [1, 2, 3, 4]
	let cnum = 0
	for( let r of indices ) {
		for( let c of indices ) {
			if( this.board[r][c] != ++cnum ) {
				return false
			}
		}
	}
	return true
}

// հարևան դատարկ վանդակը
Puzzle15Engine.prototype.emptyNeighbor = function(r, c) {
	if( 16 == this.board[r-1][c] ) return { r: r-1, c: c }
	if( 16 == this.board[r+1][c] ) return { r: r+1, c: c }
	if( 16 == this.board[r][c-1] ) return { r: r, c: c-1 }
	if( 16 == this.board[r][c+1] ) return { r: r, c: c+1 }
	return null
}

// մեկ քայլ
Puzzle15Engine.prototype.oneStep = function(r, c) {
	let enc = this.emptyNeighbor(r, c)
	if( enc == null ) return

	let et = this.board[r][c]
	this.board[r][c] = this.board[enc.r][enc.c]
	this.board[enc.r][enc.c] = et

	this.update(r, c)
	this.update(enc.r, enc.c)

	this.steps += 1

	if( this.isGameOver() ) {
		alert(`Դուք հաղթեցիք ${this.steps} քայլում։`)
	}
}


///
var labels = [
	[null, null, null, null],
	[null, null, null, null],
	[null, null, null, null],
	[null, null, null, null]]
for( let r of [1, 2, 3, 4] ) {
	for( let c of [1, 2, 3, 4] ) {
		labels[r-1][c-1] = document.getElementById(`r${r}c${c}`)
		labels[r-1][c-1].className = 'w3-button w3-blue w3-border game-stone'
	}
}

///
var game = null
var newGame = function() {
	game = new Puzzle15Engine(labels)
}


const ipc = require('electron').ipcRenderer
ipc.on('new-game', () => { newGame() })
