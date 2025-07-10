const express = require('express')

const app = express()
const PORT = 3000

app.get('/', async (req, res) => {
	try {
		// 1. Get breed list
		const breedListResponse = await fetch('https://dog.ceo/api/breeds/list/all')
		const breedListData = await breedListResponse.json()
		const breeds = breedListData.message

		// 2. Flatten breeds and sub-breeds into possible options
		const breedOptions = []
		for (const breed in breeds) {
			if (breeds[breed].length === 0) {
				breedOptions.push({ breed, subBreed: null })
			} else {
				breeds[breed].forEach(subBreed => {
					breedOptions.push({ breed, subBreed })
				})
			}
		}

		// 3. Pick random breed option
		const randomOption =
			breedOptions[Math.floor(Math.random() * breedOptions.length)]

		// 4. Build URL
		const apiUrl = randomOption.subBreed
			? `https://dog.ceo/api/breed/${randomOption.breed}/${randomOption.subBreed}/images/random`
			: `https://dog.ceo/api/breed/${randomOption.breed}/images/random`

		const imageResponse = await fetch(apiUrl)
		const imageData = await imageResponse.json()
		const dogImageUrl = imageData.message

		res.send(`
      <html>
        <head>
          <title>Random Dog</title>
        </head>
        <body style="text-align: center; font-family: sans-serif;">
          <h1>Here’s a random ${
						randomOption.subBreed ? randomOption.subBreed + ' ' : ''
					}${randomOption.breed} 🐶</h1>
					<h3>Random dog image of ${randomOption.breed} ${randomOption.subBreed}</h3>
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
