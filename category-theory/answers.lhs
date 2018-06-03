\begin{code}

import Ex01
import Ex02
import Ex03

whatDay :: Lunch -> Day
whatDay Soup    = Monday
whatDay Kebab   = Tuesday
whatDay Salad   = Wednesday
whatDay Pizza   = Thursday
whatDay Martini = Friday
whatDay Burger  = Saturday
whatDay Pasta   = Sunday

reverseBool :: Bool -> (Bool -> Bool -> Bool)
reverseBool True  = (&&)
reverseBool False = (||)

and' = reverseBool True
or'  = reverseBool False

\end{code}

Identity proofs

whatDay . id = whatDay
id . whatDay = whatDay

Isomorphisms

\begin{code}

curry3 :: ((a, b, c) -> d) -> a -> b -> c -> d
curry3 f x y z = f (x, y, z)

fst3 :: (a, b, c) -> a
fst3 (x, y, z) = x

snd3 :: (a, b, c) -> b
snd3 (x, y, z) = y

thd3 :: (a, b, c) -> c
thd3 (x, y, z) = z

uncurry3 :: (a -> b -> c -> d) -> (a, b, c) -> d
uncurry3 f t = f (fst3 t) (snd3 t) (thd3 t)

swap3 :: (a, b, c) -> (c, b, a)
swap3 (a, b, c) = (c, b, a)

\end{code}

Functor proofs

fmap id $ Just Monday = id $ Just Monday

fmap (maybeLunch . lunchMaybe) $ Just Monday ==
fmap maybeLunch . fmap lunchMaybe $ Just Monday

Natural transformation proofs

fmap f . component == component . fmap f
f = (*10)
xs = [1..10]

fmap f (safeHead []) = Nothing
safeHead (fmap f []) = Nothing
safeHead (fmap f xs) = Just 10
fmap f (safeHead xs) = Just 10

fmap f . safeHead $ [] = Nothing
safeHead . fmap f $ [] = Nothing
safeHead . fmap f $ xs = Just 10
fmap f . safeHead $ xs = Just 10

\begin{code}

newtype Const a b = Const { getConst :: a } deriving Show

instance Functor (Const a) where
  fmap _ (Const x) = Const x

lengthNT :: [b] -> Const Int b
lengthNT []     = Const 0
lengthNT (x:xs) = Const (1 + getConst (lengthNT xs))

\end{code}
