// Lambda Calculus for People Who Can't Be Bothered to Learn it
// Steven Syrek

/* operations

ɑ-substitution
(x => x)(1) === (y => y)(1)

β-reduction
(x => x)(y => y)(1) === (y => y)(1)
(y => y)(1) === 1

η-conversion
f = x => x
(x => f(x))(1) === f(1)

*/

// identity combinator

ID = x => x

// boolean primitives

TRUE = x => y => x

FALSE = x => y => y

/*

TRUE("first")("second") === "first"
FALSE("first")("second") === "second"

*/

// boolean combinators

AND = x => y => x(y)(FALSE)

OR = x => y => x(TRUE)(y)

NOT = x => x(FALSE)(TRUE)

/*

AND(TRUE)(TRUE) === TRUE
AND(FALSE)(TRUE) === FALSE
AND(TRUE)(FALSE) === FALSE
AND(FALSE)(FALSE) === FALSE

*/

// implement XOR

// branching

IF_THEN_ELSE = p => x => y => p(x)(y)

IF_THEN_ELSE = p => x => p(x)

IF_THEN_ELSE = p => p

IF_THEN_ELSE = ID

// natural numbers

ZERO = f => x => x

ONE = f => x => f(x)

TWO = f => x => f(f(x))

THREE = f => x => f(f(f(x)))

// enumeration

SUCC = n => f => x => f(n(f)(x))

PRED = n => n(p => z => z(SUCC(p(TRUE)))(p(TRUE)))(z => z(ZERO)(ZERO))(FALSE)

SUCC_PAIR = p => PAIR(SECOND(p))(SUCC(SECOND(p)))

PRED = n => FIRST(n(SUCC_PAIR)(PAIR(ZERO)(ZERO)))

FOUR = SUCC(THREE)

// basic arithmetic

PLUS = n => m => m(SUCC)(n)

MINUS = n => m => m(PRED)(n) // actually "monus"

MULT = n => m => m(PLUS(n))(ZERO)

EXP = n => m => m(n)

FIVE = PLUS(TWO)(THREE)

/* reduction steps for PLUS(ONE)(TWO)

PLUS(ONE)(TWO)
(n => m => m(SUCC)(n))(ONE)(TWO)
(TWO)(SUCC)(ONE)
(f => x => f(f(x)))(SUCC)(ONE)
(x => SUCC(SUCC(x)))(ONE)
SUCC(SUCC(ONE))
SUCC((n => f => x => f(n(f)(x)))(ONE))
SUCC((f => x => f(ONE(f)(x))))
SUCC((f => x => f((f => x => f(x))(f)(x))))
SUCC((f => x => f((x => f(x))(x))))
SUCC((f => x => f(f(x))))
SUCC(TWO)
(n => f => x => f(n(f)(x)))(TWO)
f => x => f(TWO(f)(x))
f => x => f((f => x => f(f(x)))(f)(x))
f => x => f((x => f(f(x)))(x))
f => x => f(f(f(x)))
THREE

*/

