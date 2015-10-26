# survival-game
Game of Survival
Write the AI which runs an organism in a multi-agent 2d environment.
Rules:
- each AI starts with 1 cell and [value] energy
- each cell can do the following actions per turn:
-- turn left/right (90)
-- move forward (1 square)
-- attack (100 energy from cell in front if any)
-- photosynthesize (4 energy)
-- reproduce (clone into free square with specific amount of energy)
-- scan (get id of cell in front or null)
- if a cell has no energy at the end of the turn it dies