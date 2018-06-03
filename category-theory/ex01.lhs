Types of functions:

- injective
- surjective
- bijective
- total
- partial

\begin{code}

module Ex01 where

data Day =
    Monday
  | Tuesday
  | Wednesday
  | Thursday
  | Friday
  | Saturday
  | Sunday
  deriving Show

data Lunch =
    Pizza
  | Burger
  | Kebab
  | Soup
  | Salad
  | Martini
  | Pasta
  deriving Show

-- What kind of function?

lunchToday :: Day -> Bool
lunchToday Saturday = False
lunchToday _        = True

whatLunch :: Day -> Lunch
whatLunch Monday    = Soup
whatLunch Tuesday   = Kebab
whatLunch Wednesday = Salad
whatLunch Thursday  = Pizza
whatLunch Friday    = Martini
whatLunch Sunday    = Pasta

alwaysSoup :: Day -> Lunch
alwaysSoup _ = Soup

\end{code}

Write an inverse function for whatLunch and an identity proof for it.

id . f = f
f . id = f

What kind of functions?

head :: [a] -> a
head (x: _) = x
head []     = errorEmptyList "head"

(&&) :: Bool -> Bool -> Bool
True  && x = x
False && _ = False

(||) :: Bool -> Bool -> Bool
True  || _ = True
False || x = False

Write inverse functions for (&&) and (||).

Some isomorphisms:

curry :: ((a, b) -> c) -> a -> b -> c
curry f x y = f (x, y)

uncurry :: (a -> b -> c) -> (a, b) -> c
uncurry f p = f (fst p) (snd p)

swap :: (a, b) -> (b, a)
swap (a, b) = (b, a)

Write isomorphic functions for triples.

Isomorphic types:

f :: Bool -> Either () ()
f True = Left ()
f False = Right ()

g :: Either () () -> Bool
g (Left ()) = True
g (Right ()) = False

data Option a = Empty | Some a
data Drinks a = Hungover | Party a
type Whatever a = Either () a
