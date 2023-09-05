import { createServer } from 'http'
import { readFileSync } from 'fs'
import { dbElement, Request, Response } from './interfaces'

const db = JSON.parse(readFileSync('./fake-db.json').toString())

const handler = async (req: Request, res: Response) => {
	let bodyStr = ''
	req.on('data', (chunk) => {
		bodyStr += chunk
	})
	req.on('end', () => {
		try {
			const body: dbElement = JSON.parse(bodyStr)
			const delay = new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve()
				}, 5000)
			})
			delay.then(() => {
				const canditate = db.filter((el: dbElement) => el.email == body.email)
				res.setHeader('Content-Type', 'application/json')
				if (!canditate) res.end(JSON.stringify([]))
				res.end(JSON.stringify(canditate))
			})
		} catch (error) {
			res.statusCode = 500
			res.end('Parsing error')
		}
	})
}

const server = createServer(handler)

server.listen(3000, () => {
	console.log(`Server running at http://localhost:${3000}`)
})
