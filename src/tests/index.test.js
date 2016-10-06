import test from 'tape'
import dump from '../index.js'

test(`dump is a function`, assert => {
  assert.ok(typeof(dump) === `function`)
  assert.end()
})

test(`dump returns a Readable stream`, assert => {
  assert.ok(
    dump(1).constructor.name, `Readable`, `should return a readable stream`
  )
  assert.end()
})

test(`dump(10)`, assert => {
  const random = dump(10)
  let data = Buffer.alloc(0)

  random.on(`data`, buff => data = Buffer.concat([ data, buff ]))
  random.on(`end`, () => {
    assert.equal(data.length, 10, `returned data length should be 10 bytes`)
    assert.end()
  })
})

test(`throws`, assert => {
  assert.throws(() => dump())
  assert.throws(() => dump(0))
  assert.throws(() => dump(``))
  assert.throws(() => dump(Array()))
  assert.throws(() => dump(Object()))
  assert.throws(() => dump(() => {}))
  assert.end()
})

test(`dump(10) callback`, assert => {
  dump(10, (err, buff) => {
    assert.ok(!err)
    assert.equal(buff.length, 10)
    assert.end()
  })
})

test(`callback called with error`, assert => {
  dump(null, (err) => assert.ok(err !== null))
  dump(0, (err) => assert.ok(err !== null))
  dump(``, (err) => assert.ok(err !== null))
  dump(Array(), (err) => assert.ok(err !== null))
  dump(Object(), (err) => assert.ok(err !== null))
  assert.end()
})
