\begin{code}

module Ex03 where

import Ex01
import Ex02

type NT f g = f Lunch -> g Lunch

naturalLunch :: NT Maybe []
naturalLunch = maybeLunch

safeHead :: [a] -> Maybe a
safeHead []    = Nothing
safeHead (x:_) = Just x

\end{code}

Write a proof for safeHead using the naturality condition and test it.

fmap f . component == component . fmap f

EXPERT: Redefine the following function as a natural transformation:

length :: [a] -> Int
length [] = 0
length (x:xs) = 1 + length xs
