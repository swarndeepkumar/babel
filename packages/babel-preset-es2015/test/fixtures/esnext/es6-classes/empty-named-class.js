class Foo {
}

expect(new Foo().constructor).toBe(Foo);
expect(new Foo()).toBeInstanceOf(Foo);
