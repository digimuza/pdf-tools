import * as P from 'ts-prime'
import * as Jet from 'fs-jetpack'
import { tmpNameSync } from 'tmp'
import { PDFDocument } from 'pdf-lib'
import { Content, flipDimensions } from '@digimuza/pdf-components'
import { AsyncIterable } from 'ix'
const html_to_pdf = require('./html-to-pdf.js')
import PDFMerger from 'pdf-merger-js'

async function mergePDF(pdfList: Buffer[], options: { output: string; logger?: Pick<Console, 'info' | 'error' | 'debug'> }) {
	const merger = new PDFMerger()

	for (const pdf of pdfList) {
		merger.add(pdf)
	}
	await merger.save(options.output)
	options.logger?.info(`PDF stored to ${options.output}`)
}

async function singlePdf(content: Content) {
	const format = P.isArray(content.format)
		? {
				...flipDimensions(content.format, true),
		  }
		: {
				format: content.format,
		  }
	const result = await P.canFail(
		() =>
			html_to_pdf.generatePdf(
				{
					content: content.content,
				},
				{
					...format,
					landscape: content.landscape,
				}
			) as Promise<Buffer>
	)
	if (P.isError(result)) throw result
	return result
}

/**
 *
 * @returns {string} File to generated pdf file
 */
export async function generate(args: { content: Content[]; output?: string; logger: Pick<Console, 'info' | 'error' | 'debug'> }) {
	let progress = 0
	const pdfList = await AsyncIterable.from(args.content.map((e, index) => ({ ...e, index })))
		.buffer(3)
		.map((pdf) => {
			return Promise.all(
				pdf.map((c) => {
					args.logger.info(`Generating (${c.index + 1}/${args.content.length}) page...`)
					return singlePdf(c)
				})
			)
		})
		.toArray()
	const mergedPDF = P.flatten(pdfList)
	const name = args.output ? Jet.path(process.cwd(), args.output) : tmpNameSync()
	await mergePDF(mergedPDF, {
		logger: args.logger,
		output: name,
	})
	return name
}