/* reduction steps for PRED(TWO)

PRED(TWO)
(n => FIRST(n(SUCC_PAIR)(PAIR(ZERO)(ZERO))))(TWO)
FIRST(TWO(SUCC_PAIR)(PAIR(ZERO)(ZERO)))
FIRST(TWO(SUCC_PAIR)((x => y => z => z(x)(y))(ZERO)(ZERO)))
FIRST(TWO(SUCC_PAIR)((y => z => z(ZERO)(y))(ZERO)))
FIRST(TWO(SUCC_PAIR)(z => z(ZERO)(ZERO)))
FIRST(TWO(p => PAIR(SECOND(p))(SUCC(SECOND(p))))(z => z(ZERO)(ZERO)))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(SUCC(SECOND((z => z(ZERO)(ZERO)))))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(SUCC((p => p(x => y => y))((z => z(ZERO)(ZERO)))))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(SUCC((z => z(ZERO)(ZERO))(x => y => y)))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(SUCC((x => y => y)(ZERO)(ZERO)))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(SUCC((y => y)(ZERO)))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(SUCC(ZERO))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))((n => f => x => f(n(f)(x)))(ZERO))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(f => x => f(ZERO(f)(x)))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(f => x => f((f => x => x)(f)(x)))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(f => x => f((x => x)(x)))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(f => x => f(x))))
FIRST(TWO(PAIR(SECOND(z => z(ZERO)(ZERO)))(ONE)))
FIRST(TWO(PAIR((p => p(x => y => y))(z => z(ZERO)(ZERO)))(ONE)))
FIRST(TWO(PAIR(((z => z(ZERO)(ZERO))(x => y => y)))(ONE)))
FIRST(TWO(PAIR(((x => y => y(ZERO)(ZERO))))(ONE)))
FIRST(TWO(PAIR(y => y(ZERO))(ONE)))
FIRST(TWO(PAIR(ZERO)(ONE)))
FIRST(TWO((x => y => z => z(x)(y))(ZERO)(ONE)))
FIRST(TWO((y => z => z(ZERO)(y))(ONE)))
FIRST(TWO(z => z(ZERO)(ONE)))
FIRST((f => x => f(f(x)))(z => z(ZERO)(ONE)))
FIRST(x => (z => z(ZERO)(ONE))((z => z(ZERO)(ONE))(x)))
FIRST(x => (((z => z(ZERO)(ONE))(x))(ZERO)(ONE)))
FIRST(x => ((x(ZERO)(ONE))(ZERO)(ONE)))
(p => p(x => y => x))(x => ((x(ZERO)(ONE))(ZERO)(ONE)))
((x => ((x(ZERO)(ONE))(ZERO)(ONE)))(x => y => x))
((x => y => x)(ZERO)(ONE))(ZERO)(ONE)
((y => ZERO)(ONE))(ZERO)(ONE)
ZERO(ZERO)(ONE)
(f => x => x)(ZERO)(ONE)
(x => x)(ONE)
ONE

*/

// implement SIX through TEN using any combination of the above functions

// implement a function for the equation (n + 5)^3

// comparison

IS_ZERO = n => n(m => FALSE)(TRUE)

LESS_THAN_OR_EQUAL = n => m => IS_ZERO(MINUS(n)(m))

LESS_THAN = n => m => AND(LESS_THAN_OR_EQUAL(n)(m))
                         (NOT(IS_ZERO(n(PRED)(m))))

EQUALS = n => m => AND(LESS_THAN_OR_EQUAL(n)(m))
                      (LESS_THAN_OR_EQUAL(m)(n))

GREATER_THAN_OR_EQUAL = n => m => IS_ZERO(n(PRED)(m))

GREATER_THAN = n => m => AND(GREATER_THAN_OR_EQUAL(n)(m))
                            (NOT(IS_ZERO(MINUS(n)(m))))

// implement MAX

// implement MIN in terms of MAX

// function composition

COMPOSE = f => g => x => f(g(x))

NOT_ZERO = COMPOSE(NOT)(IS_ZERO)

// recursion

FIX = f => (x => f(y => x(x)(y)))(x => f(y => x(x)(y)))

// advanced arithmetic

MOD = FIX(r => n => m =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(m)(n))
    (x => r(MINUS(n)(m))(m)(x))
    (n))

DIV = FIX(r => n => m =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(m)(n))
    (x => SUCC(r(MINUS(n)(m))(m))(x))
    (ZERO))

// implement a function EVEN that, given a number n, returns true if n is even and false otherwise

// implement ODD in terms of EVEN, using composition

// factorial

F = f => n => IS_ZERO(n)(ONE)(x => MULT(n)(f(PRED(n)))(x))

FACT = FIX(F)

FACT = FIX(r => n =>
  IS_ZERO(n)
    (ONE)
    (x => MULT(n)(r(PRED(n)))(x)))

