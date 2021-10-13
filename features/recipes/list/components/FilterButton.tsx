import {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  SyntheticEvent,
} from 'react';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Fab from '@mui/material/Fab';

type FilterButtonProps = {
  categories: string[];
  onFilterChange: (category: string) => void;
};

function FilterButton({ categories, onFilterChange }: FilterButtonProps) {
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
    if (onFilterChange) {
      onFilterChange(selectedCategory);
    }
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
                    {categories.map((category) => (
                      <MenuItem
                        key={category}
                        onClick={() => {
                          handleClickItem(category);
                        }}
                        sx={{ padding: 0 }}
                      >
                        <Paper
                          sx={{
                            fontSize: '1.5rem',
                            backgroundColor: 'primary.main',
                            color: '#fff',
                            width: '100%',
                            padding: '0.5rem 1rem',
                          }}
                        >
                          {category}
                        </Paper>
                      </MenuItem>
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

export default FilterButton;
