const express = require('express')

const app = express()
const PORT = 3000

app.get('/', async (req, res) => {
	try {
		const response = await fetch('https://dog.ceo/api/breeds/image/random')
		const data = await response.json()

		const dogImageUrl = data.message

		res.send(`
      <html>
        <head>
          <title>Random Dog</title>
        </head>
        <body style="text-align: center; font-family: sans-serif;">
          <h1>Here’s a random dog 🐶</h1>
          <img src="${dogImageUrl}" alt="Random Dog" style="max-width: 600px; height: auto;" />
        </body>
      </html>
    `)
	} catch (error) {
		console.error(error)
		res.status(500).send('Error fetching dog image.')
	}
})

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