/* reduction steps for FACT(TWO)

FACT(TWO)
FIX(F)(TWO)
(Y => (x => Y(y => x(x)(y)))(x => Y(y => x(x)(y))))(F)(TWO)
(x => F(y => x(x)(y)))(x => F(y => x(x)(y)))(TWO)
F(y => (x => F(y => x(x)(y)))(x => F(y => x(x)(y)))(y))(TWO)
F(FIX(F))(TWO)
(f => n => IS_ZERO(n)(ONE)(x => MULT(n)(f(PRED(n)))(x)))(FIX(F))(TWO)
(n => IS_ZERO(n)(ONE)(x => MULT(n)(FIX(F)(PRED(n)))(x)))(TWO)
IS_ZERO(TWO)(ONE)(x => MULT(TWO)(FIX(F)(PRED(TWO)))(x))
x => MULT(TWO)(FIX(F)(PRED(TWO)))(x)
x => MULT(TWO)(FIX(F)(ONE))(x)
x => MULT(TWO)(FACT(ONE))(x)
x => MULT(TWO)(ONE)(x)
MULT(TWO)(ONE)
TWO

*/

FACT_EXP = (f => (x => f(y => x(x)(y)))(x => f(y => x(x)(y))))(f => n => (n => n(x => x => y => y)(x => y => x))(n)(f => x => f(x))(x => (n => m => m((n => m => m(n => f => x => f(n(f)(x)))(n))(n))(f => x => x))(n)(f((n => n(p => z => z((n => f => x => f(n(f)(x)))(p(x => y => x)))(p(x => y => x)))(z => z(f => x => x)(f => x => x))(x => y => y))(n)))(x)))

/* How to implement recursive lambda functions in a strict language

1. Write the function as you normally would without a fixpoint combinator:

FACT = n =>
  IS_ZERO(n)
    (ONE)
    (MULT(n)(FACT(PRED(n))))

2. Wrap the whole thing in FIX, add a parameter to the front of the definition, and replace all recursive function calls with that parameter:

FACT = FIX(r => n =>
  IS_ZERO(n)
    (ONE)
    (MULT(n)(r(PRED(n)))))

3. Wrap the recursive branch of your function in a dummy closure by adding a parameter to the front of that branch and applying the last function in that branch to the same parameter:

FACT = FIX(r => n =>
  IS_ZERO(n)
    (ONE)
    (x => MULT(n)(r(PRED(n)))(x)))

*/

// implement fibonacci

// pairs

PAIR = x => y => p => p(x)(y)

FIRST = p => p(x => y => x)

SECOND = p => p(x => y => y)

// n-ary tuples

TRIPLE = x => y => z => p => p(x)(y)(z)

THIRD = p => p(x => y => z => z) // FIRST and SECOND will not work for this

// implement 4-tuples and the fourth projection

// lists

LIST_ELEMENT = x => xs => PAIR(FALSE)(PAIR(x)(xs))

EMPTY_LIST = PAIR(TRUE)(TRUE)

IS_EMPTY = FIRST

HEAD = xs => FIRST(SECOND(xs))

TAIL = xs => SECOND(SECOND(xs))

// fold/map/filter

FOLD = FIX(r => f => z => xs =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (z)
    (x => f(HEAD(xs))(r(f)(z)(TAIL(xs)))(x)))

MAP = f => FOLD(x => xs => LIST_ELEMENT(f(x))(xs))(EMPTY_LIST)

/* Haskell map

map f xs = foldr (\x xs -> f x : xs) [] xs

map f = foldr (\x xs -> f x : xs) []

map          :: (a -> b) -> [a] -> [b]
map _ []     =  []
map f (x:xs) =  f x : map f xs

MAP = FIX(r => f => xs =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (EMPTY_LIST)
    (x => LIST_ELEMENT(f(HEAD(xs)))(r(f)(TAIL(xs)))(x)))

map f = foldr ((:) . f) []

MAP = f => FOLD(COMPOSE(LIST_ELEMENT)(f))(EMPTY_LIST)

*/

