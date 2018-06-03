Functors

\begin{code}

import Ex01

lunchMaybe :: Day -> Maybe Lunch
lunchMaybe day
  | lunchToday day = Just $ whatLunch day
  | otherwise      = Nothing

maybeLunch :: Maybe Lunch -> [] Lunch
maybeLunch Nothing      = []
maybeLunch (Just lunch) = [lunch]

lunchFunctor :: Functor f => f Day -> f Lunch
lunchFunctor fDay = fmap whatLunch fDay

maybeLunchToday :: Maybe Day -> Maybe Lunch
maybeLunchToday Nothing    = Nothing
maybeLunchToday (Just day) = Just $ whatLunch day

mapLunch1 = fmap maybeLunch lunchMaybe
mapLunch2 = maybeLunch . lunchMaybe

-- fmap (maybeLunch . lunchMaybe) (Just Monday) ==
-- (fmap maybeLunch) . (fmap lunchMaybe) $ Just Monday

type NT f g = f Lunch -> g Lunch

naturalLunch :: NT Maybe []
naturalLunch = maybeLunch

\end{code}

-- What kind of function?

(&&) :: Bool -> Bool -> Bool
True  && x = x
False && _ = False

(||) :: Bool -> Bool -> Bool
True  || _ = True
False || x = False

\begin{code}

reverseBool :: Bool -> (Bool -> Bool -> Bool)
reverseBool True  = (&&)
reverseBool False = (||)

and' = reverseBool True
or'  = reverseBool False

\end{code}

head :: [a] -> a
head (x: _) = x
head []     = errorEmptyList "head"

curry :: ((a, b) -> c) -> a -> b -> c
curry f x y = f (x, y)

uncurry :: (a -> b -> c) -> (a, b) -> c)
uncurry f p = f (fst p) (snd p)

swap :: (a, b) -> (b, a)
swap (a, b) = (b, a)

\begin{code}

class Category arrow where
  identity :: arrow a a
  compose  :: arrow b c -> arrow a b -> arrow a c

instance Category (->) where
  identity    x = x
  compose f g x = f (g x)

\end{code}

class Monoid a where
  mempty  :: a
  mappend :: a -> a -> a

\begin{code}

safeHead :: [a] -> Maybe a
safeHead []    = Nothing
safeHead (x:_) = Just x

\end{code}

Write the proof using the naturality condition.

fmap f . eta == eta . fmap f
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
