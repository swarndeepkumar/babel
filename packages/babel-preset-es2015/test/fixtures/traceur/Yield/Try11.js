function assertClosed(g) {
  expect({value: undefined, done: true}).toEqual(g.next());
}

var x, y;

function* f() {
  x = 0;
  y = 0;
  yield 1;
  try {
    yield 2;
    try {
      yield 3;
    } finally {
      x = 4;
    }
    yield x;
  } catch (ex) {
    yield 5 + ex;
  } finally {
    y = 6
  }
  yield y;
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 4, done: false});
expect(g.next()).toEqual({value: 6, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);
expect(x).toBe(4);
expect(y).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(() => g.throw('ex')).toThrow();
assertClosed(g);
expect(x).toBe(0);
expect(y).toBe(0);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.throw('ex')).toEqual({value: '5ex', done: false});
expect(g.next()).toEqual({value: 6, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);
expect(x).toBe(0);
expect(y).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.throw('ex')).toEqual({value: '5ex', done: false});
expect(() => g.throw('b')).toThrow();
assertClosed(g);
expect(x).toBe(0);
expect(y).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.throw('ex')).toEqual({value: '5ex', done: false});
expect(g.next()).toEqual({value: 6, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);
expect(x).toBe(4);
expect(y).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.throw('ex')).toEqual({value: '5ex', done: false});
expect(() => g.throw('b')).toThrow();
assertClosed(g);
expect(x).toBe(4);
expect(y).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 4, done: false});
expect(g.throw('ex')).toEqual({value: '5ex', done: false});
expect(g.next()).toEqual({value: 6, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
assertClosed(g);
expect(x).toBe(4);
expect(y).toBe(6);

g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: 4, done: false});
expect(g.throw('ex')).toEqual({value: '5ex', done: false});
expect(() => g.throw('b')).toThrow();
assertClosed(g);
expect(x).toBe(4);
expect(y).toBe(6);