FILTER = p => FOLD(x => xs =>
  IF_THEN_ELSE(p(x))
    (LIST_ELEMENT(x)(xs))
    (xs))
  (EMPTY_LIST)

/*

toInt(FOLD(PLUS)(ZERO)(LIST))    // = 6
toArrayInt(MAP(PLUS(ONE))(LIST)) // = [2,3,4]
toArrayInt(FILTER(EVEN)(LIST))   // = [2]

*/

// return to factorial

AND_EQUALS_TWO = COMPOSE(AND)(EQUALS(TWO))

ALL_TWOS = FOLD(AND_EQUALS_TWO)(TRUE)

FACT_CHECK = ALL_TWOS(
  LIST_ELEMENT(
    FACT(TWO)
  )(LIST_ELEMENT(
    FIX(F)(TWO)
  )(LIST_ELEMENT(
    (r => (x => r(y => x(x)(y)))(x => r(y => x(x)(y))))(F)(TWO)
  )(LIST_ELEMENT(
    (x => F(y => x(x)(y)))(x => F(y => x(x)(y)))(TWO)
  )(LIST_ELEMENT(
    F(y => (x => F(y => x(x)(y)))(x => F(y => x(x)(y)))(y))(TWO)
  )(LIST_ELEMENT(
    F(FIX(F))(TWO)
  )(LIST_ELEMENT(
    (f => n => IS_ZERO(n)(ONE)(x => MULT(n)(f(PRED(n)))(x)))(FIX(F))(TWO)
  )(LIST_ELEMENT(
    (n => IS_ZERO(n)(ONE)(x => MULT(n)(FIX(F)(PRED(n)))(x)))(TWO)
  )(LIST_ELEMENT(
    IS_ZERO(TWO)(ONE)(x => MULT(TWO)(FIX(F)(PRED(TWO)))(x))
  )(LIST_ELEMENT(
    x => MULT(TWO)(FIX(F)(PRED(TWO)))(x)
  )(LIST_ELEMENT(
    x => MULT(TWO)(FIX(F)(ONE))(x)
  )(LIST_ELEMENT(
    x => MULT(TWO)(FACT(ONE))(x)
  )(LIST_ELEMENT(
    x => MULT(TWO)(ONE)(x)
  )(LIST_ELEMENT(
    MULT(TWO)(ONE)
  )(LIST_ELEMENT(
    TWO
  )(EMPTY_LIST)))))))))))))))
)

// other list functions

RANGE = FIX(r => m => n =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(m)(n))
    (x => LIST_ELEMENT(m)(r(SUCC(m))(n))(x))
    (EMPTY_LIST))

INDEX = FIX(r => xs => n =>
  IF_THEN_ELSE(IS_ZERO(n))
    (HEAD(xs))
    (x => r(TAIL(xs))(PRED(n))(x)))

PUSH = x => xs => FOLD(LIST_ELEMENT)(LIST_ELEMENT(x)(EMPTY_LIST))(xs)

APPEND = FIX(r => xs => ys =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (ys)
    (x => LIST_ELEMENT(HEAD(xs))(r(TAIL(xs))(ys))(x)))

REVERSE = xs => (FIX(r => xs => a => // implicit helper function
  IF_THEN_ELSE(IS_EMPTY(xs))
    (a)
    (x => (r(TAIL(xs))(LIST_ELEMENT(HEAD(xs))(a)))(x))))
  (xs)(EMPTY_LIST)

TAKE = FIX(r => n => xs =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))
    (EMPTY_LIST)
    (IF_THEN_ELSE(IS_EMPTY(xs)))
      (EMPTY_LIST)
      (x => LIST_ELEMENT(HEAD(xs))(r(MINUS(n)(ONE))(TAIL(xs)))(x)))

