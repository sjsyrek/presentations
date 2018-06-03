\begin{code}

import Ex01
import Ex02

whatDay :: Lunch -> Day
whatDay Soup    = Monday
whatDay Kebab   = Tuesday
whatDay Salad   = Wednesday
whatDay Pizza   = Thursday
whatDay Martini = Friday
whatDay Burger  = Saturday
whatDay Pasta   = Sunday

\end{code}

Identity proofs

whatDay . id = whatDay
id . whatDay = whatDay
whatDay . whatLunch $ Monday = Monday

Functor proofs

fmap (maybeLunch . lunchMaybe) $ Just Monday ==
(fmap maybeLunch) . (fmap lunchMaybe) $ Just Monday
