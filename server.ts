import { createServer } from 'http'
import { readFileSync } from 'fs'
import { dbElement, Request, Response } from './interfaces'
import path from 'path'

const port = 3001;
const db = JSON.parse(readFileSync(path.join(__dirname, '../fake-db.json')).toString())

const handler = async (req: Request, res: Response) => {
	let bodyStr = ''

	res.setHeader('Access-Control-Allow-Origin', req.headers.origin ?? '*')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
	res.setHeader('Access-Control-Max-Age', 2592000) // 30 day

	if (req.method == 'OPTIONS') {
		res.end()
		return
	}

	if (req.method == 'GET' || req.method == 'POST') {
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
					console.log(canditate)
				})
			} catch (error) {
				res.statusCode = 500
				res.end('Parsing error')
			}
		})
	}
}

	

const server = createServer(handler)


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