ZIP = FIX(r => xs => ys =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (EMPTY_LIST)
    (IF_THEN_ELSE(IS_EMPTY(ys))
      (EMPTY_LIST)
      (x => LIST_ELEMENT(PAIR(HEAD(xs))(HEAD(ys)))(r(TAIL(xs))(TAIL(ys)))(x))))

ZIP_WITH = FIX(r => f => xs => ys =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (EMPTY_LIST)
    (IF_THEN_ELSE(IS_EMPTY(ys))
      (EMPTY_LIST)
      (x => LIST_ELEMENT(f(HEAD(xs))(HEAD(ys)))(r(f)(TAIL(xs))(TAIL(ys)))(x))))

/* example of zipping

LIST = LIST_ELEMENT(ONE)(LIST_ELEMENT(TWO)(LIST_ELEMENT(THREE)(EMPTY_LIST)))

toArray(ZIP(LIST)(LIST)).map(x => printPair(toPairInt(x))) // = [(1,1),(2,2),(3,3)]
toArrayInt(ZIP_WITH(PLUS)(LIST)(LIST))                     // = [2,4,6]

*/

INSERT = FIX(r => n => xs =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (LIST_ELEMENT(n)(EMPTY_LIST))
    (IF_THEN_ELSE(GREATER_THAN(n)(HEAD(xs)))
      (x => LIST_ELEMENT(HEAD(xs))(r(n)(TAIL(xs)))(x))
      (LIST_ELEMENT(n)(xs))))

SORT = FOLD(INSERT)(EMPTY_LIST)

/*

toArrayInt(SORT(REVERSE(LIST))) // = [1,2,3]

*/

/* implementation of TAKE from Haskell to JavaScript lambdas

take                   :: Int -> [a] -> [a]
take n _      | n <= 0 =  []
take _ []              =  []
take n (x:xs)          =  x : take (n-1) xs

TAKE = n => xs =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))(EMPTY_LIST)
  (IF_THEN_ELSE(IS_EMPTY(xs)))(EMPTY_LIST)
  (LIST_ELEMENT(HEAD(xs))(TAKE(MINUS(n)(ONE))(TAIL(xs))))

TAKE = FIX(r => n => xs =>
  IF_THEN_ELSE(LESS_THAN_OR_EQUAL(n)(ZERO))
    (EMPTY_LIST)
    (IF_THEN_ELSE(IS_EMPTY(xs)))
      (EMPTY_LIST)
      (x => LIST_ELEMENT(HEAD(xs))(r(MINUS(n)(ONE))(TAIL(xs)))(x)))

*/

// implement DROP

/*

drop                   :: Int -> [a] -> [a]
drop n xs     | n <= 0 =  xs
drop _ []              =  []
drop n (_:xs)          =  drop (n-1) xs

*/

// implement LENGTH (HINT: use an implicit helper function)

// streams

ZEROS = FIX(r => LIST_ELEMENT(ZERO)(r))

REPEAT = x => FIX(r => LIST_ELEMENT(x)(r))

/* example of streams

toArrayInt(TAKE(TEN)(ZEROS))          // = [0,0,0,0,0,0,0,0,0,0]
toArrayInt(TAKE(TEN)(REPEAT(NINE)))   // = [9,9,9,9,9,9,9,9,9]
toInt(LENGTH(TAKE(TEN)(REPEAT(TEN)))) // error!

*/

// universal properties of fold

SUM = FIX(r => xs =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (ZERO)
    (x => PLUS(HEAD(xs))(r(TAIL(xs)))(x)))

SUM_FOLD = FOLD(PLUS)(ZERO)

PRODUCT_FOLD = FOLD(MULT)(ONE) // here there be monoids!

/*

LIST = RANGE(ONE)(TEN)
toInt(SUM_FOLD(LIST)) === toInt(SUM(LIST))

*/

