module.exports = {
    makeId
}

function makeId(length = 8) {
    var text = ''
    var possible = '0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}