import type { ObjectSchema } from 'joi'
import * as XLSX from 'xlsx'

export async function handleUpload<T>(file: File, schema: ObjectSchema) {
  const fileText = await file.arrayBuffer()
  const workbook = XLSX.read(fileText)
  const list = XLSX.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]],
    { raw: true },
  ) as T[]
  const res = schema.validate(list[0])
}

export function handleExport(
  json: any,
  filename: string = String(Date.now() + '.xlsx'),
) {
  try {
    const workbook = XLSX.utils.book_new()
    for (let key in json) {
      const worksheet = XLSX.utils.json_to_sheet(json[key])
      XLSX.utils.book_append_sheet(workbook, worksheet, key)
    }

    let res = XLSX.write(workbook, { type: 'array' })
    XLSX.writeFile(workbook, filename)
  } catch (err) {
    console.log('Error:', err)
  }
}