LENGTH_FOLD = FOLD(x => n => PLUS(ONE)(n))(ZERO)

REVERSE_FOLD = FOLD(x => xs => APPEND(xs)(LIST_ELEMENT(x)(EMPTY_LIST)))(EMPTY_LIST)

FOLDL = f => z => xs => FOLD(x => g => (y => g(f(y)(x))))(ID)(xs)(z)

REVERSE_FOLDL = FOLDL(xs => x => LIST_ELEMENT(x)(xs))(EMPTY_LIST) // more efficient

// implement AND_FOLD and OR_FOLD

// binary numbers using lists

B_ZERO = LIST_ELEMENT(ZERO)

B_ONE = LIST_ELEMENT(ONE)

BINARY_ZERO = B_ZERO(EMPTY_LIST)

BINARY_ONE = B_ONE(EMPTY_LIST)

BINARY_TWO = B_ONE(B_ZERO)(EMPTY_LIST)

BINARY_THREE = B_ONE(B_ONE)(EMPTY_LIST)

// trees

EMPTY_TREE = EMPTY_LIST

NODE = v => l => r => LIST_ELEMENT(v)(LIST_ELEMENT(l)(LIST_ELEMENT(r)(EMPTY_TREE)))

VALUE = t => HEAD(t)

LEFT = t => HEAD(TAIL(t))

RIGHT = t => HEAD(TAIL(TAIL(t)))

// functional structures (list implementations)

// monoid

MEMPTY = EMPTY_LIST

MAPPEND = APPEND

// functor

FMAP = MAP

// applicative

PURE = x => LIST_ELEMENT(x)(EMPTY_LIST)

AP = FIX(r => fs => xs =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (EMPTY_LIST)
    (IF_THEN_ELSE(IS_EMPTY(fs))(EMPTY_LIST)
      (x => MAPPEND(MAP(HEAD(fs))(xs))(r(TAIL(fs))(xs))(x))))

AP_ZIP_LIST = fs => xs =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (EMPTY_LIST)
    (IF_THEN_ELSE(IS_EMPTY(fs))(EMPTY_LIST)
      (ZIP_WITH(ID)(fs)(xs)))

/*

LIST = RANGE(ONE)(TEN)

FUNC_LIST = MAP(PLUS)(LIST)

AP_LIST = AP(FUNC_LIST)(LIST)

ZIP_LIST = AP_ZIP_LIST(FUNC_LIST)(REVERSE(LIST))

*/

// monad

RETURN = PURE

BIND = FIX(r => xs => f =>
  IF_THEN_ELSE(IS_EMPTY(xs))
    (EMPTY_LIST)
    (x => MAPPEND(f(HEAD(xs)))(r(TAIL(xs))(f))(x)))

/*

BIND_PLUS = x => RETURN(PLUS(x)(ONE))

BIND_SQUARE = x => RETURN(EXP(x)(TWO))

BIND_CUBE = x => RETURN(EXP(x)(THREE))

BIND_LIST = BIND(BIND(LIST)(BIND_SQUARE))(BIND_CUBE)

BIND_ADDS = BIND(BIND(BIND(BIND(BIND(LIST)(BIND_PLUS))(BIND_PLUS))(BIND_PLUS))(BIND_PLUS))(BIND_PLUS)

*/

// implement any function of your choice

// utility functions

toBool = b => IF_THEN_ELSE(b)(true)(false)

fromBool = b => b ? TRUE : FALSE

toInt = n => n(x => x + 1)(0)

fromInt = n => n == 0 ? f => x => x : f => x => f(fromInt(n - 1)(f)(x))

toArray = xs => [].concat(toBool(IS_EMPTY(xs)) ? [] : [HEAD(xs)].concat(toArray(TAIL(xs))))

fromArray = xs => xs.length === 0 ? EMPTY_LIST : LIST_ELEMENT(xs[0])(fromArray(xs.slice(1)))

