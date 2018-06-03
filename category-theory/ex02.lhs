Functors

\begin{code}

module Ex02 where

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

\end{code}

Write functor proofs for the composition of maybeLunch and lunchMaybe.

fmap id == id
fmap (f . g) == fmap f . fmap g
