import {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  SyntheticEvent,
} from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Fab from '@mui/material/Fab';
import { getRecipes } from '../../features/recipes/list/queries/allRecipes';
import { IRecipe } from '../../features/recipes/types';
import RecipeLink from '../../features/recipes/list/components/RecipeLink';
import { fixCircularReferenceIssue } from '../../utils/fixCircularReferenceIssue';

type RecipesProps = {
  recipes: IRecipe[];
  categories: string[];
};

function isEven(input: number): boolean {
  return input % 2 === 0;
}

function FilterButton({ categories }) {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const previousOpen = useRef<boolean>(open);

  function handleFilterClick() {
    setOpen((state) => !state);
  }

  function handleClickAway(event: Event | SyntheticEvent) {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  }

  function handleClickItem(selectedCategory: string) {
    console.log(selectedCategory);

    setOpen(false);
  }

  useEffect(() => {
    if (previousOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    previousOpen.current = open;
  }, [open]);

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="top-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'top-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper sx={{ marginBottom: '0.5rem' }}>
              <ClickAwayListener onClickAway={handleClickAway}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{ padding: '0.5rem' }}
                >
                  <Stack spacing={1}>
                    {categories.map((category, index) => (
                      <Paper key={category}>
                        <MenuItem
                          onClick={() => {
                            handleClickItem(category);
                          }}
                          sx={{
                            fontSize: '1.5rem',
                            backgroundColor: 'primary.main',
                            color: '#fff',
                          }}
                        >
                          {category}
                        </MenuItem>
                      </Paper>
                    ))}
                  </Stack>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Fab
        ref={anchorRef}
        color="primary"
        onClick={handleFilterClick}
        aria-label="filter recipes"
        sx={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
      >
        <FilterAltIcon />
      </Fab>
    </div>
  );
}

function Recipes({ categories, recipes }: RecipesProps) {
  // TODO Try to use <Stack/> instead of <Box />
  return (
    <>
      {recipes.map((recipe) => (
        <Box key={recipe.id} sx={{ margin: '1rem 0' }}>
          <RecipeLink
            title={recipe.title}
            slug={recipe.slug}
            tags={recipe.tags}
          />
        </Box>
      ))}
      <FilterButton categories={categories} />
    </>
  );
}

function transformTagsToSet(acc: Set<string>, tags: string[]): Set<string> {
  tags.forEach((tag) => {
    acc.add(tag);
  });
  return acc;
}

export async function getStaticProps() {
  const rawRecipes = await getRecipes();
  const recipes = fixCircularReferenceIssue(rawRecipes);

  const categories = recipes
    .map((recipe) => recipe.tags)
    .reduce(transformTagsToSet, new Set<string>());

  return {
    props: {
      recipes,
      categories: Array.from(categories),
    },
    revalidate: 60, // TODO: figure out a sane default
  };
}

export default Recipes;
