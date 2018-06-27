
const events = require('events')

// խաղի տրամաբանությունը
var Puzzle15Engine = function(ee) {
	// պատահարներ
	this.evem = ee

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
			this.evem.emit('update', {r: r, c: c, v: this.board[r][c]})
		}
	}

	// քայլերի քանակը
	this.steps = 0	
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

	this.evem.emit('update', {r: r, c: c, v: this.board[r][c]})
	this.evem.emit('update', {r: enc.r, c: enc.c, v: this.board[enc.r][enc.c]})

	this.steps += 1
}


///
var Puzzle15View = function(mels, ee) {
	this.labels = mels

	this.evem = ee

	this.evem.on('update', (rcv) => {
		let cid = `r${rcv.r}c${rcv.c}`
		this.labels[cid].innerText = rcv.v == 16 ? '' : rcv.v
	})
}


///
var evem = null
var game = null
var view = null
var newGame = function(mels) {
	evem = new events.EventEmitter()
	view = new Puzzle15View(mels, evem)
	game = new Puzzle15Engine(evem)
}

