
var indexToColumnRow = function(i) {
	let r = Math.floor(i / 4) + 1
	let c = i % 4 + 1
	return { c: c, r: r }
}

var columnRowToIndex = function(c, r) {
	return 4 * (r - 1) + (c - 1)
}

var swap = function(co, ci) {
}

var nums = []

for( let i = 0; i < 16; ++i ) {
	let cr = indexToColumnRow(i)
	let ix = columnRowToIndex(cr.c, cr.r)
	console.log(`i = ${i}, cr = ${cr.c},${cr.r}, ix = ${ix}`)
}


