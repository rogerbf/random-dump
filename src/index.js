import * as fs from 'fs'

const validateSize = size => {
  if (size === undefined) throw new Error(`missing size argument`)
  if (typeof(size) !== `number`) throw new TypeError(`size must be a number`)
  if (size < 1) throw new Error(`size must be larger than 0`)
}

export default (size, callback) => {
  try {
    validateSize(size)
  } catch (e) {
    if (callback) return callback(e)
    else throw e
  }

  const stream = fs.createReadStream(
    `/dev/random`, { start: 0, end: size - 1 }
  )

  if (callback) {
    let data = Buffer.alloc(0)
    stream.on(`error`, e => callback(e))
    stream.on(`data`, buff => data = Buffer.concat([ data, buff ]))
    stream.on(`end`, () => callback(null, data))
  } else {
    return stream
  }
}
