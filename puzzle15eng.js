
// model of board
var board = [
	[0,  0,  0,  0,  0, 0],
	[0,  1,  2,  3,  4, 0],
	[0,  5,  6,  7,  8, 0],
	[0,  9, 10, 11, 12, 0],
	[0, 13, 14, 15, 16, 0],
	[0,  0,  0,  0,  0, 0]]

var labels = {}

var steps = 0

//
var randomIndex = function() {
	return Math.floor((Math.random() * 4) + 1)
}

//
var shuffle = function() {
	for( let i = 0; i < 65; ++i ) {
		let ro = randomIndex()
		let co = randomIndex()
		let ri = randomIndex()
		let ci = randomIndex()

		let et = board[co][ro]
		board[co][ro] = board[ci][ri]
		board[ci][ri] = et
	}
}

//
var begin = function() {
	shuffle()
	
	for( let r = 0; r < 4; ++r ) {
		for( let c = 0; c < 4; ++c ) {
			let sid = `r${r+1}c${c+1}`
			labels[sid] = document.getElementById(sid)
			let ex = board[c+1][r+1]
			labels[sid].innerText = ex == 16 ? ' ' : ex
		}
	}
}

//
var isGameOver = function() {
	return false
}

//
var blank = function(r, c) {
	if( board[c-1][r] == 16 ) return { c: c-1, r: r }
	if( board[c+1][r] == 16 ) return { c: c+1, r: r }
	if( board[c][r-1] == 16 ) return { c: c, r: r-1 }
	if( board[c][r+1] == 16 ) return { c: c, r: r+1 }

	return null
}

//
var oneStep = function(r, c) {
	let cb = blank(r, c)
	if( cb == null ) return

	let et = board[c][r]
	board[c][r] = board[cb.c][cb.r]
	board[cb.c][cb.r] = et
	
	let co = labels[`r${r}c${c}`]
	let ci = labels[`r${cb.r}c${cb.c}`]

	let st = co.innerText
	co.innerText = ci.innerText
	ci.innerText = st

	++steps
	
	if( isGameOver() ) {
		alert('Game Over.')
	}
}