toArrayInt = xs => [].concat(toBool(IS_EMPTY(xs)) ? [] : [toInt(HEAD(xs))].concat(toArrayInt(TAIL(xs))))

fromArrayInt = xs => xs.length === 0 ? EMPTY_LIST : LIST_ELEMENT(fromInt(xs[0]))(fromArrayInt(xs.slice(1)))

toPair = p => {
  return {fst: FIRST(p), snd: SECOND(p)}
}

toPairInt = p => {
  return {fst: (toInt(FIRST(p))), snd: (toInt(SECOND(p)))}
}

printPair = p => `(${p.fst},${p.snd})`

toString = str => toArrayInt(str).map(n => String.fromCharCode(n)).join("")

fromString = str => str.length === 0 ? EMPTY_LIST : LIST_ELEMENT(fromInt(str.charCodeAt(str[0])))(fromString(str.substr(1)))

toTree = t => toBool(IS_EMPTY(t)) ? [] : [toInt(VALUE(t)), toTree(LEFT(t)), toTree(RIGHT(t))]

printTree = t => t.length === 0 ? "[]" : `[${t[0]}, ${printTree(t[1])}, ${printTree(t[2])}]`

toLambda = x => {
  if (Number.isInteger(x)) return fromInt(x)
  if (typeof x === "boolean") return fromBool(x)
  if (typeof x === 'string') return fromString(x)
  if (Array.isArray(x)) return fromArray(x.map(y => toLambda(y)))
  return x
}

// tests

p = PAIR(ONE)(TWO)
l = RANGE(ONE)(THREE)
t = NODE(TWO)(NODE(ONE)(EMPTY_TREE)(EMPTY_TREE))(NODE(THREE)(EMPTY_TREE)(EMPTY_TREE))

