import Data.Char

newtype FSM state value = FSM { runState :: state -> (value, state) }

state :: (state -> (value, state)) -> FSM state value
state f = FSM f

get :: FSM state state
get = FSM $ \s -> (s, s)

put :: state -> FSM state ()
put s = FSM $ \_ -> ((), s)

modify :: (state -> state) -> FSM state ()
modify f = FSM $ \s -> ((), f s)

exec :: FSM state value -> state -> state
exec (FSM sv) s = undefined

type Input = Int

type Output = Int

type Op = Input -> Output

type BinOp = Input -> Op

add :: BinOp
add x y = x + y

calc :: (Input, Op) -> Output
calc (input, op) = op input

data Identity a = Identity a deriving Show

instance Functor Identity where
  fmap f (Identity x) = Identity $ f x

-- (.) :: (b -> c) -> (a -> b) -> a -> c

p :: Int -> Char
p = chr

q :: Int -> Int
q = flip mod 27
-- q = (+ 26)

r :: Int -> Int
--r = (+ 26)
r = (subtract 70)

s :: Char -> Int
s = ord

-- p . q :: Int -> Char
-- p . q . r :: Int -> Char
-- p . q . r . s :: Char -> Char

-- (((p . q) . r) . s) 'a' == (p . ((q . r) . s)) 'a'


