/* eslint no-undef: 0, no-unused-vars: 1, "indent": 0, space-before-function-paren: 0, spaced-comment: 0*/
const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer(
  (request, response) => {
    var addr = request.url
    var q = url.parse(addr, true)
    var filePath = ''

    if (q.pathname.includes('documentation')) {
      filePath = __dirname + '/documentation.html'
    } else {
      filePath = './index.html'
    }

    fs.appendFile('log.txt', '\nTimestamp: ' + new Date() + 'URL: ' + addr +
      '\n\n',
      function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(addr + ' Loaded successfully.')
        }
      })

    fs.readFile(filePath, function(err, data) {
      if (err) {
        throw err
      }

      response.writeHead(200, {
        'Content-Type': 'text/html'
      })
      response.write(data)
      response.end()
    })
  }
).listen(8080)

console.log('My first Node test server is running on Port 8080.')