tests = {
  id: ID(1) === 1,
  true: TRUE(1)(0) === 1,
  false: FALSE(1)(0) === 0,
  and: toBool(AND(FALSE)(TRUE)) === false,
  or: toBool(OR(FALSE)(TRUE)) === true,
  not: toBool(NOT(TRUE)) === false,
  ifThenElse: toBool(IF_THEN_ELSE(IS_ZERO(ZERO))(TRUE)(FALSE)) === true,
  zero: toInt(ZERO) === 0,
  one: toInt(ONE) === 1,
  two: toInt(TWO) === 2,
  three: toInt(THREE) === 3,
  four: toInt(FOUR) === 4,
  five: toInt(FIVE) === 5,
  succ: toInt(SUCC(ONE)) === 2,
  pred: toInt(PRED(ONE)) === 0,
  plus: toInt(PLUS(TWO)(TWO)) === 4,
  minus: toInt(MINUS(TWO)(ONE)) === 1,
  mult: toInt(MULT(TWO)(THREE)) === 6,
  exp: toInt(EXP(TWO)(THREE)) === 8,
  isZero: toBool(IS_ZERO(ZERO)) === true,
  lessThanOrEqual: toBool(LESS_THAN_OR_EQUAL(ZERO)(ZERO)) === true,
  lessThan: toBool(LESS_THAN(ZERO)(ONE)) === true,
  equals: toBool(EQUALS(ONE)(ONE)) === true,
  greaterThanOrEqual: toBool(GREATER_THAN_OR_EQUAL(ONE)(ZERO)) === true,
  greaterThan: toBool(GREATER_THAN(ONE)(ZERO)) === true,
  compose: COMPOSE(ID)(ID)(1) === ID(ID(1)),
  mod: toInt(MOD(FOUR)(TWO)) === 0,
  div: toInt(DIV(FOUR)(TWO)) === 2,
  pair: toPairInt(p).fst === 1 && toPairInt(p).snd === 2,
  first: toInt(FIRST(p)) === 1,
  second: toInt(SECOND(p)) === 2,
  emptyList: toBool(AND(FIRST(EMPTY_LIST))(SECOND(EMPTY_LIST))) === true,
  isEmpty: toBool(AND(IS_EMPTY(EMPTY_LIST))(NOT(IS_EMPTY(l)))) === true,
  head: toInt(HEAD(l)) === 1,
  tail: toArrayInt(TAIL(l)).every((e,i) => e === [2,3][i]),
  fold: toInt(FOLD(PLUS)(ZERO)(l)) === 6,
  map: toArrayInt(MAP(PLUS(ONE))(l)).every((e,i) => e === [2,3,4][i]),
  filter: toArrayInt(FILTER(GREATER_THAN(THREE))(l)).every((e,i) => e === [1,2][i]),
  range: toArrayInt(l).every((e,i) => e === [1,2,3][i]),
  index: toInt(INDEX(l)(ZERO)) === 1,
  push: toArrayInt(PUSH(FOUR)(l)).every((e,i) => e === [1,2,3,4][i]),
  append: toArrayInt(APPEND(l)(l)).every((e,i) => e === [1,2,3,1,2,3][i]),
  reverse: toArrayInt(REVERSE(l)).every((e,i) => e === [3,2,1][i]),
  take: toArrayInt(TAKE(TWO)(l)).every((e,i) => e === [1,2][i]),
  zip: toArray(ZIP(l)(l)).map(x => toPairInt(x)).every((e,i) => e.fst === i+1 && e.snd === i+1),
  zipWith: toArrayInt(ZIP_WITH(PLUS)(l)(REVERSE(l))).every((e,i) => e === [4,4,4][i]),
  insert: toArrayInt(INSERT(ZERO)(l)).every((e,i) => e === [0,1,2,3][i]),
  sort: toArrayInt(SORT(REVERSE(l))).every((e,i) => e === toArrayInt(l)[i]),
  zeros: toArrayInt(TAKE(THREE)(ZEROS)).every((e,i) => e === [0,0,0][i]),
  repeat: toArrayInt(TAKE(THREE)(REPEAT(ONE))).every((e,i) => e === [1,1,1][i]),
  sum: toInt(SUM(l)) === 6,
  sumFold: toInt(SUM_FOLD(l)) === 6,
  productFold: toInt(PRODUCT_FOLD(l)) === 6,
  lengthFold: toInt(LENGTH_FOLD(l)) === 3,
  reverseFold: toArrayInt(REVERSE_FOLD(l)).every((e,i) => e === [3,2,1][i]),
  foldl: toInt(FOLDL(PLUS)(ZERO)(l)) === 6,
  reverseFoldl: toArrayInt(REVERSE_FOLDL(l)).every((e,i) => e === [3,2,1][i]),
  tree: printTree(toTree(t)) === "[2, [1, [], []], [3, [], []]]",
  value: toInt(VALUE(t)) === 2,
  left: toInt(VALUE(LEFT(t))) === 1,
  right: toInt(VALUE(RIGHT(t))) === 3,
  pure: toArrayInt(PURE(ONE))[0] === 1,
  ap: toArrayInt(AP(MAP(PLUS)(l))(l)).every((e,i) => e === [2,3,4,3,4,5,4,5,6][i]),
  apZipList: toArrayInt(AP_ZIP_LIST(MAP(PLUS)(l))(REVERSE(l))).every((e,i) => e === [4,4,4][i]),
  bind: toArrayInt(BIND(l)(RETURN(x => RETURN(PLUS(x)(ONE))))).every((e,i) => e === [2,3,4][i]),
  fact: toInt(FACT(TWO)) === 2,
  factCheck: toBool(FACT_CHECK),
  factExp: toInt(FACT_EXP(TWO)) === 2,
}

allTests = () => Object.values(tests).reduce((x, y) => x && y)

failedTests = () => Object.getOwnPropertyNames(tests).filter((e,i) => !Object.values(tests)[i])

console.log(allTests() ? "All tests passed." : `Failed tests: ${failedTests().join(", ")}`)
