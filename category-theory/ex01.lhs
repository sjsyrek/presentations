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
